from fastapi import APIRouter, UploadFile, File, HTTPException
from pydantic import BaseModel
import pandas as pd
import uuid
import os

router = APIRouter()
UPLOAD_DIR = "uploads"

class JSONUpload(BaseModel):
    data: list

@router.post("/json")
async def upload_json(payload: JSONUpload):
    os.makedirs(UPLOAD_DIR, exist_ok=True)

    session_id = str(uuid.uuid4())
    save_path = os.path.join(UPLOAD_DIR, f"{session_id}.csv")

    try:
        df = pd.DataFrame(payload.data)
    except:
        raise HTTPException(400, "Format JSON tidak valid. Format harus list of object.")

    if len(df) == 0:
        raise HTTPException(400, "Data tidak boleh kosong")

    # Normalisasi nama kolom
    df.columns = [c.strip().upper() for c in df.columns]

    if "X" not in df.columns or "Y" not in df.columns:
        raise HTTPException(400, "JSON harus memiliki kolom X dan Y")

    df.to_csv(save_path, index=False)

    return {
        "message": "JSON uploaded successfully",
        "session_id": session_id,
        "rows": len(df)
    }

@router.post("/")
async def upload_file(file: UploadFile = File(...)):
    os.makedirs(UPLOAD_DIR, exist_ok=True)

    filename = file.filename.lower()

    # DETEKSI HANYA DARI EKSTENSI
    if filename.endswith(".csv"):
        ext = ".csv"
    elif filename.endswith(".xlsx"):
        ext = ".xlsx"
    else:
        raise HTTPException(400, "File harus CSV atau XLSX")

    session_id = str(uuid.uuid4())
    save_path = os.path.join(UPLOAD_DIR, f"{session_id}{ext}")

    # Simpan file persis apa adanya
    with open(save_path, "wb") as f:
        f.write(await file.read())

    return {
        "message": "File uploaded successfully",
        "session_id": session_id,
        "path": save_path
    }
