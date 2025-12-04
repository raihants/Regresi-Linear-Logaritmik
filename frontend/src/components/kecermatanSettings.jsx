
export default function KecermatanSettings({kecermatan, setKecermatan}) {
    return (
        <>
            <button 
                type='button' 
                className='disabled:text-gray-300'
                onClick={()=> setKecermatan(Number(kecermatan)-1)}
                disabled={kecermatan<=0}
            >
                <i className='bi bi-caret-left-fill' />
            </button>

            <input 
                type="number" 
                className='w-20 text-center border rounded-xl' 
                value={kecermatan} 
                onChange={(e)=> {
                    setKecermatan(Math.abs(Number(e.target.value))); 
                }} 
            />

            <button 
                type='button' 
                className='disabled:text-gray-300'
                onClick={()=> setKecermatan(Number(kecermatan)+1)}
                disabled={kecermatan>=16}
            >
                <i className='bi bi-caret-right-fill' />
            </button>
        </>
    )
}
