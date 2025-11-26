from fastapi import APIRouter, UploadFile, File
import pandas as pd
import uuid
import os

router = APIRouter()
UPLOAD_DIR = "uploads/"

@router.post("")
async def upload_file(file: UploadFile = File(...)):
    session_id = str(uuid.uuid4())
    save_path = os.path.join(UPLOAD_DIR, f"{session_id}.csv")

    with open(save_path, "wb") as f:
        f.write(await file.read())

    return {
        "message": "File uploaded",
        "session_id": session_id
    }
