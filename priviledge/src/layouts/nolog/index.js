import React from 'react';
import {
  Layout,
  PageHeader,
  Card
} from 'antd';
import styles from './index.less'
const { Header } = Layout;

const layout = (props) => {
  
  return ( 
    <Layout  style={{ height: "100vh" }}>
      <div style={{ height: "10vh", backgroundColor: '#ffffff' }}>
        <PageHeader
          title="Ooad"
          subTitle="privilege service"
        />
      </div>
      <Layout>
        <Card className={ styles.cardContain } bordered bodyStyle={{ height: '100%', width: '100%' }}>
          { props.children }
        </Card>
      </Layout>
    </Layout>
  )
}

export default layout;