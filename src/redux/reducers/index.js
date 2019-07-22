import { combineReducers } from "redux";
import apiCallsInProgress from "./apiStatusReducer";
import artists from "./artistsReducer";
import playlists from "./playlistsReducer";
import songs from "./songsReducer";

export default combineReducers({
    apiCallsInProgress,
    artists,
    playlists,
    songs
});