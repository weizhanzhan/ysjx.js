module.exports = {
  entry:{
    main:'./main.js'
  },
  module:{
    rules:[
      {
        test:/\.js$/,//所有的js文件应用babel-loader
        use:{
          loader:'babel-loader',
          options:{//添加配置
            presets:['@babel/preset-env'],//Babel cinfig的快捷方式
            //配置jsx语法插件 并去除自带react。renderDom方法 改为自己的createElement方法
            plugins:[['@babel/plugin-transform-react-jsx',{pragma:'createElement'}]]
          }
        }
      }
    ]
  },
  //使打包的代码可读
  mode:"development",
  optimization:{
    minimize:false
  }
}