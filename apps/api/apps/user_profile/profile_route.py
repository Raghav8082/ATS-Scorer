
from fastapi import UploadFile,File
from apps.user_profile.profile_service import resume_upload
from apps.schemas.user_profile import userProfile
from apps.auth.auth import get_current_user
from config.database import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import APIRouter, Depends

profile_router = APIRouter(
    prefix="/profile",
    tags=["profile"],
    dependencies=[Depends(get_current_user)]
)


@profile_router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...),
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
   return await resume_upload(file=file, user_id=current_user.id, db=db)
