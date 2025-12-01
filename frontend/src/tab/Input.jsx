import { useState } from 'react';

export default function InputPage({ rowData, setRowData, setRegressionResult, setSessionId }) {
    const [colDef, setColDef] = useState({ x: "Nilai X", y: "Nilai Y" });
    const [modelType, setModelType] = useState("linear");
    const [selectedFile, setSelectedFile] = useState(null);
    const API_URL = "http://127.0.0.1:8000/api";

    // ==========================
    // 🔥 FUNGSI UPLOAD FILE CSV/XLSX
    // ==========================
    const handleUploadFile = async () => {
        if (!selectedFile) {
            alert("Pilih file CSV atau XLSX terlebih dahulu!");
            return;
        }

        const allowed = ["text/csv", 
                         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];

        if (!allowed.includes(selectedFile.type)) {
            alert("Hanya file CSV atau XLSX yang didukung!");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await fetch(`${API_URL}/upload/`, {
                method: "POST",
                body: formData
            });

            const result = await response.json();

            if (!response.ok) {
                alert(result.detail || "Upload file gagal");
                return;
            }

            const sessionId = result.session_id;
            setSessionId(sessionId);

            // Setelah upload → otomatis hitung regresi
            const regResp = await fetch(`${API_URL}/regression/${modelType}?session_id=${sessionId}`);
            const regData = await regResp.json();

            if (!regResp.ok) {
                alert(regData.detail || "Gagal menghitung regresi");
                return;
            }

            setRegressionResult(regData);
            alert("Upload & perhitungan regresi berhasil!");

        } catch (err) {
            console.error(err);
            alert("Terjadi error saat upload file.");
        }
    };

    // ==========================
    // 🔥 FUNGSI PROSES INPUT MANUAL
    // ==========================
    const handleProcess = async () => {
        try {
            if (rowData.length < 2) {
                alert("Minimal harus ada 2 pasang data!");
                return;
            }

            const dataToSend = rowData.map(item => ({
                X: Number(item.x),
                Y: Number(item.y)
            }));

            const uploadResp = await fetch(`${API_URL}/upload/json`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ data: dataToSend })
            });

            const uploadData = await uploadResp.json();
            if (!uploadResp.ok) {
                alert(uploadData.detail || "Upload JSON gagal");
                return;
            }

            const sessionId = uploadData.session_id;
            setSessionId(sessionId);

            const regResp = await fetch(`${API_URL}/regression/${modelType}?session_id=${sessionId}`);
            const regResult = await regResp.json();
            if (!regResp.ok) {
                alert(regResult.detail || "Gagal menghitung regresi");
                return;
            }

            setRegressionResult(regResult);
        } catch (err) {
            console.error(err);
            alert("Terjadi error ketika memproses data.");
        }
    };

    return (
        <div className="w-[90%] md:w-3/4 mx-auto flex flex-wrap md:flex-nowrap gap-4 md:gap-8 mb-12">

            {/* BAGIAN INPUT MANUAL */}
            <div className="w-full bg-white flex flex-col rounded-3xl p-4 px-8 shadow-xl border-2 border-secondary border-t-8">

                <div className="flex items-center gap-2 mb-4">
                    <i className="bi bi-table text-white bg-secondary py-2 px-3 text-[0.75rem] md:text-xl rounded-xl" />
                    <p className="font-bold text-xl md:text-2xl">Input Manual</p>
                </div>

                {/* Label Variabel */}
                <div className='flex gap-2 text-[1rem] md:text-xl flex-wrap md:flex-nowrap mb-4'>
                    {["x", "y"].map((col) => (
                        <div key={col} className='w-full bg-gradient-to-br from-white to-secondary/20 rounded-xl p-4 shadow-md'>
                            <p>Label Variabel {col.toUpperCase()}</p>
                            <input
                                type="text"
                                className='rounded-xl py-2 px-4 bg-white shadow-xl mt-2 w-full'
                                placeholder={col === "x" ? "Misal: Jam Belajar" : "Misal: Nilai Ujian"}
                                onChange={(e) => setColDef(prev => ({ ...prev, [col]: e.target.value }))}
                            />
                        </div>
                    ))}
                </div>

                {/* Tabel Data */}
                <div className='text-[1rem] md:text-2xl mb-8'>
                    <div className='flex font-semibold'>
                        <div className='w-1/12'>No.</div>
                        <div className='w-5/12'>{colDef.x}</div>
                        <div className='w-5/12'>{colDef.y}</div>
                    </div>

                    {rowData.map((data, key) => (
                        <div className='flex gap-2 my-2' key={key}>
                            <div className='w-1/12 py-2'>{key + 1}</div>
                            <input
                                type="number"
                                className='w-5/12 shadow-xl rounded-xl py-2 px-4 bg-white'
                                value={data.x}
                                onChange={(e) => setRowData(prev => {
                                    const c = [...prev];
                                    c[key].x = Number(e.target.value);
                                    return c;
                                })}
                            />
                            <input
                                type="number"
                                className='w-5/12 shadow-xl rounded-xl py-2 px-4 bg-white'
                                value={data.y}
                                onChange={(e) => setRowData(prev => {
                                    const c = [...prev];
                                    c[key].y = Number(e.target.value);
                                    return c;
                                })}
                            />
                        </div>
                    ))}
                </div>

                {/* Tombol tambah hapus */}
                <div className='flex items-center gap-4 text-white font-bold text-[1rem] md:text-xl mb-4'>
                    <button
                        type="button"
                        className='w-full bg-success p-2 rounded-xl shadow-[0_0_16px] shadow-success/50'
                        onClick={() => setRowData(prev => [...prev, { x: 0, y: 0 }])}
                    >
                        + Tambah Baris
                    </button>

                    <button
                        type="button"
                        className='w-full bg-danger p-2 rounded-xl shadow-[0_0_16px] shadow-danger/50'
                        onClick={() => setRowData(prev => prev.slice(0, -1))}
                    >
                        <i className='bi bi-trash3-fill mr-1' />Hapus Baris
                    </button>
                </div>

                {/* Pilihan regresi */}
                <div className="flex justify-center my-4">
                    <div className="flex gap-6 bg-secondary/10 border-2 border-secondary rounded-2xl py-3 px-6 shadow-md text-[1rem] md:text-xl">
                        {["linear", "logarithmic"].map((type) => (
                            <label key={type} className="flex items-center gap-2 cursor-pointer font-semibold text-secondary">
                                <input
                                    type="radio"
                                    name="regression-type"
                                    value={type}
                                    checked={modelType === type}
                                    onChange={() => setModelType(type)}
                                    className="w-5 h-5 accent-secondary cursor-pointer"
                                />
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Button Proses Manual */}
                <button
                    type="button"
                    className='text-white font-bold text-[1rem] md:text-xl w-full bg-success p-2 rounded-xl shadow-[0_0_16px] shadow-success/50 my-4'
                    onClick={handleProcess}
                >
                    <i className='bi bi-calculator-fill mr-1' />Proses Data & Hitung Regresi
                </button>

                {/* ==========================
                    🔥 NEW — UPLOAD CSV/XLSX
                ========================== */}
                <div className="bg-blue-100 border-blue-400 border-2 rounded-2xl p-4 mt-6">
                    <p className="font-bold text-xl mb-2">Upload CSV / XLSX</p>

                    <input
                        type="file"
                        accept=".csv, .xlsx"
                        className="w-full bg-white rounded-xl p-3 shadow"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                    />

                    <button
                        onClick={handleUploadFile}
                        className="w-full bg-primary text-white text-xl font-bold py-2 rounded-xl shadow mt-4"
                    >
                        <i className="bi bi-upload mr-1"></i>
                        Upload & Hitung Regresi
                    </button>
                </div>
            </div>

            {/* Validasi Data */}
            <div className="flex flex-col w-1/3 gap-4 md:gap-8 grow">
                <div className='bg-[#AEDEFC] p-4 rounded-3xl text-primary-dark border-primary-dark border-2 text-[0.85rem] md:text-xl'>
                    <div className='flex gap-2 mb-2'>
                        <i className='bi bi-info-circle-fill' />
                        <p className='font-bold'>Validasi Data</p>
                    </div>
                    <ul className='list-disc pl-6'>
                        <li>Minimal 2 Pasang data (X, Y)</li>
                        <li>Hanya nilai numerik yang diterima</li>
                        <li>Pastikan tidak ada data kosong</li>
                        <li>Mendukung upload CSV & XLSX</li>
                    </ul>
                </div>
            </div>

        </div>
    );
}
