import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function OutputPage({ regressionResult }) {
    const canvasRef = useRef(null);
    const chartRef = useRef(null); // simpan instance chart

    useEffect(() => {
        if (!regressionResult) return;
        const ctx = canvasRef.current.getContext("2d");

        const scatterData = regressionResult.cleaned_data?.map(d => ({ x: d.X, y: d.Y })) || [];
        const lineData = scatterData.map(p => ({
            x: p.x,
            y: regressionResult.a + regressionResult.b * p.x
        }));

        // 🔥 Hancurkan chart lama kalau ada
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        // 🔥 Buat chart baru
        chartRef.current = new Chart(ctx, {
            type: "scatter",
            data: {
                datasets: [
                    {
                        label: "Data Aktual",
                        data: scatterData,
                        pointRadius: 6,
                        backgroundColor: "rgba(0, 123, 255, 0.7)"
                    },
                    {
                        label: "Garis Regresi",
                        type: "line",
                        data: lineData,
                        borderWidth: 3,
                        borderColor: "red",
                        pointRadius: 0,
                        tension: 0
                    }
                ]
            },
            options: {
                animation: false,
                responsive: true,
                maintainAspectRatio: false
            }
        });

        // Cleanup saat unmount component
        return () => {
            if (chartRef.current) chartRef.current.destroy();
        };

    }, [regressionResult]);

    return (
        <div className="w-[90%] md:w-3/4 mx-auto mb-12">
            <div className="bg-white p-8 rounded-3xl shadow-xl">
                <p className="text-xl md:text-2xl font-bold mb-8">Visualisasi Scatter Plot</p>
                <div style={{ height: "350px" }}>
                    <canvas ref={canvasRef}></canvas>
                </div>
            </div>
        </div>
    );
}
