# Subplayer

This is a front-end application designed to be a simple, functional and nice looking web player to be used with a Subsonic back-end (originally developed to work with [spl0k/supysonic](https://github.com/spl0k/supysonic)).

![Overview](/docs/collage.png)

## Context

As many existing solutions for self-streaming audio are either unmaintained, difficult to install, based on old technologies which make them look... well... old, or are don't consider the power constraints a SBC may have, when I was building my home media server I found that I was not happy with any of them.

After some research, I found Supysonic which works really well on my ARM device as it provides no fancy unnecessary features (and has a Subsonic back-end which is a **must** in my requirements), but still I wanted a Spotify-like experience where I can stream and manage my media directly on any web browser.
As Supysonic doesn't have its own UI and almost all of the existing solutions compatible with the Subsonic API are shipped `backend + frontend`, I decided to create my own following a one simple mantra: *"keep it simple and make it look good".*

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
- Add unit tests
- Improve performance when loading an Artist's page
- `feature`: Playing queue management (add songs, re-order, etc)
- `feature`: Play Songs from an Artist
- `feature`: Toggle Shuffle on/off
- `feature`: Song seeking

## Contributions
Any TODO item, any bug you find and want to fix, any architecture/performance/Docker improvements, any new feature you think would be cool to have is welcomed :) Just keep in mind that this project is meant to be a lightweight application capable of running on low-end devices.

## Acknowledgements
- Favicon made by Freepik from www.flaticon.com
- Using [rsuite/rsuite](https://github.com/rsuite/rsuite) UI components.

## License

Licensed under the [GNU General Public License v3.0](https://github.com/peguerosdc/rsuite-sonicplayer/blob/master/LICENSE).
