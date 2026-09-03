from apps.schemas.user import UserUpdate
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from fastapi import HTTPException, status
from passlib.context import CryptContext
from apps.schemas.user import UserCreate, UserLogin, UserUpdate, TokenResponse, UserOut
from apps.models.user_model import User
import jwt
from config.confi import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    return jwt.encode(to_encode, settings.jwt_secret, algorithm="HS256")


async def create_user(db: AsyncSession, user_data: UserCreate) -> dict:
    """Creates a new user record after validating uniqueness and hashing the password, returning token."""
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

    access_token = create_access_token(data={"sub": str(new_user.id), "email": new_user.email})
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": new_user
    }


async def user_login(db: AsyncSession, login_data: UserLogin) -> dict:
    stmt = select(User).where(
        (User.username == login_data.username_or_email) | (User.email == login_data.username_or_email)
    )
    result = await db.execute(stmt)
    existing_user = result.scalars().first()
    if not existing_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or email"
        )
    if not verify_password(login_data.password, existing_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid password"
        )
    
    access_token = create_access_token(data={"sub": str(existing_user.id), "email": existing_user.email})
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": existing_user
    }


async def user_update(db: AsyncSession, User_data: UserUpdate) -> User:
    stmt = select(User).where((User.username == User_data.username) | (User.email == User_data.email))
    result = await db.execute(stmt)
    existing_user = result.scalars().first()
    if not existing_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Username"
        )
    for key, value in User_data.model_dump(exclude_unset=True).items():
        if key == "password":
            setattr(existing_user, "hashed_password", hash_password(value))
        else:
            setattr(existing_user, key, value)
    await db.commit()
    await db.refresh(existing_user)
    return existing_user



