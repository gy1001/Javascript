import { Executor, RejectType, ResolveType } from './actiontype'
export default class MyPromise {
  public resolve!: ResolveType
  public reject!: RejectType
  public status!: string
  public resolve_executor_value!: any
  public reject_executor_value!: any
  public resolve_then_callbacks: (() => void)[] = []
  public reject_then_callbacks: (() => void)[] = []
  constructor(executor: Executor) {
    this.status = 'pending' // 起始等待状态
    this.resolve = (value: any): any => {
      if (this.status === 'pending') {
        this.status = 'success'
        this.resolve_executor_value = value
        console.log('status change: pending => resolve', value)
        this.resolve_then_callbacks.forEach((callback) => {
          callback()
        })
      }
    }
    this.reject = (value: any): any => {
      if (this.status === 'pending') {
        this.status = 'fail'
        console.log('status change: pending => reject', value)
        this.reject_executor_value = value
        this.reject_then_callbacks.forEach((callback) => {
          callback()
        })
      }
    }
    try {
      // 执行函数
      executor(this.resolve, this.reject)
    } catch (error: any) {
      this.status = 'pending'
      // 失败则直接执行 reject 函数
      this.reject(error.toString())
      // throw new Error('程序终止...')
    }
  }

  then(resolveInThen: ResolveType, rejectInThen: RejectType) {
    return new MyPromise((resolve: ResolveType, reject: RejectType) => {
      if (this.status === 'success') {
        console.log('resolveInThen 被执行了')
        const result = resolveInThen(this.resolve_executor_value)
        resolve(result)
      } else if (this.status === 'fail') {
        console.log('rejectInThen 被执行了')
        const rejectValue = rejectInThen(this.reject_executor_value)
        reject(rejectValue)
      } else if (this.status === 'pending') {
        this.processManyAsyncAndSync(
          resolveInThen,
          rejectInThen,
          resolve,
          reject,
        )
      }
    })
  }

  // 执行同步或者异步
  processManyAsyncAndSync(
    resolveInThen: ResolveType,
    rejectInThen: RejectType,
    resolve: ResolveType,
    reject: RejectType,
  ) {
    this.resolve_then_callbacks.push(() => {
      let result: any = resolveInThen(this.resolve_executor_value)
      if (isMyPromise(result)) {
        // 第一种
        // setTimeout(() => {
        //   resolve(result.resolve_executor_value)
        // }, 5)
        // 第二种方法
        result.then(
          (resolveSuccess) => {
            resolve(resolveSuccess)
          },
          (rejectFailed) => {
            reject(rejectFailed)
          },
        )
      } else {
        console.log('then中函数 resolve 参数执行的结果', result)
        resolve(result)
      }
    })
    this.reject_then_callbacks.push(() => {
      let result = rejectInThen(this.reject_executor_value)
      console.log('then中函数 reject 参数执行的结果', result)
      reject(result)
    })
  }

  static all(promises: MyPromise[]): MyPromise {
    return new MyPromise((resolve, reject) => {
      const resolveArr: any[] = []
      promises.forEach((promise, index) => {
        promise.then(
          (resolveSuccess) => {
            processData(resolveSuccess, index)
          },
          (rejectFail) => {
            // 只要有一个失败就执行失败回调
            reject(rejectFail)
          },
        )
      })

      function processData(resolveSuccess: any, index: number) {
        resolveArr[index] = resolveSuccess
        // 所有的 promise 对象全部 resolve 之后
        if (index === promises.length - 1) {
          resolve(resolveArr)
        }
      }
    })
  }
}

function isMyPromise(val: any): val is MyPromise {
  return isObject(val) && isFunction(val.then)
}

function isObject(val: any): val is Record<any, any> {
  return !!(val !== null && typeof val === 'object')
}

function isFunction(data: any): data is Function {
  return typeof data === 'function'
}
