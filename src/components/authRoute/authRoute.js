
import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { isTokenExpired } from '../../utils/util';
export default class AuthRoute extends React.Component {
    constructor(props) {
        super();
    }
    render() {
        if (this.props.auth) {
            const token = localStorage.getItem('Access-Token')
            if (token && !isTokenExpired(token)) {
                return <Route render={() => (
                    <this.props.component {...this.props} />
                )} />;
            } else {
                localStorage.removeItem('Access-Token'); // token过期，将其移除
                localStorage.setItem('REDIRECT_URL', window.location.pathname)
                // 未登录跳转到登录页面
                return <Redirect to='/login' />
            }
        }
        return <Route render={(props) => (
            <this.props.component {...this.props}/>
        )} />;
    }
}