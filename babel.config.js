module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [ // 配置vant组件库的按需引入组件方式
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}
