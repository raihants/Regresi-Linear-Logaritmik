import { useState } from 'react';

export default function InputPage({rowData, setRowData}) 
{
    const [colDef, setColDef] = useState({ x:"Nilai X", y:"Nilai Y"})

    return(
        <div className="w-3/4 mx-auto flex gap-8 mb-12">
            <div className="w-full bg-white flex flex-col rounded-3xl p-4 px-8 shadow-xl border-2 border-secondary border-t-8">
                <div className="flex items-center gap-2">
                    <i className="bi bi-table text-white bg-secondary py-2 px-3 text-xl rounded-xl"/>
                    <p className="font-bold text-2xl">Input Manual</p>
                </div>

                {/* NOTE: X and Y Value */}
                <div className='flex gap-2 text-xl'>
                    <div className='w-full bg-linear-to-br from-white to-secondary/20 rounded-xl p-4 shadow-md'>
                        <p>Label Variabel X</p>
                        <input type="text" className='rounded-xl py-2 px-4 bg-white shadow-xl mt-2' placeholder='Misal : Jam Belajar' onChange={(e)=> { setColDef(prev => ({...prev, x: e.target.value})); }}/>
                    </div>
                    <div className='w-full bg-linear-to-br from-white to-secondary/20 rounded-xl p-4 shadow-md'>
                        <p>Label Variabel X</p>
                        <input type="text" className='rounded-xl py-2 px-4 bg-white shadow-xl mt-2' placeholder='Misal : Nilai Ujian' onChange={(e)=> { setColDef(prev => ({...prev, y: e.target.value})); }} />
                    </div>
                </div>

                {/* NOTE: Main Table */}
                <div className='text-2xl my-8'>
                    <div className='flex'>
                        <div className='w-1/2'>No.</div>
                        <p className='w-full'>{colDef.x}</p>
                        <p className='w-full'>{colDef.y}</p>
                    </div>

                    {rowData.map((data, key) => (
                        <div className='flex gap-2 my-2' key={key}>
                            <div className='w-1/2 py-2'>{key+1}</div>
                            <input 
                                type="number" 
                                className='w-full shadow-xl rounded-xl py-2 px-4 bg-white' 
                                value={data.x} 
                                onChange={(e)=> { setRowData(prev => { const c = [...prev]; c[key] = {...c[key], x:e.target.value}; return c;})}} 
                            />
                            <input 
                                type="number" 
                                className='w-full shadow-xl rounded-xl py-2 px-4 bg-white' 
                                value={data.y} 
                                onChange={(e)=> { setRowData(prev => { const c = [...prev]; c[key] = {...c[key], y:e.target.value}; return c;})}} 
                            />
                        </div>
                    ))}
                </div>

                <div className='flex items-center gap-4 text-white font-bold text-xl'>
                    <button type="button" className='w-full bg-success p-2 rounded-xl shadow-[0_0_16px] shadow-success/50' onClick={()=> { setRowData(prev => [...prev, {x: 0, y:0}])}}>+ Tambah Baris</button>
                    <button type="button" className='w-full bg-danger p-2 rounded-xl shadow-[0_0_16px] shadow-danger/50' onClick={()=> { setRowData(prev => prev.slice(0, -1)) }} ><i className='bi bi-trash3-fill mr-1' />Hapus Baris</button>
                </div>

                <button type="button" className='text-white font-bold text-xl w-full bg-success p-2 rounded-xl shadow-[0_0_16px] shadow-success/50 my-4'><i className='bi bi-calculator-fill mr-1'/>Proses Data & Hitung Regresi</button>
            </div>

            <div className="flex flex-col w-1/3 gap-8">

                <div className='bg-[#AEDEFC] p-4 rounded-3xl text-primary-dark border-primary-dark border-2 text-xl'>
                    <div className='flex gap-2'>
                        <i className='bi bi-info-circle-fill' />
                        <p className='font-bold'>Validasi Data</p>
                    </div>
                    <ul className='list-item px-4'>
                        <li>Minimal 2 Pasang data (X, Y)</li>
                        <li>Hanya nilai numerik yang diterima</li>
                        <li>Missing Value akan dideteksi</li>
                        <li>Data akan dinormalisasi jika diperlukan</li>
                    </ul>
                </div>

                <div className="bg-white flex flex-col rounded-3xl p-4 px-8 shadow-xl border-2 border-success border-t-8">
                    <div className="flex items-center gap-2">
                        <i className="bi bi-filetype-csv text-white bg-success py-2 px-3 text-xl rounded-xl"/>
                        <p className="font-bold text-2xl">Import File CSV </p>
                    </div>

                    <div className='mx-auto mt-16 mb-8 flex flex-col items-center text-center'>
                        <i className='bi bi-cloud-upload-fill font-bold text-8xl' />
                        <p className='text-xl'>Klik atau drag file CSV di sini</p>
                        <p>Format : Kolom X, Kolom Y</p>
                    </div>

                    <div className='flex flex-col w-full text-white font-bold text-xl'>
                        <button type="button" className="bg-success p-4 rounded-xl shadow-[0_0_16px] shadow-success/50">Pilih File CSV</button>
                    </div>
                </div>

                <div className="bg-white flex flex-col rounded-3xl p-4 px-8 shadow-xl border-2 border-warning border-t-8">
                    <div className="flex items-center gap-2">
                        <i className="bi bi-filetype-xlsx text-white bg-warning py-2 px-3 text-xl rounded-xl"/>
                        <p className="font-bold text-2xl">Import File CSV </p>
                    </div>

                    <div className='mx-auto mt-16 mb-8 flex flex-col items-center text-center'>
                        <i className='bi bi-cloud-upload-fill font-bold text-8xl' />
                        <p className='text-xl'>Klik atau drag file Excel di sini</p>
                        <p>Format : Kolom X, Kolom Y</p>
                    </div>

                    <div className='flex flex-col w-full text-white font-bold text-xl'>
                        <button type="button" className="bg-warning p-4 rounded-xl shadow-[0_0_16px] shadow-warning/50">Pilih File Excel</button>
                    </div>
                </div>

            </div>
        </div>
    )
}
