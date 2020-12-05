import React from 'react';
import { Menu, Layout, PageHeader, Button } from 'antd';
import { NavLink, history } from 'umi';

const { Header, Content, Footer, Sider } = Layout;

const { SubMenu } = Menu;

const layout = (props) => {
  const handleClick = e => {
    console.log('click ', e);
  };
  const handleClickLogout = () => {
    console.log("登出")
    // history.push('/login')
  }
  return ( 
    <Layout style={{ height: "100vh" }}>
      <Header style={{ height: "10vh" }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h1 style={{ color: 'white' }}>OOAD - priviledge</h1>
          <div>
            <Button onClick={handleClickLogout} type="primary">登出</Button>
          </div>
        </div>
      </Header>
      <Content >
        <Layout style={{ height: "90vh" }}>
          <Sider>
            <Menu
              onClick={ handleClick }
              // style={{ width: 256, height: '100%' }}
              defaultSelectedKeys={['personal']}
              defaultOpenKeys={['setting']}
              mode="inline"
              theme="dark"
            >
                
              <SubMenu key="setting"  title="setting">
                <Menu.Item key="personal">
                  <NavLink to="/personal">个人
                </NavLink></Menu.Item>
                {/* <Menu.ItemGroup key="g2" title="Item 2">
                  <Menu.Item key="3">Option 3</Menu.Item>
                  <Menu.Item key="4">Option 4</Menu.Item>
                </Menu.ItemGroup> */}
              </SubMenu>
              {/* <SubMenu key="sub2"  title="Navigation Two">
                <Menu.Item key="5">Option 5</Menu.Item>
                <Menu.Item key="6">Option 6</Menu.Item>
                <SubMenu key="sub3" title="Submenu">
                  <Menu.Item key="7">Option 7</Menu.Item>
                  <Menu.Item key="8">Option 8</Menu.Item>
                </SubMenu>
              </SubMenu>
              <SubMenu key="sub4"  title="Navigation Three">
                <Menu.Item key="9">Option 9</Menu.Item>
                <Menu.Item key="10">Option 10</Menu.Item>
                <Menu.Item key="11">Option 11</Menu.Item>
                <Menu.Item key="12">Option 12</Menu.Item>
              </SubMenu> */}
            </Menu>
          </Sider>
          <Content>
            {props.children}
          </Content>
        </Layout>
      </Content>
    </Layout>
  )
}

export default layout;