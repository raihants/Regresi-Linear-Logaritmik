import numpy as np

def linear_regression(df, preprocessing_report):
    df_before = df.copy()

    # gunakan report dari preprocess di routes
    report = preprocessing_report

    clean_data_report = []
    clean_data_report.append(f"Jumlah data awal: {len(df_before)}")
    clean_data_report.append(f"Jumlah data setelah preprocessing: {len(df)}")
    clean_data_report.append(f"Data yang dihapus: {len(df_before) - len(df)}")

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
        f"Persamaan: Y = {a} + {b}X",
        f"R² = {r2}"
    ]

    return {
        "model": "linear",
        "a": float(a),
        "b": float(b),
        "equation": f"Y = {a} + {b}X",
        "preprocessing_report": report,
        "clean_data_report": clean_data_report,
        "cleaned_data": cleaned_data,
        "details": details,
        "r2": float(r2)
    }


def logarithmic_regression(df, preprocessing_report):
    df_before = df.copy()

    report = preprocessing_report

    clean_data_report = []
    clean_data_report.append(f"Jumlah data awal: {len(df_before)}")
    clean_data_report.append(f"Jumlah data setelah preprocessing: {len(df)}")
    clean_data_report.append(f"Total data dibuang: {len(df_before) - len(df)}")

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
        "cleaned_data": cleaned_data,
        "details": details,
        "r2": float(r2)
    }
