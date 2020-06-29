module.exports = (themeName) => `
@import '~rsuite/lib/styles/themes/${themeName}/index.less';

.loader:before {
	background-color: @base-color;
}

.music-player {
	background-color: ${themeName === "dark" ? "@B700" : "#fff"};
	border-top : ${themeName === "dark" ? "none" : "1px solid #f0f0f0"};
}
`