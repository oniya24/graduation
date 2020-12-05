import React, { useState,useEffect } from 'react';
import { Card, Form, Button, Modal, Input } from 'antd';
import { connect } from 'umi';
import { mapStateToProps, mapDispatchToProps } from '@/models/Personal'

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const BasicInfo = ({
  userInfo, getAdmin
}) => {
  const [ isResetPassword, setResetPassword ] = useState(false);
  const onFinish = values => {
    console.log(values);
  };
  const handleClick = () => {
    console.log("set pasword")
    setResetPassword(true)
  }
  useEffect(() => {
    // 拉取当前用户信息
    getAdmin()
    return () => {}
  }, [])
  return (
    <Card>
      <Form {...layout} 
        initialValues={userInfo}
        name="nest-messages" onFinish={onFinish} >
        <Form.Item name={ 'userName' } label="Name" 
          rules={[
            { required: true, message: 'Please input your username!' },
            { len: 6, message: "长度需要为六位" }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="password" name="password"
        >
          <Button onClick={ handleClick }>重置密码</Button>
        </Form.Item>
        <Form.Item name={ 'email' } label="Email" rules={[{ type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item name={ 'mobile' } label="mobile">
          <Input />
        </Form.Item>
        <Form.Item name={ 'lastLoginTime' } label="lastLoginTime">
          <Input prefix="beijing" suffix="GMT" disabled />
        </Form.Item>
        <Form.Item name={ 'lastLoginIp' } label="lastLoginIp">
          <Input prefix="ip" suffix="dns" disabled />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
          <Button type="primary" htmlType="submit">
            提交修改
          </Button>
        </Form.Item>
      </Form>
      <Modal visible={isResetPassword}>

      </Modal>
    </Card>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(BasicInfo); 