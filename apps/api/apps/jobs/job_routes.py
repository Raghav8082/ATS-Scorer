from apps.jobs.job_services import Job_create, Job_update
from uuid import UUID
from config.database import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from apps.schemas.job import JobBase
from fastapi import APIRouter,Depends , status

job_router = APIRouter(
    prefix="/jobs",
    tags=["jobs"]
)


@job_router.post("/create")
async def create_job(job:JobBase , db: AsyncSession =  Depends(get_db)):
    return await Job_create(db=db , job_data=job)

@job_router.put("/update/{id}")
async def update_job(job:JobBase , db: AsyncSession =  Depends(get_db)):
    return await Job_update(db=db , job_data=job)

@job_router.get("/get/{id}")
async def get_job(id: UUID, db: AsyncSession =  Depends(get_db)):
    return "Job got"

