const { merge } = require("@inpyjamas/scripts/utilities");
const config = require("@inpyjamas/scripts/eslint");
const oldConfig = {
  extends: ["unobtrusive", "eslint:recommended", "plugin:jest/recommended"],
  plugins: ["jest"],
  env: {
    browser: true,
    node: true,
    "jest/globals": true,
  },
  globals: {
    tns: true,
  },
  rules: {
    semi: [2, "always"],
    indent: [2, 2],
    "linebreak-style": [2, "unix"],
    "brace-style": [2, "1tbs"],
    "array-bracket-spacing": [2, "never"],
    camelcase: [2, { properties: "always" }],
    "keyword-spacing": [2],
    "eol-last": [2],
    "no-trailing-spaces": [2],
    "no-process-env": ["off", "always"],
    "no-console": ["off", "always"],
  },
};

module.exports = merge(oldConfig, config);
