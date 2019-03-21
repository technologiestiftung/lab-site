const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  plugins: [
    postcssPresetEnv({autoprefixer: { grid: 'autoplace' }}),
    // require('autoprefixer'),
    require('cssnano'),
  ],
  // syntax: 'postcss-scss',
};
