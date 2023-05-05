import superagent from 'superagent'
import cheerio from 'cheerio'
import fs from 'fs'
import path from 'path'

interface CourseInfo {
  title: string
  count: number
}

interface CourseResult {
  time: number
  data: CourseInfo[]
}

interface FileContent {
  [propName: number]: CourseInfo[]
}

class Crowller {
  private sercret = 'serretKey'
  private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.sercret}`
  constructor() {
    this.initSpiderProcess()
  }
  async getRawHtml() {
    const result = await superagent.get(this.url)
    return result.text
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
    return {
      time: new Date().getTime(),
      data: courseInfos,
    }
  }

  async initSpiderProcess() {
    const result = await this.getRawHtml()
    const courseResult = this.getCourseInfo(result)
    this.genereateJsonContent(courseResult)
  }

  genereateJsonContent(courseResult: CourseResult) {
    const filePath = path.resolve(__dirname, '../data/course.json')
    let fileContent: FileContent = {}
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    }
    fileContent[courseResult.time] = courseResult.data
    fs.writeFileSync(filePath, JSON.stringify(fileContent, null, 2))
  }
}

const crowller = new Crowller()
