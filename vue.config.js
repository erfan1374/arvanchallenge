module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/ext/'
        : '/',
    devServer: {
        port: 80
    }
}
