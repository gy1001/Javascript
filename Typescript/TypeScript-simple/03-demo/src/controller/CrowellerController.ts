import type { Request, Response, NextFunction } from 'express'
import fs from 'fs'
import path from 'path'
import Analyzer from '../Analyzer'
import Crowller from '../crowller'
import { getResponseData } from '../utils/index'
import { get, decoratorController, useMiddleware } from './decorator'

interface RequestWithBody extends Request {
  body: {
    password: string | undefined
  }
}

function checkLogin(req: RequestWithBody, res: Response, next: NextFunction) {
  const isLogin = req.session ? req.session.login : undefined
  if (isLogin) {
    next()
  } else {
    res.json(getResponseData(null, '请先登录'))
  }
}

@decoratorController
export default class CroweController {
  @get('/getData')
  @useMiddleware(checkLogin)
  getData(req: RequestWithBody, res: Response) {
    const sercret = 'serretKey'
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${sercret}`
    const analyzer = Analyzer.getInstance()
    new Crowller(url, analyzer)
    res.json(getResponseData(true))
  }

  @useMiddleware(checkLogin)
  @get('/showData')
  showData(req: RequestWithBody, res: Response) {
    try {
      const filePath = path.resolve(__dirname, '../../data/course.json')
      const content = fs.readFileSync(filePath, 'utf-8')
      res.json(getResponseData(JSON.parse(content)))
    } catch (error) {
      res.json(getResponseData(false, '还没有爬取到内容'))
    }
  }
}
