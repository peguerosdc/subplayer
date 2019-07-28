/* config-overrides.js */
const { override, addLessLoader } = require('customize-cra');

module.exports = override(
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
        // My own color definitions
        '@main_light' : 'rgb(55,55,55)',
        '@main' : 'rgb(40,40,40)',
        '@main_dark' : 'rgb(11,11,11)',
        '@main_darker' : '#000',
        '@accent' : '#ff3d00',
        '@text' : "rgb(175,175,175)",
        '@text_title' : "rgb(216,222,222)",
        '@text_dark' : "rgb(87,87,87)",

        // Applying to Rsuite's definitions
        '@body-bg' : '@main',
        '@text-color' : '@text',
        '@base-color': '@accent',
        '@body-bg' : '@main',
        '@primary-bg-color': '@body-bg',

        // Styling navbar
        '@nav-bar-default-bg' : '@main',
        '@nav-item-default-hover-bg' : '@main_dark',
        '@nav-bar-default-font-color' : "#FFF",
        '@btn-subtle-hover-bg' : '@main_dark',

        // Button
        '@btn-default-color' : '@text_dark',
        
        // Slider
        "@slider-bar-default-bg" : '@main_light',
        "@slider-bar-hover-bg": '@main_light'
    }
  })
);