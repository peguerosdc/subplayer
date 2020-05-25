import PropTypes from 'prop-types'

export function ArtistResult(props) {
    const artist = props.artist
    return (
        <div>
            {artist.name} <Icon icon='volume-up' />
        </div>
    )
}

ArtistResult.propTypes = {
    artist : PropTypes.object.isRequired
}