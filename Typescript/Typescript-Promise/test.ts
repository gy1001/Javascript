import MyPromise from './Promise'

let promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功了')
  }, 1000)
})

promise
  .then(
    (resolve) => {
      console.log('then 第一个then成功了')
      return new MyPromise((resolve) => {
        setTimeout(() => {
          resolve('第二个异步操作')
        }, 1000)
      })
    },
    (reject) => {
      console.log('then 第一个then 失败了')
      return 'fail1'
    },
  )
  .then(
    (resolveData2: any) => {
      console.log('第二个then 执行成功了', resolveData2)
      return 'resolve2'
    },
    (rejectData2: any) => {
      console.log('第二个then 执行失败了了', rejectData2)
      return 'reject2'
    },
  )
  .then(
    (resolveData3: any) => {
      console.log('第三个then 执行成功了', resolveData3)
      console.log('resolveData3', resolveData3)
      return 'resolve3'
    },
    (rejectData3: any) => {
      console.log('第三个then 执行失败了了', rejectData3)
      console.log('rejectData3', rejectData3)
      return 'reject3'
    },
  )
