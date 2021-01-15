import { useMemo, useEffect, useRef, useState } from 'react';
import { connect } from 'umi';
import { Card, Table, Button, Tooltip, Space, Form, DatePicker, Modal, Input } from 'antd';
import {
  mapStateToProps,
  mapDispatchToProps,
} from '@/models/Presale';
import pagination from '@/utils/pagination';
const newAdmin = ({ presaleList, presaleTotal, presalePage, presalePageSize, 
  getAllPresales, postCreatePresale, putModifyPresale, 
  deletePresale, putOnshelvesPresale, putOffshelvesPresale, saveAdverPagination
}) => {
  const { depart_id, userName, mobile } = JSON.parse(
    sessionStorage.getItem('adminInfo'),
  );
  const [ modalState, setModalState ] = useState(0) // 0是创建
  const [ modalVisible , setModalVisible ] = useState(false)
  const [ form ] = Form.useForm();
  const handledeletePresale = async ({id}) => {
    await deletePresale({
      shopId: depart_id,
      id
    })
  }
  const handleCreatePresale = () => {
    setModalState(0)
    setModalVisible(true)
  }
  const handleModifyPresale = (record) => {
    setModalState(0)
    setModalVisible(true)
    // 这里对time进行处理
    // form.setFieldsValue(record)
  }
  const handleOnShelves = async ({id}) => {
    await putOnshelvesPresale({
      shopId: depart_id,
      id
    })
  }
  const handleOffShelves = async ({id}) => {
    await putOffshelvesPresale({
      shopId: depart_id,
      id
    })
  }
  const handleSubmitCreate = () => {
    form.validateFields().then((value)=>{
      // await postCreatePresale(value)
      setModalVisible(false)
    })
  }
  const handleSubmitModify = () => {
    form.validateFields().then((value)=>{
      // await putModifyPresale(value)
      setModalVisible(false)
    })
  }
  const columns = useMemo(() => {
    return [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '开始时间',
        dataIndex: 'beginTime',
        key: 'beginTime',
      },
      {
        title: '结束时间',
        dataIndex: 'endTime',
        key: 'endTime',
      },
      {
        title: '支付时间',
        dataIndex: 'payTime',
        key: 'payTime'
      },
      {
        title: '状态',
        dataIndex: 'state',
        key: 'state'
      },
      {
        title: '数量',
        dataIndex: 'quantity',
        key: 'quantity'
      },
      {
        title: 'advancePayPrice',
        dataIndex: 'advancePayPrice',
        key: 'advancePayPrice'
      },
      {
        title: 'restPayPrice',
        dataIndex: 'restPayPrice',
        key: 'restPayPrice'
      },
      {
        title: '创建时间',
        dataIndex: 'gmtCreate',
        key: 'gmtCreate',
      },
      {
        title: '修改时间',
        dataIndex: 'gmtModified',
        key: 'gmtModified',
      },
      {
        title: '操作',
        key: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          const { state } = record
          return (
            <Space>
              {
                Number(state) === 0 ?
                <Button type="primary" onClick={() => handleOnShelves(record) }>上架活动</Button> :
                <Button type="primary" onClick={() => handleOffShelves(record) }>下架活动</Button>
              }
              <Button type="default" onClick={() => handleModifyPresale(record)}>
                修改活动信息
              </Button>
              <Button type="danger" onClick={() => handledeletePresale(record)}>
                删除活动
              </Button>
            </Space>
          );
        },
      },
    ];
  }, []);
  useEffect(() => {
    // getAllPresales({
    //   shopId: depart_id,
    //   page: presalePage,
    //   pageSize: presalePageSize
    // });
    console.log("fetch new")
  }, [  presalePage, presalePageSize ]);
  return (
    <Card>
      <div style={{ margin: 10 }}>
        <Button type="primary" onClick={handleCreatePresale}>创建预售活动</Button>
      </div>
      <Table
        scroll={{ x: true }}
        pagination={pagination(presaleTotal, saveAdverPagination)}
        rowKey={record => record.dataIndex}
        columns={columns}
        dataSource={presaleList}
      ></Table>
      <Modal 
        visible={modalVisible}
        destroyOnClose okText="确定" cancelText="取消"
        onOk={() => Number(modalState) === 0 ? handleSubmitCreate() : handleSubmitModify() } 
        onCancel={()=>setModalVisible(false)}
      >
        <Form form={form}>
          <Form.Item label="id" name="id" hidden>
          </Form.Item>
          <Form.Item label="活动名" name="name" required
            rules={
              [
                { required: true, message: '请输入名称'}
              ]
            }
          >
            <Input/>
          </Form.Item>
          <Form.Item label="advancePayPrice" name="advancePayPrice" required
            rules={
              [
                { required: true, message: '请输入价格'}
              ]
            }
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item label="restPayPrice" name="restPayPrice" required
            rules={
              [
                { required: true, message: '请输入价格'}
              ]
            }
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item label="quantity" name="quantity" required
            rules={
              [
                { required: true, message: '请输入价格'}
              ]
            }
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item label="开始时间" name="beginTime" required
            rules={
              [
                { required: true, message: '请输入价格'}
              ]
            }
          >
            <DatePicker showTime/>
          </Form.Item>
          <Form.Item label="结束时间" name="endTime" required
            rules={
              [
                { required: true, message: '请输入价格'}
              ]
            }
          >
            <DatePicker showTime/>
          </Form.Item>
          <Form.Item label="支付时间" name="payTime" required
            rules={
              [
                { required: true, message: '请输入价格'}
              ]
            }
          >
            <DatePicker showTime/>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(newAdmin);
