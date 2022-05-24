const path = require('path')
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ?
    '/Dashboard/' : '/',
  devServer: {
    port: 80
  },
  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      return {
        resolve: {
          alias: {
            'SrcConfig': path.join(__dirname, 'config/production.js')
          }
        }
      }
    } else {
      return {
        resolve: {
          alias: {
            'SrcConfig': path.join(__dirname, 'config/development.js')
          }
        }
      }
    }
  }
}
