module.exports = {
  publicPath:'./',
  devServer: {
    proxy: {
      "/juheapi": { //自定义
        target: "http://apis.juhe.cn", //这里可以跟随项目实际部署服务器来
        changeOrigin: true,
        ws: true, // websocket
      }
    },
    port: 8080, // 设置端口号
    // host: '120.48.42.33', // ip
  },
  configureWebpack: { externals: 'hls.js' } // 在这配置webpack的externals这个字段
}