import { createSelector } from 'reselect'

const getArtistsByIndex = (state) => state.artists.byIndex

// Returns the artists.byIndex element in a flat list with its headers
export const getArtistsWithHeaders = createSelector(
	getArtistsByIndex,
    artists => artists
    	.reduce( (accum, current) => accum.concat( [ {header: current.name}, ...current.artist] ), [] )
)
