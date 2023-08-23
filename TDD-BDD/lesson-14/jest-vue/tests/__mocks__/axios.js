export default {
  get: (url) => {
    return new Promise((resolve) => {
      resolve({
        success: true,
        data: [
          { status: 'div', value: '孙悟空' },
          { status: 'div', value: '猪八戒' },
          { status: 'div', value: '沙僧' },
        ],
      })
    })
  },
}
