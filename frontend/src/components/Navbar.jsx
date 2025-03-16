import React, { useContext } from "react";
import { SidebarContext } from "../Context/SibebarContext";
import { Link, useNavigate } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { ImBlog } from "react-icons/im";
import { TfiWrite } from "react-icons/tfi";
import { CgPlayList } from "react-icons/cg";
import { GiMusicSpell } from 'react-icons/gi'
import { BiWindowClose } from "react-icons/bi";
import { BsFillMenuAppFill } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";

import "../utils/style.css";
import Logo from "../assets/Logo";
const Navbar = () => {
  const sideBar = useContext(SidebarContext);
  const toggleMenu = () => {
    sideBar.setShowMenu(!sideBar.showMenu);
  };
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };
  return (
    <header className="z-50 w-full sticky bg-gray-900 text-white top-0 flex flex-col justify-between items-center py-1 lg:py-5 px-10 font-space shadow-2xl h-14 lg:h-16 ">
      <nav className=" mx-auto w-full flex justify-between items-center sticky top-5">
        <Link to={'/'} className="w-32 text-white">
          {/* <Logo /> */}
          Music Stream
        </Link>
        <button
          onClick={toggleMenu}
          className="lg:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200"
          aria-label="Toggle Menu"
        >
          <FiMenu size={25} /> {/* Use the new icon here */}
        </button>

      {/* ------------Mobile Nav------------ */}
      <div
        className={`lg:hidden text-2xl flex flex-col bg-gray-900 w-64 fixed z-50 top-0 p-6 h-screen items-start justify-start space-y-8 pt-20 transition-transform duration-300 ease-in-out ${sideBar.showMenu ? "right-0 transform-none" : "-right-64 transform"
          }`}
      >

        <Link to="/" className="flex justify-center items-center space-x-2">
          <GoHome />
          <span className="">Home</span>
        </Link>
        <Link
          to="/explore"
          className="flex justify-center items-center space-x-2"
        >
          <GiMusicSpell />
          <span>Songs</span>
        </Link>
        <Link
          to="/upload"
          className="flex justify-center items-center space-x-2"
        >
          <TfiWrite />
          <span>Upload</span>
        </Link>
        <Link
          to="/playlists"
          className="flex justify-center items-center space-x-2"
        >
          <CgPlayList />
          <span>Playlist</span>
        </Link>

        {token ? (
          <button
            onClick={logOut}
            className="bg-[#ffd700] px-5 py-1 rounded-md lg:rounded-xl shadow-lg text-[#7d0000] text-sm"
          >
            Log Out
          </button>
        ) : (
          <>
            <Link
              to={"/login"}
              className="bg-[#ffd700] px-5 py-1 rounded-md lg:rounded-xl shadow-lg text-[#7d0000] text-sm"
            >
              Log In
            </Link>
            <Link
              to={"/register"}
              className="bg-[#ffd700] px-5 py-1 rounded-md lg:rounded-xl shadow-lg text-[#7d0000] text-sm"
            >
              Sign Up
            </Link>
          </>
        )}
        <button
          onClick={toggleMenu}
          className="flex justify-center text-lg items-center space-x-2"
        >
          <BiWindowClose />
          <span>Close</span>
        </button>
      </div>


      {/* -------Desk Nav---------- */}
      <div
        className={
          "hidden lg:flex justify-between  items-center space-x-10 text-white lg:text-xl"
        }
      >
        <Link
          to="/"
          className="flex justify-center  items-center space-x-2"
        >
          <GoHome />
          <span className="">Home</span>
        </Link>
        <Link
          to="/explore"
          className="flex justify-center items-center space-x-2"
        >
          <ImBlog />
          <span>Songs</span>
        </Link>
        <Link
          to="/upload"
          className="flex justify-center  items-center space-x-2"
        >
          <TfiWrite />
          <span>Upload</span>
        </Link>
        <Link
          to="/playlists"
          className="flex justify-center  items-center space-x-2"
        >
          <TfiWrite />
          <span>Playlists</span>
        </Link>

        {token ? (
          <button
            onClick={logOut}
            className="bg-[#ffd700] px-5 py-1 rounded-md lg:rounded-xl shadow-lg text-[#7d0000] text-sm hover:animate-pulse"
          >
            Log Out
          </button>
        ) : (
          <>
            <Link
              to={"/login"}
              className="bg-[#ffd700] px-5 py-1 rounded-md lg:rounded-xl shadow-lg text-[#7d0000] text-sm hover:animate-bounce"
            >
              Log In
            </Link>
            <Link
              to={"/register"}
              className="bg-[#ffd700] px-5 py-1 rounded-md lg:rounded-xl shadow-lg text-[#7d0000] text-sm hover:animate-bounce"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
    </header >
  );
};

export default Navbar;
