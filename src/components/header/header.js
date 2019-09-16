import React, { useState, useEffect } from "react";
import { decodeToken } from '../../utils/token-util';
import { CONSTANTS } from '../../utils/constant';
import { Layout, Menu, Icon, Dropdown, Tooltip } from 'antd';
import {withRouter} from "react-router-dom";
const { Header } = Layout;
function AccountHeader(props) {
    const [isFull, setFull] = useState(props.isFull);
    function goFull() {
        props.goFullCallback(!isFull);
    }
    function handleButtonClick() {
        localStorage.clear();
        props.history.push('/login')
    }
    useEffect(() => {
        setFull(props.isFull);
    }, [props.isFull])
    return (
        <Header style={{ background: '#fff', padding: 0, textAlign: 'right' }}>
            <Dropdown overlay={
                <Menu onClick={() => {handleButtonClick()}}>
                <Menu.Item key="1">
                    <Icon type="logout" />
                    退出登录
                </Menu.Item>
                </Menu>
            }>
                <div className="user-info">
                <img src={process.env.PUBLIC_URL + '/imgs/header/photo-default.jpg'} alt="头像" />
                <span>{isFull}{decodeToken(localStorage.getItem(CONSTANTS.ACCESS_TOKEN)).userName}</span>
                </div>
            </Dropdown>
            <Tooltip placement="bottom" title={isFull ? '退出全屏' : '进入全屏'}>
                <Icon type={isFull ? 'fullscreen-exit' : 'fullscreen'} onClick={() => goFull()}/>
            </Tooltip>
        </Header>
    )
}
export default withRouter(AccountHeader);