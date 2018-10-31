const path = require("path")
const fs = require("fs")
const webpack = require("webpack")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const config = {
  jsDir: "/script/",
  entry: path.join(__dirname, "./src/script") //webpack入口
}
const fn = {
  getJS(dir) {
    let arr = fs.readdirSync(dir)
    return Object.assign(
      ...arr.map(e => ({
        [e.replace(".js", "")]: path.join(dir, e)
      }))
    )
  }
}

module.exports = {
  // devtool: '#eval-source-map',
  devtool: "#source-map",
  entry: fn.getJS(config.entry),
  output: {
    filename: "./dist/js/[name].js",
    libraryTarget:'umd'
  },
  plugins: [
    new UglifyJsPlugin({
      sourceMap: false
    }),
  ]
}
