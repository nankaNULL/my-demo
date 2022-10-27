const withTM = require("next-transpile-modules")(["ui", 'echarts']);

module.exports = withTM({
  reactStrictMode: true,
});
