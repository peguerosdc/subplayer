import { combineReducers } from "redux";
import apiCallsInProgress from "./apiStatusReducer";
import artistContent from "./artistsReducer";
import albumsContent from "./albumsReducer";
import playlists from "./playlistsReducer";
import songs from "./songsReducer";

export default combineReducers({
    apiCallsInProgress,
    artistContent,
    albumsContent,
    playlists,
    songs
});