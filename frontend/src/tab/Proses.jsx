
export default function ProsesPage() {
    const debugMessage = (main, log) => {
        return (
            <div className="bg-success/20 border-2 border-success rounded-xl p-4 text-success-dark font-bold text-xl flex gap-2 my-4">
                <i className="bi bi-check" />
                <p>{main}</p>
                <p className="ml-auto">{log}</p>
            </div>
        )
    }

    return(
        <div className="w-3/4 mx-auto gap-8 mb-12">
            <div className="bg-white rounded-3xl border-2 border-secondary border-t-8 p-8 w-full shadow-xl flex flex-col">
                <p className="text-2xl font-bold">Preprocessing Data</p>

                {debugMessage("Data dibersihkan", "12 dari 12 data valid")}
                {debugMessage("Duplikat Dihapus", "2 Duplikat ditemukan")}
                {debugMessage("Missing Value diproses", "0 Nilai kosong")}
                
                {/* NOTE: loading bar on preprocess data */}

                <button type="button" className="bg-success rounded-xl shadow-[0_0_16px] shadow-success/50 w-full text-white font-bold text-xl p-4"><i className="bi bi-gear-fill mr-1"/>Jalankan Perhitungan Regresi</button>
            </div>

            <div className="flex gap-8 my-8">
                <div className="bg-white rounded-3xl p-8 border-t-8 border-2 shadow-xl border-primary w-full">
                    <p className="text-2xl font-bold">Statistik Dasar</p>
                    <div className="flex flex-col my-8 text-xl gap-8 w-5/6 mx-auto">
                        <div className="flex justify-between">
                            <p>Rata-rata X (xbar)</p>
                            <p className="text-primary font-bold">45.50</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Rata-rata Y (ybar)</p>
                            <p className="text-primary font-bold">45.50</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-8 border-t-8 border-2 shadow-xl border-secondary w-full">
                    <p className="text-2xl font-bold">Statistik Dasar</p>
                    <div className="flex flex-col my-8 text-xl gap-8 w-5/6 mx-auto">
                        <div className="flex justify-between">
                            <p>Slope (b)</p>
                            <p className="text-secondary font-bold">45.50</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Intercept (a)</p>
                            <p className="text-secondary font-bold">45.50</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full p-8 rounded-3xl base-bg-gradient-br items-center flex flex-col my-8">
                <p className="text-2xl title-font text-white text-center mt-4 mb-8">Persamaan Regresi Linear</p>
                <div className="bg-white p-6 flex flex-col gap-4 text-center items-center rounded-3xl w-full">
                    <p className="text-4xl title-font bg-linear-to-r from-primary to-secondary text-transparent bg-clip-text inline-block">Y = 1.85X - 5.75</p>
                    <p>atau</p>
                    <p className="text-xl font-bold">Y = bX + a</p>
                </div>

                <button className="bg-success text-white font-bold text-xl p-4 rounded-xl w-full my-8 shadow-[0_0_16px] shadow-success/50" type="button">
                    <i className="bi bi-graph-up mr-1" />Lanjut ke Visualisasi
                </button>
            </div>

            <div className="bg-white border-2 border-t-8 border-primary-dark p-8 w-full rounded-3xl my-8">
                <p className="text-2xl font-bold mb-6">Rumus yang Digunakan</p>

                <div className="flex flex-col gap-8 ">
                    <div className="flex gap-8">
                        <div className="bg-primary/50 p-8 rounded-xl border-2 border-primary w-full">
                            <p>Slope (b):</p>
                            <div className="p-8 bg-white rounded-xl">
                                {/* NOTE: image rumus*/}
                            </div>
                        </div>

                        <div className="bg-secondary/50 p-8 rounded-xl border-2 border-secondary w-full">
                            <p>Intercept (a):</p>
                            <div className="p-8 bg-white rounded-xl">
                                {/* NOTE: image rumus*/}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-8">
                        <div className="bg-success/50 p-8 rounded-xl border-2 border-success w-full">
                            <p>Prediksi (Y):</p>
                            <div className="p-8 bg-white rounded-xl">
                                {/* NOTE: image rumus*/}
                            </div>
                        </div>

                        <div className="bg-warning/50 p-8 rounded-xl border-2 border-warning w-full">
                            <p>R (Determinasi) (a):</p>
                            <div className="p-8 bg-white rounded-xl">
                                {/* NOTE: image rumus*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="my-8 border-2 border-t-8 border-primary-dark bg-white rounded-3xl p-8">
                <p className="mb-6 text-2xl font-bold">Tabel Hasil Perhitungan Detail</p>

                <div className="flex text-xl">
                    <div className="items-center text-center w-full bg-linear-to-r from-white to-gray-200 rounded-tl-xl p-4">No</div>
                    <div className="items-center text-center w-full bg-linear-to-r from-white to-gray-200 p-4">X</div>
                    <div className="items-center text-center w-full bg-linear-to-r from-white to-gray-200 p-4">Y</div>
                    <div className="items-center text-center w-full bg-linear-to-r from-white to-gray-200 p-4">Y Prediksi</div>
                    <div className="items-center text-center w-full bg-linear-to-r from-white to-gray-200 rounded-tr-xl p-4">Residual</div>
                </div>

                {/* NOTE: di loop disini */}
            </div>
        </div>
    )
}
