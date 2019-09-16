import { Route } from 'react-router-dom';
import React from 'react';
import './home.less';
import { Layout } from 'antd';
import {withRouter} from "react-router-dom";
import nprogressHoc from '../../components/nprogress/nprogress';
import AccountHeader from '../../components/header/header';
import Fullscreen from "react-full-screen";
import AccountMenus from '../../components/menus/menus';
const { Content, Footer } = Layout;
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFull: false
    }
  }

  goFull() {
    this.setState({ isFull: !this.state.isFull });
  }

  render() {
    return <Fullscreen
    enabled={this.state.isFull}>
      <Layout>
        <AccountMenus childs={this.props.childs} />
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