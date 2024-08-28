import { useState, useRef } from "react";
import { useSong } from "../../context/songContext";
import dotImg from "../../assets/dots.png";
import playImg from "../../assets/pause.png";
import pauseImg from "../../assets/play.png";
import prevImg from "../../assets/prev.png";
import nextImg from "../../assets/next.png";
import volImg from "../../assets/volume.png";
import { useEffect } from "react";
import fallbackImg from '../../assets/fallback.jpg'


export const Player = () => {
  const { state, dispatch } = useSong();
  const { activeSong, isActive } = state;
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);


  // console.log(isActive);

  useEffect(() => {
    const audio = audioRef.current;

    if (isActive) {
      audio.play();
      audio.addEventListener("timeupdate", () => {
        const duration = audio.duration;
        const currentTime = audio.currentTime;
        const percentage = ((currentTime / duration) * 100).toFixed(2);
        setProgress(percentage);
      });
    } else {
      audio.pause();
    }

  }, [activeSong, isActive]);


  const handleSlider = (e) => {
    const newTime = e.target.value;
    setProgress(newTime);
    audioRef.current.currentTime = (audioRef.current.duration / 100) * newTime;
  };

  const handlePlay = () => {
    dispatch({ type: "PAUSE_SONG" });
  };

  const handlePrev = ()=>{
    dispatch({type : 'PREV_SONG'})
  }

  const handleNext = ()=>{
    dispatch({type : 'NEXT_SONG'})
  }


  return (
    <div className="player">
      <div className="player-heading">
        <p id="player-name">{activeSong.name}</p>
        <p id="player-artist">{activeSong.artist}</p>
      </div>

      <div className="player-img">
        <img src={activeSong.url ? activeSong.img_url : fallbackImg} alt="player-image"/>
      </div>

      <div className="music-cta">
        <div className="seeker" style={{ width: `${progress}%` }}></div>
        <input
          type="range"
          className="range"
          min="0"
          max="99"
          value={progress}
          onChange={handleSlider}
        />
        <div className="controllers">
          <div className="dots">
            <img src={dotImg} alt="dots" />
          </div>
          <div className="action">
            <img src={prevImg} alt="" id="rev" className="change-song" onClick={handlePrev}/>
            <img
              src={!isActive ? pauseImg : playImg}
              alt=""
              id="play"
              onClick={handlePlay}
      
            />
            <img src={nextImg} alt="" id="next" className="change-song" onClick={handleNext}/>
          </div>
          <div className="vol">
            <img src={volImg} alt="" />
          </div>
        </div>
      </div>
      <audio src={activeSong.url} ref={audioRef} />
    </div>
  );
};
