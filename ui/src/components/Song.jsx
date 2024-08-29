import { useEffect } from "react";
import { useSong } from "../context/songContext";
import { useState } from "react";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export const Song = ({ song }) => {
  const { dispatch,state : {activeSong} } = useSong();
  const [duration,setDuration] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const isActive =  song.id === activeSong.id;

  console.log(activeSong);

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
    <div className={isActive ? "song active-song" : "song"} onClick={handleSong}>
      <div className="song-img">
      <LazyLoadImage
          src={song.img_url}
          alt="image"
          effect="blur"
          afterLoad={() => setImageLoaded(true)}
          className={imageLoaded ? "" : "blur"}
        />
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
