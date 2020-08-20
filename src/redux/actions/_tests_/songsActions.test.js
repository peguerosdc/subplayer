// Own imports to test
import * as actions from '../songsActions'
import * as types from '../actionTypes'
import * as alerts from "../alertsActions"

describe('songs actions', () => {

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

    it('creates an ADD_SONGS_TO_QUEUE when wanting to add new songs to the current queue with a message to display', () => {
        const songs = [{id : '1'}]
        expect(actions.addSongsToQueue(songs)).toMatchObject({ type: types.ADD_SONGS_TO_QUEUE, ...alerts.alertSuccessObject("1 songs added to the queue!"), payload : { songs } })
    })

    it('creates a TOGGLE_SHUFFLE_ON when shuffle is turned on', () => {
        expect(actions.toggleShuffle(true)).toMatchObject({ type: types.TOGGLE_SHUFFLE_ON })
    })

    it('creates a TOGGLE_SHUFFLE_OFF when shuffle is turned off', () => {
        expect(actions.toggleShuffle(false)).toMatchObject({ type: types.TOGGLE_SHUFFLE_OFF })
    })

})