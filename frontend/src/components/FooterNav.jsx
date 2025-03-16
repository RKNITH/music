import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineExplore, MdLibraryMusic } from "react-icons/md";
import { Link } from "react-router-dom";
import Song from "../MusicPlayer";
const FooterNav = () => {
  return (
    <div className="fixed bottom-0 right-0 left-0 flex flex-col">
      <Song/>
      <nav className="flex bg-white w-full h-10  justify-around items-center py-2">
        <Link to={"/"}>
          <AiOutlineHome size={25} />
        </Link>
        <Link to={"/explore"}>
          <MdOutlineExplore size={25} />
        </Link>
        <Link>
          <MdLibraryMusic size={25} />
        </Link>
      </nav>
    </div>
  );
};

export default FooterNav;
