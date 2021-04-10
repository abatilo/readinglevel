const withTM = require("next-transpile-modules")([
  "flesch-kincaid",
  "gunning-fog",
  "syllable",
]);
module.exports = withTM({});
