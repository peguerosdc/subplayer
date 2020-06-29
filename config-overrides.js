/* config-overrides.js */
const path = require('path');
const themes = require('./themes.config');
const themeContent = require('./themes.content');

const merge = require('webpack-merge');
const multipleThemesCompile = require('webpack-multiple-themes-compile/src');
const multipleEntry = require('react-app-rewire-multiple-entry')

module.exports = {
  webpack: function(config, env) {
    // This is to re-format CRA's entries to make them compatible with multipleThemesCompile()
    const appEntries = multipleEntry([{entry : 'src/index.js'}])
    appEntries.addMultiEntry(config)
    // Add theming
    let multiTheme = multipleThemesCompile({
       themesConfig: themes,
       lessContent: (themeName, config) => themeContent(themeName),
       styleLoaders: [
          { loader: 'css-loader' },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ],
        cwd: path.resolve('./')
     })

    /* Store the rule to load less/css files to put it where CRA stores these kind of rules
     * (otherwise, duplicate rules with existing and the compiler will complain) */
    var lessRule = multiTheme["module"]["rules"][0]
    delete multiTheme["module"]["rules"]

    // Merge default CRA config with themes' config. Now, we just need to fix the lessRule.
    var newConfig = merge(config, multiTheme)

    // Add themes' rule to the beginning of existing 'oneOf' to make it the first to be applied
    newConfig["module"]["rules"][2]["oneOf"].unshift(lessRule)

    return newConfig
  }
};