import { createContext,useState } from "react";

export const FetchContext = createContext();

export const FetchContextState = ({children})=>{
    const [fetchSong,setFetchSong] = useState(false)
    const [fetchPlaylist,setFetchPlaylist] = useState(false)
    
    return(
        <FetchContext.Provider value={{fetchSong,setFetchSong,setFetchPlaylist,fetchPlaylist}}>
            {children}
        </FetchContext.Provider>
    )
}