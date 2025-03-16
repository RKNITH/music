import conn from "../config/db.js";
import fs from "fs";
import mongodb from "mongodb";

// @desc    Add a new song
// @route   POST /api/v1/song/upload
// @access  Private
export const addSong = async (req, res) => {
  try {
    // getting the data from the request body
    const { title, artist, album, description } = req.body;

    // if any of the fields are empty throw an error
    if (!title || !artist || !album || !description) {
      res.status(400);
      throw new Error("Please add all fields");
    }

    // connction to the database
    const db = conn.db("music_streaming");
    const collection = db.collection("songs");
    const bucket = new mongodb.GridFSBucket(db, {
      bucketName: "uploads",
    });

    // uploading the file to the database
    const readStream = fs
      .createReadStream(req.file.path)
      .pipe(bucket.openUploadStream(req.file.filename));

    // if there is an error throw an error
    readStream.on("error", (error) => {
      throw error;
    });

    // if the file is uploaded successfully delete the file from the uploads folder
    // and insert the song data to the database
    readStream.on("finish", async () => {
      console.log("finished");
      const song = await collection.insertOne({
        title,
        artist,
        album,
        description,
        uploadedBy: req.userId,
        song: req.file.filename,
        file: readStream.id,
      });
      if (song) {
        res
          .status(201)
          .json({ message: "Song added successfully", status: "success" });
      } else {
        res.status(400);
        throw new Error("Invalid song data");
      }
    });
  } catch (error) {
    console.log(error);
    
    return res.json({ error: error.message });
  }
};

//@desc   Delete a song
//@route  DELETE /api/v1/song/delete/:id
//@access Private
export const deleteSong = async (req, res) => {
  try {
    console.log("hitting the server");
    console.log(req.query.file);
    const { id } = req.params;
    if (!id) {
      res.status(400);
      throw new Error("No id provided");
    }
   
    const db = conn.db("music_streaming");
    const collection = db.collection("songs");
    const bucket = new mongodb.GridFSBucket(db, {
      bucketName: "uploads",
    });

    const song = await collection.findOne({ _id: new mongodb.ObjectId(id) });
    if (!song) {
      res.status(404);
      throw new Error("Song not found");
    }
    if (song.uploadedBy !== req.userId) {
      res.status(401);
      throw new Error("Unauthorized");
    }
    const deleteSong = await collection.deleteOne({
      _id: new mongodb.ObjectId(id),
    });
    if (deleteSong) {
      await bucket.delete(new mongodb.ObjectId(req.query.file));
      res
        .status(200)
        .json({ message: "Song deleted successfully", status: "success" });
    } else {
      res.status(400);
      throw new Error("Error deleting song");
    }
  } catch (error) {
    console.log(error);
    return res.json({ error: error.message, status: "error" });
  }
};

// @desc    Get all songs
// @route   GET /api/v1/songs
// @access  Public
export const getSongs = async (req, res) => {
  try {
   
    const db = conn.db("music_streaming");
    const collection = db.collection("songs");
    const songs = await collection.find({}).toArray();
    if (songs.length === 0) {
      res.status(404);
      throw new Error("No songs found");
    }
    res.status(200).json({ songs });
  } catch (error) {
    console.log(error);
    return res.json({ error: error.message, status: "error" });
  }
};

// @desc: Stream a song
// @route : GET /api/v1/song/download/:filename
// @access  Public
export const streamSong = async (req, res) => {
  try {
    // if no file name is provided throw an error
    if (!req.params.filename) {
      res.status(400);
      throw new Error("No file name provided");
    }
    // connection to the database and getting the file from the database
    
    const db = conn.db("music_streaming");
    const bucket = new mongodb.GridFSBucket(db, {
      bucketName: "uploads",
    });

    // setting the content type of the file


    // streaming the file to the client
    const downloadStream = bucket.openDownloadStreamByName(req.params.filename).pipe(res).on("error", (error) => { throw error; });
    
    downloadStream.on("end", () => {
      res.end();
    });

    // if there is an error throw an error
  } catch (error) {
    console.log(error.message);
    return res.json({ error: error.message, status: "error" });
  }
};
