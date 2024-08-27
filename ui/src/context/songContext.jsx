import { useContext,useReducer,createContext } from "react";
import { songReducerFn } from "./reducerFn";

const initialState = {
    song : [],
    topSong : [],
    isTopTrack : false,
    activeSong : {},
    isActive : false,
    background : 'rgb(0, 0, 0, 1)'
}
const SongContext = createContext(initialState);

const SongContextProvider =({children})=>{
    const [state,dispatch] = useReducer(songReducerFn,initialState);

    return <SongContext.Provider value={{state,dispatch}}>
        {children}
    </SongContext.Provider>
}

const useSong = ()=> useContext(SongContext);
export {SongContextProvider,useSong};

