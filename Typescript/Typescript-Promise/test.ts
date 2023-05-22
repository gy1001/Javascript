import Promiose from './Promise'

let promise = new Promiose((resolve, reject) => {
  resolve('成功了')
})

promise.then(
  (resolve) => {
    console.log('then 函数执行成功回调')
  },
  (reject) => {
    console.log('then 函数执行失败回调')
  },
)
