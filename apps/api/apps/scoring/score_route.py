from apps.auth.auth import TokenData
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from config.database import get_db
from apps.models.job_model import Job
from apps.auth.auth import get_current_user
from apps.RAG.chunking import prepare_job_description
from apps.RAG.embedding import embed_chunks
from apps.scoring.score_service import compute_match_score

from sqlalchemy import select
from apps.models.userprof_model import UserProfile

score_router = APIRouter(prefix="/scoring", tags=["scoring"])


@score_router.post("/{job_id}")
async def score_resume(
    job_id: UUID,
    current_user: TokenData = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    job = await db.get(Job, job_id)
    if job is None:
        raise HTTPException(status_code=404, detail="Job not found")

    stmt = select(UserProfile).where(UserProfile.user_id == current_user.id)
    result = await db.execute(stmt)
    profile = result.scalars().first()

    if profile is None or not profile.resume_text:
        raise HTTPException(status_code=404, detail="User resume profile not found")

    job_chunks = prepare_job_description(job.description)
    job_chunks = embed_chunks(job_chunks)

    result = compute_match_score(
        str(current_user.id),
        job_chunks,
        resume_full_text=profile.resume_text,
        job_full_text=job.description,
    )
    return result 
