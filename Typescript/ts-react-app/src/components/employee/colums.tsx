import { Button, Divider, Popconfirm } from "antd"
import { DeleteRequest, EmployeeInfo } from "../../interface/employee";
import { EditOutlined,DeleteOutlined } from '@ant-design/icons'
//export const employeeColumns = 

const getColumns = (
  handleUpdate:(record:EmployeeInfo) => void,
  handleDelete:(record:DeleteRequest) => void
) => {

  return [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name'
    }, 
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department'
    }, 
    {
      title: '入职时间',
      dataIndex: 'hiredate',
      key: 'hiredate'
    }, 
    {
      title: '职级',
      dataIndex: 'level',
      key: 'level'
    },
    {
      title: "操作",
      key: 'action',
      render: (text: string, record: EmployeeInfo) => (
        <span>
          <Button type="primary" size="small" icon={<EditOutlined/>} onClick={() => {handleUpdate(record)}}>编辑</Button>
          <Divider type="vertical" />
            <Popconfirm
              title={`确定删除 ${record.name} 吗？`}
              onConfirm={() => {handleDelete({id: record.id})}}
            >
              <Button type="primary" danger size="small" icon={<DeleteOutlined/>}>删除</Button>
          </Popconfirm>
        </span>
      )
    }
  ];
}
export default getColumns