import { useSong } from "../context/songContext"

export const Player = ()=>{
    const {state} = useSong();
    const {activeSong} = state;
    return <div className="player">
        <div className="player-heading">
            <p id="player-name">{activeSong.name}</p>
            <p id="player-artist">{activeSong.artist}</p>
        </div>

        <div className="player-img">
            <img src={activeSong.img_url} alt="player-image" />
        </div>

        <div className="music-cta">
        
        </div>
    </div>
}