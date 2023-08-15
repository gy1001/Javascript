// var result = add(3, 7)
// var result2 = minus(3, 3)
// var expected = 10
// var expected2 = 0
//
// if (result !== expected) {
//   throw new Error(`3 + 7 应该等于 ${expected}, 但是结果是 ${result}`)
// }
//
// if (result2 !== expected2) {
//   throw new Error(`3 - 3 应该等于 ${expected2}, 但是结果是 ${result2}`)
// }


function expect(result){
  return {
    toBe(actual){
      if(actual !== result){
        throw new Error(`预期值与实际值不相符，预期是${actual}, 实际值是 ${result}`)
      }
    }
  }
}

// expect(add(3, 7)).toBe(10)
// expect(minus(6, 3)).toBe(3)
function  test(desc, fn){
  try {
    fn()
    console.log(`${desc} 通过测试`)
  }catch (err){
    console.log(`${desc} 没有通过测试，${err}`)
  }
}


test("测试加法 3 +7", ()=>{
  expect(add(3, 7)).toBe(10)
})

test("测试减法 6 - 3", ()=>{
  expect(minus(6, 3)).toBe(3)
})