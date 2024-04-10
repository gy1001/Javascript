# zf-webpack 珠峰 webpack 专题课

## gy-webpack-demo

配合 gy-webpack 脚本使用，达到理解 webpack 打包编译的目的

### 安装命令

```bash
npm install
```

本地建立 gy-webpack 软链接后，安装 gy-webpack 依赖

```bash
npm link gy-webpack
```

### 运行命令

```bash
# 执行 gy-webpack 打包
npm run dev
```

```bash
# 执行 webpack 打包
npm run build
```

## 手动实现 babel-loader

zf-webpack/self-babel-loader

### 依赖库

- @babel/core
- @babel/preset-env
- loader-utils: loader-utils 是一个能够帮助开发者编写自定义 Webpack loader 的 npm 包
