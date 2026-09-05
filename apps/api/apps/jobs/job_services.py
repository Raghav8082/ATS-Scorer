from fastapi import Depends
from apps.auth.auth import get_current_user
from apps.models import user_model
from apps.RAG.pinecone import upsert_resume_chunks
from apps.RAG.embedding import embed_chunks
from apps.RAG.chunking import prepare_job_description
from uuid import UUID
from apps.schemas.job import JobUpdate
from apps.models import job_model
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from fastapi import HTTPException , status
from apps.models.job_model import Job
from apps.schemas.job import JobBase

async def Job_create(db: AsyncSession, job_data: JobBase) -> Job:
    target_url = job_data.url or job_data.application_url
    if target_url:
        stmt = select(Job).where(Job.url == target_url)
        result = await db.execute(stmt)
        existing_job = result.scalars().first()
        if existing_job:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Job with this URL is already added"
            )
    
    new_job = Job(
        url=target_url,
        title=job_data.job_title or "Job Title",
        company=job_data.company or "Unknown Company",
        description=job_data.description,
        platform=job_data.platform or "custom",
    )

    db.add(new_job)
    await db.commit()
    await db.refresh(new_job)

    job_chunks = prepare_job_description(new_job.description)
    job_chunks = embed_chunks(job_chunks)

    return new_job


async def Job_update(db: AsyncSession, job_data: JobUpdate) -> Job:
    target_url = getattr(job_data, "url", None) or getattr(job_data, "application_url", None)
    stmt = select(Job).where(Job.url == target_url)
    result = await db.execute(stmt)
    existing_job = result.scalars().first()
    if not existing_job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Invalid URL / Job not found"
        )
    for key, value in job_data.model_dump(exclude_unset=True).items():
        setattr(existing_job, key, value)
    await db.commit()
    await db.refresh(existing_job)
    return existing_job


async def get_job(db:AsyncSession , id:UUID)->Job:
    stmt = select(Job).where(Job.id == id)
    result = await db.execute(stmt)
    existing_job = result.scalars().first()
    if not existing_job:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Job ID"
        )
    return existing_job

