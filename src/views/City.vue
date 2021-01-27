<template>
    <div>
        <van-index-bar :index-list="computedCityList" @select = "handleSelect">
            <div v-for="(data,index) in cityList" :key="index">
                <van-index-anchor :index="data.type" />
                <van-cell :title="itme.name" v-for="(itme,index) in data.list" :key="index"
                @click="handleBack(itme.name, itme.cityId)"/>
            </div>
        </van-index-bar>
    </div>
</template>

<script>
import Vue from 'vue'
import { mapMutations } from 'vuex' // 映射方法，切割方饭
import { IndexBar, IndexAnchor, Cell, Toast } from 'vant'
import http from '@/util/http.js'
Vue.use(IndexBar).use(Cell)
Vue.use(IndexAnchor)
export default {
  data () {
    return {
      cityList: []
    }
  },
  computed: {
    computedCityList () {
      return this.cityList.map(itme => itme.type)
    }
  },
  mounted () {
    // 进入城市列表页面隐藏底部选项卡
    // this.$store.commit('TabbarShow') 单页面写法
    this.Show()
    http({
      url: '/gateway?k=8177187',
      headers: {
        'X-Host': 'mall.film-ticket.city.list'
      }
    }).then(res => {
      // console.log(res.data,data,cities)
      this.cityList = this.handleCityData(res.data.data.cities)
    })
  },
  beforeDestroy () {
    // 离开城市列表页面显示底部选项卡
    // this.$store.commit('TabbarShow') 单页面写法
    this.Hide()
  },
  methods: {
    ...mapMutations('TabbarModule', ['Show', 'Hide']),
    ...mapMutations('CityModule', ['changeCityName', 'changeCityId']),
    handleCityData (cities) {
      // 输入原始数据，返回我们自己想要格式的目标数据
      // console.log(cities)

      const letterArr = [] // 创建一个数组存放26个字母
      const newCities = [] // 目标数据格式
      // 通过循环遍历出26个字母，插到数组中
      for (let code = 65; code < 91; code++) {
        // console.log(String.fromCharCode(code))
        letterArr.push(String.fromCharCode(code))
      }
      // console.log(letterArr)
      // 对26字母的数组进行遍历，找到原数据中拼音首字母相同的数据，放在一起
      letterArr.forEach(letter => { // letter 是26个字母，每个字母和原数据的首字母比较
        const list = cities.filter(itme => itme.pinyin.substring(0, 1).toUpperCase() === letter)
        // filter，过滤方法，过滤掉不符合要求的；itme是每个原数据；substring截取拼音首字母，toUpperCase转成大写
        if (list.length > 0) { // 判断是否有哪个首字母没有元素
          newCities.push({ // 把首字母和首字母相同的数组都插到目标数组中，格式是我们自己想要的格式
            type: letter,
            list: list
          })
        }
      })
      return newCities // 把目标格式的数据，返回出去
    },
    // 点击点击索引栏的字符时,弹出对应字符的轻提示
    handleSelect (index) {
      // console.log(index)
      Toast(index)
    },
    handleBack (name, cityId) {
      // 再返回城市影院列表时，记录当前点击的城市的cityId,CityName
      // commit方法：是提交方法，让记录下来要改变的值，到store中去修改
      // this.$store.commit('changeCityName', name)
      // this.$store.commit('changeCityId', cityId)
      this.changeCityName(name)
      this.changeCityId(cityId)
      this.$router.back()
    }
  }
}
</script>

<style lang="scss">
    /* 改变点击点击索引栏的字符时，轻提示框的样式*/
    .van-toast--text {
        width: -webkit-fit-content;
        width: fit-content;
        min-width: 0px;
        min-height: 0;
        padding: 8px 12px;
    }
</style>
