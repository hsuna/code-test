const path = require("path")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    // 入口文件配置选项
    entry: {
        main: './src/main.js'
    },
    output: {
        // 打包的路径
        path: path.resolve(__dirname, '../dist'),
        // 打包的文件名称
        filename: 'bundle.js'
    },
    // 模块：例如解读CSS，图片如何转换，压缩
    module: {},
    // 插件，用于生产模板和各项功能
    plugins: [
        new UglifyJsPlugin(),
        new HtmlPlugin({
            minify: {
                removeAttributeQuotes: true
            },
            hash: true,
            template: './src/index.html'
        })
    ]
}