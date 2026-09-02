from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from config.database import get_db
from apps.schemas.user import UserCreate, UserOut
from apps.user.user_services import create_user,user_login,user_update
from apps.auth.auth import get_current_user

user_router = APIRouter(
    prefix="/user",
    tags=["user"],
    dependencies=[Depends(get_current_user)]
)

@user_router.post("/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)
async def register_user(user: UserCreate, db: AsyncSession = Depends(get_db)):
    return await create_user(db=db, user_data=user)

@user_router.post("/login")
async def login_user(user: UserCreate,db: AsyncSession = Depends(get_db)):
    return await user_login(db=db, user_data=user)

@user_router.put("/update/{id}")
async def update_user(user: UserCreate,db: AsyncSession = Depends(get_db)):
    return await user_update(db=db,User_data=user)
 
