const path = require("path")
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
        filename: '[name].js'
    },
    // 模块：例如解读CSS，图片如何转换，压缩
    module: {
        rules: [
            {
                test:/\.css$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'}
                ]
            },
            {
                test:/\.(png|jpg|gif|jpeg)/,  //是匹配图片文件后缀名称
                use:[{
                    loader:'url-loader', //是指定使用的loader和loader的配置参数
                    options:{
                        limit:500  //是把小于500B的文件打成Base64的格式，写入JS
                    }
                }]
            }
        ]
    },
    // 插件，用于生产模板和各项功能
    plugins: [
        new HtmlPlugin({
            minify: {
                removeAttributeQuotes: true
            },
            hash: true,
            template: './src/index.html'
        })
    ],
    // 配置webpack开发服务功能
    devServer: {
        // 设置基本目录结构
        contentBase: path.resolve(__dirname, '../dist'),
        // 服务器的IP地址，可以使用IP也可以使用localhost
        host: 'localhost',
        // 服务端压缩是否开启
        compress: true,
        // 配置服务端口号
        port: 8888
    }
}