function sleep (time) {
  return new Promise((resolve) => {
    setTimeout(()=>{
      console.log("执行了2")
      resolve()
    }, time)
    console.log('执行了1')
  });
}

sleep(2000)
// .then(()=>{
setTimeout(() => {
  console.log('执行了3')
}, 3000);
// })