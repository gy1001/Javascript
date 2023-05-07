import { Router } from 'express'
import type { Request, Response } from 'express'
import Analyzer from './Analyzer'
import Crowller from './crowller'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.send(`<html>
    <body>
      <form action="/getData" method="post">
        <input type="password" placeholder="请输入密码" />
        <button type="submit">提交</button>
      </form>
    </body>
  </html>`)
  res.send('hello word')
})

router.post('/getData', (req: Request, res: Response) => {
  if (req.body.password === '123') {
    const sercret = 'serretKey'
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${sercret}`
    // const analyzer = new Analyzer()
    const analyzer = Analyzer.getInstance()
    new Crowller(url, analyzer)
    res.send('getData successful')
  } else {
    res.send('Password Error !')
  }
})

export default router
