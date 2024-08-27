export const songReducerFn = (state, action) => {
    switch (action.type) {
        case 'SET_SONGS':
            return {
                ...state,
                song: action.payload
            }
        case 'TOP_SONGS':
            const top = action.payload.filter(song => song.top_track && song);
            return {
                ...state,
                topSong: top,
            }
        case 'PLAY_SONG':
            return {
                ...state,
                activeSong: action.payload,
                isActive: true,
                background : action.payload.background
            }
        case 'PAUSE_SONG':
            return {
                ...state,
                isActive: !state.isActive,
            }
        case 'TOP_TRACK': {
            return {
                ...state,
                isTopTrack: action.payload,
            }
        }
        case 'PREV_SONG': {
            const songList = state.isTopTrack ? state.topSong : state.song;
            const prevIndex = (songList.findIndex(({ id }) => state.activeSong.id === id) - 1 + songList.length) % songList.length;
            return {
                ...state,
                activeSong: songList[prevIndex],
                isActive: true,
                background : songList[prevIndex].background
            }
        }
        case 'NEXT_SONG': {
            const songList = state.isTopTrack ? state.topSong : state.song;
            const nextIndex = (songList.findIndex(({ id }) => state.activeSong.id === id) + 1) % songList.length;
            return {
                ...state,
                activeSong: songList[nextIndex],
                isActive: true,
                background : songList[nextIndex].background
            }
        }
    }
}