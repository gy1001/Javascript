import express from "express"
import query from "../models/query"

const router = express.Router()
const QUERY_ALL_LIST = `SELECT employee.*, level.level, department.department FROM employee, level, department
  WHERE 
    employee.levelId = level.id AND employee.departmentId = department.id`

router.get("/getEmployee", async (req,res) => {
  const {name="",departmentId} = req.query
  let conditions = `AND employee.name LIKE '%${name}%'`;
  if(departmentId){
    conditions = conditions + ` AND employee.departmentId=${departmentId}`
  }
  let sql = `${QUERY_ALL_LIST} ${conditions} ORDER BY employee.id DESC`
  try {
    let result = await query(sql)
    result.forEach((i:any) => {
      i.key = i.id
    });
    res.json({
      flag: 0,
      data: result
    })
  } catch (error) {
    console.log(error)
  }
})

router.post("/createEmployee", (req,res) => {
  res.json({
    flag: 1,
    msg: 'NO DB'
  })
})

export default router