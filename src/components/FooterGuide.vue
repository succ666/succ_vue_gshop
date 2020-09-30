<template>
  <div class="footer-guide">
    <span class="guide-item" @click="goto('/msite')" :class="{on: isCurrent('/msite')}">
      <span>
        <i class="iconfont icon-u"></i>
      </span>
      <span>外卖</span>
    </span>
    <span class="guide-item" @click="goto('/search')" :class="{on: isCurrent('/search')}">
      <span>
        <i class="iconfont icon-search1"></i>
      </span>
      <span>搜索</span>
    </span>
    <span class="guide-item" @click="goto('/order')" :class="{on: isCurrent('/order')}">
      <span>
        <i class="iconfont icon-dingdan"></i>
      </span>
      <span>订单</span>
    </span>
    <span class="guide-item" @click="goto('/profile')" :class="{on: isCurrent('/profile')}">
      <span>
        <i class="iconfont icon-user"></i>
      </span>
      <span>我的</span>
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'FooterGuide',
    methods: {
      goto(path){
        this.$router.replace(path)
        // console.log(this.$route.path)
      },
      isCurrent(path){
        return this.$route.path === path
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../common/stylus/mixins.styl"
.footer-guide
  top-border-1px(#ccc)
  position fixed
  display flex
  bottom 0px
  left 0px
  width 100%
  height 50px
  background-color #fff
  .guide-item
    display flex
    flex-direction column
    width 25%
    text-align center
    &.on
      color $green
    span 
      margin-top 4px
      font-size 12px
      .iconfont
        font-size 22px
</style>
