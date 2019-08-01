import { combineReducers } from "redux";
import asyncTasksInProgress from "./asyncTasksReducer";
import artists from "./artistsReducer";
import playlists from "./playlistsReducer";
import songs from "./songsReducer";
import auth from "./authReducer"
import search from "./searchReducer"
import alert from "./alertsReducer"
import albums from "./albumsReducer"
import favourites from "./favouritesReducer"

export default combineReducers({
    asyncTasksInProgress,
    artists,
    playlists,
    songs,
    auth,
    search,
    alert,
    albums,
    favourites
});