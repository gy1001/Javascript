/* eslint-disable no-restricted-syntax */
/**
 * 请实现以下函数
  可以批量请求数据，所有的 url地址均在urls参数中，
  同时，可以通过 max 参数控制请求的并发数
  当所有请求结束之后，要执行callback回调函数
  发请求的函数可以直接使用 fetch 即可
</ul>
 */
function sleep(n, name = 'test') {
  return new Promise(resolve => {
    console.log(n, name, 'start-------')
    setTimeout(() => {
      console.log(n, name, 'end--------')
      resolve({ n, name })
    }, 1000 * n)
  })
}
// 限制并发数，items 是异步任务队列
async function asyncPool({ limit, items }) {
  const promises = []
  const pool = new Set()
  for (const item of items) {
    const fn = async currentItem => await currentItem()
    const promise = fn(item)
    pool.add(promise)
    const clean = () => pool.delete(promise)
    promise.then(clean, clean)
    if (pool.size >= 2) {
      await Promise.race(pool)
    }
    promises.push(promise)
  }
  return Promise.all(promises)
}

async function start() {
  await asyncPool({
    limit: 2,
    items: [
      () => sleep(1, '吃饭'),
      () => sleep(3, '睡觉'),
      () => sleep(5, '打游戏'),
      () => sleep(3.5, '学习算法'),
      () => sleep(4, '学习vue和react')
    ]
  })
}
start()
