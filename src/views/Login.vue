<template>
    <div class="web-login">
        <div class="logo">
            <img src="https://assets.maizuo.com/h5/mz-auth/public/app/img/logo.19ca0be.png">
        </div>
        <div class="login-form">
           <div class="form-group">
               <input type="text" title="手机号" placeholder="手机号">
           </div>
           <div class="form-group">
               <input type="text" title="验证码" placeholder="验证码">
           </div>
           <div>
               <button>登录</button>
           </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { Button } from 'vant' // 引入Vant库中的button组件
Vue.use(Button) // 全局注册
export default {
}
</script>

<style lang="scss" scoped>
    .web-login{
        height: 350px;
    }
    .logo{
        margin: 79px auto 40px;
        text-align: center;
        height: 60px;
        line-height: 60px;
        img{
            height: 60px;
        }
    }
    .login-form{
        width: 100%;
        position: relative;
        .form-group{
            padding-left: 40px;
            width: 360px;
            height: 50px;
            input{
                width: 100%;
                height: 40px;
                padding: 5px 0 5px;
                border: 1px solid #e7e2e2;
            }
        }
        button{
            width: 360px;
            line-height: 45px;
            font-size: 16px;
            margin: 70px 25px 0;
            border-radius: 3px;
            text-align: center;
            background-color: #ff5f16;
            height: 44px;
            color: #fff;
            border: none;
        }
    }
</style>
