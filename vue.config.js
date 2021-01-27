// 关闭eslint，反向代理.....
module.exports = {
  /*  lintOnSave:false */
  devServer: {
    // 配置反向代理，通过node后端提供的方法，实现从node本地服务器访问其他服务器就不存在跨域问题了
    // 配置完反向代理，记得要重启一下服务器，才能生效
    proxy: {
      '/ajax': { // '/ajax' 意思是：/ajax开头的请求都会反向代理，从本地服务器发送
        target: 'https://m.maoyan.com', // 反向代理，本地请求发送到的其他服务器
        changeOrigin: true
      }
    }
  }
}
