import React, { useState, useEffect, Fragment } from 'react';
import { Button, Card, Form, Input, PageHeader, Loading } from 'antd';
import { connect, history, useLocation } from 'umi';
import styles from './index.less';
import { mapDispatchToProps, mapStateToProps } from '@/models/Login';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Login = ({ loginLoading, login }) => {
  const res = useLocation();
  const redirectToRegister = () => {
    history.push('/register');
  };
  const onFinish = values => {
    login(values);
    // 成功之后跳转到personal页面
    // 之后改为main页面
  };

  const onFinishFailed = errorInfo => {
    // 失败则弹出失败信息
    console.log('Failed:', errorInfo);
  };

  return (
    <Card style={{ height: '100%', width: '100%' }}>
      <PageHeader title="登录"></PageHeader>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="UserName"
          name="userName"
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
            // { validator: '*' } // 正则表达式
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
          <Button
            className={styles.buttonSpace}
            type="info"
            onClick={redirectToRegister}
          >
            注册
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
