<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.isShowFooter"></FooterGuide>
  </div>
</template>

<script type="text/ecmascript-6">
  import FooterGuide from '@/components/FooterGuide/FooterGuide.vue'

  export default {
    components:{
      FooterGuide
    },
    mounted(){
      this.$store.dispatch('getAddress')
      this.$store.dispatch('autoLogin')
    }
  }
</script>

<style lang="stylus" ref="stylesheet/stylus">
  #app
    width 100%
    height 100%
</style> 
