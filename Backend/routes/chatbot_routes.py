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
    import json

    # Load CSV
    df = load_csv(request.session_id)

    # Normalisasi nama kolom
    df.columns = [c.strip().lower() for c in df.columns]

    if len(df.columns) < 2:
        raise HTTPException(400, "CSV minimal harus memiliki 2 kolom")

    col_x = df.columns[0]
    col_y = df.columns[1]

    preprocessing_report = [
        f"Kolom asli: {df.columns.tolist()}",
        f"Kolom '{col_x}' dipetakan sebagai X dan kolom '{col_y}' dipetakan sebagai Y.",
        f"Total baris = {len(df)}"
    ]

    # Rename kolom
    df = df.rename(columns={col_x: "X", col_y: "Y"})

    # Hitung regresi
    if request.model == "linear":
        result = linear_regression(df, preprocessing_report=preprocessing_report)
    elif request.model == "logarithmic":
        result = logarithmic_regression(df, preprocessing_report=preprocessing_report)
    else:
        raise HTTPException(400, "Model harus 'linear' atau 'logarithmic'")

    # === KONVERSI HASIL REGRESI KE JSON TERFORMAT ===
    result_text = json.dumps(result, indent=2, ensure_ascii=False)

    # === BANGUN SISTEM KONTEXT===
    context = f"""
Anda adalah asisten analisis statistik dan regresi data.

Berikut adalah hasil perhitungan regresi yang harus Anda gunakan sebagai referensi utama.
Jangan membuat asumsi lain di luar data berikut.

=== HASIL REGRESI (JSON) ===
{result_text}
=== END JSON ===

Instruksi:
- Gunakan semua nilai pada JSON (a, b, n, k, r, r2, sumX, sumY, details, cleaned_data, preprocessing_report, dll).
- Jika user bertanya penjelasan, jelaskan dengan menggunakan referensi angka dari JSON ini.
- Jika user bertanya prediksi, gunakan persamaan regresi yang diberikan.
- Jika user bertanya tentang kualitas model, gunakan nilai R dan R².
"""

    # Payload Groq
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

    reply = data["choices"][0]["message"]["content"]

    return {"answer": reply}

