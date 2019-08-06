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
        songsById : {},
        currentSongIndex : null,
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