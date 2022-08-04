# TypeScript

## TS 简介

### TypeScript 是什么

- 以 JavaScript 为基础构建的语言
- 一个 JavaScript 的超集
- 可以在任何支持 JavaScript 的平台中执行（**TS 不能被 JS 解析器直接执行，需要把 TS 编译为 TS**）
- TypeScript 扩展了 JavaScript，并添加了类型

### TypeScript 增加了什么

- 类型
- 支持 ES 的新特性
- 添加了 ES 不具备的新特性
- 丰富的配置选项
- 强大的开发工具

## 1、TypeScript 的开发环境搭建

### 1.1 下载并安装 Node.js

[官网下载](https://nodejs.org/zh-cn/)

### 1.2 使用 npm 全局安装 TypeScript

- 安装命令

  ```shell
  npm install -g typescript
  ```

- 编译命令

  ```shell
  tsc helloworld.ts
  ```

## 2、TS 的类型声明

### 2.1 类型声明

- 类型声明是 TS 非常重要的一个特点

- 通过类型声明可以指定 TS 中变量 （参数、形参）的类型

- 指定类型后，当为变量赋值时，TS 编译器回自动检查值是否符合类型声明，符合则赋值，否则报错

- 简而言之，类型声明给变量设置了类型，使得变量只能存储某种类型的值

- 语法

  ```javascript
  let 变量：类型；
  let 变量：类型 = 值；
  function fn(参数：类型，参数：类型)：类型{
    ...
  }
  ```

- 自动类型判断

  - TS 拥有自动的类型判断机制
  - 当对变量的声明和赋值时同时进行的，TS 编译器会自动判断变量的类型
  - 所以如果你的变量的声明和赋值同时进行，可以省略类型声明

- 类型断言

  - 常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。
  - 推荐 as 语法

- 类型

  | 类型    | 例子            | 描述                            |
  | ------- | --------------- | ------------------------------- |
  | number  | 1, -33, 2.5     | 任意数字                        |
  | string  | "hi", 'hi', hi  | 任意字符串                      |
  | boolean | true, false     | 布尔值 true 或者 false          |
  | 字面量  | 其本身          | 限制变量的值就是该字面量的值    |
  | any     | \*              | 任意类型                        |
  | unknown | \*              | 类型安全的 any                  |
  | void    | 空值(undefined) | 没有值(或者 undefined)          |
  | never   | 没有值          | 不能使任何值                    |
  | object  | {name:'孙悟空'} | 任意的 js 对象                  |
  | array   | [1,2,3]         | 任意 JS 数组                    |
  | tuple   | [4, 5]          | 元组，TS 新增类型，固定长度数组 |
  | enum    | enum{A, B}      | 枚举，Ts 新增类型               |

- 例子

  ```javascript
  let a:string = "孙悟空";
  let a = "孙悟空";

  // 类型断言
  let strLength: number = (someValue as string).length;

  // never
  function createError():never{
    throw new Error("报错了")
  }

  // 属性名后面加 ? 表示属性是可选的
  let b:{ name: string, age?: numebr}
  b = { name:'孙悟空', age: 20 }

  let c: {name: string, [propName: string]: any}
  c = { name: '猪八戒', age: 18, gender: "男" }

  // 设置函数结构的类型声明
  let d: (a: number, b: number) => number
  d = function(n1: number, n2: number):number => {
    return n1 + n2
  }

  // 数组
  let e:string[]
  e = ['a','b',"c"]

  let f = Array<number>
  f = [1,2,3,4,5,6,7,8]

  // 元组：固定长度的数组
  let h : [string, number]
  h = ["hello", 123]

  // enum：枚举
  Enum Gnder {
    Male,
    Female
  }
  let i: {name: string, gender: Gender}
  i = { name: '孙悟空', gender: Gender.Male }

  // 联合类型
  let j = string | numebr
  let j: {name:string} & { age: number }
  j = { name: '孙悟空', age: 20 }

  // 类型别名
  let k: 1|2|3|4|5;
  let l: 1|2|3|4|5;
  // 可以简化为如下
  type MyType = 1|2|3|4|5;
  let m: MyType;
  let n: MyType;
  ```

## 3、 编译选项

### 3.1 自动编译文件

- 编译文件时，使用 -w 指令后，TS 编译器会自动监视文件的变化，并在文件发生变化时对文件进行重新编译

- 示例

  ```javascript
  tsc xxx.ts -w
  ```

### 3.2 自动编译整个项目

- 如果直接使用 tsc 命令，则可以自动将当前项目下的所有 ts 文件编译为 js 文件
- 但是如果能直接使用 tsc 命令的前提是，要在项目根目录下创建一个 ts 的配置文件 tsconfig.json
- tsconfig.json 是一个 json 文件，添加配置文件后，只需 tsc 命令即可完成对整个项目的编译

### 3.3 配置选项

- include

  - 定义希望被编译文件所在的目录

  - 默认值：["\*\*/\*"]

  - 示例

    - ```javascript
      "include": ["src/**", "tests/**/*"]
      ```

    - 上述示例中，所有 src 目录和 tests 目录下的文件都会被编译

- exclude

  - 定义需要排除在外的目录

  - 默认值：["node_modules", "bower_components", "jspm_packages"]

  - 示例

    - ```javascript
      "exclude": ["./src/hello/**/*"]
      ```

    - 上述示例中，src 下 hello 目录下的文件不会被编译

- extends

  - 定义被继承的配置文件

  - 示例

    - ```javascript
      "extends": "./config/base"
      ```

    - 上述示例中，当前配置文件中会自动包含 config 目录下 base.jso 中的所有配置信息

- files

  - 指定被编译文件的列表，只有需要编译的文件少时才会用到

  - 示例

    - ```javascript
      "files": {
        "core.ts",
        "sys.ts",
        "types.ts",
        ...
      }
      ```

    - 列表中的文件都会被 TS 编译器所编译

- compilerOptions

  - 编译选项时配置文件中非常重要也是比较复杂的配置选项

  - 在 compilerOptions 中包含多个子选项，用来完成对编译的配置

  - 项目选项

    - target

      - 设置 ts 代码编译的目标版本
      - 可选值
        - `ES3(默认值)`、`"ES5"`、`"ES6"`、 `"ES2015"`、`"ES2016"`、`"ES2017"`、`"ESNext"`

    - module

      - 指定生成哪个模块系统代码： `"None"`， `"CommonJS"`， `"AMD"`， `"System"`， `"UMD"`， `"ES6"`或 `"ES2015"`。
      - 只有 `"AMD"`和 `"System"`能和 `--outFile`一起使用。
      - `"ES6"`和 `"ES2015"`可使用在目标输出为 `"ES5"`或更低的情况下。
      - 默认值：`target === "ES6" ? "ES6" : "commonjs"`

    - lib

      - 编译过程中需要引入的库文件的列表。
      - 可能的值 `ES5`、 `ES6`、`ES2015` `ES7`、 `ES2016`、 `ES2017`、 `ES2018、` `ESNext、` `DOM`、 `DOM.Iterable`、 `WebWorker`、 `ScriptHost`、 `ES2015.Core`、 `ES2015.Collection、` `ES2015.Generator、` `ES2015.Iterable`
        `ES2015.Promise`、`ES2015.Proxy`、 `ES2015.Reflect、` `ES2015.Symbol、` `ES2015.Symbol.WellKnown`、 `ES2016.Array.Include、` `ES2017.object、` `ES2017.Intl`、`ES2017.SharedMemory`、 `ES2017.String`、
        `ES2017.TypedArrays、` `ES2018.Intl、` `ES2018.Promise`、 `ES2018.RegExp、` `ESNext.AsyncIterable、`ESNext.Array、` `ESNext.Intl`、`ESNext.Symbol`

    - outDir

      - 重定向输出目录。

      - 示例

        - ```javascript
          "outDir": "./dist"
          ```

    - outFile

      - 将输出文件合并为一个文件。合并的顺序是根据传入编译器的文件顺序和 ` ///<reference``> `和 `import`的文件顺序决定的。查看输出文件顺序文件了解详情。

      - 示例

        - ```javascript
          outFile: './dist/app.js'
          ```

    - allowJs

      - 允许编译 javascript 文件。

      - 默认：false

      - 示例

        - ```javascript
          "allowJs": false
          ```

    - checkJs

      - 在 `.js`文件中报告错误。与 `--allowJs`配合使用。

      - 默认 `false`

      - 示例

        - ```javascript
          "checkJs": true
          ```

    - removeComments

      - 删除所有注释，除了以 `/!*`开头的版权信息。

      - 默认：`false`

      - 示例

        - ```javascript
          "removeComments": true
          ```

    - noEmit

      - 不生成输出文件(用途：可以用来进行 ts 检查而不输出文件)

      - 默认值：`false`

      - 示例

        - ```javascript
          "noEmit": true
          ```

    - noEmitOnError

      - 报错时不生成输出文件。

      - 默认值：`false`

      - 示例

        - ```javascript
          "noEmitOnError": true
          ```

    - alwaysStrict

      - 以严格模式解析并为每个源文件生成 `"use strict"`语句

      - 默认值： `false`

      - 示例

        - ```javascript
          "alwaysStrict": true
          ```

    - noImplicitAny

      - 在表达式和声明上有隐含的 `any`类型时报错。

      - 默认值：`false`

      - 示例

        - ```javascript
          "noImplicitAny": true
          ```

    - noImplicitThis

      - 当 `this`表达式的值为 `any`类型的时候，生成一个错误。

      - 默认值：`false`

      - 示例

        - ```javascript
          "noImplicitThis": true
          ```

    - strictNullChecks

      - 在严格的 `null`检查模式下， `null`和 `undefined`值不包含在任何类型里，只允许用它们自己和 `any`来赋值（有个例外， `undefined`可以赋值到 `void`）。

      - 默认值：`false`

      - 示例

        - ```javascript
          "strictNullChecks": true
          ```

    - strict

      - 启用所有严格类型检查选项。启用 `--strict`相当于启用 `--noImplicitAny`, `--noImplicitThis`, `--alwaysStrict`， `--strictNullChecks`和 `--strictFunctionTypes`和`--strictPropertyInitialization`

      - 默认值：`false`

      - 示例

        - ```javascript
          "strict": true
          ```

    - 等等还有很多：[具体参考官网](https://www.tslang.cn/docs/handbook/compiler-options.html)

## 4、使用 webpack 打包 TS 代码

### 4.1 初步打包 `TS` 文件

1. 创建 webpack-ts-demo, 然后执行初始化命令

   ```shell
   npm init
   ```

2. 安装相关依赖包

   ```shell
   npm install webpack webpack-cli typescript ts-loader -D
   ```

3. 创建 `webpack` 配置文件 `webpack.config.js`

   ```javascript
   const path = require('path')

   module.exports = {
     mode: 'development',
     // 指定入口文件
     entry: './src/index.ts',
     // 指定打包文件所在目录
     output: {
       path: path.resolve(__dirname, 'dist'),
       filename: 'bundle.js',
     },
     // 指定webpack 打包时候使用的模块
     module: {
       // 指定加载规则
       rules: [
         {
           // test 指定生效的文件规则
           test: /\.ts$/,
           // 要使用的 loader
           use: 'ts-loader',
           // 要指定排除的文件夹
           exclude: /node_modules/,
         },
       ],
     },
   }
   ```

4. 创建 `ts` 配置文件 `tsconfig.js`

   - 可以手动创建，也可以执行命令`npx tsc --init` 进行创建

   - 内容如下

     ```javascript
     {
       "compilerOptions": {
         "target": "ES2015",
         "module": "ES2015",
         "strict": true
       }
     }
     ```

5. `package.jso` 中增加脚本命令

   ```javascript
   "scripts": {
     "build": "webpack"
   },
   ```

6. 执行打包命令，就可以看到 `dist` 目录下的 `bundle.js` 文件了

   ```shell
   npm run build
   ```

### 4.2 加入 HTML 文件

1. 增加 `html` 插件

   ```shell
   npm install html-webpack-plugin -D
   ```

2. 修改 `package.json` 文件

   ```javascript
   const htmlWebpackPlugin = require('html-webpack-plugin')

   module.exports = {
    	module: {...},
   	plugins: [
       new htmlWebpackPlugin({
         title: '我是自定义title',
         template: "./index.html" // 也可以指定 一个 html 模板文件进行渲染
       })
     ]
   }
   ```

3. 安装 `dev-serve`插件

   ```javascript
   npm install webpack-dev-server -D
   ```

4. 修改`package.json`，增加脚本

   ```javascript
    "scripts": {
      	...
       "start": "webpack serve --open"
     },
   ```

5. 运行`npm run start`，可以看到自动打开浏览器，并且当文件内容更新后，页面内容进行自动更新

### 4.3 其他

1. `clean-webpack-plugin`

   - 安装命令：`npm install clean-webpack-plugin -D`

   - 修改配置文件`package.json`引入

     ```javascript
     const {CleanWebpackPlugin} = require('clean-webpack-plugin')

     module.exports = {
       ...
       plugins: [
         ...,
         new CleanWebpackPlugin(),
       ]
     }
     ```

2. `resolve `

   - 用来设置引用模块

   - 示例

     - ```javascript
       module.exports = {
         ....,
         resolve: {
            extensions: ['.ts', '.js'],
         }
       }
       ```

### 4.4 使用 babel

1. 安装命令

   ```shell
   npm install @babel/core @babel/preset-env babel-loade core-js -D
   ```

2. 更改`package.json`中的 `rules`选项

   ```javascript
   ...
   module.exports = {
     ...
     rule: [
        {
           // test 指定生效的文件规则
           test: /\.ts$/,
           // 要使用的 loader
           use: [
             {
               // 指定加载器k
               loader: 'babel-loader',
               // 设置 babel
               options: {
                 // 设置自定义的环境
                 presets: [
                   [
                     '@babel/preset-env',
                     // 指定环境的插件
                     {
                       targets: {
                         chrome: '58',
                         ie: '11'
                       },
                       corejs: '3',
                       // 使用 corejs 的方式 为 usage,表示按需加载
                       useBuiltIns: 'usage',
                     },
                   ],
                 ],
               },
             },
             'ts-loader',
           ], // 加载器的执行顺序是
           // 要指定排除的文件夹
           exclude: /node_modules/,
         },
     ]
     ...
   }
   ```

3. 默认`webpack`打包会产生一个箭头函数进行包裹代码，如果你不想可以进行如下设置

   ```javascript
   module.exports = {
     output: {
       environment: {
         // The environment supports arrow functions ('() => { ... }').
         arrowFunction: true,
         // The environment supports BigInt as literal (123n).
         bigIntLiteral: false,
         // The environment supports const and let for variable declarations.
         const: true,
         // The environment supports destructuring ('{ a, b } = obj').
         destructuring: true,
         // The environment supports an async import() function to import EcmaScript modules.
         dynamicImport: false,
         // The environment supports 'for of' iteration ('for (const x of array) { ... }').
         forOf: true,
         // The environment supports ECMAScript Module syntax to import ECMAScript modules (import ... from '...').
         module: false,
         // The environment supports optional chaining ('obj?.a' or 'obj?.()').
         optionalChaining: true,
         // The environment supports template literals.
         templateLiteral: true,
       },
     },
   }
   ```
