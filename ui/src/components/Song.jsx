

export const Song = ({song})=>{
    
    return <div className="song">
        <div className="song-img">
        <img src={song.img_url} alt="image" />
        </div>
        <div className="song-details">
            <div className="song-name">
                <p>{song.name}</p>
                <p>{song.artist}</p>
            </div>
            <div className="duration">
                <p>Duration</p>
            </div>
        </div>
    </div>
}