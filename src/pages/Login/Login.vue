<template>
   <div class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">买买提外卖</h2>
          <div class="login_header_title">
            <a href="javascript:;" :class="isShowSms ? 'on':'off'" @click="isShowSms = true">短信登录</a>
            <a href="javascript:;" :class="isShowSms ? 'off':'on'" @click="isShowSms = false">密码登录</a>
          </div>
        </div>
        <div class="login_content">
          <form @submit.prevent="login">
            <div :class="!isShowSms ? 'off':'on'">
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
                <button :disabled="!isPhoneCode" class="get_verification" 
                :class="{'right_phone_number':isPhoneCode}" @click.prevent="sendCode" >{{time > 0 ? `短信以发送(${time}s)`:'获取验证码'}}</button>
              </section>
              <section class="login_verification">
                <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
              </section>
              <section class="login_hint">
                温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                <a href="javascript:;">《用户服务协议》</a>
              </section>
            </div>
            <div :class="isShowSms ? 'off':'on'">
              <section>
                <section class="login_message">
                  <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
                </section>
                <section class="login_verification">
                  <input maxlength="8" placeholder="密码" :type="isShowPwd ? 'text':'password'" v-model="pwd"> 
                  <div class="switch_button" :class="isShowPwd ? 'on':'off'"  @click="isShowPwd = !isShowPwd">
                    <div class="switch_circle" :class="isShowPwd ? 'left': ''"></div>
                    <span class="switch_text">abc</span>
                  </div>
                </section>
                <section class="login_message">
                  <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                  <img class="get_verification" ref="captcha" @click="getCaptcha" src="http://localhost:4000/captcha" alt="captcha">
                </section>
              </section>
            </div>
            <button class="login_submit">登录</button>
          </form>
          <a href="javascript:;" class="about_us">关于我们</a>
        </div>
        <a href="javascript:" class="go_back" @click="$router.back()">
          <i class="iconfont icon-left"></i>
        </a>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import { Toast } from 'mint-ui'
  import {reqSendcode,reqSmsLogin,reqPwdLogin} from '@/api/index.js'
  export default {
    name: 'Login',
    data() {
      return {
        isShowSms: true,      // true 短信登录 ，   false 密码登录
        phone: '',            //电话号码 
        isShowPwd: false,     // true 显示密码 ，   false 隐藏密码
        time: 0,              //定时时间
        pwd: '',              //密码
        name: '',             //用户名
        code: '',             //短信验证码
        captcha: '',          //图片验证码
      }
    },
    computed: {
      isPhoneCode(){
        return /^1\d{10}$/.test(this.phone)
      },
     
    },
    methods: {
      //启动倒计时发送验证码
      async sendCode() {
        //倒计时开启
        if(!this.time){
          this.time = 20
           this.IntervalId = setInterval(()=>{
            if(this.time <= 0){
              clearInterval(this.IntervalId)
              this.time = 0
              return
            }
            this.time--
          },1000)
        }
        // 发送ajax请求（向指定手机发送验证码短信）
        const result = await reqSendcode(this.phone)
        if(result.code === 1){
          Toast(result.msg)
          this.time = 0
          clearInterval(this.IntervalId)
        }
      },
      // 异步登录
      async login() {
        let result
        // isShowSms: true,      // true 短信登录 ，   false 密码登录
        if(this.isShowSms){   // true 短信登录 ，  
          const {isPhoneCode, code, phone} = this
          if(!isPhoneCode){
            //请输入正确的手机号
            Toast('请输入正确的手机号');
            return
          }else if(!/^\d{6}$/.test(code)){ //验证码
            //请输入正确的验证码
             Toast('请输入正确的验证码');
            return
          }
          //登录
          result = await reqSmsLogin({phone,code})

        }else{   //false 密码登录
          const {name, pwd, captcha} = this
          if(!name){
            //请输入用户名
            Toast('请输入正确的用户名');
            return
          }else if(!pwd){
            //请输入密码
            Toast('请输入正确的密码');
            return
          }else if(!captcha){
            //请输入验证码
            return
          }
          // 登录
          result = await reqPwdLogin({name,pwd,captcha})
        } 
        // 根据结果数据处理
        if(result.code === 1){
            const user = result.msg
            this.getCaptcha()
            Toast(result.msg)
          }else{
            const user = result.data
            this.$store.dispatch('syncUserInfo', user)
            this.$router.replace('/profile')
            this.getCaptcha()
            Toast('登录成功')
          }
      },

      getCaptcha(){
        this.$refs.captcha.src = 'http://localhost:4000/captcha?time='+Date.now()
      }
    }
  }
</script>

<style lang="stylus">
.loginContainer
  width 100%
  height 100%
  background #fff
  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto
    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #02a774
        text-align center
      .login_header_title
        padding-top 40px
        text-align center
        >a
          color #333
          font-size 14px
          padding-bottom 4px
          &:first-child
            margin-right 40px
          &.on
            color #02a774
            font-weight 700
            border-bottom 2px solid #02a774
    .login_content
      >form
        >div
          display none
          &.on
            display block
          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial
            &:focus
              border 1px solid #02a774
          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent
              &.right_phone_number
                color black 
          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .switch_button
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color .3s,border-color .3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              &.off
                background #fff
                .switch_text
                  float right
                  color #ddd
              &.on
                background #02a774
              >.switch_circle
                //transform translateX(27px)
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                transition transform .3s
                &.left{
                  transform translateX(27px)
                }
          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px
            >a
              color #02a774
        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #4cd96f
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0
      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999
    .go_back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px
      >.iconfont
        font-size 20px
        color #999
</style>
