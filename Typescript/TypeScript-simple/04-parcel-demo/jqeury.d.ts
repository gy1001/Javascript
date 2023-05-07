interface JqueryInstance {
  html: (html: string) => JqueryInstance
}

// 定义全局变量
// declare var $: (param: () => void) => void

// 定义全局函数
declare function $(readyFunc: () => void): void
declare function $(selector: string): JqueryInstance

// interface JQuery {
//   (readyFunc: () => void): void
//   (selector: string): JqueryInstance
// }

// declare var $: JQuery

declare namespace $ {
  namespace fn {
    class init {}
  }
}
