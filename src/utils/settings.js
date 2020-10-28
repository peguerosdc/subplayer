
/* Scrobble Settings */
const DEFAULT_IS_SCROBBLING = true

export function getIsScrobbling() {
	const value = localStorage.getItem('is_scrobbling')
	return value !== null ? value === "true" : DEFAULT_IS_SCROBBLING
}

export function setIsScrobbling(value) {
	localStorage.setItem('is_scrobbling', value)
}

/* Volume Settings */
const DEFAULT_VOLUME = 1.0

export function getVolume() {
	const value = localStorage.getItem('volume')
	return value !== null ? parseFloat(value) : DEFAULT_VOLUME
}

export function setVolume(value) {
	localStorage.setItem('volume', value)
}

/* Shuffle Settings */
const DEFAULT_IS_SHUFFLING = true

export function getIsShuffleOn() {
	const value = localStorage.getItem('is_shuffling')
	return value !== null ? value === "true" : DEFAULT_IS_SHUFFLING
}

export function setShuffle(value) {
	localStorage.setItem('is_shuffling', value)
}