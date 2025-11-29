export default function ChatPrompt({setChat}) {

    const aiMessage = (msg) => {
        return (
            <div className="bg-white max-w-3/4 shadow-[0_2px_8px] shadow-gray-400 p-4 rounded-3xl rounded-bl-sm mr-auto my-4">
                <p className="text-[0.75rem] md:text-[1rem]">{msg}</p>
            </div>
        )
    }

    const userMessage = (msg) => {
        return (
            <div className="base-bg-gradient-br text-white max-w-3/4 shadow-[0_2px_8px] shadow-primary p-4 rounded-3xl ml-auto rounded-br-sm my-4">
                <p className="text-[0.75rem] md:text-[1rem]">{msg}</p>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-3xl shadow-xl h-full border-primary border-2 text-start">
            <div className="flex gap-2 items-center px-5 py-6 base-bg-gradient-br rounded-t-3xl text-white font-bold text-2xl">
                <i className="bi bi-robot"/> 
                <p>AI Asisten</p>
                <button type="button" className="ml-auto bg-white/30 px-3 py-2 rounded-full font-normal text-[1rem]" onClick={()=> {setChat(false)}}>X</button>
            </div>
            <div className="flex flex-col overflow-y-auto h-80 px-5">
                {aiMessage("Marvel spider man 2 fitgirl repack torrent")}
                {userMessage("Marvel spider man 2 fitgirl repack torrent")}
                {aiMessage("Marvel spider man 2 fitgirl repack torrent")}
                {userMessage("Marvel spider man 2 fitgirl repack torrent")}
            </div>
            <div className="bg-white border-t-2 border-gray-300 p-5 rounded-b-3xl flex justify-between">
                <input type="text" className="w-full focus:border-none p-2 rounded-3xl" placeholder="Ketik pesan..." />
                <button type="button" className="text-white text-xl bg-linear-to-br from-primary to-secondary px-3 py-2 rounded-full hover:from-secondary hover:to-primary transition-colors duration-300 ease-in-out"><i className="bi bi-send-fill mr-1 pt-2" /></button>
            </div>
        </div>
    )
}
