const webpack = require("webpack");

module.exports = {
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          APP_VERSION:
            '"' +
            escape(JSON.stringify(require("./package.json").version)) +
            '"',
          BUILD_DATE: new Date().getTime()
        }
      })
    ]
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "src/styles/global.scss";`
      }
    }
  }
};
