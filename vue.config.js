const webpack = require('webpack')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      new VuetifyLoaderPlugin({
        match(originalTag, { kebabTag, camelTag, path, component }) {
          if (kebabTag.startsWith('core-')) {
            return [
              camelTag,
              `import ${camelTag} from '@/components/core/${camelTag.substring(
                4
              )}.vue'`
            ]
          }
        }
      }),
      new webpack.DefinePlugin({
        'process.env': {
          APP_VERSION:
            '"' +
            escape(JSON.stringify(require('./package.json').version)) +
            '"',
          BUILD_DATE: new Date().getTime()
        }
      })
    ]
  },
  css: {
    loaderOptions: {
      scss: {
        data: `@import "src/styles/global-ghost.scss";`
      }
    }
  }
}
