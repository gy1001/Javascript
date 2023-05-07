import { Router } from 'express'
import type { Request, Response } from 'express'
import Analyzer from './Analyzer'
import Crowller from './crowller'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.send('hello word')
})

router.get('/getData', (req: Request, res: Response) => {
  const sercret = 'serretKey'
  const url = `http://www.dell-lee.com/typescript/demo.html?secret=${sercret}`

  // const analyzer = new Analyzer()
  const analyzer = Analyzer.getInstance()
  new Crowller(url, analyzer)

  res.send('getData successful')
})

export default router
