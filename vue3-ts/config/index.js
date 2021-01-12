'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
const fs = require('fs')

// Make sure any symlinks in the project folder are resolved:
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  // 多模板配置
  appHtml: {
    $: resolveApp('public/index.html'),
  },
  // 多入口配置
  appPageJs: {
    index: resolveApp('src/pages/index/main.ts'),
  },
  // Paths
  assetsRoot: path.resolve(__dirname, '../dist'),
  assetsPublicPath: './',
  assetsSubDirectory: 'static/',

  // Various Dev Server settings
  proxyTable: {},
  host: '0.0.0.0', // can be overwritten by process.env.HOST
  port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
  autoOpenBrowser: false,
  errorOverlay: true,
  poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

  cacheBusting: true,
  cssSourceMap: true,
  productionSourceMap: false,
  bundleAnalyzerReport: process.env.npm_config_report
}
