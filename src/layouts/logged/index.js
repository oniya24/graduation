import React from 'react';
import { Menu, Layout, PageHeader, Button } from 'antd';
import { useSessionStorageState } from 'ahooks';
import { NavLink, history } from 'umi';
import { getUserReq, logoutUserReq } from '@/service/personal/User';

const { Header, Content, Footer, Sider } = Layout;

const { SubMenu } = Menu;

const layout = props => {
  const [adminInfo, setAdminInfo] = useSessionStorageState(
    'adminInfo',
    sessionStorage.getItem('adminInfo'),
  );
  if (adminInfo == 'undefined' || adminInfo == null) {
    getUserReq().then(val => {
      const { data } = val;
      // sessionStorage.setItem("adminInfo",JSON.stringify(data));
      setAdminInfo(data);
    });
  }
  const handleClick = e => {
    console.log('click ', e);
  };
  const handleClickLogout = () => {
    logoutUserReq();
    history.push('/login');
  };
  return (
    <Layout style={{ height: '100vh' }}>
      <Header style={{ height: '10vh' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h1 style={{ color: 'white' }}>OOAD - priviledge</h1>
          <div>
            <Button onClick={handleClickLogout} type="primary">
              登出
            </Button>
          </div>
        </div>
      </Header>
      <Content>
        <Layout style={{ height: '90vh' }}>
          <Sider>
            <Menu
              onClick={handleClick}
              // style={{ width: 256, height: '100%' }}
              defaultSelectedKeys={[history.location.pathname.substr(1)]}
              defaultOpenKeys={['setting']}
              mode="inline"
              theme="dark"
            >
              <SubMenu key="setting" title="组织架构">
                <Menu.Item key="personal">
                  <NavLink to="/personal">个人管理</NavLink>
                </Menu.Item>
                <Menu.Item key="adminManage">
                  <NavLink to="/adminManage">人员管理</NavLink>
                </Menu.Item>
                <Menu.Item key="roleManage">
                  <NavLink to="/roleManage">角色管理</NavLink>
                </Menu.Item>
                <Menu.Item key="proxyManage">
                  <NavLink to="/proxyManage">代理管理</NavLink>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="shop"  title="商店管理">
                <Menu.Item key="user">
                  <NavLink to="/userManage">用户管理</NavLink>
                </Menu.Item>
                <Menu.Item key="goods">
                  <NavLink to="/goods">物品管理</NavLink>
                </Menu.Item>
                <Menu.Item key="address">
                  <NavLink to="/address">区域地址</NavLink>
                </Menu.Item>
                <Menu.Item key="couponActivity">
                  <NavLink to="/couponActivity">优惠活动</NavLink>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="order"  title="订单处理">
                <Menu.Item key="order">
                  <NavLink to="/order">商品购买</NavLink>
                </Menu.Item>
                <Menu.Item key="paymentPay">
                  <NavLink to="/paymentPay">从订单跳转过来,订单支付</NavLink>
                </Menu.Item>
                <Menu.Item key="aftersale">
                  <NavLink to="/aftersale">售后服务</NavLink>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="else"  title="其他设置">
                <Menu.Item key="log">
                  <NavLink to="/log">日志查询</NavLink>
                </Menu.Item>
                <Menu.Item key="footprint">
                  <NavLink to="/footprint">浏览记录</NavLink>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content style={{ overflowY: 'scroll' }}>
            {adminInfo ? props.children : null}
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};

export default layout;
