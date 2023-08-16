// const { add, minus }  = require("./math")
import { add, minus } from './math'
test("测试加法 3 + 7", ()=>{
  expect(add(3, 7)).toBe(10)
})

test("测试减法 6 - 3", ()=>{
  expect(minus(6, 3)).toBe(3)
})

test('null', () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

test('zero', () => {
  const z = 0;
  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});


const fetchData =function () {
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve('peanut butter')
    }, 3000)
  })
}


test('the data is peanut butter', async () => {
  const data = await fetchData();
  expect(data).toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
  expect.assertions(0);
  try {
    await fetchData();
  } catch (e) {
    expect(e).toMatch('error');
  }
});
