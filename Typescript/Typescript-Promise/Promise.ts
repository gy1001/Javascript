import { Executor, RejectType, ResolveType } from './actiontype'
export default class Promiose<T = any> {
  public resolve!: ResolveType
  public reject!: RejectType
  public status!: string
  public resolve_executor_value!: any
  public reject_executor_value!: any
  constructor(executor: Executor) {
    this.status = 'pending' // 起始等待状态
    this.resolve = (value: any): any => {
      if (this.status === 'pending') {
        this.status = 'success'
        this.resolve_executor_value = value
        value[10] = '100'
        console.log('status change: pending => resolve', value)
      }
    }
    this.reject = (value: any): any => {
      if (this.status === 'pending') {
        this.status = 'fail'
        console.log('status change: pending => reject', value)
        this.reject_executor_value = value
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
    if (this.status === 'success') {
      console.log('resolveInThen 被执行了')
      resolveInThen(this.resolve_executor_value)
    } else if (this.status === 'fail') {
      console.log('rejectInThen 被执行了')
      rejectInThen(this.reject_executor_value)
    }
  }
}
