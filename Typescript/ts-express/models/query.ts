import mysql from "mysql"
import mySqlConfig from "../config/db"
var connection = mysql.createConnection(mySqlConfig)

const query = (sql:string) => {
  return new Promise<any>((resolve, reject) => {
    connection.query(sql, (error, results) => {
      if(error){
        reject(error)
      }else{
        resolve(results)
      }
    })
  })
}

export default query