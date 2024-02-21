const download = require('download-git-repo')
const downloadFunc = function (url, dest) {
  download(url, dest, { clone: true }, (err) => {
    if (err) console.log(err)
  })
}

module.exports = {
  downloadFunc,
}
