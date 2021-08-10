'use strict'
const port = 8080 // dev port
const CompressionPlugin = require("compression-webpack-plugin")
const TerserPlugin = require('terser-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : './',
  outputDir: 'admin',//生产模式输出
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    hot: true,
    disableHostCheck:true,
    inline: true,
    port: port,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: 'http://localhost:8088',
        changeOrigin: true,
        pathRewrite: {
          '^': ''
        }
      }
    },
  },
  chainWebpack: (config) => {
    config.module.rule('js').test(/\.js$/).use('babel-loader').loader('babel-loader')
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    // 移除 preload 插件
    config.plugins.delete('preload')
  },
  transpileDependencies: ['element-ui'],
  configureWebpack: config => {
    // ES6 =>ES5
    config.entry.app = ["babel-polyfill", "./src/main.js"];
    //生产环境删除 console.los
    if (process.env.NODE_ENV === 'production') {
      config.optimization = {
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              compress: {
                drop_console: true,
              },
            },
          }),
        ],
      }
    };
    plugins: [
      // GZIP代码压缩
      new CompressionPlugin({
        asset: '[path].gz[query]',   // 提示compression-webpack-plugin@3.0.0的话asset改为filename
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      }),
    ]
  },
}
