import { combineReducers } from "redux";
import apiCallsInProgress from "./apiStatusReducer";
import artistContent from "./artistsReducer";
import playlists from "./playlistsReducer";
import songs from "./songsReducer";

export default combineReducers({
    apiCallsInProgress,
    artistContent,
    playlists,
    songs
});