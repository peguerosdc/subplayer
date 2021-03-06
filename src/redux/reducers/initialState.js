import * as settings from "../../utils/settings"

export default {
    asyncTasksInProgress: 0,
    alert : {},
    artists : {
        byIndex : [],
        byId : {}
    },
    albums : {
        byId : {}
    },
    playlists : {
        byId : {}
    },
    favourites : [],
    songs : {
        byId : {}
    },
    musicPlayer : {
        queue : [],
        original : [],
        songsById : {},
        currentSongIndex : null,
        currentSongId : null,
        isShuffleOn: settings.getIsShuffleOn(),
    },
    auth : {
        isAuthenticated: false,
        isAuthenticating: true,
        statusText: null
    },
    search : {
        albums : [],
        artists : [],
        songs : [],
        songsById : {}
    }
}