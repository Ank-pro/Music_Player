import { useContext,useReducer,createContext } from "react";
import { songReducerFn } from "./reducerFn";

const initialState = {
    song : [],
    topSong : [],
    activeSong : {},
    isActive : false,
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

