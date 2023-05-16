// type Obj1 = { username: string }
// type Obj2 = { age: number }
// let obj1: Obj1 = { username: '猪八戒' }
// let obj2: Obj2 = { age: 300 }
// let obj3: Obj2 & Obj1 = { username: '孙悟空', age: 600 }

// function QQUser(QQNo_, QQAge_, QQMark_) {
//   this.QQNo = QQNo_ // QQ 号码
//   this.QQAeg = QQAge_ // QQ 年龄
//   this.QQMark = QQMark_ // QQ 标签
//   this.commoneFriends = ['骑驴看海', '大漠上的英雄', '坚实的果子', '小草'] // 共同好友
//   this.show = function () {
//     console.log(
//       `QQ号码：{this.QQNo},QQ龄: ${this.QQAge},QQ标注：${this.QQMark}`,
//       console.log(`共同的好友是:${this.commoneFriends}`),
//     )
//   }
// }

// let QQZhangSan = new QQUser('张三', 15, '王阳明传人')
// let QQLisi = new QQUser('李四', 10, '袁隆平的徒弟')
// let QQLiuwu = new QQUser('刘武', 12, '飞起来的鸭子')

// QQZhangSan.show()

// const Status = {
//   MANAGER_ADUIT_FAIL: -1,
//   NO_AUDIT: 0,
//   MANAGER_ADIT_SUCCESS: 1,
//   FINAL_ADUIT_SUCCESS: 2,
// }

// // 审核类
// class MyAduit {
//   getAduitStatus(status: number): void {
//     if (status === Status.NO_AUDIT) {
//       console.log('没有审核')
//     } else if (status === Status.MANAGER_ADIT_SUCCESS) {
//       console.log('经理审核通过')
//     } else if (status === Status.FINAL_ADUIT_SUCCESS) {
//       console.log('财务审核通过')
//     }
//   }
// }

// enum EnumAuditStats {
//   MANAGER_ADUIT_FAIL = '项目经理审核失败',
//   NO_AUDIT = '没有审核',
//   MANAGER_ADIT_SUCCESS = '项目经理审核成功',
//   FINAL_ADUIT_SUCCESS = '财务审核成功',
// }
// 字符串枚举
// enum WeekEnd {
//   MONDAy = 'monday',
//   TUESDAY = 'tuesday',
//   WENSDAY = 'wensday',
//   THIRSDAY = 'THIRSDAY',
//   FRIDAY = 'friday',
//   SARTURDAY = 'sarturday',
//   SUNDAY = 'sunday',
// }

// 数字枚举
// enum Week {
//   MONDAy = 1,
//   TUESDAY = 2,
//   WENSDAY,
//   THIRSDAY,
//   FRIDAY,
//   SARTURDAY,
//   SUNDAY,
// }

// const symid = Symbol('productNo')
// interface Product {
//   name: string
//   price: number
//   account: number
//   buy(): string
//   [symid]: number | string
// }
// type A = Product['price'] // number
// type B = Product['price' | 'name'] // string | number
// type S = Product[typeof symid] // number | string
// type PKeys = keyof Product // "name" | "price" | "account" | "buy" || typeof  symid
// let pKeys: PKeys = 'name'

// type AllKeys<T> = T extends any ? T : never
// type Pkeys2 = AllKeys<keyof Product> // typeof symid | "name" | "price" | "account" | "buy"

// let str: string | undefined
// console.log('str: ', str)

// // 参数可选后，会解析为： (parameter) data: string | undefined
// function fn(data?: string) {}
// fn()

// let obj: object = { username: '唐僧', age: 240 }
// const username = 'username'
// let u = obj[username] // 推到出来：u: any

// // 返回值类型可以省略，因为会推导出类
// // function info(name: string, age: number): number {
// //   return 3
// // }

// info('唐僧', 100)

type InfoFunType = (name: string, age: number, ...rest: any) => any
let info2: InfoFunType = function (name, age, ...rest) {
  return rest
}
info2('孙悟空', 500, 122, '撒旦法撒旦', '如来佛祖')

type TypeStuobj = { username: string; age: number; phone: string }
function info(stuObj: TypeStuobj) {
  console.log('name', stuObj.username, 'age', stuObj.age)
  return 3
}
let stuObj: TypeStuobj = { username: '唐僧', age: 100, phone: '11122' }
info(stuObj)

// 函数解构
function subInfo({ username, age }: TypeStuobj) {
  console.log('name:', username, 'age: ', age)
}
subInfo({ username: '李四', age: 22, phone: '33333' })

// type 定义基础类型
type num = number
// type 定义联合类型
type baseType = string | number | symbol

interface Car {
  branNo: string
}
interface Plane {
  No: string
  brandNo: string
}
type baseTyp2 = Car | Plane

interface Car {
  branNo: string
}

interface Plane {
  No: string
  brandNo: string
}
type TypeChild = [Car, Plane]

class People {
  name: string
  age: number
  address: string
  // 静态属性
  static count: number = 10
  constructor(_name: string, _age: number, _address: string) {
    this.name = _name
    this.age = _age
    this.address = _address
    People.count++
  }
  doEat(who: string, where: string) {
    console.log(`who: ${who},where: ${where}`)
  }
  doStep() {}
}

const dateProp = Object.getOwnPropertyDescriptor(People.prototype, 'doEat')
const tragetMethod = dateProp?.value
dateProp!.value = function (...args: any[]) {
  console.log('前置拦截')
  tragetMethod.apply(this, args)
  console.log('后置拦截')
}
// dateProp?.value('传参数')

Object.defineProperty(People.prototype, 'doEat', dateProp!)

const p = new People('名字', 100, '四惠东')
p.doEat('我', '苹果')

// 前置拦截
// who: 我,where: 苹果
// 后置拦截

class Pay {
  // 支付父类
  bank_card_no: string // 捆绑银行卡
  balance: number // 银行卡余额
  const: number // 消费费用
  tokenid: string // 登录后用户访问令牌
  pay() {}
}

enum PayType {
  WebChat = 1,
  AliPay = 2,
  CloundFlashPayment = 3,
}

class BankPay extends Pay {
  bank_network: string // 银行网点
  bankno_type // 银行卡类型
  bank_card_psw // 银行卡密码
  custname // 顾客姓名
}

class MobilePay extends Pay {
  type: PayType
  change: number // 支付平台零钱
  opendid: string // 用户识别身份 id
  appid: string // 微信小程序 appid
}

let webChatPay = new MobilePay()
