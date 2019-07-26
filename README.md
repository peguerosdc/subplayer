# Subplayer

This is a front-end application designed to be a simple, functional and nice looking web player to be used with a Subsonic back-end (originally developed to work with [spl0k/supysonic](https://github.com/spl0k/supysonic)).

## Context

As many existing solutions are either unmaintained, have some basic features broken, are based on old technologies which make them ugly and difficult to install or are designed to be run on a PC with no power constraints, when I was building my home media server I found that I was no happy with any of them.

After some research I found Supysonic which works really well on my ARM device (and has a Subsonic back-end which was a "must" in my requirements), but still I wanted a Spotify-like experience where I can stream my media directly on any web browser. As almost all of the existing solutions compatible with the Subsonic API are not shipped without it's own back-end, I decided to create my own following a one simple mantra: "keep it simple and beautiful".

## Run

Clone the repository and run from the root folder:

```
$ yarn install
$ yarn start
```

## Docker installation

To build the image yourself:

```
$ docker build . -t peguerosdc/subplayer
```

Or using the experimental `buildx` to build for multiple platforms:

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
- Search page

## Contributions
Any TODO item, any bug you find and want to fix, any architecture/performance/Docker improvements, any new feature you think would be cool to have is welcomed :) Just keep in mind that this project is meant to be a lightweight application capable of running on low-end devices.