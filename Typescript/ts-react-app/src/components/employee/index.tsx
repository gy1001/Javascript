import React, {Component } from "react"
import {Table} from "antd"
import { connect } from 'react-redux';
import "./index.css"
import QueryForm from "./QueryForm"
import { employeeColumns } from "./colums"
import {  EmployeeResponse, EmployeeRequest } from "../../interface/employee"
import {bindActionCreators, Dispatch} from "redux"
import { getEmployee, createEmployee, deleteEmployee, updateEmployee } from "../../redux/employee"

interface State{
  employee: EmployeeResponse,
  loading: boolean
}

interface Props{
  employeeList: EmployeeResponse,
  onGetEmployee(param: EmployeeRequest, callback:() => void):void
}
class Employee extends Component<Props,State> {
  state: State = {
    employee: undefined,
    loading: false,
  }

  getTotal(){
    let total:number
    if(typeof this.state.employee !== "undefined"){
      total = this.state.employee.length
    }else{
      total = 0
    }
    return <p>共有{total} 名员工</p>
  }

  setEmployee = (employee: EmployeeResponse) => {
    this.setState({
      employee 
    })
  }

  setLoading = (loading: boolean) => {
    this.setState({
        loading
    })
  }

  render(){
    const { employeeList, onGetEmployee } = this.props
    return (
      <>
        <QueryForm getData={onGetEmployee} setLoading={this.setLoading} />
        {this.getTotal()}
        <Table loading={this.state.loading} columns={employeeColumns} dataSource={employeeList} className="table"></Table>
      </>
    )
  }
}

const mapStateToProps = (state:any) => {
  return {
    employeeList: state.employee.employeeList
  }
}

const mapDispatchToProps = (dispatch:Dispatch) => bindActionCreators({
  onGetEmployee: getEmployee,
  onCreateEmployee: createEmployee,
  onDeleteEmployee: deleteEmployee,
  onUpdateEmployee: updateEmployee
},dispatch)
export default connect( mapStateToProps, mapDispatchToProps)(Employee)