import searchImg from "../assets/Frame.png";
import { Song } from "./Song";
import { useEffect } from "react";
import axios from "axios";
import { useSong } from "../context/songContext";
import { useState } from "react";
import { useMemo } from "react";

export const SideBar = () => {
  const {state,dispatch} = useSong();
  
  const {topSong,song} = state;

  const [isTopSong, setIsTopSong] = useState(false);
  const [searchValue,setSearchValue] = useState();
 
  
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
        dispatch({type : 'SET_SONGS',payload : songWithImg})
        dispatch({type : 'TOP_SONGS',payload : songWithImg})
        
      } catch (error) {
        console.log(error);
      }
    }
    getSongData();
  }, []);

  const handleSearch = (e)=>{
    setSearchValue(e.target.value.toLowerCase());
  }

  const filteredSongs = useMemo(()=>{
    const songs = isTopSong ? topSong : song;
    const resultSongs = searchValue ? songs.filter(song=> song.name.toLowerCase().includes(searchValue) || song.artist.toLowerCase().includes(searchValue)) : songs;
    return resultSongs;
  },[searchValue,topSong,song,isTopSong]);

  return (

    <div className="sidebar">
      <div className="heading">
        <p id="toggle-song"  onClick={()=>setIsTopSong(false)}>For You</p>
        <p id="toggle-top-song" onClick={()=>setIsTopSong(true)}>Top Tracks</p>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search Song, Artist" onChange={handleSearch}/>
        <img src={searchImg} alt="search-logo" />
      </div>
      <div className="song-list">
        {filteredSongs.map(song =>{
            return <Song key={song.id} song={song}/>
        })}
      </div>
    </div>
  );
};
