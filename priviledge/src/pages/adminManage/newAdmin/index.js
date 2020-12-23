import { useMemo, useEffect } from 'react';
import { connect } from 'umi';
import { Card, Table } from 'antd';
import { mapStateToProps, mapDispatchToProps } from '@/models/adminManage/NewAdmin';
import pagination from '@/util/pagination';
const newAdmin = ({ newAdminList, getAllNewAdmin, approveAdminById }) => {
  const { depart_id, userName, mobile } = JSON.parse(sessionStorage.getItem("adminInfo"));
  const approveAdmin = ({ id }) => {
    approveAdminById({
      did: depart_id,
      id
    })
  }
  const columns = useMemo(( )=> {
    return [
      {
        title: '所在部门id',
        dataIndex: 'depart_id',
        key: 'depart_id',
        filters: Number(depart_id) === 0 ?  Array(9).join(0).split('').map((item,index) =>{ return { text: index, value: index} }) : null,
        onFilter: Number(depart_id) === 0 ? (value, record) => Number(record.depart_id) === value : null,
      },
      {
        title: '名称',
        dataIndex: 'userName',
        key: 'userName',
      },
      {
        title: '昵称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '员工id',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '操作',
        key: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          return (
            <Button type="primary" onClick={() => approveAdmin(record)}>认证用户</Button>
          )
        }
      },
    ]
  }, [])
  useEffect(() =>{
    getAllNewAdmin(depart_id)
  }, [])
  return(
    <Card>
      <Table 
        rowKey={record => record.dataIndex}
        columns={columns} 
        dataSource={newAdminList}></Table>
    </Card>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(newAdmin);