
from uuid import UUID
from apps.schemas.job import JobUpdate
from apps.models import job_model
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from fastapi import HTTPException , status
from apps.models.job_model import Job
from apps.schemas.job import JobBase

async def Job_create(db:AsyncSession , job_data: JobBase)->Job:
    
   
    stmt = select(Job).where((Job.url == job_data.url))
    result = await db.execute(stmt)
    existing_job = result.scalars().first()
    if existing_job:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Job is already added"
        )
    
    new_job = Job(
        url=job_data.url,
        company=job_data.company,
        job_title=job_data.job_title,
        status=job_data.status
    )

    db.add(new_job)
    await db.commit()
    await db.refresh(new_job)

    return new_job


async def Job_update(db:AsyncSession , job_data: JobUpdate)->Job:
    stmt = select(Job).where(Job.url == job_data.url)
    result = await db.execute(stmt)
    existing_job = result.scalars().first()
    if not existing_job:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid URL"
        )
    existing_job.update(job_data)
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

