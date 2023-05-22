import { Executor, RejectType, ResolveType } from './actiontype'
export default class Promiose<T = any> {
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
    return new Promise((resolve: ResolveType, reject: RejectType) => {
      if (this.status === 'success') {
        console.log('resolveInThen 被执行了')
        const result = resolveInThen(this.resolve_executor_value)
        resolve(result)
      } else if (this.status === 'fail') {
        console.log('rejectInThen 被执行了')
        const rejectValue = rejectInThen(this.reject_executor_value)
        reject(rejectValue)
      } else if (this.status === 'pending') {
        this.resolve_then_callbacks.push(() => {
          let result = resolveInThen(this.resolve_executor_value)
          console.log('then中函数 resolve 参数执行的结果', result)
          resolve(result)
        })
        this.reject_then_callbacks.push(() => {
          let result = rejectInThen(this.reject_executor_value)
          console.log('then中函数 reject 参数执行的结果', result)
          reject(result)
        })
      }
    })
  }
}
