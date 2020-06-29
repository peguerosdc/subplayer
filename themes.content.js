module.exports = (themeName) => `
@import '~rsuite/lib/styles/themes/${themeName}/index.less';

.loader:before {
	background-color: @base-color;
}

.music-player {
	background-color: ${themeName === "dark" ? "@B700" : "#fff"};
	border-top : ${themeName === "dark" ? "none" : "1px solid #f0f0f0"};
}

.artist-header {
	color: ${themeName === "dark" ? "@base-color" : "inherit"};
}

.currently-playing {
	color: @base-color;
	font-weight: bold;
}

.link_to_artist:hover {
    background-color: @nav-item-default-hover-bg;
    cursor: pointer;
    color: @base-color;
    font-weight: bold;
}

.link_to_album:hover {
    background-color: @nav-item-default-hover-bg;
    cursor: pointer;
    color: @base-color;
    font-weight: bold;
}

`