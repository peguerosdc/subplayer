export default {
    apiCallsInProgress: {
        count: 0,
        lastOperationResult:{}
    },
    artists : [],
    playlists : {
        byId : {},
        lastUpdateOperationResult : {},
        currentPlaylist : { songs: [] }
    },
    songs : {
        queue : [],
        current : null,
        currentIndex : null
    },
    auth : {
        isAuthenticated: false,
        isAuthenticating: true,
        statusText: null
    },
    search : {}
}