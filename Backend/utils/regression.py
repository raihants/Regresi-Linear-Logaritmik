import numpy as np

def linear_regression(df, preprocessing_report=None, clean_data_report=None):
    if preprocessing_report is None:
        preprocessing_report = []
    if clean_data_report is None:
        clean_data_report = []

    cleaned_data = df.to_dict(orient="records")

    X = df["X"]
    Y = df["Y"]

    n = len(X)
    sumX = X.sum()
    sumY = Y.sum()
    sumXY = (X * Y).sum()
    sumX2 = (X**2).sum()
    sumY2 = (Y**2).sum()

    b = ((n * sumXY) - (sumX * sumY)) / ((n * sumX2) - (sumX ** 2))
    a = (sumY - (b * sumX)) / n

    r = ((n * sumXY) - (sumX * sumY)) / np.sqrt((n * sumX2 - sumX**2) * (n * sumY2 - sumY**2))
    r2 = r**2

    details = [
        f"n = {n}",
        f"ΣX = {sumX}",
        f"ΣY = {sumY}",
        f"ΣXY = {sumXY}",
        f"ΣX^2 = {sumX2}",
        f"ΣY^2 = {sumY2}",
        f"Persamaan: Y = {a} + {b}X",
        f"R = {r}"
    ]

    return {
        "model": "linear",
        "a": float(a),
        "b": float(b),
        "equation": f"Y = {a} + {b}X",
        "preprocessing_report": preprocessing_report,
        "clean_data_report": clean_data_report,
        "cleaned_data": cleaned_data,
        "details": details,
        "n": float(n),
        "sumX": float(sumX),
        "sumY": float(sumY),
        "sumXY": float(sumXY),
        "sumX2": float(sumX2),
        "sumY2": float(sumY2),
        "r": float(r),
        "r2": float(r2)
    }


def logarithmic_regression(df, preprocessing_report=None, clean_data_report=None):
    if preprocessing_report is None:
        preprocessing_report = []
    if clean_data_report is None:
        clean_data_report = []

    cleaned_data = df.to_dict(orient="records")

    X = df["X"]
    Y = df["Y"]

    logX = np.log10(X)
    logY = np.log10(Y)

    n = len(df)
    sum_logX = logX.sum()
    sum_logY = logY.sum()
    sum_logXY = (logX * logY).sum()
    sum_logX2 = (logX**2).sum()
    sum_logY2 = (logY**2).sum()

    n_slope = ((n * sum_logXY) - (sum_logX * sum_logY)) / ((n * sum_logX2) - (sum_logX**2))
    log_k = (sum_logY - (n_slope * sum_logX)) / n
    k_value = 10**log_k

    r = ((n * sum_logXY) - (sum_logX * sum_logY)) / np.sqrt(((n * sum_logX2) - (sum_logX**2)) * ((n * sum_logY2) - (sum_logY**2)))
    r2 = r**2

    details = [
        f"n (Jumlah Data) = {n}",
        f"Σ Log X = {sum_logX:.4f}",
        f"Σ Log Y = {sum_logY:.4f}",
        f"Σ LogX*LogY = {sum_logXY:.4f}",
        f"Σ (LogX)^2 = {sum_logX2:.4f}",
        "",
        f"Slope (n) = {n_slope:.5f}",
        f"Intercept (Log k) = {log_k:.5f}",
        f"Konstanta (k) = {k_value:.5f}",
        "",
        f"Persamaan Linear: Log(Y) = {log_k:.4f} + {n_slope:.4f} * Log(X)",
        f"Persamaan Pangkat: Y = {k_value:.4f} * X^{n_slope:.4f}",
        "",
        f"Korelasi (r) = {r:.5f}",
        f"R² = {r2:.5f}"
    ]

    return {
        "model": "logarithmic",
        "n": float(n_slope),
        "k": float(k_value),
        "log_k": float(log_k),
        "equation": f"Log(Y) = {log_k:.4f} + {n_slope:.4f} * Log(X)",
        "equation_power": f"Y = {k_value:.4f} * X^{n_slope:.4f}",
        "preprocessing_report": preprocessing_report,
        "clean_data_report": clean_data_report,
        "cleaned_data": cleaned_data,
        "details": details,
        "r": float(r),
        "r2": float(r2),
        "sumX": float(sum_logX),
        "sumY": float(sum_logY),
        "sumXY": float(sum_logXY),
        "sumX2": float(sum_logX2),
        "sumY2": float(sum_logY2)
    }
