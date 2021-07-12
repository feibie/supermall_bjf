module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // vue-cli3默认配置中 已配置 @为src
        "assets":"@/assets",
        "common":"@/common",
        "components":"@/components",
        "network":"@/network",
        "views":"@/views",
      }
    }
  }
}