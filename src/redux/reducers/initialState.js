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
    favourites : {
        songs : []
    },
    songs : {
        queue : [],
        currentSongPlaying : null,
        currentSongIndex : null,
        byId : {}
    },
    auth : {
        isAuthenticated: false,
        isAuthenticating: true,
        statusText: null
    },
    search : {}
}