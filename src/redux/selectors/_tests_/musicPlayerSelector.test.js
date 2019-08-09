import * as selectors from "../musicPlayerSelector"

describe('music player selectors', () => {

    it('should get the metadata of the song currently playing', () => {
        // Song playing is song '2' which is at position 1 of the queue
        const state = {
            musicPlayer : {
                queue : ["1", "2"],
                songsById : {
                    "1" : { id : '1' },
                    "2" : {
                        id : '2',
                        name : 'name 2'
                    }
                },
                currentSongIndex : 1
            }
        }
        // Should return song '2'
        const currentSongPlaying = selectors.getSongCurrentlyPlayingSelector(state)
        expect(currentSongPlaying).toEqual( state.musicPlayer.songsById['2'] )
    })


})