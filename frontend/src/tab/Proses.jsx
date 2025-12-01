import { useState, useMemo } from "react";

export default function ProsesPage({ sessionId, setRegressionResult, regressionResult }) {
    const [loading, setLoading] = useState(false);

    const runRegression = async () => {
        if (!sessionId) return alert("Upload data dulu!");

        setLoading(true);
        try {
            const model = regressionResult?.model || "linear"; // default
            const res = await fetch(`/api/regression/${model}?session_id=${sessionId}`);
            const json = await res.json();

            if (!res.ok) throw json;

            setRegressionResult(json);
        } catch (err) {
            alert("Error: " + (err.detail || "Tidak bisa menjalankan regresi"));
        }
        setLoading(false);
    };

    const debugMessage = (main, log) => (
        <div className="bg-success/20 border-2 border-success rounded-xl p-2 md:p-4 text-success-dark font-bold text-[0.75rem] md:text-xl flex gap-2 my-1 md:my-4">
            <i className="bi bi-check" />
            <p>{main}</p>
            <p className="ml-auto">{log}</p>
        </div>
    );

    // Hitung statistic dasar
    const stats = useMemo(() => {
        if (!regressionResult?.cleaned_data) return null;
        const arr = regressionResult.cleaned_data;

        const avgX = arr.reduce((s, v) => s + v.X, 0) / arr.length;
        const avgY = arr.reduce((s, v) => s + v.Y, 0) / arr.length;

        return {
            avgX: avgX.toFixed(4),
            avgY: avgY.toFixed(4)
        };
    }, [regressionResult]);

    // Hasil detail tabel
    const tableData = useMemo(() => {
        if (!regressionResult?.cleaned_data) return [];
        const a = regressionResult.a;
        const b = regressionResult.b;
        const isLog = regressionResult.model === "logarithmic";

        return regressionResult.cleaned_data.map((row, i) => {
            const yPred = isLog ? a + b * Math.log(row.X) : a + b * row.X;
            const res = row.Y - yPred;

            return {
                no: i + 1,
                X: row.X,
                Y: row.Y,
                yPred: yPred.toFixed(5),
                residual: res.toFixed(5)
            };
        });
    }, [regressionResult]);

    return (
        <div className="w-[90%] md:w-3/4 mx-auto gap-4 md:gap-8 mb-12">

            {/* ================= PREPROCESSING ================= */}
            <div className="bg-white rounded-3xl border-2 border-secondary border-t-8 p-8 w-full shadow-xl flex flex-col">
                <p className="text-xl md:text-2xl font-bold">Preprocessing Data</p>

                {regressionResult?.clean_data_report?.map((rep, i) =>
                    debugMessage(rep.split(":")[0], rep.split(":")[1] || "")
                )}

                {/* Loading bar */}
                {loading && (
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden my-4">
                        <div className="h-full bg-success animate-pulse"></div>
                    </div>
                )}

                <button
                    type="button"
                    onClick={runRegression}
                    className="bg-success rounded-xl shadow-[0_0_16px] shadow-success/50 w-full text-white font-bold text-[0.85rem] md:text-xl p-2 md:p-4 mt-1 md:mt-0"
                >
                    <i className="bi bi-gear-fill mr-1" />
                    {loading ? "Menghitung..." : "Jalankan Perhitungan Regresi"}
                </button>
            </div>

            {/* ================= STATISTIK & PARAMETER ================= */}
            {regressionResult && (
                <div className="flex gap-4 md:gap-8 my-8 flex-wrap md:flex-nowrap">

                    {/* Statistik Dasar */}
                    <div className="bg-white rounded-3xl p-8 border-t-8 border-2 shadow-xl border-primary w-full">
                        <p className="text-xl md:text-2xl font-bold">Statistik Dasar</p>
                        <div className="flex flex-col my-4 md:my-8 text-[0.85rem] md:text-xl gap-4 md:gap-8 w-5/6 mx-auto">
                            <div className="flex justify-between">
                                <p>Rata-rata X (x̄)</p>
                                <p className="text-primary font-bold">{stats?.avgX}</p>
                            </div>

                            <div className="flex justify-between">
                                <p>Rata-rata Y (ȳ)</p>
                                <p className="text-primary font-bold">{stats?.avgY}</p>
                            </div>
                        </div>
                    </div>

                    {/* Parameter Regresi */}
                    <div className="bg-white rounded-3xl p-8 border-t-8 border-2 shadow-xl border-secondary w-full">
                        <p className="text-xl md:text-2xl font-bold">Parameter Regresi</p>
                        <div className="flex flex-col my-4 md:my-8 text-[0.85rem] md:text-xl gap-4 md:gap-8 w-5/6 mx-auto">
                            <div className="flex justify-between">
                                <p>Slope (b)</p>
                                <p className="text-secondary font-bold">{regressionResult.b}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Intercept (a)</p>
                                <p className="text-secondary font-bold">{regressionResult.a}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ================= PERSAMAAN REGRESI ================= */}
            {regressionResult && (
                <div className="w-full p-8 rounded-3xl base-bg-gradient-br items-center flex flex-col my-8">
                    <p className="text-xl md:text-2xl title-font text-white text-center mt-4 mb-8">
                        Persamaan Regresi
                    </p>

                    <div className="bg-white p-6 flex flex-col gap-0 md:gap-4 text-center items-center rounded-3xl w-full">
                        <p className="text-2xl md:text-4xl title-font bg-linear-to-r from-primary to-secondary text-transparent bg-clip-text inline-block">
                            {regressionResult.equation}
                        </p>

                        <p className="text-[0.75rem] md:text-[1rem]">atau</p>

                        <p className="text-[1rem] md:text-xl font-bold">
                            {regressionResult.model === "logarithmic"
                                ? "Y = a + b ln(X)"
                                : "Y = bX + a"}
                        </p>
                    </div>

                    <button
                        className="bg-success text-white font-bold text-[0.85rem] md:text-xl p-2 md:p-4 rounded-xl w-full my-4 md:my-8 shadow-[0_0_16px] shadow-success/50"
                        type="button"
                    >
                        <i className="bi bi-graph-up mr-1" />Lanjut ke Visualisasi
                    </button>
                </div>
            )}

            {/* ================= TABEL DETAIL ================= */}
            {regressionResult && (
                <div className="my-8 border-2 border-t-8 border-primary-dark bg-white rounded-3xl p-8">
                    <p className="mb-6 text-xl md:text-2xl font-bold">Tabel Hasil Perhitungan Detail</p>

                    <div className="flex text-[0.85rem] md:text-xl overflow-x-auto items-center text-center">
                        <div className="w-20 bg-gray-200 p-2 md:p-4">No</div>
                        <div className="w-32 bg-gray-200 p-2 md:p-4">X</div>
                        <div className="w-32 bg-gray-200 p-2 md:p-4">Y</div>
                        <div className="w-40 bg-gray-200 p-2 md:p-4">Y Prediksi</div>
                        <div className="w-32 bg-gray-200 p-2 md:p-4">Residual</div>
                    </div>

                    {tableData.map(row => (
                        <div key={row.no} className="flex text-[0.85rem] md:text-xl items-center text-center border-b">
                            <div className="w-20 p-2 md:p-4">{row.no}</div>
                            <div className="w-32 p-2 md:p-4">{row.X}</div>
                            <div className="w-32 p-2 md:p-4">{row.Y}</div>
                            <div className="w-40 p-2 md:p-4">{row.yPred}</div>
                            <div className="w-32 p-2 md:p-4">{row.residual}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
