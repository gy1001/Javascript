import { fetchData } from './demo'

test('fetchData 测试', () => {
  return fetchData().then((res) => {
    expect(res).toBe('我是fetchData函数')
  })
})
