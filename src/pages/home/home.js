import { Route } from 'react-router-dom';
import React from 'react';
import './home.less';
import { Layout, Menu, Icon } from 'antd';
import {withRouter} from "react-router-dom";
import nprogressHoc from '../../components/nprogress/nprogress';
import AccountHeader from '../../components/header/header';
import Fullscreen from "react-full-screen";
const { Content, Footer, Sider } = Layout;
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSelectedIndex: '0',
      isFull: false
    }
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
    const targetPathName = this.props.childs[+event.key].path;
    this.props.history.push(targetPathName);
    const currentSelectedIndex = this.props.childs.findIndex(child => child.path === targetPathName);
    this.setState({
      currentSelectedIndex: `${currentSelectedIndex}`
    })
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
        >
          <div className="logo">记账本</div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[this.state.currentSelectedIndex]}  onSelect={(event) => {
            this.menuSelected(event);
          }}>
            {this.props.childs.map((child, index) => 
              {
                if (child.isNotMenu) {
                  return null;
                } else {
                  return <Menu.Item key={index} >
                    <Icon type={child.icon} />
                    <span className="nav-text">{child.title}</span>
                  </Menu.Item>
                }
              }
            )},
          </Menu>
        </Sider>
        <Layout>
          <AccountHeader isFull={this.state.isFull} goFullCallback = {this.goFull.bind(this)}/>
          <Content className="main-content">
            <div style={{ background: '#fff', minHeight: 360, height: '100%' }}> 
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