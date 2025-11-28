from fastapi import APIRouter, UploadFile, File
import uuid
import os

router = APIRouter()
UPLOAD_DIR = "uploads"

@router.post("/")
async def upload_file(file: UploadFile = File(...)):
    # Buat folder jika belum ada
    os.makedirs(UPLOAD_DIR, exist_ok=True)

    # Generate session ID
    session_id = str(uuid.uuid4())
    save_path = os.path.join(UPLOAD_DIR, f"{session_id}.csv")

    # Simpan file CSV
    with open(save_path, "wb") as f:
        f.write(await file.read())

    return {
        "message": "File uploaded successfully",
        "session_id": session_id,
        "path": save_path
    }
