import superagent from 'superagent'
class Crowller {
  private sercret = 'serretKey'
  private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.sercret}`
  private rawHtml = ''
  constructor() {
    this.getRawHtml()
  }
  async getRawHtml() {
    const result = await superagent.get(this.url)
    this.rawHtml = result.text
    console.log(this.rawHtml)
  }
}

const crowller = new Crowller()
