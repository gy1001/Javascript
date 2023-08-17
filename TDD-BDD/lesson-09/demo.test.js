import {generateConfig, generateAppConfig} from "./demo"

test('测试 generateConfig 函数', () => {
  // expect(generateConfig()).toEqual({
  //   server: "http://localhost",
  //   port: 8080
  // })

  expect(generateConfig()).toMatchSnapshot()
})


test('测试 generateAppConfig 函数', () => {
  expect(generateAppConfig()).toMatchSnapshot({
    time: expect.any(Date) // 这样再次进行快照测试时候，只要类型一致即可
  })
})

test('测试 generateConfig InlineSnapShot', () => {
  expect(generateConfig()).toMatchInlineSnapshot(`
  {
    "port": 8081,
    "server": "http://localhost",
  }
`)
})

test('测试 generateAppConfig InlineSnapShot', () => {
  expect(generateAppConfig()).toMatchInlineSnapshot({
  time: expect.any(Date) // 这样再次进行快照测试时候，只要类型一致即可
}, `
{
  "port": 8082,
  "server": "http://localhost",
  "time": Any<Date>,
}
`)
})
