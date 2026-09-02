from apps.user_profile.profile_service import resume_upload
from apps.schemas.user_profile import userProfile
from apps.auth.auth import get_current_user
from fastapi import APIRouter, Depends

profile_router = APIRouter(
    prefix="/profile",
    tags=["profile"],
    dependencies=[Depends(get_current_user)]
)


@profile_router.post("/upload")
async def upload_resume(resume: userProfile):
    return await resume_upload(resume=resume)