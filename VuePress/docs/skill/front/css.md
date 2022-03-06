# css

## 定义

层叠样式表 (Cascading Style Sheets，缩写为 CSS），是一种 样式表 语言，用来描述 HTML 或 XML（包括如 SVG、MathML、XHTML 之类的 XML 分支语言）文档的呈现。CSS 描述了在屏幕、纸质、音频等其它媒体上的元素应该如何被渲染的问题。

CSS 是开放网络的核心语言之一，由 W3C 规范 实现跨浏览器的标准化。CSS 节省了大量的工作。 样式可以通过定义保存在外部.css 文件中，同时控制多个网页的布局，这意味着开发者不必经历在所有网页上编辑布局的麻烦。CSS 被分为不同等级：CSS1 现已废弃， CSS2.1 是推荐标准， CSS3 分成多个小模块且正在标准化中。

## CSS 的诞生

20 世纪 90 年代蒂姆·伯纳斯·李（Tim Berners-Lee）发明万维网，创造 HTML 超文本标记语言。此后网页样式便以各种形式存在，不同的浏览器有自己的样式语言来控制页面的效果，因为最原始的 Web 版本中根本没有提供一种网页装饰的方法。

在 HTML 迅猛发展的 90 年代，不同的浏览器根据自身的 HTML 语法结构来支持实现不同的样式语言。在最初的 HTML 版本中，由于只含有很少的显示属性，所以用户可以自己决定显示页面的方式。
但随着 HTML 的发展，HTML 增加了很多功能，代码也越来越臃肿，HTML 就变得越来越乱。网页也失去了语义化，维护代码很艰难，因为代码很混乱：

于是装饰网页样式的 CSS（层叠样式表，Cascading Style Sheets）诞生了。

```html
<multicol COLS="3" GUTTER="25">
	<p>
		<font size="4" color="RED"> This would be some font broken up into columns </font>
	</p>
</multicol>
```

早期 CSS 的语法设计看上去类似后来的 JavaScript 语法（当时 JavaScript 尚未存在），实际上，CSS 的这个写法借鉴了 X11 Window System 中的 X 资源。

## 语法的确定

早期 CSS 的语法设计看上去类似后来的 JavaScript 语法（当时 JavaScript 尚未存在），实际上，CSS 的这个写法借鉴了 X11 Window System 中的 X 资源。

```css
window.margin.left = 2cm ;
font.family = times;
h1.font.size =  20pt 80%
```

至于 CSS 的语法由 font.size 改成 font-size，是怎么设计来的呢？首先，连字符读起来更像书面英语，简单易懂。其次，DSSSL（Document Style Semanticsand Specification Language，文档样式语义和规范语言） 和 DSSSL-Lite 就使用这种连字符属性名。于是，CSS 也从中借鉴了连字符。

经过多年的努力 ，到 1996 年底，最终 CSS 语法变成了现在这个样子：

```css
html {
	margin-left: 2cm;
	font-family: 'Times', serif;
}
h1 {
	font-size: 20px;
}
```

## 历史大事记

1994 年，Håkon Wium Lie 最初提出了 CSS 的想法，联合当时正在设计 Argo 的浏览器的 Bert Bos，他们决定一起合作设计 CSS，于是创造了 CSS 的最初版本。
紧接着，他们在芝加哥的 Mosaic and the Web 大会上第一次正式提出了 CSS 的建议，1995 年他们一起再次展示了这个建议。当时 W3C 刚刚建立，W3C 对 CSS 很感兴趣，为此专门组织了一次讨论会。

1996 年 12 月，W3C 推出了 CSS 规范的第一版本。

1997 年，W3C 颁布  CSS1.0 版本  ，CSS1.0 较全面地规定了文档的显示样式，可分为选择器、样式属性、伪类 / 对象几个部分。
这一规范立即引起了各方的关注，随即微软和网景公司的浏览器均能支持 CSS1.0，这为 CSS 的发展奠定了基础。

1998 年，W3C 发布了 CSS 的第二个版本，目前的主流浏览器都采用这标准。
CSS2 的规范是基于 CSS1 设计的，包含了 CSS1 所有的功能，并扩充和改进了很多更加强大的属性。包括选择器、位置模型、布局、表格样式、媒体类型、伪类、光标样式。

2005 年 12 月，W3C 开始 CSS3 标准的制定，

## IE6，前端工程师的痛

2001 年，微软发布了 IE6，在 Windows 普及的年代 IE6 浏览器占据了高达 80% 的市场，这对 CSS 的标准推广起着重要作用。

因为 IE6 的用户量大，开发者们就选择了以大众为准，许多开发者竭尽全力把 IE6 下的页面做好，甚至一些开发者的口号很响“Only IE6”。

这样导致许多页面根本不是 W3C 标准，因为 IE6 有一套自己的解析渲染体系。最终  IE6 的庞大市场最终成为了 Web 开发者的一大绊脚石。

作为当时的开发者，必须掌握的一系列浏览器 Hacks，网页开发和面试必备。印象中当时经典的 Bug 是[“江湖匪号：一只猪的故事”](https://www.apiref.com/css-zh/experience/bugs.htm)。

最先开始放弃 IE6 支持的是一线互联网大公司，如淘宝等，直到 2014 后，大家逐渐放弃了对 IE6 的支持，这简直是对前端工程师最大的福音。
随着 IE6 退出市场，2014 年，微软发布 IE10 版本。

## 今日和未来

2016 年，Chrome 浏览器占据全球浏览器排行榜首位。随着 Hybrid、React Native 等技术的兴起，互联网进入移动端时代，前端工程师开始新的挑战，忙碌于适配各种端(IE 家族、遨游、QQ、360、Chrome 浏览器等)。

CSS 经历了 20 多年的发展，从 PC 端到移动端，在前端工程化不断进步的今天，随着 CSS 的规范不断的完善升级，前端业务复杂度越来越高，带来的工程也越来越庞大，我们前端开发者对 CSS 工程化的方案也不断地探索。

现在一大批 CSS 预处理和后处理工具涌现，比较流行的 CSS 预处理器有 Sass、Less，CSS 后处理器诸如 clean-css、AutoPrefixer、Rework、PostCSS 等。

那么关于 CSS 将来发展会怎么样？未来 CSS 还能不能胜任自己的角色，会不会有新的模型代替它？对于这些问题，Håkon Wium Lie 认为 CSS 目前还能够胜任，还没有看到能够取代它的新模型出现，新的技术肯定会层出不穷，但应该是对 CSS 的扩展而不是代替。他还表示，我们今天写的 CSS 代码，500 年后的计算机仍然能看懂。

## 经典布局

### 表格布局

展示标签和单像素图片的用法终究都还比较局限。后来人们发现，对于页面布局来说，表格是一个有力的工具。到了 1996 年，表格布局流行了起来。最初的 HTML 规范当中，表格的初衷其实是用来组织表状（以行列划分）数据的，但很快大家就意识到，单元格里面可以放各种 HTML 元素，于是整个表格就成了一个二维的页面布局。

### DIV 和“盒模型”

`<div>`元素起初是作为 CSS 的一部分被发明的，用来把页面组织成逻辑上独立的几个部分。它的设计初衷其实是替代当时最常用的表格布局。`<div>`标签内可以包含文字和图片，（从而形成“盒子")。这些“盒子"可以设置宽度和/或长度，甚至还能有外边距(margin)和内边距(padding)。

### CSS 定位（Position）属性

- position: static 就是把元素仍然放在默认的位置。
- position: relative 是相对于默认位置来定位。
- position: fixed 是相对于可视区域（浏览器窗口）来定位，也就是说即便滑动了滚动条，元素仍然在原来的位置。
- position: absolute 是相对于最近的非 static 祖先元素来定位。
- position: sticky 则是根据滚动条的位置定位。

有时候我们还希望元素重叠覆盖。z-index 就是用来解决叠放顺序的。例如 z-index:2 的元素会覆盖在 z-index:1 的元素上面。
绝对（absolute）和相对（relative）对于局部对齐一些元素很有用，但对于设置整个页面的布局来说还是不太适合。

### 浮动布局

float 浮动属性最早是为了实现图片的文字环绕效果，允许的值包括 left、right、none、inherit，但最常用的是 left 和 right。

从 CSS 早期以来，浮动布局一直都是最常用的定位方法。浮动技术可以让元素自动跑到其他元素旁的空白，并根据容器元素的大小进行调整。

#### 浮动例子

![image](https://pic2.zhimg.com/v2-957e155c050f41d281cbee114602d7dd_r.jpg)

#### 悬置浮动

浮动布局常见的一个问题就是悬置浮动。假设都向左漂，当某个盒子比它右边的盒子还高时，右边的盒子就可能被悬挂起来。在下图中，盒子 5 本应当换行排列，但是却被盒子 3 悬挂了起来。

![image](https://pic4.zhimg.com/80/v2-68ae2296f2174c61a62537a5058ab2c3_720w.jpg)

#### 清除浮动

解决悬挂浮动的办法是对被挂起来的元素设置清除浮动。对于上图的盒子，我们需要添加 clear: left 或 clear: both，它就会跑到下一行，从最左边开始排列了。
![image](https://pic3.zhimg.com/80/v2-6ebf8d94254a680235c13fd2c9da6532_720w.jpg)

### 移动和响应式网站

在智能手机普及之前，设计网页时我们只需要考虑台式机显示器的分辨率。然而，移动设备改变了这一切。web 开发者起初的办法是为他们的网站设计移动和台式两个版本，但同时维护两个网站显然非常困难。

现在的趋势是设计一个能够自适应设备屏幕大小的网站。响应式网页设计（Responsive Web Design）力求让页面在不同大小的屏幕上都能很好地渲染，提供友好易用的体验。

响应式网页设计依靠媒体查询（media query）来决定什么时候改变布局。媒体查询是用来确定设备分辨率的 CSS 代码。根据媒体查询结果，可以应用不同的 CSS 布局。

```css
@media only screen and (min-width: 768px) {
	header {
		font-size: 1.2em;
	}
}
```

**CSS Grid 尤其适合设计响应式网页。**

## CSS 框架

框架其实就是一些预先写好的 CSS，使得 web 开发者可以直接使用这些 CSS 来轻松的设计网格布局。最广为流传的两个框架是 Foundation 和 Bootstrap，另外还有为数众多的其他框架。

多数框架内部都采用了 12 栏布局系统。12 栏使得开发者在一行中可以创建出多种类型的等宽栏。

对于不同的屏幕大小，Bootstrap 提供了四种（lg、md、sm、xs）宽度后缀。“lg”用于 1170px 的屏幕，“md”用于 970px，“sm“用于 750px，”xs“用于比 750px 小的屏幕。

Bootstrap 的内置类已经预先写好了 CSS 样式，会自动地创建出对应的布局。你只需要设置 HTML 元素的类，剩下的 Bootstrap 都会自动处理。

举个例子，如果想让一个元素在台式机屏幕（1170px 或更宽）上占据 8 栏、在移动设备上占据 12 栏的话，可以这么写：

```css
<div class="col-lg-8 col-xs-12">
```

## Flexbox

Flexbox 是一维的布局技术，用来在一个方向（行或列）上对元素进行布局。它的设计初衷就是为了解决定位布局和浮动布局的许多问题。Flexbox 的第一版工作草案于 2009 年发布，又经历的一些改动，直到 2013 年才正式发布了工作草案。

## 圣杯布局

Flexbox（和 CSS Grid）解决的问题之一就是圣杯布局。（对于传统的布局技术来说，这种布局简直就像寻找传说中的圣杯一样困难，因此而得名。）在同一行中创建出内容多少不一、但高度一样的几栏多年来一直在困扰着 web 开发者。使用原始的表格实现这种圣杯布局还简单些，但表格难以维护，语义上来说也不是用来布局的。在 Flexbox 技术之前，所有的解决方案，包括给 div 添加 table-property 属性、绝对定位、JavaScript 辅助等等，都有各自的问题。

Flexbox 是一个巨大的进步，大大简化了对齐和居中，可以不依赖内容多少而直接创建出等高的列。

Flexbox 是由 flex 容器组成的，容器内则是 flex 项。容器既可以沿水平方向（行）布局，也可以沿竖直防线（列）布局。所选择的布局方向（一般是行）被称为主轴（main axis），另外一个方向则叫做交叉轴或横轴（cross axis）。flex 项沿主轴排布，填满可用空间。通过嵌套使用 flex 容器，还可以在竖直和水平方向同时控制对齐。不过 Flexbox 本质上还是一维的。

## CSS Grid

基于 CSS 来实现某种网格（grid）布局的想法已经存在多年了。CSS 的两位联合发明人 Bert Bos 和 Håkon Wium Lie 都有相关的想法。

突破来自微软。微软的实现发布之后，一些 web 设计者开始各种了尝试。

浏览器对于 CSS Grid 的支持在 2017 年向前进了一大步。通过 caniuse.com 可以查询到，现在所有的主流浏览器全都支持 CSS Grid 了。

CSS Grid 是第一个基于网格的二维布局系统，可以同时处理行和列。它解决了过去的许多布局问题，还使一些想象中的设计成为现实。现在，我们再也不需要浮动、各种 hack、甚至是框架了，CSS Grid 才是网页布局的最强大工具。它终于来到了我们面前。

## 优先级

浏览器通过优先级来判断哪些属性值与一个元素最为相关，从而在该元素上应用这些属性值。优先级是基于不同种类选择器组成的匹配规则。

### 选择器类型

下面列表中，选择器类型的优先级是递增的：

1. 类型选择器（例如，h1）和伪元素（例如，::before）
2. 类选择器 (例如，.example)，属性选择器（例如，[type="radio"]）和伪类（例如，:hover）
3. ID 选择器（例如，#example）。

通配选择符（universal selector）（\*）关系选择符（combinators）（+, >, ~, ' ', ||）和 否定伪类（negation pseudo-class）（:not()）对优先级没有影响。（但是，在 :not() 内部声明的选择器会影响优先级）。

给元素添加的内联样式 (例如，style="font-weight:bold") 总会覆盖外部样式表的任何样式 ，因此可看作是具有最高的优先级。

当在一个样式声明中使用一个 !important 规则时，此声明将覆盖任何其他声明。虽然，从技术上讲，!important 与优先级无关，但它与最终的结果直接相关。使用 !important 是一个坏习惯，应该尽量避免，

**关于 important 一些经验：**

1. 一定要优先考虑使用样式规则的优先级来解决问题而不是 !important
2. 只有在需要覆盖全站或外部 CSS 的特定页面中使用 !important
3. 永远不要在你的插件中使用 !important
4. 永远不要在全站范围的 CSS 代码中使用 !important

一图胜万言
![image](https://pic3.zhimg.com/80/v2-b1a9fedf320754acb1d7766c6548d5f6_720w.jpg)

### **css 规则**

1. 样式重复多写情况: 在 css 样式表中，同一个 CSS 样式你写了两次，后面的会覆盖前面的，在开发中基本不会使用。
2. 不同的权重，权重值高则生效
3. !important(提升样式优先级):!important 的作用是提升样式优先级，如果加了这句的样式的优先级是最高的。不过我这里建议大家一下，**!important 最好不要使用。**
4. 两种样式都使用!important 时: 当两个样式都使用!important 时，权重值大的优先级更高
5. !important 应用于简写样式: 如果!important 被用于一个简写的样式属性，那么这条简写的样式属性所代表的子属性都会被作用上!important。
6. 行内、内联和外联样式优先级
7. 内联和外联样式优先级
8. 样式应用于非目标标签时: **选中非目标元素的情况下，离目标越近者优先**
9. 权重相等的情况下: **同等权重下,靠近目标的优先**

## 参考文献

[CSS 二十年发展简史](https://juejin.cn/post/6844903875539910669)

[网页布局简史](https://zhuanlan.zhihu.com/p/104927765)