from apps.schemas.user_profile import userProfile
from config.database import client

async def resume_upload(resume: userProfile):
    minio_client = await client()

    source = resume.resume_path

    bucket_name = "ats-resume"
    destination_file = f"{resume.id}_final"

    found = minio_client.bucket_exists(bucket_name)
    if not found:
        minio_client.make_bucket(bucket_name)
       
    minio_client.fput_object(
        bucket_name, destination_file, source,
    )

