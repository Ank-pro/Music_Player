
import searchImg from "../assets/Frame.png";
import { Song } from "./Song";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export const SideBar = () => {
  const [song, setSong] = useState([]);

  useEffect(() => {
    async function getSongData() {
      try {
        const songData = await axios.get(
          "http://cms.samespace.com/items/songs"
        );
        const {data} = songData.data;
        
        const songWithImg = data.map((song)=>{
            const img_url = `http://cms.samespace.com/assets/${song.cover}`;
            return {
                ...song,
                img_url : img_url,
            }
        })

        setSong(songWithImg)
        
      } catch (error) {
        console.log(error);
      }
    }
    getSongData();
  }, []);

//   useEffect(() => {
//     axios.get("http://cms.samespace.com/items/songs");
//   }, []);

  return (
    <div className="sidebar">
      <div className="heading">
        <p>For You</p>
        <p>Top Tracks</p>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search Song, Artist" />
        <img src={searchImg} alt="search-logo" />
      </div>
      <div className="song-list">
        {song.map(song =>{
            return <Song key={song.id} song={song}/>
        })}
      </div>
    </div>
  );
};
