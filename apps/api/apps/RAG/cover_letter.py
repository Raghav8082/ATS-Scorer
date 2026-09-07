# app/rag/cover_letter.py
import os
from google import genai
from dotenv import load_dotenv
from fastapi import HTTPException
from config.confi import settings

load_dotenv()

def generate_cover_letter(resume_chunks_text: list[str], job_description: str, company: str, candidate_name: str = "Applicant") -> str:
    api_key = settings.GEMINI_API_KEY or os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
    if not api_key:
        raise HTTPException(
            status_code=400,
            detail="GEMINI_API_KEY or GOOGLE_API_KEY is missing. Please add your key to apps/api/.env."
        )

    configured_model = os.getenv("GEMINI_MODEL", "gemini-3.6-flash").strip()
    retired_models = {"gemini-2.0-flash", "models/gemini-2.0-flash"}
    model_name = "gemini-3.6-flash" if configured_model in retired_models else configured_model

    context = "\n\n".join(resume_chunks_text)
    prompt = f"""Given these relevant parts of candidate "{candidate_name}"'s background:

{context}

And this job description at {company}:

{job_description}

Write a tailored, professional cover letter under 250 words for candidate "{candidate_name}".
Only use facts present in the background provided above — do not invent achievements, technologies, or experience not explicitly stated.
Always sign off the letter with "Sincerely,\n{candidate_name}" instead of generic placeholders like [Your Name] or [Candidate Name]."""

    try:
        client = genai.Client(api_key=api_key.strip())
        response = client.models.generate_content(
            model=model_name,
            contents=prompt,
        )
        text = response.text or ""
        # Safety replacement if LLM still leaves placeholder
        text = text.replace("[Your Name]", candidate_name).replace("[Candidate Name]", candidate_name).replace("[Name]", candidate_name)
        return text
    except Exception as e:
        raise HTTPException(
            status_code=502,
            detail=f"Google Gemini API Error using {model_name}: {str(e)}",
        ) from e
