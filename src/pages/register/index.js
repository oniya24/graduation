import { Form, Input, InputNumber, Button, Card, PageHeader } from 'antd';
import React from 'react';
import { redirectRoute } from '@/util/redirect.js';
import { mapDispatchToProps, mapStateToProps } from '@/models/Register';
import { connect } from 'umi';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const register = ({ registerAdmin }) => {
  const onFinish = values => {
    registerAdmin(values);
  };

  return (
    <Card>
      <PageHeader
        onBack={() => redirectRoute('/login')}
        title="返回"
      ></PageHeader>
      <Form {...layout} name="nest-messages" onFinish={onFinish}>
        <Form.Item
          name={'userName'}
          label="Name"
          rules={[
            { required: true, message: 'Please input your username!' },
            { min: 6, message: '长度至少为六位' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: 'Please input your password!' },
            // { : 6, message: "长度需要为六位" },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                '密码格式不正确，密码长度最小8位,请包含大小写字母数字及特殊符号',
            }, // 正则表达式
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item name={'email'} label="Email" rules={[{ type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item name={'mobile'} label="mobile">
          <Input />
        </Form.Item>
        <Form.Item name={'openId'} label="openId">
          <Input />
        </Form.Item>
        <Form.Item name={'departId'} label="departId">
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

export default connect(mapStateToProps, mapDispatchToProps)(register);
