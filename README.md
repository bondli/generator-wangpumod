# generator-wangpumod

> 旺铺模块开放工具

**构建成功后的工程目录结构说明：**

```
|- project-name/                #项目目录
  |- src/
    |- web                      #PC模块源码目录
      |- index.js
      |- index.scss
    |- weex                     #无线模块源码目录
      |- index.we
  |- build                      #打包后的bundle文件
  |- data                       #mock数据目录
  |- pages                      #启动本地预览的承载页面
    |- web.html
    |- weex.html
  |- node_modules
  |- webpack.config.web.js      #打包PC模块react代码的webpack配置文件
  |- webpack.config.weex.js     #打包无线模块weex代码的webpack配置文件
  |- .babelrc                   #babel打包配置
  |- .editorconfig
  |- .gitignore
  |- index.html                 #启动页
  |- gulpfile.js
  |- package.json
  |- README.md

```

## Usage

Install `generator-wangpumod`:
```
npm install -g generator-wangpumod
```

Make a new directory, and `cd` into it:(模块目录请已`wpm-`开头，后面接自己的模块名称)
```
mkdir wpm-yourmodulename && cd $_
```

Run `yo wangpumod`:
```
yo wangpumod
```

Run `gulp build` for building and `gulp` for preview and develop


**Note: Generators are to be run from the root directory of your app.**
