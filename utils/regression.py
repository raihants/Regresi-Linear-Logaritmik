import numpy as np
from utils.preprocessing import preprocess_data

def linear_regression(df):
    df_before = df.copy()
    df, report = preprocess_data(df, "linear")

    # --- CLEAN DATA REPORT ---
    clean_data_report = []
    clean_data_report.append(f"Jumlah data awal: {len(df_before)}")
    clean_data_report.append(f"Jumlah data setelah preprocessing: {len(df)}")
    clean_data_report.append(f"Data yang dihapus: {len(df_before) - len(df)}")

    # --- CLEANED DATA UNTUK DIAGRAM ---
    cleaned_data = df.to_dict(orient="records")

    X = df["X"]
    Y = df["Y"]

    n = len(X)
    sumX = X.sum()
    sumY = Y.sum()
    sumXY = (X * Y).sum()
    sumX2 = (X**2).sum()

    b = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX ** 2)
    a = (sumY - b * sumX) / n

    # --- HITUNG R² ---
    Y_pred = a + b * X
    ss_res = ((Y - Y_pred)**2).sum()
    ss_tot = ((Y - Y.mean())**2).sum()
    r2 = 1 - (ss_res / ss_tot)

    details = [
        f"n = {n}",
        f"ΣX = {sumX}",
        f"ΣY = {sumY}",
        f"ΣXY = {sumXY}",
        f"ΣX² = {sumX2}",
        "",
        "Rumus regresi linear:",
        "b = (nΣXY – ΣXΣY) / (nΣX² – (ΣX)²)",
        f"b = ({n}*{sumXY} – {sumX}*{sumY}) / ({n}*{sumX2} – {sumX}²)",
        f"b = {b}",
        "",
        "a = (ΣY – bΣX) / n",
        f"a = ({sumY} – {b}*{sumX}) / {n}",
        f"a = {a}",
        "",
        f"Persamaan: Y = {a} + {b}X",
        "",
        f"R² = {r2}"
    ]

    return {
        "model": "linear",
        "a": float(a),
        "b": float(b),
        "equation": f"Y = {a} + {b}X",
        "preprocessing_report": report,
        "clean_data_report": clean_data_report,
        "cleaned_data": cleaned_data,  # <--- dipakai frontend
        "details": details,
        "r2": float(r2)
    }

def logarithmic_regression(df):
    df_before = df.copy()
    df, report = preprocess_data(df, "logarithmic")

    # --- CLEAN DATA REPORT ---
    clean_data_report = []
    clean_data_report.append(f"Jumlah data awal: {len(df_before)}")
    clean_data_report.append(f"Data X <= 0 yang dihapus: {len(df_before[df_before['X'] <= 0])}")
    clean_data_report.append(f"Jumlah data setelah preprocessing: {len(df)}")
    clean_data_report.append(f"Total data dibuang: {len(df_before) - len(df)}")

    # --- CLEANED DATA UNTUK DIAGRAM ---
    cleaned_data = df.to_dict(orient="records")

    X = df["X"]
    Y = df["Y"]
    lnX = np.log(X)

    n = len(X)
    sumlnX = lnX.sum()
    sumY = Y.sum()
    sumlnX2 = (lnX**2).sum()
    sumlnX_Y = (lnX * Y).sum()

    b = (n * sumlnX_Y - sumlnX * sumY) / (n * sumlnX2 - sumlnX ** 2)
    a = (sumY - b * sumlnX) / n

    # --- HITUNG R² ---
    Y_pred = a + b * lnX
    ss_res = ((Y - Y_pred)**2).sum()
    ss_tot = ((Y - Y.mean())**2).sum()
    r2 = 1 - (ss_res / ss_tot)

    details = [
        f"n = {n}",
        f"Σln(X) = {sumlnX}",
        f"ΣY = {sumY}",
        f"Σln(X)*Y = {sumlnX_Y}",
        f"Σ(lnX)² = {sumlnX2}",
        "",
        "Rumus regresi logaritmik:",
        "b = (nΣlnX*Y – ΣlnXΣY) / (nΣ(lnX)² – (ΣlnX)²)",
        f"b = ({n}*{sumlnX_Y} – {sumlnX}*{sumY}) / ({n}*{sumlnX2} – {sumlnX}²)",
        f"b = {b}",
        "",
        "a = (ΣY – bΣlnX) / n",
        f"a = ({sumY} – {b}*{sumlnX}) / {n}",
        f"a = {a}",
        "",
        f"Persamaan: Y = {a} + {b} ln(X)",
        "",
        f"R² = {r2}"
    ]

    return {
        "model": "logarithmic",
        "a": float(a),
        "b": float(b),
        "equation": f"Y = {a} + {b} ln(X)",
        "preprocessing_report": report,
        "clean_data_report": clean_data_report,
        "cleaned_data": cleaned_data,  # <--- dipakai frontend
        "details": details,
        "r2": float(r2)
    }
