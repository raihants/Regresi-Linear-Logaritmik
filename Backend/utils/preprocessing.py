import numpy as np
import pandas as pd

def preprocess_data(df: pd.DataFrame, model: str):
    report = []
    df_raw = df.copy()  # simpan data asli untuk hitung data hapus

    # --- Normalisasi nama kolom ---
    df.columns = (
        df.columns
        .str.strip()
        .str.replace('\ufeff', '', regex=True)
    )

    # --- Rename kolom pertama ---
    old_x, old_y = df.columns[0], df.columns[1]
    df = df.rename(columns={old_x: "X", old_y: "Y"})
    report.append(f"Rename kolom '{old_x}', '{old_y}' menjadi X, Y")

    # --- Hapus NA ---
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

    # --- Logarithmic: X tidak boleh 0 ---
    if model == "logarithmic":
        # X tidak boleh 0 atau negatif
        invalid_x = ((df["X"] <= 0)).sum()
        df = df[df["X"] > 0]

        # Y juga tidak boleh 0 atau negatif
        invalid_y = ((df["Y"] <= 0)).sum()
        df = df[df["Y"] > 0]

        if invalid_x > 0:
            report.append(f"Menghapus {invalid_x} baris (X <= 0 tidak valid untuk logaritmik)")
        if invalid_y > 0:
            report.append(f"Menghapus {invalid_y} baris (Y <= 0 tidak valid untuk logaritmik)")

        # --- Sort ---
        df = df.sort_values("X").reset_index(drop=True)
        report.append("Men-sort data berdasarkan X")

    # --- Outlier Z-score ---
    before = len(df)
    z = np.abs((df[["X","Y"]] - df[["X","Y"]].mean()) / df[["X","Y"]].std())
    df = df[(z < 3).all(axis=1)]
    after = len(df)
    if before != after:
        report.append(f"Menghapus {before - after} outlier (Z > 3)")

    # --- Normalisasi ---
    df["X_norm"] = (df["X"] - df["X"].min()) / (df["X"].max() - df["X"].min())
    df["Y_norm"] = (df["Y"] - df["Y"].min()) / (df["Y"].max() - df["Y"].min())
    report.append("Normalisasi Min-Max pada X dan Y")

    # --- Rekap bersih ---
    total_awal = len(df_raw)
    total_akhir = len(df)
    clean_data_report = [
        f"data masuk: {total_awal}",
        f"data tampil: {total_akhir}",
        f"data hapus: {total_awal - total_akhir}"
    ]

    return df, report, clean_data_report