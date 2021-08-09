import exp from "constants"
import express from "express"
const router = express.Router()

router.get("/getEmployee", (req,res) => {
  res.json({
    flag: 1,
    msg: 'No DB'
  })
})

router.post("/createEmployee", (req,res) => {
  res.json({
    flag: 1,
    msg: 'NO DB'
  })
})

export default router