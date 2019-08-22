
export function isPlaylistMineByOwner(owner){ return owner === localStorage.getItem('username') }

// From: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
export function sortSongsByKey(songs, key, type) {
    return new Promise( (resolve, reject) => {
        let sortedArray = [...songs]
        sortedArray.sort( (a,b) => {
            var nameA = a[key].toUpperCase() // ignore upper and lowercase
            var nameB = b[key].toUpperCase() // ignore upper and lowercase
            if (nameA < nameB) {
                return type === "asc" ? -1 : 1
            }
            if (nameA > nameB) {
                return type === "asc" ? 1 : -1
            }
            // names must be equal
            return 0
        })
        resolve(sortedArray)
    })
}

export function filterSongsByValue(songs, filter) {
    return new Promise( (resolve, reject) => {
        // Check if there is a filter to apply
        if( filter ){
            // ignore upper and lowercase
            const fixedFilter = filter.toUpperCase()
            // Look for songs with this filter value in the:
            // title, artist or album, which are the most common keys someone
            // would like to filter
            const filteredArray = songs.filter( song => {
                return song.title.toUpperCase().indexOf(fixedFilter) !== -1 ||
                    song.artist.toUpperCase().indexOf(fixedFilter) !== -1 ||
                    song.album.toUpperCase().indexOf(fixedFilter) !== -1
            })
            resolve(filteredArray)
        }
        else {
            resolve(songs)
        }
    })
}

export function computeJointDurationOfSongs(songs) {
    return songs.reduce( (a,b) => ({duration: a.duration+b.duration}), {duration:0} ).duration
}