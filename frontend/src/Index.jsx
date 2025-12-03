import { useState } from "react";
import HomePage from "./tab/Home.jsx";
import InputPage from "./tab/Input.jsx";
import OutputPage from "./tab/Output.jsx";
import ProsesPage from "./tab/Proses.jsx";
import ChatPrompt from "./ChatPrompt.jsx";

export default function Index() 
{
    const [tab, setTab] = useState(0);
    const [warningMsg, setWarningMsg] = useState("");

    // Data & Backend
    const [rowData, setRowData] = useState([{ x: 0, y: 0, xEdit:null, yEdit:null }]);
    const [sessionId, setSessionId] = useState(null);
    const [regressionResult, setRegressionResult] = useState(null);
    const [kecermatan, setKecermatan] = useState(4);

    // Chat Prompt
    const [onChat, setChat] = useState(false);

    function applyKecermatan(num) {
        return Number(num).toFixed(kecermatan);
    }

    return (
        <div className="flex flex-col md:gap-8 gap-4 relative">

            {/* Floating Chat Button */}
            <div className="fixed right-2 bottom-2 md:right-5 md:bottom-5 z-20">
                {onChat && (
                    <ChatPrompt 
                        setChat={setChat} 
                        sessionId={sessionId}
                        regressionResult={regressionResult}
                    />
                )}

                {!onChat && (
                    <button 
                        type="button" 
                        className="bg-linear-to-br from-primary to-secondary hover:from-secondary hover:to-primary shadow-xl p-2 px-3 md:px-5 md:py-4 rounded-full transition-colors duration-600 ease-in-out z-20"
                        onClick={() => setChat(true)}
                    >
                        <i className="bi bi-chat-dots-fill text-white text-2xl md:text-4xl" />
                    </button>
                )}
            </div>

            {/* Header */}
            <div className="mx-auto mt-12 border-3 border-blue-400 p-8 w-[90%] md:w-3/4 rounded-3xl shadow-xl flex items-center flex-col bg-white">
                <p className="text-3xl md:text-6xl title-font bg-linear-to-r from-primary to-secondary text-transparent bg-clip-text inline-block text-center">
                    Aplikasi Regresi Linear
                </p>
                <p className="text-center text-[0.75rem] md:text-xl">
                    Analisis hubungan antara dua variabel dengan metode regresi linear - 
                    Alat yang mudah digunakan untuk analisis data statistik
                </p>
            </div>

            {/* Tabs */}
            <div className="flex justify-around mx-auto w-[90%] md:w-3/4 px-8 py-4 rounded-3xl shadow-xl border-2 border-white bg-white flex-wrap text-[0.75rem] md:text-xl gap-x-8">
                
                <button type="button"
                    className={`baseTab ${tab === 0 ? "selectedTab" : ""}`}
                    onClick={() => setTab(0)}
                >
                    <i className="bi bi-house-door-fill mx-1"/> Beranda
                </button>

                <button type="button"
                    className={`baseTab ${tab === 1 ? "selectedTab" : ""}`}
                    onClick={() => setTab(1)}
                >
                    <i className="bi bi-file-arrow-up-fill mx-1"/> Input Data
                </button>

                <button type="button"
                    className={`baseTab ${tab === 2 ? "selectedTab" : ""}`}
                    onClick={() => setTab(2)}
                >
                    <i className="bi bi-calculator mx-1"/> Proses & Hasil
                </button>

                <button type="button"
                    className={`baseTab ${tab === 3 ? "selectedTab" : ""}`}
                    onClick={() => setTab(3)}
                >
                    <i className="bi bi-graph-up mx-1"/> Visualisasi & Export
                </button>
            </div>

            {/* Page Switch */}
            <div>
                {(tab === 0 && <HomePage setTab={setTab} setWarningMsg={setWarningMsg} />)}

                {(tab === 1 && (
                    <InputPage
                        rowData={rowData}
                        setRowData={setRowData}
                        setSessionId={setSessionId}
                        setRegressionResult={setRegressionResult}
                        warningMsg={warningMsg}
                        setWarningMsg={setWarningMsg}
                        kecermatan={kecermatan}
                        setKecermatan={setKecermatan}
                        setTab={setTab}
                        applyKecermatan={applyKecermatan}
                    />
                ))}

                {(tab === 2 && (
                    <ProsesPage
                        sessionId={sessionId}
                        regressionResult={regressionResult}
                        setRegressionResult={setRegressionResult}
                        kecermatan={kecermatan}
                        applyKecermatan={applyKecermatan}
                    />
                ))}

                {(tab === 3 && (
                    <OutputPage regressionResult={regressionResult} />
                ))}
            </div>

        </div>
    );
}
