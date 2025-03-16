import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

//Importing Components
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Songs from "./pages/Songs";
import UploadSong from "./pages/UploadSong";
import Login from "./pages/Login";
import CreatePlayList from "./pages/CreatePlaylist";
import AudioPlayer from "./utils/AudioPlayer";
import Register from "./pages/Register";
import Playlist from "./pages/Playlist";

//Importing Contexts
import { SidebarContextState } from "./Context/SibebarContext";
import { SongContextState } from "./Context/SongContext";
import { QueueContextState } from "./Context/QueueContex";
import { FetchContextState } from "./Context/FetchContext";

//General Layout
const Layout = () => {
  return (
    <div className="relative z-0 w-screen">
      <SidebarContextState>
        <SongContextState>
          <FetchContextState>
            <Navbar />
            <QueueContextState>
            <div className="">
              <Outlet />
            </div>
            <div className="">
              <AudioPlayer />
            </div>
            </QueueContextState>
          </FetchContextState>
        </SongContextState>
      </SidebarContextState>
    </div>
  );
};

//Routing
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/upload",
        element: <UploadSong />,
      },
      {
        path: "/explore",
        element: <Songs />,
      },
      {
        path: "/playlists",
        element: <CreatePlayList />,
      },
      {
        path: "/playlist/:id",
        element: <Playlist />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

const App = () => {
  return (
    <>
      <div className="flex justify-center items-center">
        <RouterProvider router={router} />
      </div>
    </>
  );
};
export default App;
