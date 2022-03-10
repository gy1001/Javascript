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

注意作为示例的一部分，类似 jQuery 这样的库供应者在他们的名字中是没有它们的版本号码的。如果你想追踪它，建议你在单独的文本文件中存储下来这个版本信息，或者如果你使用一个类似 volo 的工具，它将在 package.json 文件中 记录下版本信息，但将文件保存在 jquery.js 文件中。这将是你进行最少的配置，而不必在 paths 设置 为每个库都在添加一个入口。例如，设置 jquery 为 jquery-1.7.2

Ideally the scripts you load will be modules that are defined by calling define().
However, you may need to use some traditional/legacy "browser globals" scripts that do not express their dependencies via define().
For those, you can use the shim config. To properly express their dependencies.

理想情况下，这些你加载的脚本将会被被称为 define() 的方式被定义为模块。但是，你也许需要使用一些不能通过 define()表达他们的依赖的 传统的、遗留的 浏览器全局的 脚本。对于这种情况，你可以使用 shim 设置项。来正确的表达出他们的依赖

If you do not express the dependencies, you will likely get loading errors since RequireJS loads scripts asynchronously and out of order for speed.

如果你不想表达依赖关系，你可能会遇到加载失败，因为 RequireJS 是异步加载脚本并且会为了速度而导致乱序。

### data-main Entry Point data-main 入口

The data-main attribute is a special attribute that require.js will check to start script loading:

这个 data-main 属性是 require.js 用来检查以开始加载脚本的一个特殊的属性

```html
<!--when require.js loads it will inject another script tag
    (with async attribute) for scripts/main.js-->
<script data-main="scripts/main" src="scripts/require.js"></script>
```

You will typically use a data-main script to set configuration options and then load the first application module. Note: the script tag require.js generates for your data-main module includes the async attribute. This means that you cannot assume that the load and execution of your data-main script will finish prior to other scripts referenced later in the same page.

你通常会使用一个 data-main 脚本来配置设置选项 ，然后加载第一个应用脚本。注意：这个由 require.js 为你的 data-main 模块生成的脚本标签包含了 async 异步属性. 这意味着你不能假设 这个 data-main 脚本的加载和执行 将在同一个页面引用的其他脚本 之前完成。

For example, this arrangement will fail randomly when the require.config path for the 'foo' module has not been set prior to it being require()'d later:

例如，在为“foo”模块的 require.config 路径未在以后被 require()'d 之前设置时这种安排会随机失败：

```html
<script data-main="scripts/main" src="scripts/require.js"></script>
<script src="scripts/other.js"></script>
```

```javascript
// contents of main.js:
require.config({
	paths: {
		foo: 'libs/foo-1.1.3',
	},
})
```

```javascript
// contents of other.js:

// This code might be called before the require.config() in main.js
// has executed. When that happens, require.js will attempt to
// load 'scripts/foo.js' instead of 'scripts/libs/foo-1.1.3.js'
require(['foo'], function (foo) {})
```

If you want to do require() calls in the HTML page, then it is best to not use data-main. data-main is only intended for use when the page just has one main entry point, the data-main script. For pages that want to do inline require() calls, it is best to nest those inside a require() call for the configuration:

如果你想要在 HTML 页面中使用 require()命令，那么最好不要使用 data-main. data-main 仅仅适用于放页面中仅仅只有一个主入口，即 data-main 脚本的时候。 对于页面中想再行内使用 require.js 命令的，最好是将它们 嵌套在 require() 命令的调用中进行配置。

```javascript
<script src="scripts/require.js"></script>
<script>
require(['scripts/config'], function() {
    // Configuration loaded now, safe to do other require calls
    // that depend on that config.
    require(['foo'], function(foo) {

    });
});
</script>
```

### Define a Module：定义一个模块

A module is different from a traditional script file in that it defines a well-scoped object that avoids polluting the global namespace. It can explicitly list its dependencies and get a handle on those dependencies without needing to refer to global objects, but instead receive the dependencies as arguments to the function that defines the module. Modules in RequireJS are an extension of the Module Pattern, with the benefit of not needing globals to refer to other modules.

一个模块是与传统的脚本文件不同的，并且他定义了一个较好作用域的来避免污染全局空间的对象。它能显示地列出它的依赖项，并且在不需要应用全局对象的情况下获得这些依赖项的把手，并且将这些依赖项作为定义模块函数的参数。 在 RequireJs 的模块 是一个模块模型的扩展，它是带有不需要去全局对象来引用其他模块的好处的。

The RequireJS syntax for modules allows them to be loaded as fast as possible, even out of order, but evaluated in the correct dependency order, and since global variables are not created, it makes it possible to load multiple versions of a module in a page.

这个用于模块的 RequireJs 的结构 允许它们尽可能快的进行加载，即使是乱序的，它也会按照正确的依赖顺序进行评估，并且因为全局的变量没有被创造，它使得在一个页面中加载不同版本的模块成为可能。

(If you are familiar with or are using CommonJS modules, then please also see CommonJS Notes for information on how the RequireJS module format maps to CommonJS modules).

如果你很熟悉或者正在使用 CommonJS 模块，那也请看看 CommonJS 笔记 以了解有关 RequireJS 模块怎么样把格式映射到 CommonJS 模块的信息

There should only be one module definition per file on disk. The modules can be grouped into optimized bundles by the optimization tool.

磁盘上的每个文件应该只有一个模块定义。这些模块将会被优化工具有组织地分到优化后的包中。

> Simple Name/Value Pairs :
>
> 简单的 键值对 配对

> If the module does not have any dependencies, and it is just a collection of name/value pairs, then just pass an object literal to define():
>
> 如果一个模块 没有任何依赖，并且他仅仅是一个 键值对 集合，那就可以仅仅往 define 里面传递一个对象字面量

```javascript
// Inside file my/shirt.js:
define({
	color: 'black',
	size: 'unisize',
})
```

> Definition Functions
>
> 定义一个函数

> If the module does not have dependencies, but needs to use a function to do some setup work, then define itself, pass a function to define():
>
> 如果一个模块没有依赖，但是需要一个函数来做一些准备工作，那可以 通过往 define() 传递一个函数来定义它自己

```javascript
//my/shirt.js now does setup work
//before returning its module definition.
define(function () {
	//Do setup work here

	return {
		color: 'black',
		size: 'unisize',
	}
})
```

> Definition Functions with Dependencies
>
> 定义带依赖的函数

> If the module has dependencies, the first argument should be an array of dependency names, and the second argument should be a definition function. The function will be called to define the module once all dependencies have loaded. The function should return an object that defines the module. The dependencies will be passed to the definition function as function arguments, listed in the same order as the order in the dependency array:
>
> 如果一个模块有依赖项，第一个参数应该是 依赖项名字组成的数组 ，并且第二个参数应该是一个定义的函数。一旦所有的依赖加载完成，这个函数将会被调用来定义模块。这个函数返回应该一个定义这个模块的对象。这些依赖项目将会被当做函数参数传递给定义个函数，按照与依赖数组中相同的顺序列出。

```javascript
//my/shirt.js now has some dependencies, a cart and inventory
//module in the same directory as shirt.js
define(['./cart', './inventory'], function (cart, inventory) {
	//return an object to define the "my/shirt" module.
	return {
		color: 'blue',
		size: 'large',
		addToCart: function () {
			inventory.decrement(this)
			cart.add(this)
		},
	}
})
```

> In this example, a my/shirt module is created. It depends on my/cart and my/inventory. On disk, the files are structured like this:
>
> 在这个例子中，一个 my/shirt 模块被创建。它依赖于 my/cart 和 my/inventory。在磁盘上，这些文件结构类似这样

```
my/cart.js
my/inventory.js
my/shirt.js
```

The function call above specifies two arguments, "cart" and "inventory". These are the modules represented by the "./cart" and "./inventory" module names.

这个函数指定了以上两个参数："cart" and "inventory".这里有被 "./cart" and "./inventory" 模块名字 代表的模块。

The function is not called until the my/cart and my/inventory modules have been loaded, and the function receives the modules as the "cart" and "inventory" arguments.

这个函数在 my/cart 和 my/inventory 都被加载完毕时候会被调用，同时这个函数接收 这个以 "cart" 和 "inventory" 为参数的模块。

Modules that define globals are explicitly discouraged, so that multiple versions of a module can exist in a page at a time (see Advanced Usage). Also, the order of the function arguments should match the order of the dependencies.

The return object from the function call defines the "my/shirt" module. By defining modules in this way, "my/shirt" does not exist as a global object.
