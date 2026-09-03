from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base
from .confi import settings
from minio import Minio

Database_Url = f"postgresql+asyncpg://{settings.db_user}:{settings.password}@{settings.host}:{settings.db_port}/{settings.db_name}"
engine = create_async_engine(Database_Url, echo=True)

AsyncSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
)

Base = declarative_base()

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session

async def client():
    # Minio endpoint should be host:port without scheme, or set secure appropriately
    endpoint = settings.MINIO_ENDPOINT.replace("http://", "").replace("https://", "")
    return Minio(
        endpoint,
        access_key=settings.MINIO_ACCESS_KEY,
        secret_key=settings.MINIO_SECRET_KEY,
        secure=False
    )
        

