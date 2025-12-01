import numpy as np
import pandas as pd

def preprocess_data(df: pd.DataFrame, model: str):
    report = []

    # --- Normalisasi nama kolom ---
    df.columns = (
        df.columns
        .str.strip()
        .str.replace('\ufeff', '', regex=True)
    )

    # --- Rename kolom pertama & kedua ---
    old_x, old_y = df.columns[0], df.columns[1]
    df = df.rename(columns={old_x: "X", old_y: "Y"})
    report.append(f"Rename kolom '{old_x}', '{old_y}' menjadi X, Y")

    # --- Drop NA ---
    before = len(df)
    df = df.dropna()
    after = len(df)
    if before != after:
        report.append(f"Menghapus {before - after} baris kosong")

    # --- Konversi numerik ---
    before = len(df)
    df = df[pd.to_numeric(df["X"], errors="coerce").notnull()]
    df = df[pd.to_numeric(df["Y"], errors="coerce").notnull()]
    df = df.astype({"X": float, "Y": float})
    after = len(df)
    if before != after:
        report.append(f"Menghapus {before - after} baris non-numerik")

    # --- Validasi khusus logaritmik ---
    if model == "logarithmic":
        zero_count = (df["X"] == 0).sum()
        if zero_count > 0:
            df = df[df["X"] != 0]
            report.append(
                f"Menghapus {zero_count} baris karena X = 0 tidak valid pada regresi logaritmik"
            )

    # --- Sort data ---
    df = df.sort_values("X").reset_index(drop=True)
    report.append("Men-sort data berdasarkan X")

    # --- Remove outlier Z-score > 3 ---
    z = np.abs((df[["X","Y"]] - df[["X","Y"]].mean()) / df[["X","Y"]].std())
    before = len(df)
    df = df[(z < 3).all(axis=1)]
    after = len(df)
    if before != after:
        report.append(f"Menghapus {before - after} baris outlier (Z-score > 3)")

    # --- Normalisasi Min-Max ---
    df["X_norm"] = (df["X"] - df["X"].min()) / (df["X"].max() - df["X"].min())
    df["Y_norm"] = (df["Y"] - df["Y"].min()) / (df["Y"].max() - df["Y"].min())
    report.append("Normalisasi X dan Y dengan Min-Max scaling")

    return df, report
