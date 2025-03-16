import express from 'express'
import { addPlaylist,deletePlaylist,addSongToPlaylist,removeSongFromPlaylist,getPlaylists,getPlaylist } from '../controllers/playlistController.js';
const router = express.Router();

router.get('/',getPlaylists); //get all playlists
router.get('/:id',getPlaylist) //get a playlist
router.post('/create', addPlaylist); //add new playlist
router.delete('/delete/:id', deletePlaylist); //delete a playlist
router.post('/add/:id', addSongToPlaylist); //add song to playlist
router.delete('/remove/:id', removeSongFromPlaylist); //remove song from playlist

export default router