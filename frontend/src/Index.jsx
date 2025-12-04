import { useEffect, useState } from "react";
import HomePage from "./tab/Home.jsx";
import InputPage from "./tab/Input.jsx";
import OutputPage from "./tab/Output.jsx";
import ProsesPage from "./tab/Proses.jsx";
import ChatPrompt from "./ChatPrompt.jsx";

export default function Index() 
{
    const [tab, setTab] = useState(0);
    const [warningMsg, setWarningMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    // Data & Backend
    const [rowData, setRowData] = useState([{ x: 0, y: 0, xEdit:null, yEdit:null }]);
    const [colDef, setColDef] = useState({ x: "Nilai X", y: "Nilai Y" });
    const [modelType, setModelType] = useState("linear");
    const [sessionId, setSessionId] = useState(null);
    const [regressionResult, setRegressionResult] = useState(null);
    const [kecermatan, setKecermatan] = useState(4);
    
    const [onChat, setChat] = useState(false);
    const [notification, setNotification] = useState(true);

    function applyKecermatan(num) {
        return Number(num).toFixed(kecermatan);
    }
    
    useEffect(() => {
        if (errorMsg != "")
        {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [errorMsg]);

    return (
        <div className="flex flex-col md:gap-8 gap-4 relative">
            {/* NOTE: Error Pop-up*/}
            {errorMsg!="" && (
                <div className="fixed top-0 left-0 w-full h-screen bg-black/20 z-20">
                    <div className="bg-red-200 px-12 md:px-24 py-12 mx-auto w-fit mt-[32%] md:mt-[12%] text-red-900 rounded-3xl flex flex-col gap-4 items-center text-center shadow-xl border-2 border-t-8 border-red-900">
                        <img src="/cancel.png" className="w-24 md:w-32 my-6 mx-auto"/>
                        <p className="text-xl md:text-2xl font-bold -mb-6">ERROR</p>
                        <p className="text-[0.85rem] md:text-xl">{errorMsg}</p>
                        <button type="button" className="bg-red-900 text-white hover:bg-white hover:text-red-900 rounded-xl w-full py-2 px-4 font-bold duration-300 ease-in-out transition-colors" onClick={()=> setErrorMsg("")}>ok</button>
                    </div>
                </div>
            )}

            {/* NOTE: Floating Chat Button */}
            {regressionResult!=null && (
                <div className="fixed right-2 bottom-2 md:right-5 md:bottom-5 z-20 flex flex-col">
                    {onChat && (
                        <ChatPrompt 
                            setChat={setChat} 
                            sessionId={sessionId}
                            regressionResult={regressionResult}
                        />
                    )}

                    {!onChat && (
                        <>
                            {notification && (
                                <div className="bg-white p-6 pr-12 rounded-3xl w-1/3 ml-auto my-4 text-justify rounded-br-none relative shadow-xl text-xl">
                                    <p>Apakah ada yang anda ingin tanyakan?, tekan tombol chat dibawah untuk bertanya!</p>
                                    <button type="button" onClick={()=> setNotification(false)} className="text-gray-400 absolute top-2 right-2 text-[1rem] bg-gray-300 px-2.5 py-1 rounded-full hover:bg-red-300 hover:text-red-600 duration-300 ease-in-out transition-colors">X</button>
                                </div>
                            )}
                            <button 
                                type="button" 
                                className="bg-linear-to-br from-primary to-secondary hover:from-secondary hover:to-primary shadow-xl p-2 px-3 md:px-5 md:py-4 rounded-full transition-colors duration-600 ease-in-out z-20 w-fit ml-auto"
                                onClick={() => setChat(true)}
                            >
                                <i className="bi bi-chat-dots-fill text-white text-2xl md:text-4xl" />
                            </button>
                        </>
                    )}
                </div>
            )}

            {/* Header */}
            <div className="mx-auto mt-12 border-3 border-blue-400 p-8 w-[90%] md:w-3/4 rounded-3xl shadow-xl flex items-center flex-col bg-white">
                <p className="text-3xl md:text-6xl/24 title-font bg-linear-to-r from-primary to-secondary text-transparent bg-clip-text inline-block text-center">
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
                    className={`baseTab disabled:text-gray-600 ${tab === 2 ? "selectedTab" : ""}`}
                    disabled={regressionResult==null}
                    onClick={() => setTab(2)}
                >
                    <i className="bi bi-calculator mx-1"/> Proses & Hasil
                </button>

                <button type="button"
                    className={`baseTab disabled:text-gray-600 ${tab === 3 ? "selectedTab" : ""}`}
                    disabled={regressionResult==null}
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
                        colDef={colDef}
                        setColDef={setColDef}
                        modelType={modelType}
                        setModelType={setModelType}
                        kecermatan={kecermatan}
                        setKecermatan={setKecermatan}
                        setTab={setTab}
                        applyKecermatan={applyKecermatan}
                        setErrorMsg={setErrorMsg}
                    />
                ))}

                {(tab === 2 && (
                    <ProsesPage
                        sessionId={sessionId}
                        res={regressionResult}
                        setRegressionResult={setRegressionResult}
                        kecermatan={kecermatan}
                        setKecermatan={setKecermatan}
                        kec={applyKecermatan}
                        setTab={setTab}
                        colDef={colDef}
                    />
                ))}

                {(tab === 3 && (
                    <OutputPage 
                        regressionResult={regressionResult}  
                        colDef={colDef}
                        sessionId={sessionId}
                        applyKecermatan={applyKecermatan}
                    />
                ))}
            </div>

        </div>
    );
}
