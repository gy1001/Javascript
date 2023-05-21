function FirstClassDecorator(targetClass: any) {
  const targetClassObj = new targetClass()
  targetClassObj.buy()
}

@FirstClassDecorator
class CustomerService {
  name: string = '下单'
  constructor() {}
  buy() {
    console.log(this.name + '购买')
  }
  placeOrder() {
    console.log(this.name + '下单购买')
  }
}
// 完成日志信息的装饰器
function LoggerInfoDecorator<T extends { new (...args: any[]): any }>(
  mytargetClass: T,
) {
  console.log('mytargetClass', mytargetClass)
  class SonClass extends mytargetClass {
    constructor(...args: any[]) {
      super(args)
      console.log('sonClass 执行结束')
    }
    commonMethod() {
      console.log('this', this)
      console.log('name: ', this.name)
    }
  }
  return SonClass
}

// 目标类
// @LoggerInfoDecorator('我是一个装饰器类')
@LoggerInfoDecorator
class Test {
  name!: string
  age!: number
  // 先执行原来的构造函数
  constructor(name: string) {
    this.name = name
  }
  eat() {
    console.log(this.name + ' 吃饭')
  }
}

const testOne = new Test('我是测试')
console.log('testOne', testOne)

function MethodInterceptor(params: string) {
  return function (
    tragetClassPrototype: any,
    methodname: string,
    dataProps: PropertyDescriptor,
  ) {
    const targetMethod = dataProps!.value
    dataProps.value = function (...args: any[]) {
      args = args.map((arg) => {
        if (typeof arg === 'string') {
          return arg.replace(/\s+/g, '')
        }
        return arg
      })
      console.log('这里做前置拦截处理')
      targetMethod()
      console.log('这里做后置拦截处理')
    }
  }
}

// 目标类
class RoleService {
  public roleName: string = '管理员'
  constructor() {}

  @MethodInterceptor('DistribRols方法')
  DistribRols(username: string, isValid: boolean) {
    console.log('分配角色...')
  }
}

const roleService = new RoleService()
roleService.DistribRols('张   三', true)

// 1. 集合类
class Collection<T = any> {
  static collection: Collection = new Collection()
  private constructor() {}
  private containerMap = new Map<string | symbol, any>()
  public set(id: string | symbol, value: T): void {
    this.containerMap.set(id, value)
  }
  public get(id: string | symbol): T {
    return this.containerMap.get(id)
  }
  public has(id: string | symbol): Boolean {
    return this.containerMap.has(id)
  }
}
export default Collection.collection

// 2. 编写业务类
export class UserService {
  pname: string = '人民'
  public login() {
    console.log(this.pname + '登录...')
  }
}

// 3. 编写类【控制器类】这个环节为初步实现，后面实战再扩充
import { Inject } from './injectedcortator'
import { PeopleService } from './PeopleService'
import CollectionInstance from './Collection'
import ControllerDecorator from './ControllerDecorator'
import MethodDecorator from './methoddecorator'

@ControllerDecorator
class Controller {
  @Inject('peopleService') // 依赖注入，创建和使用分离
  private peopleService?: PeopleService

  @MethodDecorator('/login')
  public login() {
    let peopleServiceInstance = CollectionInstance.get('userService')
    peopleServiceInstance.login()
  }
}

let controller = new Controller()
controller.login()

// 4. 编写属性装饰器【依赖注入属性装饰器--这个环节为初步实现，后面实战再扩充
// 使用元数据装饰器需要安装元数据的第三方插件【reflect-metadata],这里提前用下，后续详解
import 'reflect-metadata'
import CollectionInstance from './Collection'
type MyPropertyDecorator = (
  target: object,
  propertyKey: string | symbol,
) => void

export function Inject(injectId: string): MyPropertyDecorator {
  return (targetClassPrototype: any, propertyKey: string | symbol) => {
    console.log('进入注入属性装饰器...Inject...')
    console.log('target: ', targetClassPrototype)
    console.log('propertyKey: ', propertyKey)
    console.log('依赖注入的id为：', injectId)
    // 重要
    const InjectServiceClass = Reflect.getMetadata(
      'design:type',
      targetClassPrototype,
      propertyKey,
    )
    CollectionInstance.set('userService', new InjectServiceClass())
  }
}
