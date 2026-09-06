# app/rag/cover_letter.py
import os
import google.generativeai as genai
from dotenv import load_dotenv
from fastapi import HTTPException

load_dotenv()

def generate_cover_letter(resume_chunks_text: list[str], job_description: str, company: str, candidate_name: str = "Applicant") -> str:
    api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
    if not api_key:
        raise HTTPException(
            status_code=400,
            detail="GEMINI_API_KEY or GOOGLE_API_KEY is missing. Please add your key to apps/api/.env."
        )

    genai.configure(api_key=api_key.strip())
    model = genai.GenerativeModel("gemini-3.6-flash")

    context = "\n\n".join(resume_chunks_text)
    prompt = f"""Given these relevant parts of candidate "{candidate_name}"'s background:

{context}

And this job description at {company}:

{job_description}

Write a tailored, professional cover letter under 250 words for candidate "{candidate_name}".
Only use facts present in the background provided above — do not invent achievements, technologies, or experience not explicitly stated.
Always sign off the letter with "Sincerely,\n{candidate_name}" instead of generic placeholders like [Your Name] or [Candidate Name]."""

    try:
        response = model.generate_content(prompt)
        text = response.text or ""
        # Safety replacement if LLM still leaves placeholder
        text = text.replace("[Your Name]", candidate_name).replace("[Candidate Name]", candidate_name).replace("[Name]", candidate_name)
        return text
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Google Gemini API Error: {str(e)}")
