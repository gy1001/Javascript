const qiniu = require('qiniu')
const path = require('path')

class UploadPlugin {
  constructor(options) {
    const { bucket = '', domain = '', accessKey = '', secretKey = '' } = options
    let mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
    let putPolicy = new qiniu.rs.PutPolicy({ scope: bucket })
    let config = new qiniu.conf.Config()
    this.uploadToken = putPolicy.uploadToken(mac)
    this.formUploader = new qiniu.form_up.FormUploader(config)
    this.putExtra = new qiniu.form_up.PutExtra()
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tapPromise('UploadPlugin', (compilation) => {
      const assets = compilation.assets
      const promises = []
      Object.keys(assets).forEach((filename) => {
        promise.push(this.upload(filename))
      })
      return Promise.all(promises)
    })
  }

  upload(filename) {
    return new Promise((resolve, reject) => {
      const localFile = path.join(compiler.outputPath, key)
      this.formUploader.putFile(
        this.uploadToken,
        filename,
        localFile,
        this.putExtra,
        (err, ret) => {
          if (err || ret.statusCode !== 200) {
            reject(err)
          } else {
            console.log('上传成功')
            resolve()
          }
        },
      )
    })
  }
}

module.exports = UploadPlugin
