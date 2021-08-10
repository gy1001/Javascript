import express from "express"
import query from "../models/query"
import excelExport from 'excel-export';

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
    res.json({
      flag: 1,
      msg: error.toString()
    })
  }
})

router.post("/createEmployee",async (req,res) => {
  const {name, departmentId, hiredate,levelId} = req.body
  let sql = `INSERT INTO employee (name,departmentId,hiredate,levelId) 
      VALUES ('${name}','${departmentId}','${hiredate}','${levelId}' )`
  try {
    let result = await query(sql)
    res.json({
      flag: 0,
      data: {
        key: result.insertId,
        id: result.insertId
      }
    })
  } catch (error) {
    res.json({
      flag: 1,
      msg: error.toString()
    })
  }
})

let conf:excelExport.Config = {
  cols: [
    { caption:'员工ID', type:'number'},
    { caption:'姓名', type:'string'},
    { caption:'部门', type:'string' },
    { caption:'入职时间', type:'string' },
    { caption:'职级', type:'string'}
  ],
  rows: []
}

router.get('/downloadEmployee', async(req,res) => {
  try {
    let result = await query(QUERY_ALL_LIST);
    conf.rows = result.map((i: any) => {
      return [i.id, i.name, i.department, i.hiredate, i.level];
    });
    let excel = excelExport.execute(conf);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    res.setHeader('Content-Disposition', 'attachment; filename=Employee.xlsx');
    res.end(excel, 'binary');

  } catch (error) {
    res.send(error.toString());
  }
})

router.post('/deleteEmployee', async(req,res) => {
  const {id} = req.body
  let sql = `DELETE FROM employee WHERE id=${id}`;
  try {
    let result = await query(sql);
    res.json({
      flag: 0,
      msg: "删除成功"
    })
  } catch (e) {
    res.json({
      flag: 1,
      msg: e.toString()
    })
  }
})

// 更新
router.post("/updateEmployee", async(req,res) => {
  const {name,id,departmentId,hiredate,levelId} = req.body
  let sql = `UPDATE employee SET name='${name}',departmentId=${departmentId},
  hiredate='${hiredate}',
  levelId=${levelId} WHERE id=${id}`
  try {
    let result = await query(sql)
    res.json({
      flag: 0,
      msg: "更新成功"
    })
  } catch (error) {
    res.json({
      flag: 1,
      msg: error.toString()
    })
  }
})
export default router