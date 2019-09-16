import React, { useState, useEffect } from "react";
import {withRouter} from "react-router-dom";
import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;
function AccountMenus(props) {
    const [currentSelectedIndex, setCurrentSelectedIndex] = useState('0');

    useEffect(() => {
        const currentPathName = props.location.pathname;
        const currentSelectedIndex = props.childs.findIndex(child => child.path === currentPathName);
        setCurrentSelectedIndex(`${currentSelectedIndex}`);
    }, [props.location.pathname, props.childs]);

    function menuSelected(event) {
        const targetPathName = props.childs[+event.key].path;
        props.history.push(targetPathName);
        const currentSelectedIndex = props.childs.findIndex(child => child.path === targetPathName);
        setCurrentSelectedIndex(`${currentSelectedIndex}`);
    }
    return (
        <Sider
        breakpoint="lg"
        collapsedWidth="0"
      >
        <div className="logo">记账本</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[currentSelectedIndex]}  onSelect={(event) => {
          menuSelected(event);
        }}>
          {props.childs.map((child, index) => 
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
    )
}
export default withRouter(AccountMenus);