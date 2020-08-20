# Shuffle Behaviour

## Desired beaviour

If a song is already playing, when:
* turning shuffle on: the song currently playing goes to the front of the queue and the rest of the songs are shuffled (even if they were already played)
* turning shuffle off: the song currently playing goes to the front of the queue and the rest is filled only with the songs that came after in the original order

When playing a new list, if:
* the shuffle is on: everything is shuffled and a random song is played.
* the shuffle is off: the list starts reproducing from top to bottom.

## Implementation

The status is saved in the store as:
```
{
	songsById: {},
	original : [id1, id2, id3, id4, id5],
	currentSongId: id1 /* this is the one that matters when updating the state of the views */
	currentSongIndex : 3,
	queue : [id3, id4, id1, id2, id5],
	isShuffleOn : true,
}
```

If shuffle is switched on:
```
{
	songsById: /* doesn't change */,
	original: /* doesn't change */,
	currentSongId: /* doesn't change */,
	currentSongIndex: /* is now */ 0,
	queue: /* is now: */ [currentSongId, the original queue (except currentSongId) shuffled ],
	isShuffleOn: true
}
```

If shuffle is switched off:
```
{
	songsById: /* doesn't change */,
	original: /* doesn't change */,
	currentSongId: /* doesn't change */,
	currentSongIndex: /* is now */ 0,
	queue: /* is now: */ [currentSongId, the original queue starting from currentSongId ],
	isShuffleOn: false
}
```
