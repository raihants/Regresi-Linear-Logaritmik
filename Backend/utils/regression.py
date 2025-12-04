import numpy as np

def linear_regression(df, preprocessing_report=""):
    df_before = df.copy()

    report = preprocessing_report

    clean_data_report = []
    clean_data_report.append(f"Total Data yang terbaca: {len(df_before)}")
    clean_data_report.append(f"Total Data setelah dibersihkan: {len(df)}")
    clean_data_report.append(f"Total Data yang dihapus: {len(df_before) - len(df)}")

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

    r = ((n * sumXY) - (sumX * sumY)) / (np.sqrt((n * sumX2 - sumX**2) * (n * sumY2 - sumY**2)))
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
        "preprocessing_report": report,
        "clean_data_report": clean_data_report,
        "cleaned_data": cleaned_data,
        "details": details,
        "n" : {n},
        "sumX" : {sumX},
        "sumY" : {sumY},
        "sumXY" : {sumXY},
        "sumX2" : {sumX2},
        "sumY2" : {sumY2},
        "r": float(r),
        "r2": float(r2)
    }


def logarithmic_regression(df, preprocessing_report=""):
    df_before = df.copy()
    report = preprocessing_report

    clean_data_report = []
    clean_data_report.append(f"Total Data yang terbaca: {len(df_before)}")
    clean_data_report.append(f"Total Data setelah dibersihkan: {len(df)}")
    clean_data_report.append(f"Total Data yang dihapus: {len(df_before) - len(df)}")

    cleaned_data = df.to_dict(orient="records")

    X_original = df["X"] # Epsilon
    Y_original = df["Y"] # Sigma

    # Model: Sigma = k * Epsilon^n  ->  Log(Sigma) = Log(k) + n * Log(Epsilon)
    logX = np.log10(X_original)
    logY = np.log10(Y_original)

    n_data = len(df)
    sum_logX = logX.sum()
    sum_logY = logY.sum()
    sum_logX2 = (logX**2).sum()
    sum_logY2 = (logY**2).sum()       # Dibutuhkan untuk hitung korelasi (r)
    sum_logXY = (logX * logY).sum()

    # Hitung Slope (n) dan Intercept (a = log k)
    # Rumus Slope (n)    
    n_slope = ((n_data * sum_logXY) - (sum_logX * sum_logY)) / ((n_data * sum_logX2) - (sum_logX**2))  # Ini adalah nilai 'n'
    
    # Rumus Intercept (log k) atau sering disebut alpha dalam regresi linear
    log_k = (sum_logY - (n_slope * sum_logX)) / n_data
    
    # Hitung nilai K asli (antilog)
    k_value = 10**log_k

    # 5. Hitung Korelasi (r)
    r = ((n_data * sum_logXY) - (sum_logX * sum_logY)) / np.sqrt(((n_data * sum_logX2) - (sum_logX**2)) * ((n_data * sum_logY2) - (sum_logY**2)))
    r2 = r**2

    # Detail perhitungan untuk ditampilkan
    # Diperbarui untuk menampilkan dua bentuk persamaan
    details = [
        f"n (Jumlah Data) = {n_data}",
        f"Σ Log X  = {sum_logX:.4f}",
        f"Σ Log Y  = {sum_logY:.4f}",
        f"Σ Log X * Log Y = {sum_logXY:.4f}",
        f"Σ (Log X)^2 = {sum_logX2:.4f}",
        "",
        f"Slope (n) = {n_slope:.5f}",
        f"Intercept (Log k / Alpha) = {log_k:.5f}",
        f"Konstanta (k) = {k_value:.5f}",
        "",
        "--- HASIL PERSAMAAN ---",
        f"1. Bentuk Linear: Log(Y) = {log_k:.4f} + {n_slope:.4f} * Log(X)",
        f"2. Bentuk Pangkat: Y = {k_value:.4f} * X^{n_slope:.4f}",
        "",
        f"Korelasi (r) = {r:.5f}",
        f"R² = {r2:.5f}"
    ]

    return {
        "model": "logarithmic",
        "n": float(n_slope),
        "k": float(k_value),
        "log_k": float(log_k), # Ini adalah intercept (alpha) pada regresi linear
        
        # Output dua string persamaan agar bisa dipilih
        "equation_log": f"Log(Y) = {log_k:.4f} + {n_slope:.4f} * Log(X)",
        "equation": f"Y = {k_value:.4f} * X^{n_slope:.4f}",
        
        "preprocessing_report": report,
        "clean_data_report": clean_data_report,
        "cleaned_data": cleaned_data,
        "details": details,
        "r2": float(r2),
        "sumX" : {sum_logX},
        "sumY" : {sum_logY},
        "sumXY" : {sum_logXY},
        "sumX2" : {sum_logX2},
        "sumY2" : {sum_logY2},
        "r": float(r)

    }
