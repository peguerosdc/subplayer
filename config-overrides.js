/* config-overrides.js */
const { override, addLessLoader } = require('customize-cra');

module.exports = override(
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
        '@base-color': '#fa2755',
        '@body-bg' : 'rgb(29,45,60)',
        '@primary-bg-color': '@body-bg',
        '@nav-bar-default-bg' : '@primary-bg-color',
        '@nav-item-default-hover-bg' : 'rgb(13,30,48)',
        '@drawer-content-bg' : '@body-bg'
    }
  })
);