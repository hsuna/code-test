const path = require('path')

module.exports = {
    //以多页模式构建应用程序。
    pages: {
        index: path.join(__dirname, './src/pages/index/main.ts'),
        preload: path.join(__dirname, './src/pages/preload/main.ts')
    },
    //是否使用包含运行时编译器的 Vue 构建版本
    runtimeCompiler: false,
    transpileDependencies: [
        'vuex-module-decorators'
    ]
}