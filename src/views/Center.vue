<template>
    <div class="center-view">
        <div class="avatar">
          <div class="log" @click="handleLogin">
            <van-icon class="icon" name="user-circle-o" size="80"/>
            <span>立即登录</span>
          </div>
        </div>
        <div class="my-order-tab" @click="handleLogin">
            <div class="to">
              <van-icon name="idcard" size="30" color="#d6c20f"/>
              <span>电影订单</span>
            </div>
            <div class="to">
              <van-icon name="newspaper-o" size="30" color="#47a80f"/>
              <span>商品订单</span>
            </div>
        </div>
        <div class="my-card" @click="handleLogin">
          <van-icon class="my-icon" name="debit-pay" size="20" color="#fc3d3d"/>
          卖座劵
          <van-icon class="my-right" name="arrow" size="10"/>
        </div>
        <div class="my-card" @click="handleLogin">
          <van-icon class="my-icon" name="cash-back-record" size="20" color="#887474" />
          组合红包
          <van-icon class="my-right" name="arrow" size="10"/>
        </div>
        <div class="my-card" @click="handleLogin">
          <van-icon class="my-icon" name="gold-coin-o" size="20" color="#eea915"/>
          余额
          <van-icon class="my-right" name="arrow" size="10"/>
        </div>
        <div class="my-card" @click="handleLogin">
          <van-icon class="my-icon" name="setting-o" size="20" color="#50be06"/>
          设置
          <van-icon class="my-right" name="arrow" size="10"/>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { Icon } from 'vant'

Vue.use(Icon)
export default {
  // 局部路由拦截，局部导航守卫 组件内部的路由拦截
  /*  beforeRouteEnter (to, from, next) {
    // ...
    if (!localStorage.getItem('token')) {
      next('./login') // 如果满足通过条件，就路由到login去
    } else {
      next()
    }
  } */
  methods: {
    handleLogin () {
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="scss" scoped>
  .center-view{
    background: #f4f4f4;
  }
  .avatar{
    position: relative;
    text-align: center;
    line-height: 200px;
    margin-top: -44px;
    height: 200px;
    padding-left: 22px;
    padding-top: 64px;
    font-size: 16px;
    color: white;
    background-image: url(https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2345819690,834065041&fm=26&gp=0.jpg);
    .log{
      position: absolute;
      top: 100px;
      width: 200px;
      height: 150px;
    }
  }
  .my-order-tab{
    width: 100%;
    margin: 0 auto;
    display: flex;
    text-align: center;
    font-size: 13px;
    padding: 0;
    height: 79px;
    line-height:20px;
    background: #fff;
    margin-bottom: 10px;
    .to{
      padding-top: 13px;
      flex: 1;
      line-height: 79px;
      display: flex;
      flex-direction: column;
      span{
        font-size: 15px;
        height: 40px;
        line-height: 40px;
      }
    }
  }
  .my-card{
    background: #fff;
    position: relative;
    padding: 0 15px;
    height: 49px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border-bottom: 1px solid #ece4e4;
    .my-icon{
      padding-right: 20px;
    }
    .my-right{
      position: absolute;
      right: 10px;
    }
  }
</style>
