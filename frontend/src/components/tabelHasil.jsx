import { useMemo } from "react";
import KecermatanSettings from "./kecermatanSettings.jsx";

export default function TabelHasil({ applyKecermatan, regressionResult, colDef, ...props }) {
    const tableData = useMemo(() => {
        if (!regressionResult?.cleaned_data) return [];
        const a = regressionResult.a;
        const b = regressionResult.b;
        const isLog = regressionResult.model === "logarithmic";

        return regressionResult.cleaned_data.map((row, i) => {
            const X = Number(row.X);
            const Y = Number(row.Y);

            // force-fix ANY non-number into 0
            const safeX = Number.isFinite(X) ? X : 0;
            const safeY = Number.isFinite(Y) ? Y : 0;

            //console.log("safeX : " + safeX, typeof safeX);
            //console.log("safeY : " + safeY, typeof safeY);

            // force logs to never be NaN
            const xlog = isLog && safeX > 0 ? Math.log10(safeX) : 0;
            const ylog = isLog && safeY > 0 ? Math.log10(safeY) : 0;

            //console.log("xlog : " + xlog, typeof xlog);
            //console.log("ylog : " + ylog, typeof ylog);

            // force prediction to never be NaN
            const A = Number.isFinite(Number(a)) ? Number(a) : 0;
            const B = Number.isFinite(Number(b)) ? Number(b) : 0;

            //console.log("A : " +  A, typeof A);
            //console.log("B : " + B, typeof B);

            const yPred = isLog ? A + B * xlog : A + B * safeX;

            //console.log("yPred : " + yPred, typeof yPred);

            // force residual to never be NaN
            const residual = safeY - yPred;

            //console.log("residual : " + residual, typeof residual);

            return {
                no: i + 1,
                X: safeX,
                Y: safeY,
                xlog,
                ylog,
                yPred,
                residual,
            };
        });
    }, [regressionResult]);

    return (
        <div className="my-8 border-2 border-t-8 border-primary-dark bg-white rounded-3xl p-8">
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
                        <div className="w-20 md:w-full p-2 md:p-4">{colDef.x} (X)</div>
                        <div className="w-20 md:w-full p-2 md:p-4">{colDef.y} (Y)</div>
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
                        <div className="w-20 md:w-full p-2 md:p-4">{colDef.x} (X)</div>
                        <div className="w-20 md:w-full p-2 md:p-4">{colDef.y} (Y)</div>
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

                            <div className="w-20 md:w-full p-2 md:p-4 overflow-x-auto">{applyKecermatan(Math.pow(row.xlog,2))}</div>
                            <div className="w-20 md:w-full p-2 md:p-4 overflow-x-auto">{applyKecermatan(Math.pow(row.ylog,2))}</div>
                            <div className="w-20 md:w-full p-2 md:p-4 overflow-x-auto">{applyKecermatan(row.xlog * row.ylog)}</div>
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
        </div>
    )
}
