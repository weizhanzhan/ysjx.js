# toy-react

## 基本环境配置
1. 安装webpack
```
npm install webpack webpack-cli --save-dev
//dev不会打包到生产环境

```

2. 新建webpack.config.js
```js

module.exports = {
  entry:{
    //入口文件
    main:'./main.js'
  },
  //使打包的代码可读
  mode:"development",
  optimization:{
    minimize:false
  }
}

```

3. 加入loader
- babel-loader新版本的js转成旧版本的js 在更多浏览器去运行，兼容老的浏览器，还要加上@babel/core
- Babel本身不带任何配置，为了配置常用选项，需要安装preset-env
```
npm install babel-loader @babel/core @babel/preset-env --save-dev
```
4. 配置webpack loader

```js
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
            presets:['@babel/preset-env']//Babel cinfig的快捷方式
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
```


5. 安装 @babel/plugin-transform-react-jsx
```
npm install @babel/plugin-transform-react-jsx --save-dev
```

6. 配置jsx
```js
options:{
  //添加配置
  presets:['@babel/preset-env'],//Babel cinfig的快捷方式
  //配置jsx语法插件 并去除自带react。renderDom方法 改为自己的createElement方法
  plugins:[['@babel/plugin-transform-react-jsx',{pragma:'createElement'}]]
}
```

7. 到此，环境搭建完成 ，终端输入 npx webpack 就开启打包啦！ 

