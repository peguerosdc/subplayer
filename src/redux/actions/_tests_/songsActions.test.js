// Own imports to test
import * as actions from '../songsActions'
import * as types from '../actionTypes'

describe('search actions', () => {

    it('creates an PUT_SONGS_IN_QUEUE when wanting to put new songs in the queue', () => {
        const songs = [{id : '1'}]
        expect(actions.putSongsInQueue(songs)).toMatchObject({ type: types.PUT_SONGS_IN_QUEUE, payload : { songs } })
    })

    it('creates a PLAY_NEXT_SONG when wanting to play the next song in the queue', () => {
        expect(actions.playNextSong()).toMatchObject({ type: types.PLAY_NEXT_SONG })
    })

    it('creates a PLAY_PREVIOUS_SONG when wanting to play the previous song in the queue', () => {
        expect(actions.playPreviousSong()).toMatchObject({ type: types.PLAY_PREVIOUS_SONG })
    })

    it('creates an ADD_SONGS_TO_QUEUE when wanting to add new songs to the current queue', () => {
        const songs = [{id : '1'}]
        expect(actions.addSongsToQueue(songs)).toMatchObject({ type: types.ADD_SONGS_TO_QUEUE, payload : { songs } })
    })

})