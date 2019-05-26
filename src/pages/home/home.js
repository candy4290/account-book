import React from 'react';
import './home.less';
import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
class Home extends React.Component {
    render() {
        return <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="logo">记账本</div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span className="nav-text">首页</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span className="nav-text">账单</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span className="nav-text">记账</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <div className="user-info">
              <img src={process.env.PUBLIC_URL + '/imgs/header/photo-default.jpg'} alt="头像" />
              <span>陈小祥</span>
            </div>
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360, height: '100%' }}>
              
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>记账本 ©2019 Created by Cxx</Footer>
        </Layout>
      </Layout>
    }
}
export default Home;