(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{149:function(t,s,a){"use strict";a.r(s);var n=a(0),e=Object(n.a)({},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"content"},[t._m(0),t._v(" "),a("hr"),t._v(" "),a("p",[t._v("之前有简单的分析了"),a("a",{attrs:{href:"https://blog.funkyfun.cn/egret/event.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("egret的事件实现"),a("OutboundLink")],1),t._v(",而触摸事件/点击事件一直以来是客户端交互的主要承载者，参照egret这块的实现，最近先来有空来实现了"),a("a",{attrs:{href:"https://github.com/funkyfun/canvas-touch",target:"_blank",rel:"noopener noreferrer"}},[t._v("一个Canvas上的点击处理DEMO"),a("OutboundLink")],1),t._v("，简化了大部分细节，原因一是目的只为搞清楚原理，二是真正要处理的细节真的很多。")]),t._v(" "),a("hr"),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),a("p",[t._v("Canvas相关知识点很多，关注点过多，容易让问题变得越来越复杂，就像阅读某个库的源码，分解问题，简化问题，忽略一些细节实现，专注关注点，逐个击破，往往能让我们更容易分析问题得出结论。\n所以在这里，抛开Canvas的渲染相关，只使用"),a("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage",target:"_blank",rel:"noopener noreferrer"}},[t._v("drawImage"),a("OutboundLink")],1),t._v("来绘制图片元素，使用"),a("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Advanced_animations",target:"_blank",rel:"noopener noreferrer"}},[t._v("requestAnimationFrame"),a("OutboundLink")],1),t._v("来实现帧函数。\n坐标系：以Canvas左上角为坐标原点(0,0),x轴向右递增，y轴向下递增，所有元素坐标锚点在左上角，所有元素的坐标为全局坐标(通常引擎的做法是每个容器元素一个坐标系，子元素相对父元素的坐标)。\n"),a("img",{attrs:{src:"https://gstatic.funkyfun.cn/common/canvastouch/canvas_touch_coordinates.png",alt:"coordinates"}})]),t._v(" "),t._m(3),t._v(" "),t._m(4),t._m(5),t._v(" "),t._m(6),t._v(" "),t._m(7),t._v(" "),t._m(8),a("p",[t._v("由于换算获取到了点击相对Canvas的坐标点，而Canvas内只有一个坐标系，所以这里很好实现元素的点击检测。")]),t._v(" "),t._m(9)])},[function(){var t=this.$createElement,s=this._self._c||t;return s("h1",{attrs:{id:"处理canvas上元素的点击事件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#处理canvas上元素的点击事件","aria-hidden":"true"}},[this._v("#")]),this._v(" 处理Canvas上元素的点击事件")])},function(){var t=this.$createElement,s=this._self._c||t;return s("blockquote",[s("p",[this._v("我们在浏览器处理点击交互时，通常是在DOM元素上注册点击事件监听函数"),s("code",[this._v("(domElement.addEventListener('click', callback))")]),this._v("，而Canvas作为一个DOM元素，我们要怎么处理画在Canvas上的元素的点击呢？")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"简化问题"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#简化问题","aria-hidden":"true"}},[this._v("#")]),this._v(" 简化问题")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"结构设计"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#结构设计","aria-hidden":"true"}},[this._v("#")]),this._v(" 结构设计")])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[this._v("节点关系\n├─┬ CanvasElement 原生dom\n│ ├─┬ Stage 舞台对象，绘制节点的根节点\n│ │ ├── Sprite 绘制的节点对象\n\n继承关系\nStage=>Sprite=>EventEmitter\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("ul",[s("li",[this._v("EventEmitter 实现自定义事件")]),this._v(" "),s("li",[this._v("Sprite Canvas内基本绘制节点/容器，记录节点信息")]),this._v(" "),s("li",[this._v("Stage 舞台，Sprite节点的根节点，管理渲染")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"实现"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#实现","aria-hidden":"true"}},[this._v("#")]),this._v(" 实现")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("监听Canvas的原生点击事件，计算Canvas在页面上的位置，获取鼠标点击在页面上的坐标点，"),s("code",[this._v("点击点坐标")]),this._v(" - "),s("code",[this._v("Canvas位置偏移量")]),this._v(" = "),s("code",[this._v("点击点再Canvas坐标系上的坐标")]),this._v("。")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("  "),a("span",{attrs:{class:"token comment"}},[t._v("// Stage.js")]),t._v("\n  "),a("span",{attrs:{class:"token function"}},[t._v("initTouchHandel")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{attrs:{class:"token keyword"}},[t._v("this")]),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("_stageEl"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("addEventListener")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v("'click'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("event"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{attrs:{class:"token comment"}},[t._v("// egret引擎的实现")]),t._v("\n      "),a("span",{attrs:{class:"token comment"}},[t._v("// https://github.com/egret-labs/egret-core/blob/31ce53495642e847ccdd4f90f5a223d2e3526f35/src/egret/web/WebTouchHandler.ts#L177")]),t._v("\n      "),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" doc "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("documentElement\n      "),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" box "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("this")]),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("_stageEl"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("getBoundingClientRect")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n      "),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" left "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" box"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("left "),a("span",{attrs:{class:"token operator"}},[t._v("+")]),t._v(" window"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("pageXOffset "),a("span",{attrs:{class:"token operator"}},[t._v("-")]),t._v(" doc"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("clientLeft\n      "),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" top "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" box"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("top "),a("span",{attrs:{class:"token operator"}},[t._v("+")]),t._v(" window"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("pageYOffset "),a("span",{attrs:{class:"token operator"}},[t._v("-")]),t._v(" doc"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("clientTop\n      "),a("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" x "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" event"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("pageX "),a("span",{attrs:{class:"token operator"}},[t._v("-")]),t._v(" left\n      "),a("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" y "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" event"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("pageY "),a("span",{attrs:{class:"token operator"}},[t._v("-")]),t._v(" top\n      "),a("span",{attrs:{class:"token comment"}},[t._v("// 得到点击点再Canvas坐标系的坐标xy")]),t._v("\n      "),a("span",{attrs:{class:"token comment"}},[t._v("// 根据坐标信息找到命中的元素")]),t._v("\n      "),a("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" sp "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("this")]),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("findTarget")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("x"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" y"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("this")]),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("_children"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n      "),a("span",{attrs:{class:"token keyword"}},[t._v("this")]),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("emitClick")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("sp"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" x"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" y"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{attrs:{class:"token comment"}},[t._v("/**\n   * 根据坐标找击中的目标\n   */")]),t._v("\n  "),a("span",{attrs:{class:"token function"}},[t._v("findTarget")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("pointX"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" pointY"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" children"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" children"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("find")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("sp "),a("span",{attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" rs "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" sp"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("hitTest")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("pointX"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" pointY"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n      "),a("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("!")]),a("span",{attrs:{class:"token operator"}},[t._v("!")]),t._v("rs\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{attrs:{class:"token comment"}},[t._v("/**\n   * 派发自定义点击事件\n   */")]),t._v("\n  "),a("span",{attrs:{class:"token function"}},[t._v("emitClick")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("sp"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("stageX"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" stageY"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token operator"}},[t._v("!")]),t._v("sp"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v("\n    "),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" children "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" sp"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("_children\n    "),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" len "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" children"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length\n    "),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" emitList "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("sp"),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n    "),a("span",{attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("len"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" i "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token number"}},[t._v("0")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i "),a("span",{attrs:{class:"token operator"}},[t._v("<")]),t._v(" len"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),a("span",{attrs:{class:"token operator"}},[t._v("++")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" child "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" children"),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n        "),a("span",{attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("child"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("hitTest")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("stageX"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" stageY"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n          emitList"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("push")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("child"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n        "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n      "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    emitList"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("forEach")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("child"),a("span",{attrs:{class:"token operator"}},[t._v("=>")]),t._v(" child"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("emit")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v("'click'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("stageX"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" stageY"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("  "),a("span",{attrs:{class:"token comment"}},[t._v("// Sprite.js")]),t._v("\n  "),a("span",{attrs:{class:"token function"}},[t._v("hitTest")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("stageX"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" stageY"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" sp "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("this")]),t._v("\n    "),a("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" rs "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token boolean"}},[t._v("false")]),t._v("\n    "),a("span",{attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n      sp"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("width "),a("span",{attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),a("span",{attrs:{class:"token number"}},[t._v("0")]),t._v(" \n      "),a("span",{attrs:{class:"token operator"}},[t._v("&&")]),t._v(" sp"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("height "),a("span",{attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),a("span",{attrs:{class:"token number"}},[t._v("0")]),t._v("\n      "),a("span",{attrs:{class:"token operator"}},[t._v("&&")]),t._v(" sp"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("touchEnable\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("x"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" y"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" width"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" height"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" sp\n      rs "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("stageX "),a("span",{attrs:{class:"token operator"}},[t._v(">")]),t._v(" x "),a("span",{attrs:{class:"token operator"}},[t._v("&&")]),t._v(" stageX "),a("span",{attrs:{class:"token operator"}},[t._v("<")]),t._v(" x "),a("span",{attrs:{class:"token operator"}},[t._v("+")]),t._v(" width"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("&&")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("stageY "),a("span",{attrs:{class:"token operator"}},[t._v(">")]),t._v(" y "),a("span",{attrs:{class:"token operator"}},[t._v("&&")]),t._v(" stageY "),a("span",{attrs:{class:"token operator"}},[t._v("<")]),t._v(" y "),a("span",{attrs:{class:"token operator"}},[t._v("+")]),t._v(" height"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" rs\n  "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])}],!1,null,null,null);e.options.__file="canvasTouch.md";s.default=e.exports}}]);