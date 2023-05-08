import type { Request, Response, NextFunction } from 'express'

class LoginController {
  home(req: Request, res: Response) {
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
  }
}
