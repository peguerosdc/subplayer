# Subplayer

[![codecov](https://codecov.io/gh/peguerosdc/subplayer/branch/develop/graph/badge.svg)](https://codecov.io/gh/peguerosdc/subplayer)

This is a frontend application designed to be a simple, functional and nice looking web player to be used with a Subsonic backend (originally developed to work with [spl0k/supysonic](https://github.com/spl0k/supysonic)).

## Context

As many existing solutions for self-streaming audio are either unmaintained, difficult to install, based on old technologies which make them look... well... old, or don't consider the power constraints a Single-Board-Computer may have, when I was building my home media server I found that I was not happy with any of them.

After some research, I found Supysonic which works really well on my ARM device as it provides no fancy unnecessary features (and has a Subsonic backend which was a **must** in my requirements), but still I wanted a Spotify-like experience where I can stream and manage my media directly on any web browser.
As Supysonic doesn't have its own UI and almost all of the existing solutions compatible with the Subsonic API ship both `backend + frontend`, I decided to create my own following a one simple mantra: *"keep it simple and make it look good".*

## Features

- Play audio
- View/create/edit playlists
- Add/remove from Favourites
- Search artists/albums/songs
- Browse your music by Artist
- Add/Remove from queue
- Theming

### Building custom themes

By default, the only themes available are Blue, Orange, Green and Grey (all in light and dark mode). If you want to create your custom themes, you can edit `/themes.config.js` with your own object to change how Rsuite will look like. Each theme must be named starting with either "light" or "dark" to let the compiler know which settings to load.

To see the list of variables that you can define for customization, visit [RSuite's documentation](https://rsuitejs.com/en/guide/themes/).

**NOTE:** the tool that Rsuite provides to create custom themes is not designed to work with `create-react-app` (which is how this project was built), so the implementation here is considered a hack and, as a result, it has (as far as I found) two downsides:
1) you can't create a lot of themes as the compiler will run out of memory (that's why I only defined 4 colours by default) and
2) on the first run, you will see a blank page. After reloading, the application will work as expected.

## Installation

### Running the source code

Clone the repository and run from the root folder:

```
$ yarn install
$ yarn start
```

### Docker installation

To build the image yourself:

```
$ docker build . -t peguerosdc/subplayer
```

Or using the experimental `buildx` to build (and push) for multiple platforms:

```
$ docker buildx build --platform linux/arm64,linux/amd64 --push -t peguerosdc/subplayer .
```

To run the image:

```
$ docker run --name mysubplayer \
    -p 8000:80 \
    --restart unless-stopped \
    -d peguerosdc/subplayer
```

To stop:

```
$ docker stop mysubplayer
```

## TODO
- Implement CI to push Docker image automatically when merged to `master`
- There are some `TODO`s in the unit tests, but most features are tested.
- `feature`: Rearrange items in queue. I tried this with the current rsuite's Table but didn't like the final implementation. I am thinking in (someday) writing a new `<SongsTable/>` from scratch to add all the features I want.
- `feature`: Toggle "shuffle" on/off
- `feature`: Song seeking
- `feature`: Muting

## Contributions
Any TODO item, any bug you find and want to fix, any architecture/performance/Docker improvements, any new feature you think would be cool to have is welcomed :) Just keep in mind that this project is meant to be a lightweight application.

**NOTE**: if you want to add new features, please implement at least the basic unit tests you can think of. Pull-requests will not be merged without testing.

## Acknowledgements
- Favicon made by Freepik from www.flaticon.com
- Using [rsuite/rsuite](https://github.com/rsuite/rsuite) UI components.

## License

Licensed under the [GNU General Public License v3.0](https://github.com/peguerosdc/rsuite-sonicplayer/blob/master/LICENSE).
