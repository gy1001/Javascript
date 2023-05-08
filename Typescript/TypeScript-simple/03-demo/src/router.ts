import { Router } from 'express'
import type { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
import Analyzer from './Analyzer'
import Crowller from './crowller'
const router = Router()

interface RequestWithBody extends Request {
  body: {
    password: string | undefined
  }
}

router.get('/', (req: Request, res: Response) => {
  const isLogin = req.session ? req.session.login : undefined
  if (isLogin) {
    res.send(`<html>
      <body>
      <a href="/getData">开始抓取内容</a>
      <br />
      <a href="/logout">退出</a>
      </body>
    </html>`)
    return
  }
  res.send(`<html>
    <body>
      <form action="/login" method="post">
        <input name="password" type="password" placeholder="请输入密码" />
        <button type="submit">提交</button>
      </form>
    </body>
  </html>`)
  res.send('hello word')
})

router.get('/logout', (req: RequestWithBody, res: Response) => {
  if (req.session) {
    req.session.login = false
  }
  res.redirect('/')
})

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { password } = req.body
  const isLogin = req.session ? req.session.login : undefined
  if (isLogin) {
    res.send('已经登录过了')
    return
  }
  if (password === '123' && req.session) {
    req.session.login = true
    res.send('登录成功')
  } else {
    res.send('登录失败')
  }
})

router.get('/getData', (req: RequestWithBody, res: Response) => {
  const isLogin = req.session ? req.session.login : undefined
  if (isLogin) {
    const sercret = 'serretKey'
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${sercret}`
    // const analyzer = new Analyzer()
    const analyzer = Analyzer.getInstance()
    new Crowller(url, analyzer)
    res.send('getData successful')
  } else {
    res.send('请登录后在进行爬取内容')
  }
})

router.get('/showData', (req: RequestWithBody, res: Response) => {
  try {
    const filePath = path.resolve(__dirname, '../data/course.json')
    const content = fs.readFileSync(filePath, 'utf-8')
    res.json(JSON.parse(content))
  } catch (error) {
    res.send('还没有爬取到内容')
  }
})

export default router
