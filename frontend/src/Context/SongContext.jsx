import { createContext, useState, useRef } from "react";

export const SongContext = createContext();

export const SongContextState = ({ children }) => {
  let __URL__;
  if(document.domain === "localhost"){
    __URL__ = "http://localhost:1337"
  }else{
    __URL__ = "https://music-player-app-backend-yq0c.onrender.com"
  }
  const audio = new Audio();
  const song = {
    songUrl: "",
    songName: "",
    songArtist: "",
    songAlbum: "",
    isPlaying: false,

    setSongUrl: (url) => {
      song.songUrl = url;
    },
    setSongName: (name) => {
      song.songName = name;
    },
    setArtistName: (name) => {
      song.songArtist = name;
    },
    setAlbumName: (name) => song.songAlbum = name,
    setIsPlaying : ( val )=>{
      song.isPlaying = val
    },
    
  };

  return <SongContext.Provider value={{audio,song,__URL__}}>{children}</SongContext.Provider>;
};
