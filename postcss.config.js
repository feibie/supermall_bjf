module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewprotWidth: 375,// 视窗的宽度，对应的是我们设计稿的宽度
      viewportHeight: 667,// 视窗的高度
      unitPrecision: 5,// 指定px 转换为视窗单位值的小数位数
      viewportUnit: "vw",//指定需要转换成的视窗单温，建议使用 vw
      selectorBlackList: ["igone", "tab-bar", "tab-bar-item", "tab-menu"], // 指定不需要转换的类，
      minPixelValue: 1,// 小于或等于 1px 不转换为视窗单位
      mediaQuery: false, // 允许在媒体查询中转换 px
      exclude:[/Tab/]
    }
  }
}
