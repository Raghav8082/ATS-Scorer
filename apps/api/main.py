import os
import apps.models
from apps.user.user_routes import user_router
from apps.jobs.job_routes import job_router
from apps.user_profile.profile_route import profile_router
from apps.scoring.score_route import score_router
from fastapi import FastAPI
import uvicorn  
from config.database import engine
from config.confi import settings
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="CoverCraft ATS API")

# Dynamic CORS origins from settings/environment
raw_origins = settings.allowed_origins or "http://localhost:3000,http://127.0.0.1:3000"
origins = [origin.strip() for origin in raw_origins.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins if origins else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "CoverCraft ATS Backend API is running"}

@app.get("/health", status_code=200)
def health_check():
    return {"status": "ok", "service": "ats-backend"}

app.include_router(user_router)
app.include_router(job_router)
app.include_router(profile_router)
app.include_router(score_router)

if __name__ == "__main__":
    port = int(os.getenv("PORT", settings.port))
    host = settings.host
    uvicorn.run("main:app", host=host, port=port, reload=False)

