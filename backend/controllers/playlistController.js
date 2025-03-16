import mongodb from "mongodb";
import conn from "../config/db.js";

// @desc   add new playlist
// @route  POST /api/v1/playlist/create
// @access Private
export const addPlaylist = async (req, res) => {
  try {
    // Establishing connection to the database
  
    const db = conn.db("music_streaming");
    const collection = db.collection("playlists");

    // Inserting the playlist to the database
    const playList = await collection.insertOne({
      playlistName: req.body.playlistName,
      createdBy: req.userId,
      songs: [],
    });
    // If the playlist is added successfully return a success message
    if (playList) {
      return res
        .status(200)
        .json({ message: "Playlist added successfully", status: "success" });
    
    } else throw new Error("Error adding playlist");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message, status: "error" });
  }
};

// @desc   Delete a playlist
// @route  DELETE /api/v1/playlist/delete/:id
// @access Private
export const deletePlaylist = async (req, res) => {
  try {

    const db = conn.db("music_streaming");
    const collection = db.collection("playlists");

    const playlist = await collection.deleteOne({
      _id: new mongodb.ObjectId(req.params.id),
    });
    if (playlist) {
      return res
        .status(200)
        .json({ message: "Playlist deleted successfully", status: "success" });
    } else throw new Error("Error deleting playlist");
  } catch (error) {
    console.log(error.message);
    return res.json({ error: error.message, status: "error" });
  }
};

// @desc   Add song to playlist
// @route  POST /api/v1/playlist/add/:id
// @access Private
export const addSongToPlaylist = async (req, res) => {
  try {
    
    const db = conn.db("music_streaming");
    const collection = db.collection("playlists");

    const playlist = await collection.findOneAndUpdate(
      { _id: new mongodb.ObjectId(req.params.id) },
      { $push: { songs: req.body[0] } }
    );
    if (playlist) {
      return res
        .status(200)
        .json({ message: "Song added to playlist", status: "success" });
    } else throw new Error("Error adding song to playlist");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message, status: "error" });
  }
  res.send("Add Song to Playlist Page");
};

// @desc   Remove song from playlist
// @route  DELETE /api/v1/playlist/remove/:id
// @access Private
export const removeSongFromPlaylist = async (req, res) => {
  try {
   
    const db = conn.db("music_streaming");
    const collection = db.collection("playlists");

    const playlist = await collection.findOneAndUpdate(
      { _id: new mongodb.ObjectId(req.params.id) },
      { $pull: { songs: { title: req.query.song } } }
    );
    res.status(200).json({ message: "Song removed from playlist" });
  } catch (error) {
    console.log(error);
    return res.json({ error: error.message, status: "error" });
  }
};

// @desc   Get all playlists
// @route  GET /api/v1/playlist/
// @access Private
export const getPlaylists = async (req, res) => {
  try {

    const db = conn.db("music_streaming");
    const collection = db.collection("playlists");
    const playlists = await collection
      .find({ createdBy: req.userId })
      .toArray();
    if (playlists.length === 0) {
      res.status(404);
      throw new Error("No playlists found");
    }
    res.status(200).json({ playlists });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message, status: "error" });
  }
};

// @desc   Get a playlist
// @route  GET /api/v1/playlist/:id
// @access Private
export const getPlaylist = async (req, res) => {
  try {

    const db = conn.db("music_streaming");
    const collection = db.collection("playlists");

    const playlist = await collection.findOne({
      _id: new mongodb.ObjectId(req.params.id),
    });
    if (playlist) {
      return res.status(200).json({ playlist });
    } else throw new Error("Error getting playlist");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message, status: "error" });
  }
};
