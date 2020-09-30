const path = require('path')
const px2rem = require('postcss-px2rem')

module.exports = {
  // runtimeCompiler: true,
  lintOnSave: false, //关闭EsLint的规则
  css: { // 添加postcss配置
    loaderOptions: {
      postcss: {
        plugins: [
          // 配置postcss-px2rem
          px2rem({
            remUnit: 37.5   // 设计稿等分后的rem值   375/10 ,等分的比例同页面rem的比例是一致的
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

}


}