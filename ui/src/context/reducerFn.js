export const songReducerFn = (state,action)=>{
    switch(action.type){
        case 'SET_SONGS':
            return{
                ...state,
                song : action.payload
            }
        case 'TOP_SONGS':
            const top = action.payload.filter(song => song.top_track && song);
            return {
                ...state,
                topSong : top,
            }
        case 'PLAY_SONG':
            return{
                ...state,
                activeSong : action.payload,
                isActive : true,
            }
        case 'PAUSE_SONG':
            return{
                ...state,
                isActive : !state.isActive,
            }
    }
}