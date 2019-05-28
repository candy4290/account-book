import { Route } from 'react-router-dom';
import React from 'react';
import './home.less';
import { Layout, Menu, Icon } from 'antd';
import {withRouter} from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
class Home extends React.Component {
  constructor(props) {
    super();
  }
  menuSelected(event) {
    this.props.history.push(this.props.childs[+event.key].path);
  }
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
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}  onSelect={(event) => {
            this.menuSelected(event);
          }}>
            {this.props.childs.map((child, index) => 
              <Menu.Item key={index}>
                <Icon type={child.icon} />
                <span className="nav-text">{child.title}</span>
              </Menu.Item>
            )},
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
              {this.props.childs.map((child, index) => 
                <Route key={index} exact={child.exact} path={child.path} component={child.component}/>
              )}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>记账本 ©2019 Created by Cxx</Footer>
        </Layout>
      </Layout>
  }
}
export default withRouter(Home);