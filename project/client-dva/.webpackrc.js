const config = {};
config.proxy = {
  "/api": {
    "target": "http://localhost:7001",
    "changeOrigin": true,
    "pathRewrite": {
      "^/api": ""
    }
  }
}

config.extraBabelPlugins = [
  //antd按需加载引入
  ["import", {
    "libraryName": "antd",
    "libraryDirectory": "es",
    "style": "css"
  }],
  //装饰器语法配置
  [
    "@babel/plugin-proposal-decorators",
    {
      "legacy": true
    }
  ]
]



export default config;
