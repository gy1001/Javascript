import type { Request, Response } from 'express'
import { getResponseData } from '../utils/index'
import 'reflect-metadata'
import { decoratorController, get, post } from '../decorator'

interface RequestWithBody extends Request {
  body: {
    password: string | undefined
  }
}

@decoratorController
class LoginController {
  static isLogin(req: RequestWithBody) {
    return !!(req.session ? req.session.login : undefined)
  }

  @get('/')
  home(req: RequestWithBody, res: Response): void {
    const isLogin = LoginController.isLogin(req)
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
  }
  @post('/login')
  login(req: RequestWithBody, res: Response): void {
    const { password } = req.body
    const isLogin = LoginController.isLogin(req)
    if (isLogin) {
      res.json(getResponseData(false, '已经登录过了'))
      return
    }
    if (password === '123' && req.session) {
      req.session.login = true
      res.json(getResponseData(true))
    } else {
      res.json(getResponseData(false, '登录失败'))
    }
  }
  @get('/logout')
  logout(req: RequestWithBody, res: Response): void {
    if (req.session) {
      req.session.login = false
    }
    res.json(getResponseData(true))
  }
}
