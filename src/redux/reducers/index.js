import { combineReducers } from "redux";
import apiCallsInProgress from "./apiStatusReducer";
import artistContent from "./artistsReducer";
import albumsContent from "./albumsReducer";

export default combineReducers({
    apiCallsInProgress,
    artistContent,
    albumsContent
});