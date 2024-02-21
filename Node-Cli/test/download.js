const download = require('download-git-repo')
download(
  'direct:https://gitee.com/beiyaoyaoyao/egg-template.git',
  './dist',
  { clone: true },
  function (err) {
    if (err) console.log(err)
  },
)
