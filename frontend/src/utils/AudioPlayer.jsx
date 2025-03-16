import React, { useState, useEffect, useRef, useContext } from "react";
import stereo from "../assets/stereo.jpg";
import { SongContext } from "../Context/SongContext";

import { CiPlay1, CiPause1 } from "react-icons/ci";
import { FiSkipBack, FiSkipForward } from "react-icons/fi";

const AudioPlayer = () => {
  const { song, audio,  } = useContext(SongContext);
 

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const progressBar = useRef();
 
  useEffect(() => {
    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
      progressBar.current.max = audio.duration;
      console.log(progressBar)
      console.log(audio)
    });
    audio.addEventListener("timeupdate", () => {
      
      setCurrentTime(audio.currentTime);
      progressBar.current.value = `${
        (audio.currentTime / audio.duration) * 100
      }%`;
    });
  }, [audio.src]);

  // Toggle play/pause
  const togglePlayPause = () => {
    if (song.songUrl == "") return;
    if (audio.paused) audio.play();
    else audio.pause();
    song.setIsPlaying(!song.isPlaying);
  };

  // Calculate time
  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  return (
    <div
    className="fixed flex justify-between items-center bottom-0 right-0 left-0 bg-gray-900 text-white px-3 lg:px-5 py-2 shadow-xl"
  >
      <div className="flex space-x-5">
        <img src={stereo} alt="" className="rounded-lg w-12" />
        <div>
          <h3 className="text-lg">{song.songName}</h3>
          <p className="text-sm">{song.songArtist}</p>
        </div>
      </div>

    
      <div className="flex space-x-3 lg:space-x-5">
        <button>
          <FiSkipBack />
        </button>
        <button onClick={togglePlayPause}>
          { song.isPlaying == true ? <CiPause1 /> : <CiPlay1 />}
        </button>
        <button>
          <FiSkipForward />
        </button>
      </div>

      <div className="hidden lg:flex space-x-5">
        {/* <input
          type="range"
          min="0"
          ref={progressBar}
          defaultValue="0"
          className=" "
          step={"any"}
        /> */}
        <p>
          {calculateTime(parseInt(currentTime))}/
          {calculateTime(parseInt(duration))}
        </p>
      </div>
    </div>
  );
};

export default AudioPlayer;
