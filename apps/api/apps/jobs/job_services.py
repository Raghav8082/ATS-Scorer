from fastapi import Depends
from apps.auth.auth import get_current_user
from apps.models import user_model
from apps.RAG.pinecone import upsert_resume_chunks
from apps.RAG.embedding import embed_chunks
from apps.RAG.chunking import prepare_job_description
from uuid import UUID
from apps.schemas.job import JobUpdate
from apps.models.job_model import Job
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from fastapi import HTTPException , status
from apps.schemas.job import JobBase
from uuid import UUID, uuid4

async def Job_create(db: AsyncSession, job_data: JobBase, user_id: UUID) -> Job:
    target_url = job_data.url or job_data.application_url or f"custom://job/{uuid4()}"
    if target_url:
        stmt = select(Job).where(Job.url == target_url, Job.user_id == user_id)
        result = await db.execute(stmt)
        existing_job = result.scalars().first()
        if existing_job:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Job with this URL is already added"
            )
    
    title = job_data.title or job_data.job_title or "Job Title"
    new_job = Job(
        user_id=user_id,
        url=target_url,
        title=title,
        company=job_data.company or "Unknown Company",
        description=job_data.description,
        platform=job_data.platform or "custom",
        location=job_data.location,
        salary_min=job_data.salary_min,
        salary_max=job_data.salary_max,
    )

    try:
        db.add(new_job)
        await db.commit()
        await db.refresh(new_job)
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to create job: {str(e)}"
        )

    try:
        job_chunks = prepare_job_description(new_job.description)
        job_chunks = embed_chunks(job_chunks)
    except Exception as e:
        print("Warning: Job embedding failed:", e)

    return new_job


async def Job_list(db: AsyncSession, user_id: UUID) -> list[Job]:
    stmt = select(Job).where(Job.user_id == user_id).order_by(Job.scraped_at.desc())
    result = await db.execute(stmt)
    return list(result.scalars().all())


async def Job_update(db: AsyncSession, id: UUID, job_data: JobUpdate, user_id: UUID) -> Job:
    stmt = select(Job).where(Job.id == id, Job.user_id == user_id)
    result = await db.execute(stmt)
    existing_job = result.scalars().first()
    if not existing_job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job not found or access denied"
        )
    update_dict = job_data.model_dump(exclude_unset=True)
    if "job_title" in update_dict:
        if not update_dict.get("title"):
            update_dict["title"] = update_dict["job_title"]
        del update_dict["job_title"]

    for key, value in update_dict.items():
        if hasattr(existing_job, key):
            setattr(existing_job, key, value)
    await db.commit()
    await db.refresh(existing_job)
    return existing_job


async def get_job(db: AsyncSession, id: UUID, user_id: UUID) -> Job:
    stmt = select(Job).where(Job.id == id, Job.user_id == user_id)
    result = await db.execute(stmt)
    existing_job = result.scalars().first()
    if not existing_job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job not found or access denied"
        )
    return existing_job


async def Job_delete(db: AsyncSession, id: UUID, user_id: UUID) -> dict:
    stmt = select(Job).where(Job.id == id, Job.user_id == user_id)
    result = await db.execute(stmt)
    existing_job = result.scalars().first()
    if not existing_job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job not found or access denied"
        )
    await db.delete(existing_job)
    await db.commit()
    return {"message": "Job deleted successfully"}

