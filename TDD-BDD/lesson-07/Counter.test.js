import Counter from './Counter'

let counter = null

beforeAll(() => {
  console.log('beforeAll 运行了')
  counter = new Counter()
})

beforeEach(() => {
  counter = new Counter()
  console.log("beforeEach 创建了")
})
describe("测试增加相关的代码", () => {
  test('测试 addOne 方法', () => {
    console.log('测试 addOne 方法')
    counter.addOne()
    expect(counter.number).toBe(1)
  })
  test('测试 addTwo 方法', () => {
    console.log('测试 addTwo 方法')
    counter.addTwo()
    expect(counter.number).toBe(2)
  })
})

describe('测试减少相关的代码', () => {
  test('测试 minusOne 方法', () => {
    console.log('测试 minusOne 方法')
    counter.minusOne()
    expect(counter.number).toBe(-1)
  })


  test('测试 minusTwo 方法', () => {
    console.log('测试 minusTwo 方法')
    counter.minusTwo()
    expect(counter.number).toBe(-2)
  })
})

afterEach(() => {
  console.log('afterEach 执行了')
})

afterAll(() => {
  console.log('afterAll 运行了')
})

