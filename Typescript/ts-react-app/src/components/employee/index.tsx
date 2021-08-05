import React, {Component} from "react"
import {Table} from "antd"
import "./index.css"
import QueryForm from "./QueryForm"
import { employeeColumns } from "./colums"
class Employee extends Component {
  render(){
    return (
      <>
        <QueryForm></QueryForm>
        <Table columns={employeeColumns} className="table"></Table>
      </>
    )
  }
}
export default Employee