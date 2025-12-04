from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
import pandas as pd
import os

from utils.preprocessing import preprocess_data
from utils.regression import linear_regression, logarithmic_regression
from utils.chart import generate_chart
from utils.pdf import generate_pdf

router = APIRouter()
UPLOAD_DIR = "uploads/"

def load_session_file(session_id: str):
    csv_path = os.path.join(UPLOAD_DIR, f"{session_id}.csv")
    xlsx_path = os.path.join(UPLOAD_DIR, f"{session_id}.xlsx")

    if os.path.exists(csv_path):
        try:
            return pd.read_csv(csv_path)
        except:
            return pd.read_csv(csv_path, encoding="latin1")

    if os.path.exists(xlsx_path):
        return pd.read_excel(xlsx_path)

    raise HTTPException(404, "Session file not found")


@router.get("/linear")
def linear(session_id: str):
    df_raw = load_session_file(session_id)
    df_clean, report = preprocess_data(df_raw, model="linear")
    result = linear_regression(df_clean, report)
    return result


@router.get("/logarithmic")
def logaritmik(session_id: str):
    df_raw = load_session_file(session_id)
    df_clean, report = preprocess_data(df_raw, model="logarithmic")
    result = logarithmic_regression(df_clean, report)
    return result


@router.get("/linear/pdf")
def linear_pdf(session_id: str):
    df_raw = load_session_file(session_id)
    df_clean, report = preprocess_data(df_raw, model="linear")
    result = linear_regression(df_clean, report)

    img_path = generate_chart(df_clean, result, "linear")
    pdf_path = generate_pdf(df_clean, result, img_path, "linear")

    response = FileResponse(
        pdf_path,
        media_type="application/pdf",
        filename="linear_regression_result.pdf"
    )

    # Tambah header CORS
    response.headers["Access-Control-Allow-Origin"] = "http://localhost:5173"
    response.headers["Access-Control-Allow-Credentials"] = "true"

    return response



@router.get("/logarithmic/pdf")
def log_pdf(session_id: str):
    df_raw = load_session_file(session_id)
    df_clean, report = preprocess_data(df_raw, model="logarithmic")
    result = logarithmic_regression(df_clean, report)

    img_path = generate_chart(df_clean, result, "logarithmic")
    pdf_path = generate_pdf(df_clean, result, img_path, "logarithmic")

    response = FileResponse(
        pdf_path,
        media_type="application/pdf",
        filename="logarithmic_regression_result.pdf"
    )

    # Tambah header CORS
    response.headers["Access-Control-Allow-Origin"] = "http://localhost:5173"
    response.headers["Access-Control-Allow-Credentials"] = "true"

    return response

