import { useState } from "react";
import HomePage from "./tab/Home.jsx";
import InputPage from "./tab/Input.jsx";
import OutputPage from "./tab/Output.jsx";
import ProsesPage from "./tab/Proses.jsx";

export default function Index()
{
    const [tab, setTab] = useState(0);
    const [rowData, setRowData] = useState([{ x:0, y:0 }]);
        
    return (
        <div className="flex flex-col gap-8 relative">
            <button type="button" className="fixed right-5 bottom-5 bg-linear-to-br from-primary to-secondary hover:from-secondary hover:to-primary shadow-xl p-4 rounded-full transition-colors duration-600 ease-in-out">
                <i className="bi bi-chat-dots-fill text-white text-4xl" />
            </button>

            <div className="mx-auto mt-12 border-3 border-blue-400 p-8 w-3/4 rounded-3xl shadow-xl flex items-center flex-col bg-white">
                <p className="text-4xl title-font bg-linear-to-r from-primary to-secondary text-transparent bg-clip-text inline-block">Aplikasi Regresi Linear</p>
                <p className="text-center">Analisis hubungan antara dua variabel dengan metode regresi linear - Alat yang mudah digunakan untuk analisis data statistik</p>
            </div>

            <div className="flex justify-around mx-auto w-3/4 px-8 py-4 rounded-3xl shadow-xl border-2 border-white bg-white">
                <button type="button" 
                    className={`baseTab ${tab==0 ? "selectedTab" : ""}`}
                    onClick={()=> { setTab(0); }}
                >
                    <i className="bi bi-house-door-fill mx-1"/>Beranda
                </button>

                <button type="button" 
                    className={`baseTab ${tab==1 ? "selectedTab" : ""}`}
                    onClick={()=> { setTab(1); }}
                >
                    <i className="bi bi-file-arrow-up-fill mx-1"/>Input Data
                </button>

                <button type="button" 
                    className={`baseTab ${tab==2 ? "selectedTab" : ""}`}
                    onClick={()=> { setTab(2); }}
                >
                    <i className="bi bi-calculator mx-1"/>Proses & Hasil
                </button>

                <button type="button" 
                    className={`baseTab ${tab==3 ? "selectedTab" : ""}`}
                    onClick={()=> { setTab(3); }}
                >
                    <i className="bi bi-graph-up mx-1"/>Visualisasi & Export
                </button>
            </div>

            <div>
                {(tab==0 && ( <HomePage /> ))}
                {(tab==1 && ( <InputPage rowData={rowData} setRowData={setRowData} /> ))}
                {(tab==2 && ( <ProsesPage /> ))}
                {(tab==3 && ( <OutputPage /> ))}
            </div>
        </div>
    )
}
