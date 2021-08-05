const {createProxyMiddleware} = require("http-proxy-middleware")
module.exports = function(app){
  app.use(createProxyMiddleware("/api/**/*.action", {
    target: 'http://localhost:4000',
    changeOrigin : true,
    pathRewrite(path){
      return path.replace('/api', "/").replace(".action", ".json")
    }
  }))
}