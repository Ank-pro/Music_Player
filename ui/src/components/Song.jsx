import { useSong } from "../context/songContext"


export const Song = ({song})=>{
    const {dispatch} = useSong();
    
    const handleSong = ()=>{
        dispatch({type : 'PLAY_SONG', payload : song})
    }

    console.log(song)
    return <div className="song" onClick={handleSong}>
        <div className="song-img">
        <img src={song.img_url} alt="image" />
        </div>
        <div className="song-details">
                <div className="song-name">
                <p id="name">{song.name}</p>
                <p id="artist">{song.artist}</p>
                </div>
        
                <p id="duration">Duration</p>           
        </div>
    </div>
}