'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const IS_PROD = process.env.NODE_ENV === 'production'
const IS_DEV = process.env.NODE_ENV === 'development'

// // cdn链接
// const isNeedCdn = true // 是否开启cdn
// const cdn = {
//   // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
//   externals: {
//     vue: 'Vue',
//     // vuex: 'Vuex',
//     'vue-router': 'VueRouter',
//     nprogress: 'NProgress',
//     axios: 'axios'
//   },
//   // cdn的css链接
//   css: ['https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css'],
//   // cdn的js链接
//   js: [
//     'https://unpkg.com/vue@next',
//     // 'https://unpkg.com/vuex',
//     'https://unpkg.com/vue-router@4',
//     'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.js',
//     'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js'
//   ]
// }

const name = 'Vue3.0VantMobile' // page title

// If your port is set to 80,
const port = process.env.port || process.env.npm_config_port || 80 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: './',
  outputDir: process.env.PROJECT_NAME || 'dist',
  assetsDir: 'static',
  lintOnSave: IS_DEV,
  productionSourceMap: false,
  devServer: {
    port: port, // 代理端口
    open: false, // 浏览器自动打开页面
    overlay: {
      warnings: true,
      errors: true
    },
    host: '0.0.0.0', // 如果是真机测试，就使用这个IP
    https: false, // https转发
    hotOnly: false, // 热更新（webpack已实现了，这里false即可）
    compress: true, // 开启压缩
    proxy: {
      '/api': {
        target: 'http://192.168.0.113:8199/',
        changeOrigin: true,
        ws: true,
        secure: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  configureWebpack: config => {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.name = name
    config.resolve = {
      alias: {
        '@': resolve('src')
      },
      extensions: ['.js', '.vue', '.json']
    }

    if (IS_PROD) {
      // 压缩代码并删除console.log和debugger
      const TerserPlugin = require('terser-webpack-plugin')
      config.optimization.minimizer.push(
        new TerserPlugin({
          // 生产环境推荐关闭 sourcemap 防止源码泄漏
          // 服务端通过前端发送的行列，根据 sourcemap 转为源文件位置
          sourceMap: true,
          // 开启多线程提高打包速度, 默认并发运行数：os.cpus().length - 1
          parallel: true,
          extractComments: false,
          terserOptions: {
            warnings: false,
            compress: {
              drop_console: true,
              drop_debugger: true
            }
          }
        })
      )
      // 开启GZIP优化 configureWebpack配置
      const CompressionPlugin = require('compression-webpack-plugin')
      config.plugins.push(
        new CompressionPlugin({
          algorithm: 'gzip',
          filename: '[path][base].gz',
          test: /\.js$|\.html$|\.css$/, // 匹配文件名
          threshold: 1024, // 超过1k进行压缩
          deleteOriginalAssets: false // 是否删除源文件
        })
      )
    }
  },

  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    // ============注入cdn start============
    // config.plugin('html').tap(args => {
    //   // 生产环境或本地需要cdn时，才注入cdn
    //   if (isProd || isNeedCdn) args[0].cdn = cdn
    //   return args
    // })
    // ============注入cdn start============

    // set svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config.when(IS_PROD, config => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }
        ])
        .end()
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          vantUI: {
            name: 'chunk-vantUI', // 单独将 vantUI 拆包
            priority: 20, // 数字大权重到，满足多个 cacheGroups 的条件时候分到权重高的
            test: /[\\/]node_modules[\\/]_?vant(.*)/
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
      config.optimization.runtimeChunk('single')
    })
  }
}
