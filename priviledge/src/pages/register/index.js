import { Form, Input, InputNumber, Button, Card, PageHeader } from 'antd';
import React from 'react';
import { redirectRoute } from '@/util/redirect.js'

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const register = () => {
  const onFinish = values => {
    console.log(values);
  };

  return (
    <Card>
      <PageHeader
        onBack={ () => redirectRoute('/login') }
        title="返回"
      >
      </PageHeader>
      <Form {...layout} name="nest-messages" onFinish={onFinish} >
        <Form.Item name={ 'username' } label="Name" 
          rules={[
            { required: true, message: 'Please input your username!' },
            { len: 6, message: "长度需要为六位" }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Password" name="password"
          rules={[
            { required: true, message: 'Please input your password!' },
            { len: 6, message: "长度需要为六位" },
            // { validator: '*' } // 正则表达式
          ]}  
        >
          <Input.Password />
        </Form.Item>
        <Form.Item name={ 'email' } label="Email" rules={[{ type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item name={ 'mobile' } label="mobile">
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
          <Button type="primary" htmlType="submit">
            注册账号
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default register;