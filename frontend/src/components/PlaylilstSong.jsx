import React from "react";
import { useContext, useState, useRef } from "react";
import axios from 'axios'
import { SongContext } from "../Context/SongContext";
import { decodeToken } from "react-jwt";
import musicbg from "../assets/musicbg.jpg";
import { useNavigate } from "react-router-dom";
import {CgRemoveR} from 'react-icons/cg'
import { FetchContext } from "../Context/FetchContext";


const PlaylilstSong = ({ title, artistName, songSrc ,playlistId }) => {
  const { song, audio, __URL__ } = useContext(SongContext);
  const {setFetchPlaylist} = useContext(FetchContext)
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const decoded = decodeToken(token);
 
  // Play the song when the user clicks on the song card
  const handlePlay = () => {
    audio.pause();
    audio.src = `${__URL__}/api/v1/stream/${songSrc}`;
    song.songName = title;
    song.songArtist = artistName;
    song.songUrl = songSrc;
    audio.load();
    audio.play();
    song.setIsPlaying(true)

  };

  const headers = {
    "Content-Type": "application/json",
    "x-auth-token": localStorage.getItem("access_token"),
  };

  const removeSong = async () => {
    const { data,status } = await axios.delete(
      `https://music-player-app-backend-yq0c.onrender.com/api/v1/playlist/remove/${playlistId}?song=${title}`,
      {
        headers,
      }
    );
    if(status == 200){
      alert('Song removed from the playlist');
      setFetchPlaylist(prev => !prev)
    }
  };
  // remove the song from playlist
  const handleRemove = () => {
    // Remove the song from the Playlist
    // window.confirm('Are you sure you want to remove this song from the playlist?')
    removeSong();
  };

  return (
    <div className="flex relative  bg-gray-800 text-white justify-between items-center border-b-[1px] p-2 lg:w-[70vw] mx-auto">
      <div onClick={handlePlay} className="flex space-x-5 cursor-pointer">
        <img src={musicbg} alt="" className="w-16" />
        <div className="text-sm lg:text-lg">
          <div>{title}</div>
          <div>{artistName}</div>
        </div>
      </div>

      <button
        onClick={handleRemove}
      
        className="relative"
      >
        <CgRemoveR size={25} />
      </button>
      
    </div>
  );
};

export default PlaylilstSong;
