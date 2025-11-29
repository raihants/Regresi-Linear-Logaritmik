
export default function ProsesPage() {
    const debugMessage = (main, log) => {
        return (
            <div className="bg-success/20 border-2 border-success rounded-xl p-2 md:p-4 text-success-dark font-bold text-[0.75rem] md:text-xl flex gap-2 my-1 md:my-4">
                <i className="bi bi-check" />
                <p>{main}</p>
                <p className="ml-auto">{log}</p>
            </div>
        )
    }

    return(
        <div className="w-[90%] md:w-3/4 mx-auto gap-4 md:gap-8 mb-12">
            <div className="bg-white rounded-3xl border-2 border-secondary border-t-8 p-8 w-full shadow-xl flex flex-col">
                <p className="text-xl md:text-2xl font-bold">Preprocessing Data</p>

                {debugMessage("Data dibersihkan", "12 dari 12 data valid")}
                {debugMessage("Duplikat Dihapus", "2 Duplikat ditemukan")}
                {debugMessage("Missing Value diproses", "0 Nilai kosong")}
                
                {/* NOTE: bar loading harusnya disiini */}

                <button type="button" className="bg-success rounded-xl shadow-[0_0_16px] shadow-success/50 w-full text-white font-bold text-[0.85rem] md:text-xl p-2 md:p-4 mt-1 md:mt-0">
                    <i className="bi bi-gear-fill mr-1"/>Jalankan Perhitungan Regresi
                </button>
            </div>

            <div className="flex gap-4 md:gap-8 my-8 flex-wrap md:flex-nowrap">
                <div className="bg-white rounded-3xl p-8 border-t-8 border-2 shadow-xl border-primary w-full">
                    <p className="text-xl md:text-2xl font-bold">Statistik Dasar</p>
                    <div className="flex flex-col my-4 md:my-8 text-[0.85rem] md:text-xl gap-4 md:gap-8 w-5/6 mx-auto">
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
                    <p className="text-xl md:text-2xl font-bold">Parameter Regresi</p>
                    <div className="flex flex-col my-4 md:my-8 text-[0.85rem] md:text-xl gap-4 md:gap-8 w-5/6 mx-auto">
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
                <p className="text-xl md:text-2xl title-font text-white text-center mt-4 mb-8">Persamaan Regresi Linear</p>
                <div className="bg-white p-6 flex flex-col gap-0 md:gap-4 text-center items-center rounded-3xl w-full">
                    <p className="text-2xl md:text-4xl title-font bg-linear-to-r from-primary to-secondary text-transparent bg-clip-text inline-block">Y = 1.85X - 5.75</p>
                    <p className="text-[0.75rem] md:text-[1rem]">atau</p>
                    <p className="text-[1rem] md:text-xl font-bold">Y = bX + a</p>
                </div>

                <button className="bg-success text-white font-bold text-[0.85rem] md:text-xl p-2 md:p-4 rounded-xl w-full my-4 md:my-8 shadow-[0_0_16px] shadow-success/50" type="button">
                    <i className="bi bi-graph-up mr-1" />Lanjut ke Visualisasi
                </button>
            </div>

            <div className="bg-white border-2 border-t-8 border-primary-dark p-8 w-full rounded-3xl my-8">
                <p className="text-xl md:text-2xl font-bold mb-6">Rumus yang Digunakan</p>

                <div className="flex gap-4 md:gap-8 flex-wrap">
                    <div className="bg-primary/50 p-4 md:p-8 rounded-xl border-2 border-primary basis-xl grow shrink">
                        <p>Slope (b):</p>
                        <div className="p-8 bg-white rounded-xl">
                            {/* NOTE: image rumus*/}
                        </div>
                    </div>

                    <div className="bg-secondary/50 p-4 md:p-8 rounded-xl border-2 border-secondary basis-xl grow shrink">
                        <p>Intercept (a):</p>
                        <div className="p-8 bg-white rounded-xl">
                            {/* NOTE: image rumus*/}
                        </div>
                    </div>

                    <div className="bg-success/50 p-4 md:p-8 rounded-xl border-2 border-success basis-xl grow shrink">
                        <p>Prediksi (Y):</p>
                        <div className="p-8 bg-white rounded-xl">
                            {/* NOTE: image rumus*/}
                        </div>
                    </div>

                    <div className="bg-warning/50 p-4 md:p-8 rounded-xl border-2 border-warning basis-xl grow shrink">
                        <p>R (Determinasi) (a):</p>
                        <div className="p-8 bg-white rounded-xl">
                            {/* NOTE: image rumus*/}
                        </div>
                    </div>
                </div>
            </div>

            <div className="my-8 border-2 border-t-8 border-primary-dark bg-white rounded-3xl p-8">
                <p className="mb-6 text-xl md:text-2xl font-bold">Tabel Hasil Perhitungan Detail</p>

                <div className="flex text-[0.85rem] md:text-xl overflow-x-auto items-center text-center">
                    <div className="w-1/2 md:w-full bg-linear-to-r from-white to-gray-200 rounded-tl-xl p-2 md:p-4">No</div>
                    <div className="w-1/2 md:w-full bg-linear-to-r from-white to-gray-200 p-2 md:p-4">X</div>
                    <div className="w-1/2 md:w-full bg-linear-to-r from-white to-gray-200 p-2 md:p-4">Y</div>
                    <div className="w-full bg-linear-to-r from-white to-gray-200 p-2 md:p-4">Y Prediksi</div>
                    <div className="w-1/2 md:w-full bg-linear-to-r from-white to-gray-200 rounded-tr-xl p-2 md:p-4">Residual</div>
                </div>

                {/* NOTE: tabel hasil di loop disini */}
            </div>
        </div>
    )
}
