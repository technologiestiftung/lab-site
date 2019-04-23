const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  plugins: [
    postcssPresetEnv({
      autoprefixer: { grid: 'autoplace' },
    }),
    // require('autoprefixer')({ grid: true }),
    // require('postcss-unrgba'),
    // require('cssnano')
  ],
  // syntax: 'postcss-scss',
};
