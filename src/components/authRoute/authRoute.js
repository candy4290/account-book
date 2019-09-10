
import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { isTokenExpired } from '../../utils/token-util';
import { CONSTANTS } from '../../utils/constant';
import { message } from 'antd';
import Loadable from 'react-loadable';
import Loading from '../loading/Loading';
export default class AuthRoute extends React.Component {
    render() {
        const LoadableComponent = Loadable({
            loader: () => import(`../../${this.props.url}`),
            loading: Loading
        });
        if (this.props.auth) {
            const token = localStorage.getItem(CONSTANTS.ACCESS_TOKEN);
            if (token && !isTokenExpired(token)) {
                return <Route render={() => (
                    <LoadableComponent {...this.props} />
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
            <LoadableComponent {...this.props}/>
        )} />;
    }
}