from apps.models import UserProfile
from apps.schemas.user_profile import userProfile
from config.database import client
import pdfplumber

async def resume_upload(resume: userProfile)->UserProfile:
    minio_client = await client()

    source = resume.resume_path
    text=""
    with pdfplumber.open(source) as pdf:
        for page in pdf.pages:
            text += page.extract_text()
        
    bucket_name = "ats-resume"
    destination_file = f"{resume.full_name}_final.pdf"

    found = minio_client.bucket_exists(bucket_name)
    if not found:
        minio_client.make_bucket(bucket_name)
       
    minio_client.fput_object(
        bucket_name, destination_file, source,
    )

    return {
       "message": "Resume uploaded successfully",
       "resume_path": destination_file,
       "resume_text": text
       }
