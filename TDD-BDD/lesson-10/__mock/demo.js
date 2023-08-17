export const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('我是fetchData函数')
    }, 2000)
  })
}
