import React,{useState,useContext} from "react";
import axios from "axios";  
import { SongContext } from "../Context/SongContext";
import playlist from "../assets/playlist.jpg";
import { CgPlayListAdd } from "react-icons/cg";
import { Link } from "react-router-dom";
import { FetchContext } from "../Context/FetchContext";
import { QueueContext } from "../Context/QueueContex";


const PlaylistCard = ({playlistName,playlistId,noSongs}) => {
    const {setFetchPlaylist} = useContext(FetchContext)
    const {song,songList,setSongList,__URL__} = useContext(SongContext)
    const {list,dispatchList} = useContext(QueueContext)

    const [loading,setLoading] = useState(false)

    // Adding song to playlist
    const addSongToPlaylist = async () => {
      console.log(list)
        if(list.length === 0) return alert("Please select a song");
        setLoading(true)
        const headers = {
            "Content-Type": "application/json",
            "X-Auth-Token": localStorage.getItem("access_token"),
            };
        const {data,status} = await axios.post(`${__URL__}/api/v1/playlist/add/${playlistId}`,list,{headers})
        if(status === 200){
            alert("Song added to playlist")
            setFetchPlaylist(prev => !prev)
            dispatchList({type:"REMOVE_SONG",payload:list[0]['title']})
        } 
        setLoading(false)
         
    }

  return (
    <div className="flex border-b-2 pb-4 items-center justify-between">
      <Link to={`/playlist/${playlistId}`} className="flex space-x-5">
        <img src={playlist} alt="" className="w-20" />
        <div>
          <p>{playlistName}</p>
          <p>Songs - {noSongs}</p>
        </div>
      </Link>
      <button onClick={addSongToPlaylist}>
        <CgPlayListAdd size={35} />
      </button>
    </div>
  );
};

export default PlaylistCard;
