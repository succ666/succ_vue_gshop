<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide></FooterGuide>
  </div>
</template>

<script type="text/ecmascript-6">
  import FooterGuide from '@/components/FooterGuide.vue'

  export default {
    components:{
      FooterGuide
    }
  }
</script>

<style lang="stylus" ref="stylesheet/stylus">
  #app
    width 100%
    height 100%
</style> 
