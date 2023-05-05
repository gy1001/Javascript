import cheerio from 'cheerio'
import fs from 'fs'
import type { AnalyzerSchema } from './crowller'

interface CourseResult {
  time: number
  data: CourseInfo[]
}

interface CourseInfo {
  title: string
  count: number
}

interface FileContent {
  [propName: number]: CourseInfo[]
}

class Analyzer implements AnalyzerSchema {
  private static instance: Analyzer
  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new Analyzer()
    }
    return this.instance
  }

  private getCourseInfo(html: string) {
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

  public analyzer(html: string, filePath: string) {
    const courseResult = this.getCourseInfo(html)
    const fileContent = this.genereateJsonContent(courseResult, filePath)
    return JSON.stringify(fileContent, null, 2)
  }

  genereateJsonContent(courseResult: CourseResult, filePath: string) {
    let fileContent: FileContent = {}
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    }
    fileContent[courseResult.time] = courseResult.data
    return fileContent
  }
}

export default Analyzer
