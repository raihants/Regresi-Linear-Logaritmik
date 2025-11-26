import numpy as np
from utils.preprocessing import preprocess_data

def linear_regression(df):
    df, report = preprocess_data(df, "linear")

    X = df["X"]
    Y = df["Y"]

    n = len(X)
    sumX = X.sum()
    sumY = Y.sum()
    sumXY = (X * Y).sum()
    sumX2 = (X**2).sum()

    b = (n * sumXY - sumX * sumY) / (n * sumX2 - (sumX ** 2))
    a = (sumY - b * sumX) / n

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
        f"Persamaan: Y = {a} + {b}X"
    ]

    return {
        "model": "linear",
        "a": float(a),
        "b": float(b),
        "equation": f"Y = {a} + {b}X",
        "preprocessing_report": report,
        "details": details
    }



def logarithmic_regression(df):
    df, report = preprocess_data(df, "logarithmic")

    X = df["X"]
    Y = df["Y"]
    lnX = np.log(X)

    n = len(X)
    sumlnX = lnX.sum()
    sumY = Y.sum()
    sumlnX2 = (lnX**2).sum()
    sumlnX_Y = (lnX * Y).sum()

    b = (n * sumlnX_Y - sumlnX * sumY) / (n * sumlnX2 - (sumlnX ** 2))
    a = (sumY - b * sumlnX) / n

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
        f"Persamaan: Y = {a} + {b} ln(X)"
    ]

    return {
        "model": "logarithmic",
        "a": float(a),
        "b": float(b),
        "equation": f"Y = {a} + {b} ln(X)",
        "preprocessing_report": report,
        "details": details
    }
