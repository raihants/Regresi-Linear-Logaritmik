import KecermatanSettings from "./kecermatanSettings.jsx";

export default function TabelHasil({ applyKecermatan, regressionResult, tableData, ...props }) {
    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <p className=" text-xl md:text-2xl font-bold">Tabel Hasil Perhitungan Detail</p>
                {props.kecermatan != null && (
                    <div className="text-center">
                        <p className="w-full">Kecermatan</p>
                        <KecermatanSettings kecermatan={props.kecermatan} setKecermatan={props.setKecermatan} />
                    </div>
                )}
            </div>

            <div className="flex text-[0.85rem] md:text-xl overflow-x-auto items-center text-center bg-gray-300">
                {regressionResult.model === "logarithmic" ? (
                    <>
                        {/* NOTE: Log */}
                        <div className="w-20 md:w-1/2 p-2 md:p-4">No</div>
                        <div className="w-20 md:w-full p-2 md:p-4">X</div>
                        <div className="w-20 md:w-full p-2 md:p-4">Y</div>
                        <div className="w-20 md:w-full p-2 md:p-4">Xi [Log(X)]</div>
                        <div className="w-20 md:w-full p-2 md:p-4">Yi [Log(Y)]</div>
                        <div className="w-20 md:w-full p-2 md:p-4">Xi²</div>
                        <div className="w-20 md:w-full p-2 md:p-4">Yi²</div>
                        <div className="w-20 md:w-full p-2 md:p-4">XiYi</div>
                    </>
                ) : (
                    <>
                        {/* NOTE: Linear */}
                        <div className="w-20 md:w-1/2 p-2 md:p-4">No</div>
                        <div className="w-20 md:w-full p-2 md:p-4">X</div>
                        <div className="w-20 md:w-full p-2 md:p-4">Y</div>
                        <div className="w-20 md:w-full p-2 md:p-4">X²</div>
                        <div className="w-20 md:w-full p-2 md:p-4">Y²</div>
                        <div className="w-20 md:w-full p-2 md:p-4">XY</div>
                        <div className="w-32 md:w-full p-2 md:p-4">Y(Regresi)</div>
                        <div className="w-20 md:w-full p-2 md:p-4">Residual</div>
                    </>
                )}
            </div>

            {tableData.map(row => (
                <div key={row.no} className="flex text-[0.85rem] md:text-xl items-center text-center border-b border-gray-300">
                    {regressionResult.model === "logarithmic" ? (
                        <>
                            {/* NOTE: Log */}
                            <div className="w-20 md:w-1/2 p-2 md:p-4">{row.no}</div>
                            <div className="w-20 md:w-full p-2 md:p-4 overflow-x-auto">{applyKecermatan(row.X)}</div>
                            <div className="w-20 md:w-full p-2 md:p-4 overflow-x-auto">{applyKecermatan(row.Y)}</div>
                            <div className="w-20 md:w-full p-2 md:p-4 overflow-x-auto">{applyKecermatan(row.xlog)}</div>
                            <div className="w-20 md:w-full p-2 md:p-4 overflow-x-auto">{applyKecermatan(row.ylog)}</div>

                            <div className="w-20 md:w-full p-2 md:p-4 overflow-x-auto">{applyKecermatan(Math.pow(row.X,2))}</div>
                            <div className="w-20 md:w-full p-2 md:p-4 overflow-x-auto">{applyKecermatan(Math.pow(row.Y,2))}</div>
                            <div className="w-20 md:w-full p-2 md:p-4 overflow-x-auto">{applyKecermatan(row.X * row.Y)}</div>
                        </>
                    ) : (
                        <>
                            {/* NOTE: Linear */}
                            <div className="w-20 md:w-1/2 p-2 md:p-4">{row.no}</div>
                            <div className="w-20 md:w-full p-2 md:p-4 overflow-x-auto">{applyKecermatan(row.X)}</div>
                            <div className="w-20 md:w-full p-2 md:p-4 overflow-x-auto">{applyKecermatan(row.Y)}</div>
                            <div className="w-20 md:w-full p-2 md:p-4 overflow-x-auto">{applyKecermatan(Math.pow(row.X,2))}</div>
                            <div className="w-20 md:w-full p-2 md:p-4 overflow-x-auto">{applyKecermatan(Math.pow(row.Y,2))}</div>
                            <div className="w-20 md:w-full p-2 md:p-4 overflow-x-auto">{applyKecermatan(row.X * row.Y)}</div>
                            <div className="w-32 md:w-full p-2 md:p-4 overflow-x-auto">{applyKecermatan(row.yPred)}</div>
                            <div className="w-20 md:w-full p-2 md:p-4 overflow-x-auto">{applyKecermatan(row.residual)}</div>
                        </>
                    )}
                </div>
            ))}

            <div className="text-[0.85rem] md:text-xl items-center text-center border-b border-gray-300 flex font-bold">
                {regressionResult.model === "logarithmic" ? (
                    <>
                        {/* NOTE: Log */}
                        <div className="w-20 md:w-1/2 p-2 md:p-4"></div>
                        <div className="w-20 md:w-full p-2 md:p-4 gradient-text overflow-x-auto"></div>
                        <div className="w-20 md:w-full p-2 md:p-4 gradient-text overflow-x-auto"></div>
                        <div className="w-20 md:w-full p-2 md:p-4 gradient-text overflow-x-auto">ΣX={applyKecermatan(regressionResult.sumX)}</div>
                        <div className="w-20 md:w-full p-2 md:p-4 gradient-text overflow-x-auto">ΣY={applyKecermatan(regressionResult.sumY)}</div>
                        <div className="w-20 md:w-full p-2 md:p-4 gradient-text overflow-x-auto">ΣX²={applyKecermatan(regressionResult.sumX2)}</div>
                        <div className="w-20 md:w-full p-2 md:p-4 gradient-text overflow-x-auto">ΣY²={applyKecermatan(regressionResult.sumY2)}</div>
                        <div className="w-20 md:w-full p-2 md:p-4 gradient-text overflow-x-auto">ΣXY={applyKecermatan(regressionResult.sumXY)}</div>
                    </>
                ) : (
                    <>
                        {/* NOTE: Linear */}
                        <div className="w-20 md:w-1/2 p-2 md:p-4"></div>
                        <div className="w-20 md:w-full p-2 md:p-4 gradient-text overflow-x-auto">ΣX={applyKecermatan(regressionResult.sumX)}</div>
                        <div className="w-20 md:w-full p-2 md:p-4 gradient-text overflow-x-auto">ΣY={applyKecermatan(regressionResult.sumY)}</div>
                        <div className="w-20 md:w-full p-2 md:p-4 gradient-text overflow-x-auto">ΣX²={applyKecermatan(regressionResult.sumX2)}</div>
                        <div className="w-20 md:w-full p-2 md:p-4 gradient-text overflow-x-auto">ΣY²={applyKecermatan(regressionResult.sumY2)}</div>
                        <div className="w-20 md:w-full p-2 md:p-4 gradient-text overflow-x-auto">ΣXY={applyKecermatan(regressionResult.sumXY)}</div>
                        <div className="w-20 md:w-full p-2 md:p-4 gradient-text"></div>
                        <div className="w-20 md:w-full p-2 md:p-4 gradient-text"></div>
                    </>
                )}
            </div>
        </>
    )
}
