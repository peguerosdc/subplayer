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
                currentSongIndex : 1,
                currentSongId : '2',
            }
        }
        // Should return song '2'
        const currentSongPlaying = selectors.getSongCurrentlyPlayingSelector(state)
        expect(currentSongPlaying).toEqual( state.musicPlayer.songsById['2'] )
    })

    it('should get the details of the songs pending in the queue', () => {
        // Song playing is song '2' which is at position 1 of the queue
        const state = {
            musicPlayer : {
                queue : ["1", "2", "3"],
                songsById : {
                    "1" : { id : '1' },
                    "2" : { id : '2' },
                    "3" : { id : '3' },
                },
                currentSongIndex : 1,
                currentSongId : '2',
            }
        }
        // Should return songs '2' (the one currently playing) and '3'
        const pendingSongs = selectors.getSongsInQueueSelector(state)
        expect(pendingSongs).toEqual( [state.musicPlayer.songsById['2'],state.musicPlayer.songsById['3']] )
    })


})