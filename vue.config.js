const path = require('path')
const px2rem = require('postcss-px2rem')

module.exports = {
  // runtimeCompiler: true,
  lintOnSave: false, //关闭EsLint的规则
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          px2rem({
            remUnit: 37.5
          })
        ]
      }
    }
  },
configureWebpack: { //  内部写webpack原生配置
  resolve:{
    extensions: ['.js', '.vue', '.json'],
    alias: {
      //  'vue$':'vue/dist/vue.esm.js', // 表示精准匹配 带vue编译器
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
    },
  }
},

devServer: {
  proxy: {
    // 处理以/api开头路径得请求
    '/api': {
      target: 'http://localhost:4000', //转发的目标地址
      pathRewrite: {
        '^/api': '' //转发请求时去除路径前面的/api
      },
      changeOrigin: true, // 支持跨域，如果协议/主机也不同，必须加上
    }
  }
}


}