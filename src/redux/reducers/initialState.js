export default {
    apiCallsInProgress: 0,
    artists : [],
    playlists : {
        playlists : {},
        currentPlaylistId: null,
        lastUpdateOperationResult : {}
    },
    songs : {
        queue : [],
        current : null,
        currentIndex : null
    }
};