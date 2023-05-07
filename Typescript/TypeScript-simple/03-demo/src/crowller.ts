import superagent from 'superagent'
import fs from 'fs'
import path from 'path'

export interface AnalyzerSchema {
  analyzer: (html: string, filePath: string) => string
}

class Crowller {
  private filePath = path.resolve(__dirname, '../data/course.json')
  constructor(private url: string, private analzer: AnalyzerSchema) {
    this.initSpiderProcess()
  }
  private async getRawHtml() {
    const result = await superagent.get(this.url)
    return result.text
  }

  private async initSpiderProcess() {
    const result = await this.getRawHtml()
    const fileContent = this.analzer.analyzer(result, this.filePath)
    this.writeFile(fileContent)
  }

  private writeFile(fileContent: string) {
    fs.writeFileSync(this.filePath, fileContent)
  }
}

export default Crowller
