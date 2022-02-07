define('math1', [], function () {
  return {
    add: function (x, y) {
      return x + y
    },
  }
})

require(['math1'], function (math) {
  console.log(math.add(10, 100)) //110
})

require(['math'], function (math) {
  console.log(math.add2(100, 100)) //200
})
