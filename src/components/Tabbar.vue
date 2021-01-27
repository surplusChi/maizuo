<template>
    <nav>
        <!-- 这个功能：声明式导航 -->
        <ul>
            <!-- router-link标签是vue封装的一个跳转并监听地址栏中的#/后的锚点，
            其中to属性是跳转监听的锚点，如果不加tag属性，默认会渲染成a标签，
            加上tag属性会渲染成指定标签， active-class会给渲染的标签加上一个指定的class名，
            这样就可以预选设置好class样式，来动态改变选中的样式了-->
            <router-link to="/film" tag= "li" active-class="tabbaractive">
                <van-icon name="video-o" size="25" />
                <span>电影</span>
            </router-link>
            <router-link to="/cinema" tag= "li"  active-class="tabbaractive">
                <van-icon name="photo-o" size="25" />
                <span>影院</span>
            </router-link>
            <router-link to="/center" tag= "li"  active-class="tabbaractive">
                <van-icon name="manager-o" size="25" />
                <span>我的</span>
            </router-link>
        </ul>
    </nav>
</template>
<script>
import Vue from 'vue'
import { Icon } from 'vant' // 引入vant的icon图标组件
Vue.use(Icon) // 注册成全局组件
export default {
}
</script>

<style lang="scss" scoped>
    nav{
        position: fixed;
        bottom: 0px;
        left: 0px;
        width: 100%;
        height: 50px;
        line-height: 25px;
        text-align: center;
        background-color: white;
        z-index: 999;
        ul{
          display: flex;
          li{
            flex: 1;
            display: flex;
            flex-direction: column;
            span{
                font-size: 14px;
            }
          }
    }
    }
    .tabbaractive{
        color: red;
    }
</style>
