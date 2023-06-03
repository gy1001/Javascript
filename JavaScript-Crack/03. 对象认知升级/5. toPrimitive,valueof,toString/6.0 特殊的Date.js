const date = new Date()

console.log('date toString:', date.toString()) // date toString: Wed May 24 2023 10:29:08 GMT+0800 (China Standard Time)

console.log('date valueOf:', date.valueOf())
// date valueOf: 1684895455945
console.log(`date number:`, +date)
// date number: 1684895455945

console.log(`date str:`, `${date}`)

console.log(`date +:`, date + 1)
