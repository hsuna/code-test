const path = require("path")
const fs = require("fs")
const webpack = require("webpack")
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin")

const config = {
  jsDir: "/app/",
  entry: path.join(__dirname, "./src/app") //webpack入口
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
  module: {
    loaders: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new FriendlyErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
}
