import { useEffect, useMemo, useState } from "react";
import TabelHasil from "../components/tabelHasil.jsx";
import { MathJax } from "better-react-mathjax";
import AnimatedContent from "../components/Animated.jsx";

{/* NOTE: reggresionResult = res */}
{/* NOTE: applyKecermatan = kec */}

export default function ProsesPage({ res, kec, ...props }) {
    const debugMessage = (main, log) => (
        <div className="bg-success-light glow-green border-2 border-success rounded-xl p-2 md:p-4 text-success-dark font-bold text-[0.75rem] md:text-xl flex gap-2 my-1 md:my-4">
            <i className="bi bi-check" />
            <p>{main}</p>
            <p className="ml-auto">{log}</p>
        </div>
    );
    
    const [rumus, setRumus] = useState("r");

    // Hitung statistic dasar
    const stats = useMemo(() => {
        if (!res?.cleaned_data) return null;
        const arr = res.cleaned_data;

        const avgX = arr.reduce((s, v) => s + v.X, 0) / arr.length;
        const avgY = arr.reduce((s, v) => s + v.Y, 0) / arr.length;

        return {
            avgX: avgX.toFixed(4),
            avgY: avgY.toFixed(4)
        };
    }, [res]);

    return (
        <div className="w-[90%] md:w-3/4 mx-auto gap-4 md:gap-8 mb-12">

            {/* ================= PREPROCESSING ================= */}
            <div className="bgt rounded-3xl glow p-8 w-full shadow-xl flex flex-col">
                <p className="text-xl md:text-2xl font-bold">Preprocessing Data</p>

                    {res?.clean_data_report?.map((rep, _i) =>
                        debugMessage(rep.split(":")[0], rep.split(":")[1] || "")
                    )}

                {/* Loading bar                {loading && (
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden my-4">
                        <div className="h-full bg-success animate-pulse"></div>
                    </div>
                )}
 */}


                {/*
                <button
                    type="button"
                    onClick={runRegression}
                    className="bg-success rounded-xl shadow-[0_0_16px] shadow-success/50 w-full text-white font-bold text-[0.85rem] md:text-xl p-2 md:p-4 mt-1 md:mt-0"
                >
                    <i className="bi bi-gear-fill mr-1" />
                    {loading ? "Menghitung..." : "Jalankan Perhitungan Regresi"}
                </button>
                */}
            </div>

            {/* NOTE: STATISTIK & PARAMETER */}
            {res && (
                <div className="flex gap-4 md:gap-8 my-8 flex-wrap md:flex-nowrap">

                    {/* Statistik Dasar */}
                    <div className="bgt p-8 rounded-3xl w-full glow">
                        <p className="text-xl md:text-2xl font-bold">Statistik Dasar</p>
                        <div className="flex flex-col my-4 md:my-16 text-[0.85rem] md:text-xl gap-4 md:gap-8 w-5/6 mx-auto">
                            <div className="flex justify-between">
                                <p>Rata-rata X (x̄)</p>
                                <p className="text-warning-light font-bold glow-text">{kec(stats?.avgX)}</p>
                            </div>

                            <div className="flex justify-between">
                                <p>Rata-rata Y (ȳ)</p>
                                <p className="text-warning-light font-bold glow-text">{kec(stats?.avgY)}</p>
                            </div>

                        </div>
                    </div>

                    {/* Parameter Regresi */}
                    <div className="p-8 rounded-3xl border-secondary w-full bgt glow">
                        <p className="text-xl md:text-2xl font-bold">Parameter Regresi</p>
                        <div className="flex flex-col my-4 md:my-8 text-[0.85rem] md:text-xl gap-4 md:gap-8 w-5/6 mx-auto">
                            <div className="flex justify-between">
                                <p>Koefisien Korelasi</p>
                                <p className="text-success-light font-bold glow-text-green">{kec(res.r)}</p>
                            </div>

                            <div className="flex justify-between">
                                {res.model === "logarithmic" ? (
                                    <>
                                        <p>Intercept (koefisien n)</p>
                                        <p className="text-success-light glow-text-green font-bold">{kec(res.n)}</p>
                                    </>
                                ) : (
                                    <>
                                        <p>Intercept (koefisien a)</p>
                                        <p className="text-success-light glow-text-green font-bold">{kec(res.a)}</p>
                                    </>
                                )}
                            </div>

                            <div className="flex justify-between">
                                {res.model === "logarithmic" ? (
                                    <>
                                        <p>Intercept (koefisien log k)</p>
                                        <p className="text-success-light glow-text-green font-bold">{kec(res.k)}</p>
                                    </>
                                ) : (
                                    <>
                                        <p>Intercept (koefisien b)</p>
                                        <p className="text-success-light glow-text-green font-bold">{kec(res.b)}</p>
                                    </>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* NOTE: PERSAMAAN REGRESI */}
            {res && (
                <div className="w-full p-8 rounded-3xl items-center flex flex-col my-8 bgt glow">
                    <p className="text-xl md:text-2xl title-font text-white text-center mt-4 mb-8">
                        Persamaan Regresi
                    </p>

                    <div className="bg-white p-6 flex flex-col gap-0 md:gap-4 text-center items-center rounded-3xl w-full">
                        <p className="text-[1rem] md:text-4xl title-font bg-linear-to-r from-primary to-secondary text-transparent bg-clip-text inline-block">
                            Y = {kec(res.equation?.match(/-?\d+(\.\d+)?/g)[0])} + {kec(res.equation?.match(/-?\d+(\.\d+)?/g)[1])}X
                        </p>

                        {res.model === "logarithmic" && (
                            <p className="text-[1rem] md:text-4xl title-font bg-linear-to-r from-primary to-secondary text-transparent bg-clip-text inline-block">
                                Log(Y) = {kec(res.equation_log?.match(/-?\d+(\.\d+)?/g)[0])} + {kec(res.equation_log?.match(/-?\d+(\.\d+)?/g)[1])}Log(X) 
                            </p>
                        )}

                        <p className="text-[1rem] md:text-4xl title-font bg-linear-to-r from-primary to-secondary text-transparent bg-clip-text inline-block">
                            r² = {kec(res.r2)}
                        </p>
                    </div>

                    <button
                        className="bg-success text-white font-bold text-[0.85rem] md:text-xl p-2 md:p-4 rounded-xl w-full my-4 md:my-8 glow-green"
                        type="button"
                        onClick={()=> { props.setTab(3); window.scrollTo(0, 0); }}
                    >
                        <i className="bi bi-graph-up mr-1" />Lanjut ke Visualisasi
                    </button>
                </div>
            )}

            {/* NOTE: TABEL DETAIL */}
            {res && (
                <TabelHasil 
                    applyKecermatan={kec}  
                    regressionResult={res}
                    kecermatan={props.kecermatan}
                    colDef={props.colDef}
                    setKecermatan={props.setKecermatan}
                />
            )}

            <div className="w-full p-8 rounded-3xl bg-white flex flex-col my-8 border-2 border-t-8 border-secondary gap-2 md:gap-4 items-center glow">
                <p className="text-xl md:text-2xl font-bold ">
                    Rincian Perhitungan
                </p>
                <label>Pilih Rumus yang ingin di-rincikan</label>
                {res.model != "logarithmic" ? (
                    <select className="text-[0.9rem] bg-linear-to-br from-primary to-secondary hover:from-primary hover:to-secondary duration-300 ease-in-out transition-colors text-white font-bold p-6 rounded-3xl" onChange={(e)=> setRumus(e.target.value)}>
                        <option value="rata">Rata-rata</option>
                        <option value="r">Koefisien Korelasi (r)</option>
                        <option value="a">Koefisien a</option>
                        <option value="b">Koefisien b</option>
                    </select>
                ) : (
                    <select className="text-[0.9rem] bg-linear-to-br from-primary to-secondary hover:from-primary hover:to-secondary duration-300 ease-in-out transition-colors text-white font-bold p-6 rounded-3xl" onChange={(e)=> setRumus(e.target.value)}>
                        <option value="rata">Rata-rata</option>
                        <option value="r">Koefisien Korelasi (r)</option>
                        <option value="n">koefisien n</option>
                        <option value="k">Koefisien Log(k)</option>
                    </select>
                )}
                <div className="flex w-full md:w-3/4 items-center flex-wrap gap-6 mx-auto text-[0.65rem] md:text-[1rem]">
                    {res.model != "logarithmic" ? (
                        <>
                            {rumus=="rata" && (
                                <div className="flex mx-auto w-fit gap-6 flex-wrap md:flex-nowrap">
                                    <div className="equation-container">
                                        <p className="mt-2">Rata-rata (x̄)</p>
                                        <MathJax>
                                            {`\\[ x̄ = \\frac{ΣX}{n} = \\frac{${kec(res.sumX)}}{${res.len}} = ${kec(stats.avgX)} \\]`}
                                        </MathJax>
                                    </div>

                                    <div className="equation-container">
                                        <p className="mt-2">Rata-rata (ȳ)</p>
                                        <MathJax>
                                            {`\\[ ȳ = \\frac{ΣY}{n} = \\frac{${kec(res.sumY)}}{${res.len}} = ${kec(stats.avgY)} \\]`}
                                        </MathJax>
                                    </div>
                                </div>
                            )}

                            {rumus=="r" && (
                                <div className="equation-container mx-auto text-[0.5rem] md:text-[1rem]">
                                    <p className="mt-2">Koefisien Korelasi (r)</p>
                                    <MathJax>
                                        {`\\[r = \\frac{(n \\cdot ΣXY)-(ΣX \\cdot ΣY)}{\\sqrt{[(n \\cdot ΣX^2) - (ΣX)^2] \\cdot [(n \\cdot ΣY^2) - (ΣY)^2]}} = \\]`}
                                    </MathJax>
                                    <MathJax>
                                        {`\\[ \\frac{(${res.len} \\cdot ${kec(res.sumXY)})-(${kec(res.sumX)} \\cdot ${kec(res.sumY)})}{\\sqrt{[(${res.len} \\cdot ${kec(res.sumX2)}) - (${kec(res.sumX)})^2] \\cdot [(${res.len} \\cdot ${kec(res.sumY2)}) - (${kec(res.sumY)})^2]}} = \\]`}
                                    </MathJax>
                                    <MathJax>
                                        {`\\[ \\frac{(${kec(res.len * res.sumXY)})-(${kec(res.sumX * res.sumY)})}{\\sqrt{[(${kec(res.len * res.sumX2)}) - ${kec(res.sumX2)}] \\cdot [(${kec(res.len * res.sumY2)}) - ${kec(res.sumY2)}]}} = \\]`}
                                    </MathJax>
                                    <MathJax>
                                        {`\\[ \\frac{${kec((res.len * res.sumXY) - (res.sumX * res.sumY))}}{\\sqrt{(${kec((res.len * res.sumX2) - res.sumX2)}) \\cdot (${kec((res.len * res.sumY2) - res.sumY2)})}} = \\frac{${kec((res.len * res.sumXY) - (res.sumX * res.sumY))}}{\\sqrt{${kec( ((res.len * res.sumX2) - res.sumX2) * ((res.len * res.sumY2) - res.sumY2) )}}} = \\]`}
                                    </MathJax>
                                    <MathJax>
                                        {`\\[ \\frac{${kec((res.len * res.sumXY) - (res.sumX * res.sumY))}}{${kec( Math.sqrt(((res.len * res.sumX2) - res.sumX2) * ((res.len * res.sumY2) - res.sumY2)) )}} = ${kec(res.r)} \\]`}
                                    </MathJax>
                                </div>
                            )}

                            {rumus=="a" && (
                                <div className="equation-container mx-auto">
                                    <p className="mt-2">Koefisien a</p>
                                    <MathJax>
                                        {`\\[a = \\frac{(ΣY \\cdot ΣX^2)-(ΣX \\cdot ΣXY)}{(n \\cdot ΣX^2) - (ΣX)^2} = \\]`}
                                    </MathJax>
                                    <MathJax>
                                        {`\\[ \\frac{(${kec(res.sumY)} \\cdot ${kec(res.sumX2)})-(${kec(res.sumX)} \\cdot ${kec(res.sumXY)})}{(${res.len} \\cdot ${kec(res.sumX2)}) - (${kec(res.sumX)})^2} = \\]`}
                                    </MathJax>
                                    <MathJax>
                                        {`\\[ \\frac{(${kec(res.sumY * res.sumX2)})-(${kec(res.sumX * res.sumXY)})}{(${kec(res.len * res.sumX2)}) - ${kec(res.sumX2)}} = \\]`}
                                    </MathJax>
                                    <MathJax>
                                        {`\\[ \\frac{${kec( (res.sumY * res.sumX2) - (res.sumX * res.sumXY) )}}{${kec( (res.len * res.sumX2) - res.sumX2)}} = ${kec(res.a)} \\]`}
                                    </MathJax>
                                </div>
                            )}

                            {rumus=="b" && (
                                <div className="equation-container mx-auto">
                                    <p className="mt-2">Koefisien b</p>
                                    <MathJax>
                                        {`\\[b = \\frac{n \\cdot (ΣXY) - (ΣX \\cdot ΣY)}{(n \\cdot ΣX^2) - (ΣX)^2} = \\]`}
                                    </MathJax>
                                    <MathJax>
                                        {`\\[ \\frac{${res.len} \\cdot (${kec(res.sumXY)}) - (${kec(res.sumX)} \\cdot ${kec(res.sumY)})}{(${res.len} \\cdot ${kec(res.sumX2)}) - (${kec(res.sumX)})^2} = \\]`}
                                    </MathJax>
                                    <MathJax>
                                        {`\\[ \\frac{${kec(res.len * res.sumXY)} - ${kec(res.sumX * res.sumY)}}{${kec(res.len * res.sumX2)} - ${kec(res.sumX2)}} = \\]`}
                                    </MathJax>
                                    <MathJax>
                                        {`\\[ \\frac{${kec( (res.len * res.sumXY) - (res.sumX * res.sumY) )}}{${kec( (res.len * res.sumX2) - res.sumX2 )}} = ${kec(res.b)} \\]`}
                                    </MathJax>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            {rumus=="rata" && (
                                <div className="flex mx-auto w-fit gap-6 flex-wrap md:flex-nowrap">
                                    <div className="equation-container">
                                        <p className="mt-2">Rata-rata (x̄)</p>
                                        <MathJax>
                                            {`\\[ x̄ = \\frac{ΣXi}{n} = \\frac{${kec(res.sumX)}}{${res.len}} = ${kec(stats.avgX)} \\]`}
                                        </MathJax>
                                    </div>

                                    <div className="equation-container">
                                        <p className="mt-2">Rata-rata (ȳ)</p>
                                        <MathJax>
                                            {`\\[ ȳ = \\frac{ΣYi}{n} = \\frac{${kec(res.sumY)}}{${res.len}} = ${kec(stats.avgY)} \\]`}
                                        </MathJax>
                                    </div>
                                </div>
                            )}
                            {rumus=="r" && (
                                <div className="equation-container mx-auto text-[0.5rem] md:text-[1rem]">
                                    <p className="mt-2">Koefisien Korelasi (r)</p>
                                    <MathJax>
                                        {`\\[r = \\frac{(n \\cdot ΣXY)-(ΣX \\cdot ΣY)}{\\sqrt{[(n \\cdot ΣX^2) - (ΣX)^2] \\cdot [(n \\cdot ΣY^2) - (ΣY)^2]}} = \\]`}
                                    </MathJax>
                                    <MathJax>
                                        {`\\[ \\frac{(${res.len} \\cdot ${kec(res.sumXY)})-(${kec(res.sumX)} \\cdot ${kec(res.sumY)})}{\\sqrt{[(${res.len} \\cdot ${kec(res.sumX2)}) - (${kec(res.sumX)})^2] \\cdot [(${res.len} \\cdot ${kec(res.sumY2)}) - (${kec(res.sumY)})^2]}} = \\]`}
                                    </MathJax>
                                    <MathJax>
                                        {`\\[ \\frac{(${kec(res.len * res.sumXY)})-(${kec(res.sumX * res.sumY)})}{\\sqrt{[(${kec(res.len * res.sumX2)}) - ${kec(res.sumX2)}] \\cdot [(${kec(res.len * res.sumY2)}) - ${kec(res.sumY2)}]}} = \\]`}
                                    </MathJax>
                                    <MathJax>
                                        {`\\[ \\frac{${kec((res.len * res.sumXY) - (res.sumX * res.sumY))}}{\\sqrt{(${kec((res.len * res.sumX2) - res.sumX2)}) \\cdot (${kec((res.len * res.sumY2) - res.sumY2)})}} = \\frac{${kec((res.len * res.sumXY) - (res.sumX * res.sumY))}}{\\sqrt{${kec( ((res.len * res.sumX2) - res.sumX2) * ((res.len * res.sumY2) - res.sumY2) )}}} = \\]`}
                                    </MathJax>
                                    <MathJax>
                                        {`\\[ \\frac{${kec((res.len * res.sumXY) - (res.sumX * res.sumY))}}{${kec( Math.sqrt(((res.len * res.sumX2) - res.sumX2) * ((res.len * res.sumY2) - res.sumY2)) )}} = ${kec(res.r)} \\]`}
                                    </MathJax>
                                </div>
                            )}
                            {rumus=="n" && (
                                <div className="equation-container mx-auto">
                                    <p className="mt-2">Koefisien n</p>
                                    <MathJax>
                                        {`\\[b = \\frac{n \\cdot (ΣXY) - (ΣX \\cdot ΣY)}{(n \\cdot ΣX^2) - (ΣX)^2} = \\]`}
                                    </MathJax>
                                    <MathJax>
                                        {`\\[ \\frac{${res.len} \\cdot (${kec(res.sumXY)}) - (${kec(res.sumX)} \\cdot ${kec(res.sumY)})}{(${res.len} \\cdot ${kec(res.sumX2)}) - (${kec(res.sumX)})^2} = \\]`}
                                    </MathJax>
                                    <MathJax>
                                        {`\\[ \\frac{${kec(res.len * res.sumXY)} - ${kec(res.sumX * res.sumY)}}{${kec(res.len * res.sumX2)} - ${kec(res.sumX2)}} = \\]`}
                                    </MathJax>
                                    <MathJax>
                                        {`\\[ \\frac{${kec( (res.len * res.sumXY) - (res.sumX * res.sumY) )}}{${kec( (res.len * res.sumX2) - res.sumX2 )}} = ${kec(res.n)} \\]`}
                                    </MathJax>
                                </div>
                            )}

                            {rumus=="k" && (
                                <div className="equation-container mx-auto">
                                    <p className="mt-2">Koefisien Log(k)</p>
                                    <MathJax>
                                        {`\\[A = \\frac{(ΣY \\cdot ΣX^2) - (ΣX \\cdot ΣXY)}{n \\cdot (ΣX^2) - (ΣX)^2} = \\]`}
                                    </MathJax>
                                    <MathJax>
                                        {`\\[\\frac{(${kec(res.sumY)} \\cdot ${kec(res.sumX2)}) - (${kec(res.sumX)} \\cdot ${kec(res.sumXY)})}{${res.len} \\cdot (${kec(res.sumX2)}) - (${kec(res.sumX)})^2} = \\]`}
                                    </MathJax>
                                    <MathJax>
                                        {`\\[\\frac{(${kec(res.sumY * res.sumX2)}) - (${kec(res.sumX * res.sumXY)})}{${kec(res.len * res.sumX2)}) - ${kec(res.sumX2)}} = \\]`}
                                    </MathJax>
                                    <MathJax>
                                        {`\\[\\frac{${kec( (res.sumY * res.sumX2) - (res.sumX * res.sumXY) )}}{${kec( (res.len * res.sumX2) - res.sumX2)}} = ${kec(res.log_k)} \\]`}
                                    </MathJax>

                                    <MathJax>
                                        {`\\[ k = 10^{A} = 10^{${kec(res.log_k)}} = ${kec(res.k)} \\]`}
                                    </MathJax>
                                </div>
                            )}

                        </>
                    )}

                </div>
            </div>

        </div>
    );
}
