import { useMemo, useEffect, useRef, useState } from 'react';
import { connect } from 'umi';
import { Card, Table, Button, Tooltip, Space, Form, DatePicker, Modal, Input } from 'antd';
import {
  mapStateToProps,
  mapDispatchToProps,
} from '@/models/Flashsale';
import pagination from '@/utils/pagination';
const shopActivity_flashsale = ({ flashsaleList, flashsaleTotal, flashsalePage, flashsalePageSize, 
  getAllFlashsales, postCreateFlashsale, putModifyFlashsale, 
  deleteFlashsale, putOnshelvesFlashsale, putOffshelvesFlashsale, saveAdverPagination
}) => {
  const { depart_id, userName, mobile } = JSON.parse(
    sessionStorage.getItem('adminInfo'),
  );
  const [ modalState, setModalState ] = useState(0) // 0是创建
  const [ modalVisible , setModalVisible ] = useState(false)
  const [ form ] = Form.useForm();
  const handledeleteFlashsale = async ({id}) => {
    await deleteFlashsale({
      shopId: depart_id,
      id
    })
  }
  const handleCreateFlashsale = () => {
    setModalState(0)
    setModalVisible(true)
  }
  const handleModifyFlashsale = (record) => {
    setModalState(0)
    setModalVisible(true)
    // 这里对time进行处理
    // form.setFieldsValue(record)
  }
  const handleOnShelves = async ({id}) => {
    await putOnshelvesFlashsale({
      shopId: depart_id,
      id
    })
  }
  const handleOffShelves = async ({id}) => {
    await putOffshelvesFlashsale({
      shopId: depart_id,
      id
    })
  }
  const handleSubmitCreate = () => {
    form.validateFields().then((value)=>{
      // await postCreateGroupon(value)
      setModalVisible(false)
    })
  }
  const handleSubmitModify = () => {
    form.validateFields().then((value)=>{
      // await putModifyGroupon(value)
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
        title: '商品名',
        dataIndex: ['goodsSku','name'],
        key: 'goodsSkuName'
      },
      {
        title: '商品图',
        dataIndex: ['goodsSku','imageUrl'],
        key: 'goodsSkuImageUrl'
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price'
      },
      {
        title: '数量',
        dataIndex: 'quantity',
        key: 'quantity'
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
                <Button type="danger" onClick={() => handleOffShelves(record) }>下架活动</Button>
              }
              <Button type="default" onClick={() => handleModifyFlashsale(record)}>
                修改活动信息
              </Button>
              <Button type="danger" onClick={() => handledeleteFlashsale(record)}>
                删除活动
              </Button>
            </Space>
          );
        },
      },
    ];
  }, []);
  useEffect(() => {
    // getAllFlashsales({
    //   shopId: depart_id,
    //   page: flashsalePage,
    //   pageSize: flashsalePageSize
    // });
    console.log("fetch new")
  }, [  flashsalePage, flashsalePageSize ]);
  return (
    <Card>
      <div style={{ margin: 10 }}>
        <Button type="primary" onClick={handleCreateFlashsale}>创建秒杀活动</Button>
      </div>
      <Table
        scroll={{ x: true }}
        pagination={pagination(flashsaleTotal, saveAdverPagination)}
        rowKey={record => record.dataIndex}
        columns={columns}
        dataSource={flashsaleList}
      ></Table>
      <Modal 
        visible={modalVisible}
        destroyOnClose okText="确定" cancelText="取消"
        onOk={handleSubmitCreate} onCancel={()=>setModalVisible(false)}
      >
        <Form form={form}>
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

export default connect(mapStateToProps, mapDispatchToProps)(shopActivity_flashsale);
