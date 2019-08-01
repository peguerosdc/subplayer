export default {
    asyncTasksInProgress: 0,
    alert : {},
    artists : [],
    albums : {
        byId : {}
    },
    playlists : {
        byId : {},
        currentPlaylist : { songs: [] }
    },
    songs : {
        queue : [],
        currentSongPlaying : null,
        currentSongIndex : null
    },
    auth : {
        isAuthenticated: false,
        isAuthenticating: true,
        statusText: null
    },
    search : {}
}