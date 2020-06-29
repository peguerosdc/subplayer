module.exports = (themeName) => `
@import '~rsuite/lib/styles/themes/${themeName}/index.less';

.loader:before {
	background-color: @base-color;
}
`