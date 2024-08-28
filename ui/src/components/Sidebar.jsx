import searchImg from "../assets/Frame.png";
import { Song } from "./Song";
import { useEffect } from "react";
import axios from "axios";
import { useSong } from "../context/songContext";
import { useState } from "react";
import { useMemo } from "react";
import { colors } from "../colors";

export const SideBar = ({show}) => {
  const { state, dispatch } = useSong();
  const { topSong, song,isTopTrack} = state;

  const [searchValue, setSearchValue] = useState();
  const [activeTrack,setIsActiveTrack] = useState(false);
  useEffect(() => {
    async function getSongData() {
      try {
        const songData = await axios.get(
          "http://cms.samespace.com/items/songs"
        );
        const { data } = songData.data;

        const songWithImg = data.map((song,index) => {
          const img_url = `http://cms.samespace.com/assets/${song.cover}`;
          return {
            ...song,
            img_url: img_url,
            background : colors[index]
          };
        });
        dispatch({ type: "SET_SONGS", payload: songWithImg });
        dispatch({ type: "TOP_SONGS", payload: songWithImg });
      } catch (error) {
        console.log(error);
      }
    }
    getSongData();
  }, []);


  const handleSearch = (e) => {
    setSearchValue(e.target.value.toLowerCase());
  };

  const filteredSongs = useMemo(() => {
    const songs = isTopTrack ? topSong : song;
    const resultSongs = searchValue
      ? songs.filter(
          (song) =>
            song.name.toLowerCase().includes(searchValue) ||
            song.artist.toLowerCase().includes(searchValue)
        )
      : songs;
    return resultSongs;
  }, [searchValue, topSong, song, isTopTrack]);

  return (
    
    <div className={!show ? "sidebar" : "sidebar none"}>
      <div className="heading">
        <p className={!activeTrack ? "toggle-song active-track" : "toggle-song"} onClick={() => {setIsActiveTrack(false); dispatch({type : 'TOP_TRACK',payload : false})}}>
          For You
        </p>
        <p  className={!activeTrack ? "toggle-top-song" : "toggle-song active-track"} onClick={() => {setIsActiveTrack(true);dispatch({type : 'TOP_TRACK', payload : true})}}>
          Top Tracks
        </p>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Song, Artist"
          onChange={handleSearch}
        />
        <img id="search-img" src={searchImg} alt="search-logo" />
      </div>
      <div className="song-list">
        {filteredSongs.map((song) => {
          return <Song key={song.id} song={song}/>;
        })}
      </div>
    </div>

  );
};
