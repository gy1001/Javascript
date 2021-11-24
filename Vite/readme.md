[TOC]

## 什么是 vite

1. 尤大随 Vu e3 正式版一起发布，起初是专为 vue 服务
2. Vite2 转为与框架无关
3. [官方中文文档](https://cn.vitejs.dev/)

## 目标

1. 使用简单
2. 快
3. 便于扩展（兼容 rollup 插件）

## 类似产品

1. Snowpack
2. WMR
3. @web/dev-server

## 和传统构建工具的区别

1. High level api
2. 不包含自己的编译能力
3. 完全是基于 ESM 加载方式的开发

> webpack 更全面 ；rollup 更专一； vite 更好用；
>
> vite 是为项目而生，而不是为构建而生，减少了很多配置量

减少的工作

- dev server
- 各类 loader
- build 命令

## 优势

- 上手非常简单
- 开发效率极高
- 社区成本低（兼容 rollup 插件）
- 没有复杂晦涩的配置

### 更合理的类比

- Vue-cli
- Create-react-app

### 你修改配置还是要碰 webpack

- Create-react-app 需要 run eject
- Vue-cli 中的 configureWebpack 和 chainWebpack

### Vite 有自身的插件系统

### 生态：兼容 rollup 插件

### 最大优势：快

### 传统的打包过程

<img src="/Users/gaoyuan/Library/Application Support/typora-user-images/image-20211124230554486.png" alt="image-20211124230554486" style="zoom:50%;" />

### vite 打包过程

> 另外也是得益于 ESM 的支持

<img src="/Users/gaoyuan/Library/Application Support/typora-user-images/image-20211124230629362.png" alt="image-20211124230629362" style="zoom:50%;" />
