from fastapi import APIRouter, UploadFile, File, HTTPException
import uuid
import os

router = APIRouter()
UPLOAD_DIR = "uploads"

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
