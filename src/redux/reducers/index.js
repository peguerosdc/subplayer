import { combineReducers } from "redux";
import asyncTasksInProgress from "./asyncTasksReducer";
import artists from "./artistsReducer";
import playlists from "./playlistsReducer";
import songs from "./songsReducer";
import auth from "./authReducer"
import search from "./searchReducer"
import alert from "./alertsReducer"

export default combineReducers({
    asyncTasksInProgress,
    artists,
    playlists,
    songs,
    auth,
    search,
    alert
});