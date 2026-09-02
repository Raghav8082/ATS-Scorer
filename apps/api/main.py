from apps.user.user_routes import user_router
from apps.jobs.job_routes import job_router
from apps.user_profile.profile_route import profile_router
from fastapi import FastAPI
import uvicorn  
from config.database import engine, Base
 


app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.on_event("startup")
async def on_startup():
    # dev convenience only — use Alembic migrations in real projects
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)



app.include_router(user_router)
app.include_router(job_router)
app.include_router(profile_router)

