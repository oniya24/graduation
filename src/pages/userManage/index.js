import { Card, Tabs } from 'antd';
import User from './user';
import Comment from './comment';
const { TabPane } = Tabs;
const adminManage = () => {
  return (
    <Card style={{ height: '100%', width: '100%' }}>
      <Tabs>
        <TabPane key="user" tab="封禁释放用户">
          <User></User>
        </TabPane>
        <TabPane key="comment" tab="用户评论">
          <Comment></Comment>
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default adminManage;
