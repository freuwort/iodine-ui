const path = require('path')
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
    transpileDependencies: true,
    publicPath: '/',
    css: {
        extract: false,
    },
    configureWebpack: {
        resolve: {
            alias: {
                vue: path.resolve('./node_modules/vue')
            },
        },
    },
})
