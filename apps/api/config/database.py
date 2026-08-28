from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base
from .confi import Settings

Database_Url = f"postgresql+asyncpg://{Settings.username}:{Settings.password}" + f"@{Settings.host}:{Settings.db_port}/{Settings.db_name}"
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

        

