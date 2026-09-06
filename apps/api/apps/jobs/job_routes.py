from uuid import UUID
from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from apps.auth.auth import get_current_user
from apps.jobs.job_services import Job_create, Job_list, Job_update, get_job, Job_delete
from apps.schemas.job import JobBase, JobOut, JobUpdate
from config.database import get_db

job_router = APIRouter(
    prefix="/jobs",
    tags=["jobs"],
    dependencies=[Depends(get_current_user)],
)


@job_router.post("/create", response_model=JobOut)
@job_router.post("", response_model=JobOut)
async def create_job(
    job: JobBase,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await Job_create(db=db, job_data=job, user_id=current_user.id)


@job_router.get("", response_model=list[JobOut])
async def list_jobs(
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await Job_list(db=db, user_id=current_user.id)


@job_router.get("/get/{id}", response_model=JobOut)
@job_router.get("/{id}", response_model=JobOut)
async def get_job_by_id(
    id: UUID,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await get_job(db=db, id=id, user_id=current_user.id)


@job_router.put("/update/{id}", response_model=JobOut)
@job_router.put("/{id}", response_model=JobOut)
async def update_job_by_id(
    id: UUID,
    job: JobUpdate,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await Job_update(db=db, id=id, job_data=job, user_id=current_user.id)


@job_router.delete("/{id}")
async def delete_job_by_id(
    id: UUID,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await Job_delete(db=db, id=id, user_id=current_user.id)

