import type { Request, Response, NextFunction } from 'express'
import fs from 'fs'
import path from 'path'
import Analyzer from '../Analyzer'
import Crowller from '../crowller'
import { getResponseData } from '../utils/index'
import { get, decoratorController, useMiddleware } from '../decorator'

interface RequestWithBody extends Request {
  body: {
    password: string | undefined
  }
}

function checkLogin(
  req: RequestWithBody,
  res: Response,
  next: NextFunction,
): void {
  const isLogin = req.session ? req.session.login : undefined
  console.log('checkLogin middleware')
  if (isLogin) {
    next()
  } else {
    res.json(getResponseData(null, '请先登录'))
  }
}

function test(req: RequestWithBody, res: Response, next: NextFunction) {
  console.log('test middleware')
  next()
}

@decoratorController('/abc')
export default class CroweController {
  @get('/getData')
  @useMiddleware(checkLogin)
  @useMiddleware(test)
  getData(req: RequestWithBody, res: Response): void {
    const sercret = 'serretKey'
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${sercret}`
    const analyzer = Analyzer.getInstance()
    new Crowller(url, analyzer)
    res.json(getResponseData(true))
  }

  @useMiddleware(checkLogin)
  @get('/showData')
  showData(req: RequestWithBody, res: Response): void {
    try {
      const filePath = path.resolve(__dirname, '../../data/course.json')
      const content = fs.readFileSync(filePath, 'utf-8')
      res.json(getResponseData(JSON.parse(content)))
    } catch (error) {
      res.json(getResponseData(false, '还没有爬取到内容'))
    }
  }
}
