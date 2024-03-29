import EventEmitter from 'events'

const emitter = new EventEmitter()

// 被请求方, 模拟server
emitter.on('message-client-req', ({ type, data }) => {
  console.log('server: message-client-req', type, data)
  setTimeout(() => {
    emitter.emit('message-client-res', {
      type,
      data: data,
      from: 'server',
    })
  }, 16)
})

// 请求
function invoke(type,data) {
  return new Promise((resolve, _reject) => {
    console.log('client:发送请求')
    emitter.once('message-client-res', function (data) {
      resolve(data)
    })
    emitter.emit('message-client-req', { type, data })
  })
}

invoke('ccc', 'req1').then((res) => console.log('client:req1:res', res))
invoke('ccc', 'req2').then((res) => console.log('client:req2:res', res))
