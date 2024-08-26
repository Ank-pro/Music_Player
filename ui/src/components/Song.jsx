import { useEffect } from "react";
import { useSong } from "../context/songContext";
import { useState } from "react";

export const Song = ({ song }) => {
  const { dispatch,state : {activeSong} } = useSong();
  const [duration,setDuration] = useState(null);

  const isExist = activeSong.id === song.id;

  useEffect(() => {
    const audio = new Audio(song.url);

    audio.addEventListener('loadedmetadata',()=>{
        const mins = Math.floor(audio.duration / 60);
        const secs = Math.floor(audio.duration % 60);
        setDuration(`${mins}:${secs}`);
    })

    return ()=>{audio.removeEventListener('loadedmetadata',()=>{})}

  }, [song.url]);

  const handleSong = () => {
    dispatch({ type: "PLAY_SONG", payload: song });
  };

  return (
    <div className={isExist ? "song active-song" : "song"} onClick={handleSong}>
      <div className="song-img">
        <img src={song.img_url} alt="image" />
      </div>
      <div className="song-details">
        <div className="song-name">
          <p id="name">{song.name}</p>
          <p id="artist">{song.artist}</p>
        </div>

        <p id="duration">{duration}</p>
      </div>
    </div>
  );
};
