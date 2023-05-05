import superagent from 'superagent'
import fs from 'fs'
import path from 'path'
import Analyzer from './Analyzer'

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
const sercret = 'serretKey'
const url = `http://www.dell-lee.com/typescript/demo.html?secret=${sercret}`

// const analyzer = new Analyzer()
const analyzer = Analyzer.getInstance()
const crowller = new Crowller(url, analyzer)
