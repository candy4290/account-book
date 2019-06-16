import { Route } from 'react-router-dom';
import React from 'react';
import './home.less';
import { Layout, Menu, Icon, Dropdown, Tooltip } from 'antd';
import {withRouter} from "react-router-dom";
import nprogressHoc from '../../components/nprogress/nprogress';
import Fullscreen from "react-full-screen";
import { decodeToken } from '../../utils/util';
const { Header, Content, Footer, Sider } = Layout;
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSelectedIndex: '0',
      isFull: false
    }
    this.props.history.listen(route => {
      localStorage.setItem('pageUrl', route.pathname)
    });
  }

  componentWillMount() {
    const currentPathName = this.props.location.pathname;
    const currentSelectedIndex = this.props.childs.findIndex(child => child.path === currentPathName);
    this.setState({
      currentSelectedIndex: `${currentSelectedIndex}`
    })
  }

  goFull() {
    this.setState({ isFull: !this.state.isFull });
  }

  
  menuSelected(event) {
    this.props.history.push(this.props.childs[+event.key].path);
  }

  handleButtonClick() {
    localStorage.clear();
    this.props.history.push('/login')
  }
  render() {
    return <Fullscreen
    enabled={this.state.isFull}>
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          // onBreakpoint={broken => {
          //   console.log(broken);
          // }}
          // onCollapse={(collapsed, type) => {
          //   console.log(collapsed, type);
          // }}
        >
          <div className="logo">记账本</div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[this.state.currentSelectedIndex]}  onSelect={(event) => {
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
          <Header style={{ background: '#fff', padding: 0, textAlign: 'right' }}>
            <Dropdown overlay={
              <Menu onClick={() => {this.handleButtonClick()}}>
                <Menu.Item key="1">
                  <Icon type="logout" />
                    退出登录
                </Menu.Item>
              </Menu>
            }>
              <div className="user-info">
                <img src={process.env.PUBLIC_URL + '/imgs/header/photo-default.jpg'} alt="头像" />
                <span>{this.state.isFull}{decodeToken(localStorage.getItem('Access-Token')).userName}</span>
              </div>
            </Dropdown>
            <Tooltip placement="bottom" title={this.state.isFull ? '退出全屏' : '进入全屏'}>
              <Icon type={this.state.isFull ? 'fullscreen-exit' : 'fullscreen'} onClick={() => this.goFull()}/>
            </Tooltip>
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
    </Fullscreen>
  }
}
export default nprogressHoc(withRouter(Home));