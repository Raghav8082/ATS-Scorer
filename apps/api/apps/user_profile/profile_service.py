from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from apps.models.userprof_model import UserProfile
from apps.RAG.pinecone import upsert_resume_chunks
from apps.RAG.embedding import embed_chunks
from apps.RAG.chunking import chunk_resume
from apps.schemas.user_profile import userProfile
from config.database import client
import pdfplumber

async def resume_upload(resume: userProfile, db: AsyncSession) -> dict:
    minio_client = await client()

    source = resume.resume_path
    text = ""
    with pdfplumber.open(source) as pdf:
        for page in pdf.pages:
            extracted = page.extract_text()
            if extracted:
                text += extracted + "\n"
        
    bucket_name = "ats-resume"
    destination_file = f"{resume.full_name}_final.pdf"

    found = minio_client.bucket_exists(bucket_name)
    if not found:
        minio_client.make_bucket(bucket_name)
       
    minio_client.fput_object(
        bucket_name, destination_file, source,
    )

    # Save / Update UserProfile in PostgreSQL
    stmt = select(UserProfile).where(UserProfile.user_id == resume.user_id)
    result = await db.execute(stmt)
    existing_prof = result.scalars().first()

    if existing_prof:
        existing_prof.full_name = resume.full_name
        existing_prof.resume_path = destination_file
        existing_prof.resume_text = text
    else:
        new_prof = UserProfile(
            user_id=resume.user_id,
            full_name=resume.full_name,
            resume_path=destination_file,
            resume_text=text,
        )
        db.add(new_prof)

    await db.commit()

    chunk = chunk_resume(text)
    resume_chunks = embed_chunks(chunk)
    upsert_resume_chunks(str(resume.user_id), resume_chunks)

    return {
       "message": "Resume uploaded successfully",
       "resume_path": destination_file,
       "resume_text": text,
       "resume_chunk": chunk,
       "resume_vector": resume_chunks
    }
