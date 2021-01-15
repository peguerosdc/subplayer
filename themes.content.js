module.exports = (themeName) => {
    const isDark = themeName.startsWith("dark")
    return (
        `
        @import '~rsuite/lib/styles/themes/${isDark ? "dark" : "default"}/index.less';

        .rc-slider-rail {
            .rs-slider-bar
        }

        .rc-slider-track {
            .rs-slider-progress-bar
        }

        .rc-slider-handle {
            width: @slider-handle-diameter;
            height: @slider-handle-diameter;
            border: @slider-handle-border-width solid @slider-handle-default-border-color;
            background-color: @slider-handle-default-bg;
            top: 50%;

            &:hover {
                box-shadow: @slider-handle-hover-box-shadow;
                transition: box-shadow @slider-handle-transition, background-color @slider-handle-transition,
                transform @slider-handle-transition;
                border: @slider-handle-border-width solid @slider-handle-default-border-color;
                cursor: pointer;
            }

            &:active {
                box-shadow: none;
                transform: scale(1.2);
                border: @slider-handle-border-width solid @slider-handle-default-border-color;
                cursor: pointer;
            }

            &-click-focused:focus {
                border: @slider-handle-border-width solid @slider-handle-default-border-color;
            }
        }

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

        @scrollbar-width: 8px;
        `
    )
}
