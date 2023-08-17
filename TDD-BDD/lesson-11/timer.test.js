import timer from './timer'
beforeEach(() => {
  jest.useFakeTimers()
})
test('timer 测试', () => {
  const fn = jest.fn()
  timer(fn)
  // jest.runAllTimers()
  // jest.runOnlyPendingTimers() // 我只运行在队列中即将被运行的 timer
  jest.advanceTimersByTime(3000) // 立即让时间进入3s后
  expect(fn).toHaveBeenCalledTimes(1)
  jest.advanceTimersByTime(3000) // 立即让时间进入3s后
  expect(fn).toHaveBeenCalledTimes(2)
})

test('timer1 测试', () => {
  const fn = jest.fn()
  timer(fn)
  jest.advanceTimersByTime(2000) // 立即让时间进入3s后
  expect(fn).toHaveBeenCalledTimes(0)
  jest.advanceTimersByTime(3000) // 立即让时间进入3s后
  expect(fn).toHaveBeenCalledTimes(1)
})
