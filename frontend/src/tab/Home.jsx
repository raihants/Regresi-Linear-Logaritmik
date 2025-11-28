import { useState } from "react";

export default function HomePage() {
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
        <div className="w-3/4 mx-auto flex flex-col gap-8 mb-12">
            <div className="base-bg-gradient-r text-white mx-auto w-full p-8 rounded-3xl flex flex-col relative items-center gap-4 py-20 shadow-xl">
                <p className="text-6xl title-font text-center">Analisis Regresi Linear</p>
                <p className="text-xl w-2/3 text-center">Alat Analisis Data yang mudah digunakan untuk menghitung dan memvisualisasikan hubungan linear antara dua variabel dengan antarmuka yang modern dan intuitif</p>
                <div className="flex gap-6">
                    {/* NOTE: Start Button and Info Button */}
                    <button type="button" className="bg-linear-to-r from-primary to-secondary hover:from-secondary hover:to-primary shadow-xl py-2 px-6 rounded-lg transition-colors duration-600 ease-in-out">
                        <i className="bi bi-play-fill mx-1" />Mulai Analisis</button>
                    <button type="button" className="bg-white/30 shadow-xl py-2 px-6 rounded-lg border-white border-2 hover:bg-white/60 transition-colors duration-600 ease-in-out">
                        <i className="bi bi-info-circle-fill mx-1"/>Pelajari Lebih Lanjut</button>
                </div>
            </div>

            <div className="flex gap-4">
                <div className="bg-white rounded-3xl p-8 flex flex-col gap-4 w-1/3 shadow-xl">
                    <i className="bi bi-file-earmark-arrow-up-fill text-4xl text-white base-bg-gradient-br p-4 rounded-xl w-fit mx-auto"/>
                    <p className="font-bold text-center text-2xl">Input Data Fleksibel</p>
                    <p className="text-gray-600 text-center w-2/3 mx-auto">
                        Masukkan data secara manual atau import dari file CSV/Excel dengan validasi otomatis dan antarmuka yang user-friendly.
                    </p>
                </div>

                <div className="bg-white rounded-3xl p-8 flex flex-col gap-4 w-1/3 shadow-xl">
                    <i className="bi bi-calculator-fill text-4xl text-white bg-linear-to-br from-green-400 to-teal-600 p-4 rounded-xl w-fit mx-auto"/>
                    <p className="font-bold text-center text-2xl">Analisis Lengkap</p>
                    <p className="text-gray-600 text-center w-2/3 mx-auto">
                        Dapatkan persamaan regresi, koefisien determinasi, dan analisis statistik lengkap dengan visualisasi yang informatif.
                    </p>
                </div>

                <div className="bg-white rounded-3xl p-8 flex flex-col gap-4 w-1/3 shadow-xl">
                    <i className="bi bi-graph-up text-4xl text-white base-bg-gradient-br p-4 rounded-xl w-fit mx-auto"/>
                    <p className="font-bold text-center text-2xl">Visualisasi Interaktif</p>
                    <p className="text-gray-600 text-center w-2/3 mx-auto">
                        Lihat scatter plot dengan garis regresi dan ekspor hasil dalam berbagai format dengan kualitas tinggi.
                    </p>
                </div>

            </div>

            <div className="bg-white rounded-3xl flex flex-col items-center p-8 shadow-xl">
                <p className="text-4xl font-bold my-4">Cara Menggunakan Aplikasi</p>
                <div className="flex gap-4">

                    <div className="flex flex-col items-center py-6 w-1/3 gap-6">
                        <p className="base-bg-gradient-br text-white rounded-full px-4.5 py-2 font-bold text-2xl shadow-blue-300 shadow-[0_4px_32px]">1</p>
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-2xl font-bold text-center">Input Data</p>
                            <p className="text-gray-600 text-center">
                                Masukkan data manual atau impor dari file dengan format yang didukung.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center py-6 w-1/3 gap-6">
                        <p className="base-bg-gradient-br text-white rounded-full px-4.5 py-2 font-bold text-2xl shadow-blue-300 shadow-[0_4px_32px]">2</p>
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-2xl font-bold text-center">Proses</p>
                            <p className="text-gray-600 text-center">
                                Sistem akan menghitung parameter regresi dengan algoritma yang akurat.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center py-6 w-1/3 gap-6">
                        <p className="base-bg-gradient-br text-white rounded-full px-4.5 py-2 font-bold text-2xl shadow-blue-300 shadow-[0_4px_32px]">3</p>
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-2xl font-bold text-center">Analisis</p>
                            <p className="text-gray-600 text-center">
                                Lihat hasil dan interpretasi statistik dengan tampilan yang informatif.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center py-6 w-1/3 gap-6">
                        <p className="base-bg-gradient-br text-white rounded-full px-4.5 py-2 font-bold text-2xl shadow-blue-300 shadow-[0_4px_32px]">4</p>
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-2xl font-bold text-center">Ekspor</p>
                            <p className="text-gray-600 text-center">
                                Unduh grafik dan laporan analisis dalam berbagai format yang diperlukan.
                            </p>
                        </div>
                    </div>

                </div>

            </div>

            <div className="flex flex-col base-bg-gradient-br w-full text-white items-center rounded-3xl shadow-xl p-8">
                <p className="text-4xl text-center font-bold my-8">Tim Pengembang</p>
                <div className="flex gap-6 m-4">
                    {devPage==0 && (
                        <>
                            <div className="bg-white/20 p-6 w-1/3 rounded-xl border-white/50 border-2 flex flex-col items-center gap-2">
                                <img src="/profile.jpeg" className="w-16 rounded-full shadow-xl" />
                                <p className="font-bold text-center text-2xl">M ULWAN ZUHDI</p>
                                <p className="text-xl">Frontend Developer</p>
                                <p>Bertanggung jawab atas UI/UX dan implementasi React.</p>
                            </div>

                            <div className="bg-white/20 p-6 w-1/3 rounded-xl border-white/50 border-2 flex flex-col items-center gap-2">
                                <img src="/profile.jpeg" className="w-16 rounded-full shadow-xl" />
                                <p className="font-bold text-center text-2xl">M DIRGAM SHACIO</p>
                                <p className="text-xl">Data Analyst</p>
                                <p>Ahli dalam algoritma statistik dan validasi data.</p>
                            </div>

                            <div className="bg-white/20 p-6 w-1/3 rounded-xl border-white/50 border-2 flex flex-col items-center gap-2">
                                <img src="/profile.jpeg" className="w-16 rounded-full shadow-xl" />
                                <p className="font-bold text-center text-2xl">RAIHAN TAUFIK SURYANA</p>
                                <p className="text-xl">Backend Developer</p>
                                <p>Mengelola Logika bisnis dan optimasi performa</p>
                            </div>
                        </>
                    )}

                    {devPage==1 && (
                        <>
                            <div className="bg-white/20 p-6 w-1/2 rounded-xl border-white/50 border-2 flex flex-col items-center gap-2">
                                <img src="/profile.jpeg" className="w-16 rounded-full shadow-xl" />
                                <p className="font-bold text-center text-2xl">NAJLA GHINA NAZHIFA</p>
                                <p className="text-xl">Frontend Developer</p>
                                <p>Bertanggung jawab atas UI/UX dan implementasi React.</p>
                            </div>

                            <div className="bg-white/20 p-6 w-1/2 rounded-xl border-white/50 border-2 flex flex-col items-center gap-2">
                                <img src="/profile.jpeg" className="w-16 rounded-full shadow-xl" />
                                <p className="font-bold text-center text-2xl">NAZWA AL HADIAH P</p>
                                <p className="text-xl">Data Analyst</p>
                                <p>Ahli dalam algoritma statistik dan validasi data.</p>
                            </div>

                        </>
                    )}

                    {devPage==2 && (
                        <>
                            <div className="bg-white/20 p-6 w-1/2 rounded-xl border-white/50 border-2 flex flex-col items-center gap-2">
                                <img src="/profile.jpeg" className="w-16 rounded-full shadow-xl" />
                                <p className="font-bold text-center text-2xl">ROOFI AHMAD</p>
                                <p className="text-xl">Frontend Developer</p>
                                <p>Bertanggung jawab atas UI/UX dan implementasi React.</p>
                            </div>

                            <div className="bg-white/20 p-6 w-1/2 rounded-xl border-white/50 border-2 flex flex-col items-center gap-2">
                                <img src="/profile.jpeg" className="w-16 rounded-full shadow-xl" />
                                <p className="font-bold text-center text-2xl">RAUSYAN FIKRI RUKIN A</p>
                                <p className="text-xl">Data Analyst</p>
                                <p>Ahli dalam algoritma statistik dan validasi data.</p>
                            </div>

                        </>
                    )}

                </div>
                <div className="flex gap-4 mt-8">
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
