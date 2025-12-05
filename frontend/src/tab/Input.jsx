import { useEffect, useRef, useState } from 'react';
import Papa from "papaparse";
import * as XLSX from "xlsx";
import KecermatanSettings from '../components/kecermatanSettings.jsx';

export default function InputPage({ rowData, setRowData, setRegressionResult, setSessionId, warningMsg, setWarningMsg, kecermatan, setKecermatan, setTab, colDef, setColDef, modelType, setModelType, ...props }) {
    const API_URL = "https://api.reglab.cyou/api";
    const fileRef = useRef(null);

    const [warningTimer, setWarningTimer] = useState(5);

    useEffect(() => {
        if (warningMsg == "")
            return;

        if (warningTimer <= 0) {
            setWarningMsg("");
            return;
        }

        const interval = setInterval(() => {
            setWarningTimer((t) => t - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [warningTimer]);

    const handleInputFunction = () => {
        if (fileRef == null)
            return;

        fileRef.current.click();
    }

    const handleCSVfile = (file) => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                processData(results.data);
            },
        });
    }

    const handleXLSXfile = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });

            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const json = XLSX.utils.sheet_to_json(sheet);

            processData(json);
        };
        reader.readAsArrayBuffer(file);
    }

    const processData = (rawData) => {
        if (!rawData || rawData.length === 0) return;

        const cols = Object.keys(rawData[0]);

        // ambil 2 kolom pertama apapun namanya
        const xCol = cols[0];
        const yCol = cols[1];

        // simpan nama kolom
        setColDef({ x: xCol, y: yCol });

        // convert rawData ke format [{X:?,Y:?}]
        const parsed = rawData.map((row) => ({
            x: Number(row[xCol]) || 0,
            y: Number(row[yCol]) || 0,
            xEdit: null, 
            yEdit: null
        }));

        setRowData(parsed);
    }

    const handleSetInputData = (file) => {
        if (!file) return;

        const name = file.name.toLowerCase();

        if (name.endsWith(".csv")) {
            handleCSVfile(file);
        } else if (name.endsWith(".xlsx") || name.endsWith(".xls")) {
            handleXLSXfile(file);
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();

        const files = e.dataTransfer.files;
        if (!files || files.length === 0) return;

        // Create DataTransfer so input accepts files
        const dataTransfer = new DataTransfer();
        for (let i = 0; i < files.length; i++) {
            dataTransfer.items.add(files[i]);
        }

        fileRef.current.files = dataTransfer.files;

        // trigger onChange
        fileRef.current.dispatchEvent(new Event("change", { bubbles: true }))
        console.log(fileRef.current.files[0].name);
    };

    {/* NOTE: Upload rowData to Python */}
    const handleProcess = async () => {
        try {
            if (rowData.length < 2) {
                props.setErrorMsg("Minimal ada 2 baris data pada tabel!");
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
                props.setErrorMsg(uploadData.detail || "Upload JSON gagal");
                return;
            }

            const sessionId = uploadData.session_id;
            setSessionId(sessionId);

            const regResp = await fetch(`${API_URL}/regression/${modelType}?session_id=${sessionId}`);
            const regResult = await regResp.json();
            if (!regResp.ok) {
                props.setErrorMsg(regResult.detail || "Gagal menghitung regresi");
                return;
            }

            setRegressionResult(regResult);
            window.scrollTo(0, 0);
            setTab(2);
        } catch (err) {
            console.error(err);
            props.setErrorMsg("Terjadi error ketika memproses data.");
        }
    };

    return (
        <div className='w-[90%] md:w-3/4 mx-auto flex flex-col'>
            {/* NOTE: warning message */}
            {warningMsg != "" && (
                <div className='bg-warning-light/10 w-full mb-8 p-6 text-warning-dark border-warning border-2 rounded-3xl font-bold text-xl'>
                    <p>{warningMsg}</p>
                </div>
            )}

            <div className='w-full flex flex-wrap md:flex-nowrap gap-4 md:gap-8 mb-12'>
                {/* NOTE: BAGIAN INPUT MANUAL */}
                <div className="w-full bgt flex flex-col rounded-3xl p-4 px-8 shadow-xl border-2 border-secondary/50 border-t-8 glow">

                    <div className="flex items-center gap-2 mb-4">
                        <i className="bi bi-table text-white bg-secondary py-2 px-3 text-[0.75rem] md:text-xl rounded-xl glow" />
                        <p className="font-bold text-xl md:text-2xl">Input Data</p>
                    </div>

                    {/* NOTE: Setting */}
                    <div className="flex gap-8 text-[1rem] md:text-xl flex-wrap md:flex-nowrap my-3 bgt2 p-4 rounded-xl font-bold glow">
                        <div className='flex flex-col gap-2 '>
                            <p>Tipe Regresi</p>
                            <div className='rounded-xl py-2 px-4 bg-white shadow-xl w-full gap-4 flex text-black'>
                                {["linear", "logarithmic"].map((type) => (
                                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="regression-type"
                                            value={type}
                                            checked={modelType === type}
                                            onChange={() => setModelType(type)}
                                            className="w-5 h-5 accent-black cursor-pointer"
                                        />
                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <div className='flex gap-1'> 
                                <p>Kecermatan</p>
                                <p>{"( 0." + "0".repeat(kecermatan) + " )"}</p>
                            </div>
                            <div className='rounded-xl py-2 px-4 bg-white shadow-xl w-fit text-black'>
                                <KecermatanSettings kecermatan={kecermatan} setKecermatan={setKecermatan} />
                            </div>
                        </div>
                    </div>

                    {/* Label Variabel */}
                    <div className='flex gap-2 text-[1rem] md:text-xl flex-wrap md:flex-nowrap mb-4'>
                        {["x", "y"].map((col) => (
                            <div key={col} className='w-full bgt2 rounded-xl p-4 shadow-md glow'>
                                <p>Label Variabel {col.toUpperCase()}</p>
                                <input
                                    type="text"
                                    className='rounded-xl py-2 px-4 bg-white shadow-xl mt-2 w-full  text-black'
                                    placeholder={col === "x" ? "Misal: Jam Belajar" : "Misal: Nilai Ujian"}
                                    onChange={(e) => setColDef(prev => ({ ...prev, [col]: e.target.value }))}
                                    value={colDef[col]}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Tabel Data */}
                    <div className='text-[1rem] md:text-2xl mb-8 bgt2 glow rounded-xl p-4'>
                        <div className='flex font-semibold'>
                            <div className='w-1/12 text-center'>No.</div>
                            <div className='w-5/12'>{colDef.x}</div>
                            <div className='w-5/12'>{colDef.y}</div>
                        </div>

                        {rowData.map((data, key) => (
                            <div className='flex gap-2 my-2 ' key={key}>
                                <div className='w-1/12 py-2 text-center '>{key + 1}</div>
                                <input
                                    type="text"
                                    className='w-5/12 shadow-xl rounded-xl py-2 px-4 bg-white text-black'
                                    value={data.xEdit!==null ? data.xEdit : props.applyKecermatan(data.x)}
                                    onChange={(e) => {
                                        setRowData(prev => {
                                            const c = [...prev];
                                            c[key].xEdit = e.target.value; 
                                            return c;
                                        });
                                    }}
                                    onBlur={()=> {
                                        setRowData(prev => {
                                            const copy = [...prev];

                                            // only update real number if user typed something
                                            if (copy[key].xEdit !== null) {
                                                const num = Number(copy[key].xEdit);
                                                copy[key].x = num;
                                                copy[key].xEdit = null;     // exit edit mode
                                            }

                                            return copy; 
                                        });
                                    }}
                                />
                                <input
                                    type="number"
                                    className='w-5/12 shadow-xl rounded-xl py-2 px-4 bg-white text-black'
                                    value={data.yEdit!==null ? data.yEdit : props.applyKecermatan(data.y)}
                                    onChange={(e) => {
                                        setRowData(prev => {
                                            const c = [...prev];
                                            c[key].yEdit = e.target.value; 
                                            return c;
                                        });
                                    }}
                                    onBlur={()=> {
                                        setRowData(prev => {
                                            const copy = [...prev];

                                            if (copy[key].yEdit !== null) {
                                                const num = Number(copy[key].yEdit);
                                                copy[key].y = num;
                                                copy[key].yEdit = null;
                                            }

                                            return copy; 
                                        });
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Tombol tambah hapus */}
                    <div className='flex items-center gap-4 text-white font-bold text-[1rem] md:text-xl mb-4'>
                        <button
                            type="button"
                            className='w-full bg-success p-2 rounded-xl shadow-[0_0_16px] shadow-success/50 glow-green'
                            onClick={() => setRowData(prev => [...prev, { x: 0, y: 0 }])}
                        >
                            + Tambah Baris
                        </button>

                        <button
                            type="button"
                            className='w-full bg-danger p-2 rounded-xl shadow-[0_0_16px] shadow-danger/50 glow-red'
                            onClick={() => setRowData(prev => prev.slice(0, -1))}
                        >
                            <i className='bi bi-trash3-fill mr-1' />Hapus Baris
                        </button>
                    </div>

                    {/* Button Proses Manual */}
                    <button
                        type="button"
                        className='text-white font-bold text-xl md:text-2xl w-full bg-success p-4 rounded-xl shadow-[0_0_16px] shadow-success/50 my-4 glow-green'
                        onClick={handleProcess}
                    >
                        <i className='bi bi-calculator-fill mr-1' />Proses Data & Hitung Regresi
                    </button>
                </div>

                {/* Validasi Data */}
                <div className="flex flex-col w-full md:w-1/3 gap-4 md:gap-8 grow">

                    <div className="bg-white flex flex-col rounded-3xl p-4 px-8 shadow-xl border-2 border-success border-t-8" onDragOver={handleDragOver} onDrop={handleDrop}>
                        <div className="flex items-center gap-2">
                            <i className="bi bi-filetype-csv text-white bg-success py-2 px-3 text-xl rounded-xl"/>
                            <p className="font-bold text-xl md:text-2xl">Import File CSV / XLSX </p>
                        </div>

                        <div className='mx-auto mt-16 mb-8 hidden md:flex flex-col items-center text-center' onClick={handleInputFunction}>
                            <i className='bi bi-cloud-upload-fill font-bold text-8xl' />
                            <p className='text-xl'>Klik atau drag file CSV/XLSX di sini</p>
                            <p>Format : Kolom X, Kolom Y</p>
                        </div>

                        <input
                            type="file"
                            accept=".csv, .xlsx"
                            className="hidden"
                            ref={fileRef}
                            onChange={(e) => handleSetInputData(e.target.files[0])}
                        />

                        <button
                            onClick={handleInputFunction}
                            className="w-full bg-success text-white text-xl font-bold py-2 rounded-xl shadow mt-4"
                            type="button"
                        >Pilih File CSV / XLSX</button>
                    </div>

                    <div className='bg-[#AEDEFC] p-4 rounded-3xl text-primary-dark border-primary-dark border-2 text-[0.85rem] md:text-xl'>
                        <div className='flex gap-2 mb-2'>
                            <i className='bi bi-info-circle-fill' />
                            <p className='font-bold'>Validasi Data</p>
                        </div>
                        <ul className='list-disc pl-6'>
                            <li>Minimal 2 Pasang data (X, Y [nama nya bebas])</li>
                            <li>Hanya nilai numerik yang diterima</li>
                            <li>Pastikan tidak ada data kosong</li>
                            <li>Mendukung upload CSV & XLSX</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );

    {/* HACK: cadangan kode bisi kepake 

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


    */}
}
