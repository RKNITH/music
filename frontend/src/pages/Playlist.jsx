import React, { useEffect, useState,useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FetchContext } from "../Context/FetchContext";
import { SongContext } from "../Context/SongContext";
import PlaylilstSong from "../components/PlaylilstSong";
import { MdDeleteForever } from "react-icons/md";

const Playlist = () => {
  const { id } = useParams();  //gettnig the id from the url
  const navigate = useNavigate(); // for navigation
  const [playList, setPlayList] = useState(null); // state for the playlist
  const [loading, setLoading] = useState(false);
  const {fetchPlaylist} = useContext(FetchContext)
  const {__URL__} = useContext(SongContext)
  
  // headers for the api calls
  const headers = {
    "Content-Type": "application/json",
    "X-Auth-Token": localStorage.getItem("access_token"),
  };

  // delete playlist
  const deletePlaylist = async () => {
    setLoading(true);
    const { data, status } = await axios.delete(
      `https://music-player-app-backend-yq0c.onrender.com/api/v1/playlist/delete/${id}`,
      { headers }
    );
    if (status === 200) {
      setLoading(false);
      alert("Playlist deleted successfully");
      navigate("/playlists");
    }
  };

  // confirm delete and handle delete
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this playlist?")) {
      deletePlaylist();
    }
  };

  // get playlist
  const getPlaylist = async () => {
    const { data } = await axios.get(
      `${__URL__}/api/v1/playlist/${id}`,
      { headers }
    );
    setPlayList(data["playlist"]);
  };

  // fetch playlist on load
  useEffect(() => {
    getPlaylist();
  }, [fetchPlaylist]);

  return loading || playList === null ? (
    <div>Loading...</div>
  ) : !loading && playList !== null ? (
    <div className="bg-slate-800 text-white p-5 min-h-screen space-y-5 flex flex-col lg:items-center">
      <div className="lg:mt-10 flex justify-between items-center px-1 lg:w-[70vw]">
        <div>
          <h2 className="text-xl lg:text-4xl">{playList.playlistName}</h2>
          <p className="text-md lg:text-lg`">Songs - {playList.songs.length} </p>
        </div>
        <div>
          <button onClick={handleDelete}>
            <MdDeleteForever size={25} />
          </button>
        </div>
      </div>
      <div className="space-y-2">
        {playList.songs.length === 0 ? (
          <div>No songs in this playlist</div>
        ) : (
          playList.songs.map((song, index) => {
            return (
              <PlaylilstSong
                key={index}
                title={song.title}
                artistName={song.artistName}
                songSrc={song.songSrc}
                playlistId={id}
              />
            );
          })
        )}
      </div>
    </div>
  ) : null;
};

export default Playlist;
