module.exports = (themeName) => {
    const isDark = themeName.startsWith("dark")
    return (
        `
        @import '~rsuite/lib/styles/themes/${isDark ? "dark" : "default"}/index.less';

        .loader:before {
        	background-color: @base-color;
        }

        .music-player {
        	background-color: ${isDark ? "@B700" : "#fff"};
        	border-top : ${isDark ? "none" : "1px solid #f0f0f0"};
        }

        .music-player .rs-icon-inverse {
            color: ${isDark ? "#3b3f43" : "#f2f2f5"}
        }

        .artist-header {
        	color: ${isDark ? "@base-color" : "inherit"};
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

        .theme-element:hover {
            background-color: @nav-item-default-hover-bg;
            cursor: pointer;
            font-weight: bold;
        }
        `
    )
}
