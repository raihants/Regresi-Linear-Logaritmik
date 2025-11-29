import { useState } from "react";

export default function OutputPage() {
    const [dotColor, setDotColor] = useState("#3b82f6");
    const [lineColor, setLineColor] = useState("#ef4444");

    return (
        <div className="w-[90%] md:w-3/4 mx-auto mb-12">
            <div className="bg-white border-2 border-t-8 border-primary-dark rounded-3xl p-8">
                <p className="text-xl md:text-2xl font-bold">Grafik Scatter Plot dengan Garis Regresi</p>

                <div className="flex flex-col gap-4 items-center text-center my-24">
                    <i className="bi bi-graph-up font-bold text-6xl md:text-8xl" />
                    <div className="flex flex-col">
                        <p>Grafik Scatter Plot</p>
                        <p>Titik data + Garis Regresi Linear</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex">
                            <div className="shadow-[0_0_16px] shadow-primary/50 bg-primary rounded-full p-3 mr-2"/>
                            Data Aktual
                        </div>
                        <div className="flex items-center">
                            <div className="shadow-[0_0_16px] shadow-danger/50 bg-danger rounded-full px-4 mr-2 h-1.5"/>
                            Garis Regresi 
                        </div>
                    </div>
                </div>

                <div className="flex justify-between w-full flex-wrap md:flex-nowrap gap-y-2 md:gap-0 text-[0.85rem] md:text-[1rem]">
                    <div className="flex gap-1 md:gap-2 items-center">
                        <p>Warna Titik</p>
                        <input type="color" className="rounded-xl" value={dotColor} onChange={(e)=> {setDotColor(e.target.value)}} />
                    </div>

                    <div className="flex gap-1 md:gap-2 items-center">
                        <p>Warna Garis</p>
                        <input type="color" className="rounded-xl" value={lineColor} onChange={(e)=> {setLineColor(e.target.value)}} />
                    </div>

                    <div className="flex gap-2 items-center">
                        <p>Ukuran Titik</p>
                        <input className="accent-black w-full md:w-1/2" min="0" max="100" type="range"/>
                    </div>
                </div>

                <button type="button" className="bg-success p-2 md:p-4 rounded-xl shadow-[0_0_16px] shadow-success/50 text-white font-bold text-[0.85rem] md:text-xl w-full mt-8"><i className="bi bi-arrow-clockwise mr-1"/>Perbarui Grafik</button>
            </div>
        </div>
    )
}
