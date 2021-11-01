const _productList = [
  { id: 1, title: '华为 Mate 50 Pro', price: 3999, inventory: 2 },
  { id: 2, title: '小米11', price: 2999, inventory: 0 },
  { id: 3, title: 'iphone 13 Pro Max', price: 6999, inventory: 4 }
]

export default {
  getProducts(cb) {
    setTimeout(() => cb(_productList), 1000)
  },

  buyProducts(products, cb, errCb) {
    setTimeout(() => {
      Math.random() > 0.5 ? cb() : errCb()
    }, 500)
  }
}
