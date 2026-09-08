from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from config.database import get_db
from apps.models.job_model import Job
from apps.models.userprof_model import UserProfile
from apps.models.match_result_model import MatchResult
from sqlalchemy.orm import selectinload
from apps.auth.auth import get_current_user, TokenData
from apps.RAG.chunking import prepare_job_description
from apps.RAG.embedding import embed_chunks
from apps.RAG.cover_letter import generate_cover_letter
from apps.scoring.score_service import compute_match_score

score_router = APIRouter(prefix="/scoring", tags=["scoring"])

def _serialize_match_result(result: MatchResult) -> dict:
    return {
        "id": str(result.id),
        "job_id": str(result.job_id),
        "embedding_score": result.embedding_score,
        "top_matches": result.top_matches,
        "created_at": result.created_at,
        "job": {
            "id": str(result.job.id),
            "title": result.job.title,
            "company": result.job.company,
            "description": result.job.description,
        },
    }


async def _get_owned_job(job_id: UUID, current_user: TokenData, db: AsyncSession) -> Job:
    """Shared helper: fetch a job and verify it belongs to the current user."""
    job = await db.get(Job, job_id)
    if job is None or job.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Job not found or access denied")
    return job


async def _get_user_profile(current_user: TokenData, db: AsyncSession) -> UserProfile:
    """Shared helper: fetch the current user's profile, ensuring a resume exists."""
    stmt = select(UserProfile).where(UserProfile.user_id == current_user.id)
    db_result = await db.execute(stmt)
    profile = db_result.scalars().first()
    if profile is None or not profile.resume_text:
        raise HTTPException(status_code=404, detail="User resume profile not found")
    return profile

@score_router.get("/history")
async def score_history(
    current_user: TokenData = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    stmt = (
        select(MatchResult)
        .options(selectinload(MatchResult.job))
        .where(MatchResult.user_id == current_user.id)
        .order_by(MatchResult.created_at.desc())
    )
    db_result = await db.execute(stmt)
    return [_serialize_match_result(result) for result in db_result.scalars().all()]


@score_router.post("/{job_id}")
async def score_resume(
    job_id: UUID,
    current_user: TokenData = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    job = await _get_owned_job(job_id, current_user, db)
    profile = await _get_user_profile(current_user, db)

    job_chunks = prepare_job_description(job.description)
    job_chunks = embed_chunks(job_chunks)

    score_result = compute_match_score(str(current_user.id), job_chunks)
    db.add(MatchResult(
        user_id=current_user.id,
        job_id=job.id,
        embedding_score=score_result["embedding_score"],
        top_matches=score_result["top_matches"],
    ))
    await db.commit()
    return score_result


@score_router.post("/{job_id}/cover-letter")
async def generate_letter(
    job_id: UUID,
    current_user: TokenData = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    job = await _get_owned_job(job_id, current_user, db)
    profile = await _get_user_profile(current_user, db)  # ensures profile/resume exist before proceeding

    try:
        job_chunks = embed_chunks(prepare_job_description(job.description))
        score_result = compute_match_score(str(current_user.id), job_chunks)
    except Exception as exc:
        raise HTTPException(
            status_code=502,
            detail=f"Could not prepare the match context for cover-letter generation: {exc}",
        ) from exc

    resume_texts = [match["resume_text"] for match in score_result["top_matches"]]
    if not resume_texts:
        raise HTTPException(
            status_code=404,
            detail="No matching resume sections were found. Upload your resume again before generating a cover letter.",
        )
    candidate_name = (
    profile.full_name
    if profile.full_name and profile.full_name.strip().lower() != "user"
    else current_user.username or "Applicant"
)
    letter = generate_cover_letter(resume_texts, job.description, job.company, candidate_name=candidate_name)

    return {
        "cover_letter": letter,
        "based_on_score": score_result["embedding_score"],
        "candidate_name": candidate_name,
    }