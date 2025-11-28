# routes/chatbot_routes.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import requests
import os
from dotenv import load_dotenv
from utils.regression import linear_regression, logarithmic_regression

load_dotenv()

router = APIRouter()

# === GROQ (FREE) CONFIG ===
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"

# Ambil model aktif dari .env
CHAT_MODEL = os.getenv("CHAT_MODEL", "llama-3.1-70b-versatile")

TEMPERATURE = 0.4

class ChatRequest(BaseModel):
    session_id: str
    model: str  # linear / logarithmic
    question: str


def load_csv(session_id):
    import pandas as pd
    path = f"uploads/{session_id}.csv"
    if not os.path.exists(path):
        raise HTTPException(404, "Session ID tidak ditemukan")
    return pd.read_csv(path)


def call_groq(payload: dict):
    if not GROQ_API_KEY:
        raise HTTPException(500, "GROQ_API_KEY tidak ditemukan di .env")

    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    resp = requests.post(GROQ_URL, json=payload, headers=headers, timeout=30)
    return resp


@router.post("/ask")
async def ask_bot(request: ChatRequest):
    # Load CSV
    df = load_csv(request.session_id)

    # Hitung regresi
    if request.model == "linear":
        result = linear_regression(df)
    elif request.model == "logarithmic":
        result = logarithmic_regression(df)
    else:
        raise HTTPException(400, "Model harus 'linear' atau 'logarithmic'")

    preprocessing_text = result.get("preprocessing_report", "")

    # Build context untuk LLM
    context = f"""
Anda adalah asisten statistik. Jawablah berdasarkan hasil regresi berikut:

Model: {result.get('model')}
Persamaan: {result.get('equation')}

Nilai a: {result.get('a')}
Nilai b: {result.get('b')}
R²: {result.get('r2')}

Preprocessing:
{preprocessing_text}

--- END KONTEXT ---
"""

    # Payload Groq (OpenAI-compatible)
    payload = {
        "model": CHAT_MODEL,
        "messages": [
            {"role": "system", "content": context},
            {"role": "user", "content": request.question}
        ],
        "temperature": TEMPERATURE
    }

    # Request ke Groq
    response = call_groq(payload)

    # Parse response
    try:
        data = response.json()
    except:
        raise HTTPException(500, f"Groq mengembalikan non-JSON: {response.text}")

    if response.status_code != 200:
        raise HTTPException(500, f"Groq Error: {data}")

    try:
        reply = data["choices"][0]["message"]["content"]
    except:
        reply = str(data)

    return {"answer": reply}
