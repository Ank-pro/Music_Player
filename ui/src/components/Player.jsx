import { useState, useRef } from "react";
import { useSong } from "../context/songContext";
import dotImg from "../assets/dots.png";
import playImg from "../assets/pause.png";
import pauseImg from "../assets/play.png";
import prevImg from "../assets/prev.png";
import nextImg from "../assets/next.png";
import volImg from "../assets/volume.png";
import { useEffect } from "react";

export const Player = () => {
  const { state, dispatch } = useSong();
  const { activeSong, isActive } = state;
  const [progress, setProgress] = useState(10);
  const audioRef = useRef(null);

  console.log(isActive);

  useEffect(() => {
    if (isActive) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [activeSong, isActive]);

  const handleSlider = (e) => {
    const newValue = e.target.value;
    setProgress(newValue);
    // Update audio playback position if desired
    audioRef.current.currentTime = (newValue / 100) * audioRef.current.duration;
  };

  const handlePlay = () => {
    dispatch({ type: "PAUSE_SONG" });
  };

  return (
    <div className="player">
      <div className="player-heading">
        <p id="player-name">{activeSong.name}</p>
        <p id="player-artist">{activeSong.artist}</p>
      </div>

      <div className="player-img">
        <img src={activeSong.img_url} alt="player-image" />
      </div>

      <div className="music-cta">
        <div className="seeker"></div>
        <input
          type="range"
          className="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSlider}
        />
        <div className="controllers">
          <div className="dots">
            <img src={dotImg} alt="dots" />
          </div>
          <div className="action">
            <img src={prevImg} alt="" className="change-song" />
            <img
              src={!isActive ? pauseImg : playImg}
              alt=""
              id="play"
              onClick={handlePlay}
            />
            <img src={nextImg} alt="" className="change-song" />
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
