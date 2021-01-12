const path = require('path')
const utils = require('./utils')
const config = require('../config')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = (env={}) => {
  const isEnvDevelopment = env.mode === 'development';
  const isEnvProduction = env.mode === 'production';
  
  const assetsPath = _path => path.posix.join(config.assetsPublicPath, _path)

  return {
    mode: env.mode,
    entry: config.appPageJs,
    devtool: isEnvProduction 
      ? config.productionSourceMap 
      ? '#source-map'
      : false
      : 'cheap-module-eval-source-map',
    output: {
      path: config.assetsRoot,
      filename: isEnvProduction ? assetsPath('js/[name].[chunkhash].js') : '[name].js',
      publicPath: config.assetsPublicPath,
    },
    devServer: isEnvDevelopment 
    ? {
        clientLogLevel: 'warning',
        historyApiFallback: {
          rewrites: [
            { from: /.*/, to: path.posix.join('/', 'index.html') },
          ],
        },
        hot: true,
        contentBase: false, // since we use CopyWebpackPlugin.
        compress: true,
        host: config.host,
        port: config.port,
        open: config.autoOpenBrowser,
        overlay: config.errorOverlay
          ? { warnings: false, errors: true }
          : false,
        publicPath: '/',
        proxy: config.proxyTable,
        quiet: true, // necessary for FriendlyErrorsPlugin
        watchOptions: {
          poll: config.poll,
        }
      }
    : undefined,
    resolve: {
      extensions: ['.js', '.ts', '.json', '.vue'],
      alias: {
        // this isn't technically needed, since the default `vue` entry for bundlers
        // is a simple `export * from '@vue/runtime-dom`. However having this
        // extra re-export somehow causes webpack to always invalidate the module
        // on the first HMR update and causes the page to reload.
        'vue': '@vue/runtime-dom',
        '@': resolve('src'),
      },
    },
    module: {
      rules: [
        ...utils.styleLoaders({
          sourceMap: config.productionSourceMap,
          extract: isEnvProduction,
          usePostCSS: true,
        }),
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: utils.cssLoaders({
              sourceMap: config.productionSourceMap,
              extract: isEnvProduction,
            }),
            cssSourceMap: config.productionSourceMap,
            cacheBusting: config.cacheBusting,
            transformToRequire: {
              video: ['src', 'poster'],
              source: 'src',
              img: 'src',
              image: 'xlink:href'
            },
            postcss:[
              //px转rem，比例750px : 37.5rem
              require('postcss-px2rem')({
                remUnit: 100
              })
            ]
          }
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            'babel-loader',
            {
                loader: 'ts-loader',
                options: {
                    appendTsxSuffixTo: [/\.vue$/],
                    transpileOnly: true
                }
            }
          ]
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          use: {
            loader: 'url-loader',
            options: { limit: 8192 }
          }
        },
      ]
    },
    optimization: {
			minimize: isEnvProduction,
			minimizer: [
				new TerserPlugin({
          extractComments: false,
					terserOptions: {
            parse: {
              // we want terser to parse ecma 8 code. However, we don't want it
              // to apply any minfication steps that turns valid ecma 5 code
              // into invalid ecma 5 code. This is why the 'compress' and 'output'
              // sections only apply transformations that are ecma 5 safe
              // https://github.com/facebook/create-react-app/pull/4234
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              // Disabled because of an issue with Uglify breaking seemingly valid code:
              // https://github.com/facebook/create-react-app/issues/2376
              // Pending further investigation:
              // https://github.com/mishoo/UglifyJS2/issues/2011
              comparisons: false,
              // Disabled because of an issue with Terser breaking valid code:
              // https://github.com/facebook/create-react-app/issues/5250
              // Pending futher investigation:
              // https://github.com/terser-js/terser/issues/120
              inline: 2,
              // 删除调试及打印
              drop_debugger: true, 
              drop_console: true,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              // Turned on because emoji and regex is not minified properly using default
              // https://github.com/facebook/create-react-app/issues/2488
              ascii_only: true,
            },
          },
          // Use multi-process parallel running to improve the build speed
          // Default number of concurrent runs: os.cpus().length - 1
          parallel: true,
          // Enable file caching
          cache: true,
        }),
        // This is only used in production mode
        new OptimizeCSSPlugin({
          cssProcessorOptions: config.productionSourceMap
            ? { safe: true, map: { inline: false } }
            : { safe: true }
        }),
      ] ,
      splitChunks: {
        chunks: 'all',
        minChunks: Object.keys(config.appPageJs).length,
        name: 'common',
      },
		},
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: `"${env.mode}"`,
        }
      }),
      ...(isEnvProduction 
      ? [
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: isEnvProduction ? assetsPath('css/[name].[contenthash].css') : '[name].css',
        }),
         // keep module.id stable when vendor modules does not change
        new webpack.HashedModuleIdsPlugin(),
        // enable scope hoisting
        new webpack.optimize.ModuleConcatenationPlugin(),
      ]
      : isEnvDevelopment 
      ? [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),
      ] 
      : []).filter(Boolean),
      new VueLoaderPlugin(),
      ...Object.keys(config.appPageJs).map(key => new HtmlWebpackPlugin({
        inject: true,
        template: config.appHtml[key] || config.appHtml['$'],
        chunks: ['common', key],
        filename: `${key}.html`,
        minify: isEnvProduction ? {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        } : undefined
        })
      ),
      isEnvProduction
      ? new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, '../public/static'),
          to: config.assetsCdnPath,
          ignore: ['.*']
        },
      ])
      : new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, '../public'),
          to: config.assetsRoot,
          ignore: ['.*', '.html']
        },
      ])
    ].filter(Boolean)
  }
}
