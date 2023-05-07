interface JqueryInstance {
  html: (html: string) => {}
}

// 定义全局变量
// declare var $: (param: () => void) => void

// 定义全局函数
declare function $(readyFunc: () => void): void

declare function $(selector: string): JqueryInstance
