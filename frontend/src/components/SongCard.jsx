// This component is used to display the song card in the home page and the playlist page. The song card is used to display the song name, artist name, and the options to play, add to queue, add to playlist, and delete the song. The song card is also used to play the song when the user clicks on the song card.

//Importing libries
import React from "react";
import { useContext, useState, useRef } from "react";
import axios from "axios";
import { decodeToken } from "react-jwt";
import {  useNavigate } from "react-router-dom";

//Importing context
import { SongContext } from "../Context/SongContext";
import { FetchContext } from "../Context/FetchContext";
import { QueueContext } from "../Context/QueueContex";

//Importing icons
import { SlOptionsVertical } from "react-icons/sl";
import { MdDeleteOutline,MdOutlinePlaylistAdd,MdQueuePlayNext} from 'react-icons/md'
import musicbg from "../assets/musicbg.jpg";


const SongCard = ({ title, artistName, songSrc, userId, songId, file }) => {

  // Using context
  const { song, audio, __URL__ } = useContext(SongContext);
  const { setFetchSong} = useContext(FetchContext);
  const {dispatchQueue,dispatchList} = useContext(QueueContext)
  const navigate = useNavigate(); // Used to navigate to the playlist page

  const token = localStorage.getItem("access_token");
  let decoded;
  if(token) {decoded = decodeToken(token)};

  const [showOptions, setShowOptions] = useState(false);

  // Display the options
  const displayOptions = () => {
    setShowOptions((prev) => !prev);
  };

  // Play the song when the user clicks on the song card
  const handlePlay = () => {
    song.setSongName(title);
    song.setArtistName(artistName);
    song.setSongUrl(`${__URL__}/api/v1/stream/${songSrc}`);
    audio.src = `${__URL__}/api/v1/stream/${songSrc}`;
    audio.load();
    audio.play();
    song.setIsPlaying(true)
  };

  const headers = {
    "x-auth-token": localStorage.getItem("access_token"),
  };
  // Delete the song
  const deleteSong = async () => {
    const { data,status } = await axios.delete(
      `${__URL__}/api/v1/song/delete/${songId}?file=${file}`,
      {
        headers,
      }
    );
    if(status == 200) setFetchSong(prev => !prev)
  };
  const handleDelete = () => {
    confirm("Are you sure you want to delete this song?") && 
    deleteSong();
  };

  // Add the song to the playlist
  const handleAddToPlaylist = () => {
    dispatchList({type:'ADD_SONG',payload:{title,artistName,songSrc}})
    navigate("/playlists");
  };

  //Play the song next
  const handlePlayNext = () => {
    dispatchQueue({type:'ADD_TO_QUEUE',payload:{title,artistName,songSrc}})
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

      {/* <---------------------------Desktop Options-------------------------> */}
      <div className="hidden lg:flex justify-start items-center p-2 space-x-5">
            <button onClick={handleAddToPlaylist}><MdOutlinePlaylistAdd size={30}/></button>
            <button><MdQueuePlayNext size={25}/></button>
            {
              // if user is the owner of the song then show the delete option
              decoded == null ?<> </>:( decoded.id === userId)?(
                <button onClick={handleDelete} className=" ">
                  <MdDeleteOutline size={25}/>
                </button>
              ):(<></>)
            }
          </div>
      {/* <---------------------------Mobile Options-------------------------> */}
      <div
        onClick={displayOptions}
        onMouseOut={() => setShowOptions(false)}
        className="relative block lg:hidden"
      >
        <SlOptionsVertical size={15} />
      </div>
      {showOptions && (
        <div className="absolute right-0 z-10 w-36 bg-gray-900 ">
          <ul className="flex justify-start flex-col items-start space-y-2 p-2">
            <button onClick={handleAddToPlaylist}>Add to playlist</button>
            <button onClick={handlePlayNext}>play next</button>
            {
              // if user is the owner of the song then show the delete option
              decoded == null ?<> </>:( decoded.id === userId)?(
                <button onClick={handleDelete} className=" ">
                  Delete
                </button>
              ):(<></>)
            }
          </ul>
        </div>
      )}
    </div>
  );
};

export default SongCard;
