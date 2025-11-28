from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
import pandas as pd
import os

from utils.regression import linear_regression, logarithmic_regression
from utils.chart import generate_chart
from utils.pdf import generate_pdf
from utils.preprocessing import preprocess_data

router = APIRouter()
UPLOAD_DIR = "uploads/"

@router.get("/linear")
def linear(session_id: str):
    path = os.path.join(UPLOAD_DIR, f"{session_id}.csv")
    if not os.path.exists(path):
        raise HTTPException(404, "Session ID not found")

    df = pd.read_csv(path)

    # --- PREPROCESSING ---
    df, report = preprocess_data(df, "linear")

    result = linear_regression(df)
    result["preprocessing"] = report

    return result


@router.get("/logarithmic")
def logaritmik(session_id: str):
    path = os.path.join(UPLOAD_DIR, f"{session_id}.csv")
    if not os.path.exists(path):
        raise HTTPException(404, "Session ID not found")

    df = pd.read_csv(path)

    # --- PREPROCESSING ---
    df, report = preprocess_data(df, "logarithmic")

    result = logarithmic_regression(df)
    result["preprocessing"] = report

    return result


@router.get("/linear/pdf")
def linear_pdf(session_id: str):
    path = os.path.join(UPLOAD_DIR, f"{session_id}.csv")
    if not os.path.exists(path):
        raise HTTPException(404, "Session ID not found")

    df = pd.read_csv(path)

    # --- PREPROCESSING ---
    df, report = preprocess_data(df, "linear")

    result = linear_regression(df)
    result["preprocessing"] = report

    img_path = generate_chart(df, result, "linear")
    pdf_path = generate_pdf(df, result, img_path, "linear")

    return FileResponse(
        pdf_path,
        media_type="application/pdf",
        filename="linear_regression_result.pdf"
    )


@router.get("/logarithmic/pdf")
def log_pdf(session_id: str):
    path = os.path.join(UPLOAD_DIR, f"{session_id}.csv")
    if not os.path.exists(path):
        raise HTTPException(404, "Session ID not found")

    df = pd.read_csv(path)

    # --- PREPROCESSING ---
    df, report = preprocess_data(df, "logarithmic")

    result = logarithmic_regression(df)
    result["preprocessing"] = report

    img_path = generate_chart(df, result, "logarithmic")
    pdf_path = generate_pdf(df, result, img_path, "logarithmic")

    return FileResponse(
        pdf_path,
        media_type="application/pdf",
        filename="logarithmic_regression_result.pdf"
    )
