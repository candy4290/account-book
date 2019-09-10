
import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { isTokenExpired } from '../../utils/token-util';
import { CONSTANTS } from '../../utils/constant';
import { message } from 'antd';
export default class AuthRoute extends React.Component {
    render() {
        if (this.props.auth) {
            const token = localStorage.getItem(CONSTANTS.ACCESS_TOKEN);
            if (token && !isTokenExpired(token)) {
                return <Route render={() => (
                    <this.props.component {...this.props} />
                )} />;
            } else {
                message.error('请先登录！');
                localStorage.removeItem(CONSTANTS.ACCESS_TOKEN); // token过期，将其移除
                localStorage.setItem(CONSTANTS.REDIRECT_URL, window.location.pathname)
                // 未登录跳转到登录页面
                return <Redirect to='/login' />
            }
        }
        return <Route render={() => (
            <this.props.component {...this.props} />
        )} />;
    }
}