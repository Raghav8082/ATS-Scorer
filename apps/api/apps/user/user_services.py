from apps.schemas.user import UserUpdate
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from fastapi import HTTPException, status
from passlib.context import CryptContext
from apps.schemas.user import UserCreate
from apps.models.user_model import User


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")



def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


async def create_user(db: AsyncSession, user_data: UserCreate) -> User:
    """Creates a new user record after validating uniqueness and hashing the password."""
    # Check if username or email already exists
    stmt = select(User).where((User.username == user_data.username) | (User.email == user_data.email))
    result = await db.execute(stmt)
    existing_user = result.scalars().first()

    if existing_user:
        if existing_user.email == user_data.email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email is already registered"
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username is already taken"
            )

    hashed_pwd = hash_password(user_data.password)

    new_user = User(
        username=user_data.username,
        email=user_data.email,
        hashed_password=hashed_pwd,
    )

    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)

    return new_user


async def user_login(db:AsyncSession , user_data: UserCreate)-> User:
    stmt = select(User).where(User.username == user_data.username) & (User.email == user_data.email)
    result = await db.execute(stmt)
    existing_user = result.scalars().first()
    if not existing_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Username"
        )
    if not verify_password(user_data.password, existing_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid password"
        )
    return existing_user


async def user_update(db:AsyncSession,User_data:UserUpdate)->User:
    stmt = select(User).where(User.username == User_data.username) & (User.email == User_data.email)
    result = await db.execute(stmt)
    existing_user = result.scalars().first()
    if not existing_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Username"
        )
    existing_user.update(User_data)    
    await db.commit()
    await db.refresh(existing_user)
    return existing_user

