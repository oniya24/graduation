import { useMemo, useEffect, useState, useRef } from 'react';
import { connect } from 'umi';
import { Card, Table, Button, Tooltip, Space, Modal,
  Form, DatePicker, Checkbox ,Select, Radio } from 'antd';
import {
  mapStateToProps,
  mapDispatchToProps,
} from '@/models/Aftersale';
import pagination from '@/utils/pagination';
const { RangePicker } = DatePicker;
const { Group } = Checkbox;
const commentFilters = [
  {
    text: '已通过',
    value: 0
  },
  {
    text: '未通过',
    value: 1
  },
  {
    text: '未处理',
    value: 2
  },
]
const aftersale = ({ 
  aftersaleList, aftersaleInfo,
  aftersaleTotal, aftersalePage, aftersalePageSize,
  getAllAftersales, getAftersalesById, putConfirmAftersales,
  putReceiveAftersales, putDeliverAftersales, savePagination
 }) => {

  const { depart_id, userName, mobile } = JSON.parse(
    sessionStorage.getItem('adminInfo'),
  );
  const formRef = useRef();
  const [ detailModalVisible, setDetailModalVisible ] = useState(false)
  const [ processModalVisible, setProcessModalVisible ] = useState(false) 
  const handleClickDetail = async ({id}) => {
    // await getAftersalesById({
    //   did: depart_id,
    //   id
    // })
    setDetailModalVisible(true)
  }
  const handleClickProcess = ({id}) => {
    setProcessModalVisible(true)
  }
  const onFormFinish = (value) => {
    const { dateRange, type, state } = value;
    console.log(dateRange)
    const [ beginTime, endTime ] = dateRange;
    // getAllAftersales({
    //   aftersalePage,
    // })
    console.log("fetch new")
  }
  const onFormReset = (value) => {
    console.log(value)
    formRef.current.resetFields();
  }
  useEffect(() => {
    // getAllAftersales({
    //   page: commentPage,
    //   pagesize: commentPageSize
    // })
    console.log("fetch new ")
  }, [ aftersalePage, aftersalePageSize])
  const columns = useMemo(()=>{
    return [
      {
        title: '用户id',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '订单id',
        dataIndex: 'orderId',
        key: 'orderId'
      },
      {
        title: '顾客id',
        dataIndex: 'customerId',
        key: 'customerId',
      },
      {
        title: '服务编号',
        dataIndex: 'serviceSn',
        key: 'serviceSn'
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: '售后理由',
        dataIndex: 'reason',
        key: 'reason',
        render:(text, record)=>{
          const shortStr = text.substr(0,15)
          return(
            <Tooltip title={text}>{shortStr}</Tooltip>
          )
        }
      },
      {
        title: '退款金额',
        dataIndex: 'refund',
        key: 'refund'
      },
      {
        title: '数量',
        dataIndex: 'quantity',
        key: 'quantity'
      },
      {
        title: '状态',
        dataIndex: 'state',
        key: 'state',
        render:(text,record) => {
          const result = text;
          return(
            <>{result}</>
          )
        },
      },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: (text, record) => {
          return(
            <Space>
              <Button type="primary" onClick={() => handleClickDetail(record)}>查看详情</Button>
              <Button type="danger" onClick={() => handleClickProcess(record)}>进行处理</Button>
            </Space>
          )
        }
      }
    ]
  }, [])
  return (
    <Card>
      <Card>
        <Form ref={formRef} size="middle" layout="inline"
          onFinish={onFormFinish}
          onReset={onFormReset}
        >
          <Form.Item label="选择范围" name="dateRange">
            <RangePicker />
          </Form.Item>
          <Form.Item label="售后类型" name="type">
            <Checkbox.Group>
              <Checkbox value="0">退货</Checkbox>
              <Checkbox value="1">换货</Checkbox>
              <Checkbox value="2">维修</Checkbox>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item label="售后状态" name="state">
            <Checkbox.Group>
              <Checkbox value="0">已处理</Checkbox>
              <Checkbox value="1">未处理</Checkbox>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button type="ghost" htmlType="reset">重置</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
      <Card>
        <Table
          scroll={{ x: true }}
          pagination={pagination(aftersaleTotal, savePagination)}
          rowKey={record => record.dataIndex}
          columns={columns}
          dataSource={aftersaleList}
        ></Table>
      </Card>
      <Modal visible={detailModalVisible}
        okButtonProps={null}
        onCancel={() => setDetailModalVisible(false)}
      >
        {
          JSON.stringify(aftersaleInfo)
        }
      </Modal>
      <Modal visible={processModalVisible}>
        {
          "如果是未处理的，则进行处理"
        }
        {
          "如果是已经处理的则进行处理的下一步"
        }
      </Modal>  
    </Card>
  )
}


export default connect(mapStateToProps,mapDispatchToProps)(aftersale);