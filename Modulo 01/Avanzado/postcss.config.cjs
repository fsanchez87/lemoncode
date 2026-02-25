const postcssPresetEnv = require("postcss-preset-env");
const postcssImport = require("postcss-import");
const postcssNested = require('postcss-nested');
const simpleVars = require('postcss-simple-vars');
const mixins = require('postcss-mixins');

// postcss.config.cjs
module.exports = {
  plugins: [
    postcssImport(),
    simpleVars(),
    mixins(),
    postcssNested(),
    postcssPresetEnv({
      stage: 1,
    }),
  ],
};
