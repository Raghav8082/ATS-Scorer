
from fastapi import UploadFile
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.exc import SQLAlchemyError
from fastapi import HTTPException, status
from apps.models.userprof_model import UserProfile
from apps.RAG.pinecone import upsert_resume_chunks
from apps.RAG.embedding import embed_chunks
from apps.RAG.chunking import chunk_resume
from apps.schemas.user_profile import userProfile
import pdfplumber
import io

async def resume_upload(file: UploadFile, user_id, db: AsyncSession, full_name: str = "User") -> dict:
    content = await file.read()
    if not content:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="The uploaded file is empty.")

    try:
        text = ""
        with pdfplumber.open(io.BytesIO(content)) as pdf:
            for page in pdf.pages:
                extracted = page.extract_text()
                if extracted:
                    text += extracted + "\n"
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Could not read the uploaded PDF: {exc}",
        ) from exc

    if not text.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No selectable text was found in the PDF. Upload a text-based resume PDF.",
        )

    destination_file = f"{user_id}_{file.filename}"

    # Save / Update UserProfile in PostgreSQL
    stmt = select(UserProfile).where(UserProfile.user_id == user_id)
    result = await db.execute(stmt)
    existing_prof = result.scalars().first()

    chunk = chunk_resume(text)
    try:
        resume_chunks = embed_chunks(chunk)
        upsert_resume_chunks(str(user_id), resume_chunks)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Resume indexing failed. Check GEMINI_API_KEY, PINECONE_API, and Pinecone index dimensions: {exc}",
        ) from exc

    if existing_prof:
        existing_prof.resume_path = destination_file
        existing_prof.resume_text = text
    else:
        db.add(UserProfile(
            user_id=user_id,
            full_name=full_name,
            resume_path=destination_file,
            resume_text=text,
        ))

    try:
        await db.commit()
    except SQLAlchemyError as exc:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Resume was indexed but could not be saved to the database: {exc}",
        ) from exc

    return {
       "message": "Resume uploaded successfully",
       "resume_path": destination_file,
       "resume_text": text,
       "resume_chunk": chunk,
             "resume_vector": resume_chunks
    }
