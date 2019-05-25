
import React from 'react';
import {Route, Redirect} from 'react-router-dom';
export default class AuthRoute extends React.Component {
    constructor(props) {
        super();
    }
    render() {
        if (this.props.auth) {
            if (localStorage.getItem('login')) {
                return <Route exact={this.props.exact} path={this.props.path} component={this.props.component}/>;
            } else {
                // 未登录跳转到登录页面
                return <Redirect to='/login' />
            }
        }
        return <Route exact={this.props.exact} path={this.props.path} component={this.props.component}/>;
    }
}