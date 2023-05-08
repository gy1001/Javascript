import express from 'express'
import router from './router'
import bodyParser from 'body-parser'
import CookieSession from 'cookie-session'
import type { Request, Response, NextFunction } from 'express'

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use((req: Request, res: Response, next: NextFunction) => {
  req.teacherName = '唐僧'
  next()
})
app.use(
  CookieSession({
    name: 'session',
    keys: ['teacher-dell'],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  }),
)
app.use(router)

app.listen(7001, () => {
  console.log('server is running')
})
