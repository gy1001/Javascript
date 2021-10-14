// @flow

export function promise(): Promise<number> {
  return new Promise((resolve) => {
    resolve(11)
  })
}
function foo(x: number) {
  return x * 10
}

console.log(foo(1))

function a() {}

//"eslint-plugin-html": "^6.2.0",
