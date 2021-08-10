import React, {Component } from "react"
import {Table,Button} from "antd"
import { PlusOutlined,DownloadOutlined} from '@ant-design/icons';
import { connect } from 'react-redux';
import {bindActionCreators, Dispatch} from "redux"
import "./index.css"
import QueryForm from "./QueryForm"
import getColumns from "./colums"
import {  EmployeeResponse, EmployeeRequest, UpdateRequest, CreateRequest, EmployeeInfo, DeleteRequest } from "../../interface/employee"
import { getEmployee, createEmployee, deleteEmployee, updateEmployee } from "../../redux/employee"
import InfoModal from "./infoModal"
import { DOWNLOAD_EMPLOYEE_URL } from "../../constants/urls";
interface State{
  employee: EmployeeResponse,
  loading: boolean,
  showModal: boolean,
  edit: boolean,
  rowData: Partial<EmployeeInfo>
}

interface Props{
  employeeList: EmployeeResponse,
  onGetEmployee(param: EmployeeRequest, callback:() => void):void,
  onCreateEmployee(param:CreateRequest, callback: () => void):void,
  onUpdateEmployee(param:UpdateRequest, callback: () => void):void,
  onDeleteEmployee(param:DeleteRequest):void
}
class Employee extends Component<Props,State> {
  state: State = {
    employee: undefined,
    loading: false,
    showModal: false,
    edit: false,
    rowData: {}
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

  handleCreate = () => {
    this.setState({
      showModal: true,
      edit: false,
      rowData: {}
    });
  }
  
  handleDownload = () => {
    window.open(DOWNLOAD_EMPLOYEE_URL)
  }

  hideModal = () => {
    this.setState({
      showModal: false
    })
  }

  handleUpdate = ()=>{}

  handleDelete = (param:DeleteRequest) => {
    console.log(param)
    this.props.onDeleteEmployee(param)
  }

  render(){
    const { employeeList, onGetEmployee, onCreateEmployee, onUpdateEmployee} = this.props
    const {showModal,edit,rowData, loading} = this.state
    return (
      <>
        <QueryForm getData={onGetEmployee} setLoading={this.setLoading} />
        <div className="toolbar">
          <Button type="primary" icon={<PlusOutlined />} onClick={this.handleCreate}>添加新员工</Button>
          <Button type="primary" icon={<DownloadOutlined />} onClick={this.handleDownload} className="right">导出</Button>
        </div>
        <InfoModal
          visible={showModal}
          edit={edit}
          rowData={rowData}
          hide={this.hideModal}
          createData={onCreateEmployee}
          updateData={onUpdateEmployee}
        />
        <Table loading={loading} columns={getColumns(this.handleUpdate, this.handleDelete)} dataSource={employeeList} className="table"></Table>
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
export default connect(mapStateToProps, mapDispatchToProps)(Employee)