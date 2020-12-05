import React from 'react';
import { connect } from 'umi';
import { Card, Tabs } from 'antd';
import BasicInfo from './basicInfo/index';
import Role from './role';

const { TabPane } = Tabs
const Personal = (props) => {
  return (
    <Card style={{ height: '100%', width: '100%' }}>
      <Tabs>
        <TabPane tab="基本信息" key="basicInfo">
          <BasicInfo></BasicInfo>
        </TabPane>
        <TabPane tab="角色管理" key="role">
          <Role></Role>
        </TabPane>
      </Tabs>
    </Card>
  );
}

export default Personal