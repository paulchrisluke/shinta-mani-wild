const path = require('path')

module.exports = async ({ config, mode }) => {
  config.module.rules.push({
    test: /\.scss$/,
    use: [
      'vue-style-loader',
      'style-loader',
      'css-loader',
      {
        loader: 'sass-loader',
        options: {
          data: `@import "src/styles/global-ghost.scss";`
        }
      }
    ]
  })

  return config
}
