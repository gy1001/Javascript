# Require.js

## Home 主页

RequireJS is a JavaScript file and module loader. It is optimized for in-browser use, but it can be used in other JavaScript environments, like Rhino and Node. Using a modular script loader like RequireJS will improve the speed and quality of your code.

RequireJs 是一个 js 文件和一个模块加载器。它对浏览器的使用做了优化，但是也可以使用在其他 js 环境中，比如 Rhino 和 Node。用一个类似 RequireJs 的模块化脚本将提高你的代码的质量和加载速度。

兼容性也非常好

IE 6+ .......... 兼容 ✔

Firefox 2+ ..... 兼容 ✔

Safari 3.2+ .... 兼容 ✔

Chrome 3+ ...... 兼容 ✔

Opera 10+ .. ....兼容 ✔

## Start 开始

### 获取 REQUIREJS

Go to the download page and get the file.

去[下载页面](https://requirejs.org/docs/download.html)获得文件

### 添加 REQUIREJS

This setup assumes you keep all your JavaScript files in a "scripts" directory in your project. For example, if you have a project that has a project.html page, with some scripts, the directory layout might look like so:

此设置假定你把所有的 JavaScript 文件 都放在工程下面的 “script” 文件夹下。比如，如果有一个项目有一个带有一些脚本文件 的 project.html 的页面，这个文件夹布局方式像下面：

```
project-directory/
  project.html
  scripts/
    main.js
    require.js
  helper/
   util.js
```

To take full advantage of the optimization tool, it is suggested that you keep all inline script out of the HTML, and only reference require.js with a requirejs call like so to load your script:

为了充分利用优化工具，建议你 把所有的内连脚本保留在 html 之外，并且只引用 require.js 文件来加载你的脚本

```html
<!DOCTYPE html>
<html>
	<head>
		<title>My Sample Project</title>
		<!-- data-main attribute tells require.js to load
             scripts/main.js after require.js loads. -->
		<script data-main="scripts/main" src="scripts/require.js"></script>
	</head>
	<body>
		<h1>My Sample Project</h1>
	</body>
</html>
```

You could also place the script tag end of the `<body>` section if you do not want the loading of the require.js script to block rendering. For browsers that support it, you could also add an async attribute to the script tag.

如果你不希望因为加载 require.js 而阻断渲染，你可以把 script 标签 放在 `<body>` 区域的最后面。如果浏览器支持，你也可以在 script 标签上使用 async 属性

Inside of main.js, you can use requirejs() to load any other scripts you need to run. This ensures a single entry point, since the data-main script you specify is loaded asynchronously.

在 main.js 内部，你可以使用 requirejs 来加载你需要运行的其他脚本。这个保证了一个单一的入口，因为您指定的数据主脚本是异步加载的。

```javascript
requirejs(['helper/util'], function (util) {
	//This function is called when scripts/helper/util.js is loaded.
	//If util.js calls define(), then this function is not fired until
	//util's dependencies have loaded, and the util argument will hold
	//the module value for "helper/util".
})
```

### 优化

Once you are finished doing development and want to deploy your code for your end users, you can use the optimizer to combine the JavaScript files together and minify it. In the example above, it can combine main.js and helper/util.js into one file and minify the result.

一旦你完成开发并且想为最终使用者部署你的代码，你可以使用 优化器 去组合和压缩你的 javascript 文件。在上面的例子中，它将 main.js 和 helper/util.js 组合为一个文件并进行了压缩。

## API

### 使用

#### 加载 JavaScript 文件

RequireJS takes a different approach to script loading than traditional `<script>` tags. While it can also run fast and optimize well, the primary goal is to encourage modular code. As part of that, it encourages using module IDs instead of URLs for script tags.

RequireJS 采用与传统 script 标签不一样的脚本加载方式。虽然它运行和优化都很不错，但是它的主要目标就是鼓励模块化代码。作为它的一部分，对于脚本标签它鼓励使用 模块 id 而不是 URLs

RequireJS loads all code relative to a baseUrl.
The baseUrl is normally set to the same directory as the script used in a data-main attribute for the top level script to load for a page.
The data-main attribute is a special attribute that require.js will check to start script loading.
This example will end up with a baseUrl of scripts:

RequireJS 加载与 baseUrl 相关的所有 code。
这个 baseUrl 通常设置为与用于为页面加载的顶级脚本的 data-main 属性中的脚本相同的目录。
这个 data-main 属性是一个特殊的属性，RequireJS 将检查来开始加载脚本。
这个例子将以含有 baseUrl 的脚本结束

```javascript
<!--This sets the baseUrl to the "scripts" directory, and
    loads a script that will have a module ID of 'main'-->
<script data-main="scripts/main.js" src="scripts/require.js"></script>
```

Or, baseUrl can be set manually via the RequireJS config.
If there is no explicit config and data-main is not used, then the default baseUrl is the directory that contains the HTML page running RequireJS.

或者 baseUrl 也可以通过 RequireJS config 来手动设置。如果没有明确的配置，并且 data-main 也没有被使用， 那么默认的 baseUrl 就是 包含运行 RequireJS 的 HTML 页面的目录

RequireJS also assumes by default that all dependencies are scripts, so it does not expect to see a trailing ".js" suffix on module IDs.
RequireJS will automatically add it when translating the module ID to a path.
With the paths config, you can set up locations of a group of scripts.
All of these capabilities allow you to use smaller strings for scripts as compared to traditional `<script>` tags.

RequireJS 也会默认假定所有依赖的都是脚本，所以他不期望在 模块 ids 上看到 ".js"后缀。
RequireJS 将在转换 模块 id 为路径时候， 自动添加它。
使用设置的 path,你能设置一组脚本的位置。
所有这些功能，都允许你使用比传统的 script 标签 更小的脚本字符串。

There may be times when you do want to reference a script directly and not conform to the "baseUrl + paths" rules for finding it.
If a module ID has one of the following characteristics, the ID will not be passed through the "baseUrl + paths" configuration, and just be treated like a regular URL that is relative to the document:

这里也许有多次你想直接引用一个脚本，并且它不遵守 "baseUrl + paths" 规则来找到它。
如果一个 module ID 有以下其中一个特点，这个 ID 将不会通过 "baseUrl + paths" 配置传递，并且只会当做被视为与文件相关的常规 url 来对待。

- Ends in ".js".--- 以 .js 结尾的
- Starts with a "/". --- 以 / 开头的
- Contains an URL protocol, like "http:" or "https:". --- 包含一个 URL 协议，例如 http htpps

In general though, it is best to use the baseUrl and "paths" config to set paths for module IDs.
By doing so, it gives you more flexibility in renaming and configuring the paths to different locations for optimization builds.

不过一般来说，最好是使用 baseUrl 和 paths 设置属性来为 module IDs 设置路径
因为这样做，它让你在重命名和为其他优化文件项配置路径时有了更多的灵活性。

Similarly, to avoid a bunch of configuration, it is best to avoid deep folder hierarchies for scripts, and instead either keep all the scripts in baseUrl, or if you want to separate your library/vendor-supplied code from your app code, use a directory layout like this:

同样的，为了避免大量配置，最好是避免脚本的深层文件夹等级结构，取而代之的是，保持所有的搅拌都在 baseUrl 中，或者你想 从你的应用程序中分离出库文件/打包代码，你可以使用类似下面的布局方式

```
www/
	index.html
	js/
		app/
			sub.js
		lib/
			jquery.js
			canvas.js
		app.js
		require.js
```

in index.htm
在 inde.html 文件中

```html
<script data-main="js/app.js" src="js/require.js"></script>
```

and in app.js:
在 app.js 中

```javascript
requirejs.config({
	//By default load any module IDs from js/lib
	baseUrl: 'js/lib',
	//except, if the module ID starts with "app",
	//load it from the js/app directory. paths
	//config is relative to the baseUrl, and
	//never includes a ".js" extension since
	//the paths config could be for a directory.
	paths: {
		app: '../app',
	},
})

// Start the main app logic.
requirejs(['jquery', 'canvas', 'app/sub'], function ($, canvas, sub) {
	//jQuery, canvas and the app/sub module are all
	//loaded and can be used here now.
})
```

Notice as part of that example, vendor libraries like jQuery did not have their version numbers in their file names.
It is recommended to store that version info in a separate text file if you want to track it, or if you use a tool like volo, it will stamp the package.json with the version information but keep the file on disk as "jquery.js".
This allows you to have the very minimal configuration instead of having to put an entry in the "paths" config for each library.
For instance, configure "jquery" to be "jquery-1.7.2".

Ideally the scripts you load will be modules that are defined by calling define().
However, you may need to use some traditional/legacy "browser globals" scripts that do not express their dependencies via define().
For those, you can use the shim config. To properly express their dependencies.

If you do not express the dependencies, you will likely get loading errors since RequireJS loads scripts asynchronously and out of order for speed.
