import { useState } from "react";
import BlurText from "../components/BlurText.jsx";

export default function HomePage({setTab, setWarningMsg}) {
    const [devPage, setDevPage] = useState(0);

    const controlPage = (i) => {
        if (i == 0)
            return;
        if (i > 0) {
            const n = devPage+1; 
            if (n > 2) 
                return;
            setDevPage(n);
        } else 
        if (i < 0) {
            const n = devPage-1;
            if (n < 0)
                return;
            setDevPage(n);
        }
    }

    return(
        <div className="w-[90%] md:w-3/4 mx-auto flex flex-col gap-8 mb-12">
            <div className="bgt bor text-white mx-auto w-full p-8 rounded-3xl flex flex-col relative items-center gap-4 py-20 shadow-xl">
                <BlurText
                    text="Analisis Regresi"
                    delay={300}
                    animateBy="words"
                    direction="top"
                    className="text-5xl md:text-6xl title-font text-center"
                />
                {/*<p className="text-5xl md:text-6xl title-font text-center">Analisis Regresi</p>*/}
                <p className="text-[1rem] md:text-xl w-2/3 text-center">Alat Analisis Data yang mudah digunakan untuk menghitung dan memvisualisasikan hubungan linear antara dua variabel dengan antarmuka yang modern dan intuitif</p>
                <div className="flex gap-6 flex-wrap items-center">
                    {/* NOTE: Start Button and Info Button */}
                    <button type="button" className="bg-linear-to-r from-primary to-secondary hover:from-secondary hover:to-primary shadow-xl py-2 px-6 rounded-lg transition-colors duration-600 ease-in-out mx-auto" onClick={()=> { setTab(1); window.scrollTo(0, 0); }}>
                        <i className="bi bi-play-fill mx-1" />Mulai Analisis</button>
                    <a type="button" className="bg-white/30 shadow-xl py-2 px-6 rounded-lg border-white border-2 hover:bg-white/60 transition-colors duration-600 ease-in-out mx-auto" href="https://id.wikipedia.org/wiki/Analisis_regresi">
                        <i className="bi bi-info-circle-fill mx-1"/>Pelajari Lebih Lanjut</a>
                </div>
            </div>

            {/* NOTE: Info */}
            <div className="flex gap-4 flex-wrap">
                <div className="bgt bor rounded-3xl p-8 flex flex-col gap-4 w-1/3 shadow-xl grow md:basis-0 basis-2xl">
                    <i className="bi bi-file-earmark-arrow-up-fill text-4xl text-white base-bg-gradient-br p-4 rounded-xl w-fit mx-auto glow"/>
                    <p className="font-bold text-center text-2xl">Input Data Fleksibel</p>
                    <p className="text-gray-300 text-center w-2/3 mx-auto">
                        Masukkan data secara manual atau import dari file CSV/Excel dengan validasi otomatis dan antarmuka yang user-friendly.
                    </p>
                </div>

                <div className="bgt bor rounded-3xl p-8 flex flex-col gap-4 w-1/3 shadow-xl grow md:basis-0 basis-2xl">
                    <i className="bi bi-calculator-fill text-4xl text-white bg-linear-to-br from-green-400 to-teal-600 p-4 rounded-xl w-fit mx-auto glow-green"/>
                    <p className="font-bold text-center text-2xl">Analisis Lengkap</p>
                    <p className="text-gray-300 text-center w-2/3 mx-auto">
                        Dapatkan persamaan regresi, koefisien determinasi, dan analisis statistik lengkap dengan visualisasi yang informatif.
                    </p>
                </div>

                <div className="bgt bor rounded-3xl p-8 flex flex-col gap-4 w-1/3 shadow-xl grow md:basis-0 basis-2xl">
                    <i className="bi bi-graph-up text-4xl text-white base-bg-gradient-br p-4 rounded-xl w-fit mx-auto glow"/>
                    <p className="font-bold text-center text-2xl">Visualisasi Interaktif</p>
                    <p className="text-gray-300 text-center w-2/3 mx-auto">
                        Lihat scatter plot dengan garis regresi dan ekspor hasil dalam berbagai format dengan kualitas tinggi.
                    </p>
                </div>

            </div>

            {/* NOTE: User Guide */}
            <div className="bg-white rounded-3xl flex flex-col items-center p-8 shadow-xl bgt bor">
                <p className="text-2xl md:text-4xl font-bold my-4 text-center">Cara Menggunakan Aplikasi</p>
                <div className="flex gap-4 flex-wrap md:flex-nowrap">

                    <div className="flex flex-col items-center py-6 w-1/3 gap-6 grow">
                        <p className="base-bg-gradient-br text-white rounded-full px-4.5 py-2 font-bold text-2xl glow">1</p>
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-xl md:text-2xl font-bold text-center">Input Data</p>
                            <p className="text-[0.85rem] md:text-xl text-gray-300 text-center">
                                Masukkan data manual atau impor dari file dengan format yang didukung.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center py-6 w-1/3 gap-6 grow">
                        <p className="base-bg-gradient-br text-white rounded-full px-4.5 py-2 font-bold text-2xl glow">2</p>
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-xl md:text-2xl font-bold text-center">Proses</p>
                            <p className="text-[0.85rem] md:text-xl text-gray-300 text-center">
                                Sistem akan menghitung parameter regresi dengan algoritma yang akurat.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center py-6 w-1/3 gap-6 grow">
                        <p className="base-bg-gradient-br text-white rounded-full px-4.5 py-2 font-bold text-2xl glow">3</p>
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-xl md:text-2xl font-bold text-center">Analisis</p>
                            <p className="text-[0.85rem] md:text-xl text-gray-300 text-center">
                                Lihat hasil dan interpretasi statistik dengan tampilan yang informatif.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center py-6 w-1/3 gap-6 grow">
                        <p className="base-bg-gradient-br text-white rounded-full px-4.5 py-2 font-bold text-2xl glow">4</p>
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-xl md:text-2xl font-bold text-center">Ekspor</p>
                            <p className="text-[0.85rem] md:text-xl text-gray-300 text-center">
                                Unduh grafik dan laporan analisis dalam berbagai format yang diperlukan.
                            </p>
                        </div>
                    </div>

                </div>

            </div>

            {/* NOTE: AI Section */}
            <div className="bgt bor w-full items-center text-center rounded-3xl shadow-xl p-8">
                <p className="title-font text-2xl md:text-4xl my-2 md:my-6">Tanya AI</p>

                <div className="flex">
                    <div className="flex flex-col items-start text-start gap-8 w-full md:w-1/2 p-4">
                        <p className="font-bold text-xl md:text-2xl">Butuh Bantuan dengan Analisis Regresi?</p>
                        <p className="text-[0.7rem] md:text-[1rem] text-gray-200">AI Kami siap membantu Anda memahami konsep regresi linear, cara menggunakan aplikasi ini, atau menjawab pertanyaan statistik lainnya.</p>

                        <div className="flex flex-col gap-4 text-start text-[0.75rem] md:text-[1rem]">
                            <p>
                                <i className="bi bi-check bg-success/30 text-success text-2xl rounded-full px-1.5 py-1 mr-1" /> 
                                Jelaskan konsep Regresi Linear sederhana 
                            </p>
                            <p>
                                <i className="bi bi-check bg-success/30 text-success text-2xl rounded-full px-1.5 py-1 mr-1" /> 
                                Bantu interpretasi hasil analisis 
                            </p>
                            <p>
                                <i className="bi bi-check bg-success/30 text-success text-2xl rounded-full px-1.5 py-1 mr-1" /> 
                                Jelaskan istilah statistik yang sulit
                            </p>
                            <p>
                                <i className="bi bi-check bg-success/30 text-success text-2xl rounded-full px-1.5 py-1 mr-1" /> 
                                Berikan contoh penggunaan aplikasi
                            </p>
                            <p>
                                <i className="bi bi-check bg-success/30 text-success text-2xl rounded-full px-1.5 py-1 mr-1" /> 
                                Bantu troubleshooting masalah data
                            </p>
                        </div>

                        <button type="button" className="text-white text-[0.9rem] md:text-2xl bg-linear-to-r from-primary to-secondary p-2 md:p-4 rounded-xl font-bold shadow-[0_0_16px] shadow-primary/50 w-full hover:from-secondary hover:to-primary transition-colors duration-300 ease-in-out" onClick={()=> {
                            setTab(1);
                            setWarningMsg("Untuk bertanya dengan AI, inputkan terlebih dahulu data nya 😊")
                            window.scrollTo(0, 0);
                        }}>
                            <i className="bi bi-robot mr-1" />Tanya AI Sekarang!
                        </button>
                    </div>

                    <div className="hidden md:flex flex-col gap-4 p-10 bg-white shadow-[0_12px_12px] shadow-gray-300 w-1/2 rounded-xl m-16 text-start text-black">
                        <div className="bg-white shadow-[0_2px_8px] shadow-gray-400 rounded-xl p-4 max-w-3/4 w-fit">
                            <p>Halo! Saya asisten virtual untuk aplikasi regresi linear. Ada yang bisa saya bantu?</p>
                        </div>

                        <div className="base-bg-gradient-r text-white shadow-[0_2px_8px] shadow-primary rounded-xl p-4 max-w-3/4 w-fit ml-auto">
                            <p>Apa arti nilai R² dari hasil regresi saya?</p>
                        </div>

                        <div className="bg-white shadow-[0_2px_8px] shadow-gray-400 rounded-xl p-4 max-w-3/4 w-fit">
                            <p>Nilai R² (R-squared) menunjukkan seberapa baik model regresi menjelaskan variasi dalam data. Semakin besar nilai R², maka model regresi tersebut lebih baik dalam menjelaskan data.</p>
                        </div>

                        <div className="text-gray-400 mt-6 flex items-center justify-between">
                            <p>Ketik pertanyaan Anda...</p>
                            <i className="bi bi-send-fill text-white base-bg-gradient-br px-3 py-2 rounded-full"/>
                        </div>
                    </div>
                </div>
            </div>

            {/* NOTE: Made by*/}
            <div className="flex flex-col bgt bor w-full text-white items-center rounded-3xl shadow-xl p-8 text-center">
                <p className="text-2xl md:text-4xl text-center font-bold my-8">Tim Pengembang</p>
                    {devPage==0 && (
                        <div className="flex gap-6 m-4 flex-wrap md:flex-nowrap">
                            <div className="bgt p-6 w-full md:w-1/3 rounded-xl border-white/50 border-2 flex flex-col items-center gap-2 grow">
                                <img src="/profil/ulwan.jpeg" className="profile" />
                                <p className="font-bold text-center text-2xl">M ULWAN ZUHDI</p>
                                <p className="text-xl">Frontend Developer</p>
                                <p>Bertanggung jawab atas UI/UX dan implementasi React.</p>
                            </div>

                            <div className="bgt p-6 w-full md:w-1/3 rounded-xl border-white/50 border-2 flex flex-col items-center gap-2 grow">
                                <img src="/profil/shacio.png" className="profile" />
                                <p className="font-bold text-center text-2xl">MUHAMMAD DIRGAM SHACIO</p>
                                <p className="text-xl">Backend Developer</p>
                                <p>Mengelola Logika web-app dan optimasi performa</p>
                            </div>

                            <div className="bgt p-6 w-full md:w-1/3 rounded-xl border-white/50 border-2 flex flex-col items-center gap-2 grow">
                                <img src="/profil/raihan.jpeg" className="profile" />
                                <p className="font-bold text-center text-2xl">RAIHAN TAUFIK SURYANA</p>
                                <p className="text-xl">Backend Developer</p>
                                <p>Mengelola Logika web-app dan optimasi performa</p>
                            </div>
                        </div>
                    )}

                    {devPage==1 && (
                        <div className="flex gap-6 m-4 flex-wrap md:flex-nowrap md:basis-0">
                            <div className="bgt p-6 w-1/2 rounded-xl border-white/50 border-2 flex flex-col items-center gap-2 grow">
                                <img src="/profil/najla.jpeg" className="profile" />
                                <p className="font-bold text-center text-2xl">NAJLA GHINA NAZHIFA</p>
                                <p className="text-xl">Frontend Developer</p>
                                <p>Bertanggung jawab atas UI/UX dan implementasi React.</p>
                            </div>

                            <div className="bgt p-6 w-1/2 rounded-xl border-white/50 border-2 flex flex-col items-center gap-2 grow">
                                <img src="/profil/nazwa.jpeg" className="profile" />
                                <p className="font-bold text-center text-2xl">NAZWA AL HADIAH P</p>
                                <p className="text-xl">Frontend Developer</p>
                                <p>Bertanggung jawab atas UI/UX dan implementasi React.</p>
                            </div>

                        </div>
                    )}

                    {devPage==2 && (
                        <div className="flex gap-6 m-4 flex-wrap md:flex-nowrap md:basis-0">
                            <div className="bgt p-6 w-1/2 rounded-xl border-white/50 border-2 flex flex-col items-center gap-2 grow">
                                <img src="/profil/roofi.jpg" className="profile" />
                                <p className="font-bold text-center text-2xl">ROOFI AHMAD</p>
                                <p className="text-xl">QA</p>
                                <p>Bertanggung jawab atas pengujian kualitas web-app</p>
                            </div>

                            <div className="bgt p-6 w-1/2 rounded-xl border-white/50 border-2 flex flex-col items-center gap-2 grow">
                                <img src="/profil/rausyan.jpeg" className="profile" />
                                <p className="font-bold text-center text-2xl">RAUSYAN FIKRI RUKIN A</p>
                                <p className="text-xl">QA</p>
                                <p>Bertanggung jawab atas pengujian kualitas web-app</p>
                            </div>

                        </div>
                    )}
                <div className="flex gap-4 mt-8 ">
                    <button type="button" 
                        onClick={()=> {controlPage(-1)}}
                        className="text-2xl disabled:text-gray-300"
                        disabled={devPage==0}
                    ><i className="bi-caret-left-fill" /></button>
                    <p className="text-2xl">{devPage+1}</p>

                    <button type="button" 
                        onClick={()=> {controlPage(1)}}
                        className="text-2xl disabled:text-gray-300"
                        disabled={devPage==2}
                    ><i className="bi-caret-right-fill"/></button>
                </div>
            </div>
        </div>
    )
}
