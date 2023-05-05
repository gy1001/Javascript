import superagent from 'superagent'
import cheerio from 'cheerio'

interface CourseInfo {
  title: string
  count: number
}

class Crowller {
  private sercret = 'serretKey'
  private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.sercret}`
  constructor() {
    this.getRawHtml()
  }
  async getRawHtml() {
    const result = await superagent.get(this.url)
    this.getCourseInfo(result.text)
  }

  getCourseInfo(html: string) {
    const $ = cheerio.load(html)
    const courseItems = $('.course-item')
    const courseInfos: Array<CourseInfo> = []
    courseItems.map((index, element) => {
      const descs = $(element).find('.course-desc')
      const title = descs.eq(0).text()
      const count = parseInt(descs.eq(1).text().split('：')[1], 10)
      courseInfos.push({
        title,
        count,
      })
    })
    const result = {
      time: new Date().getTime(),
      data: courseInfos,
    }
    console.log(result)
  }
}

const crowller = new Crowller()
