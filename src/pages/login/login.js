import React from 'react';
import './login.less';
import { Form, Icon, Input, Button, Checkbox } from "antd";
import {withRouter} from "react-router-dom";
import nprogressHoc from '../../components/nprogress/nprogress';
import axios from '../../config/httpClient';
import { CONSTANTS } from '../../utils/constant';
import Api from '../../utils/api';
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      submit: {
        loading: false,
        text: '登录'
      }
    }
  }
  handleSubmit = e => {
      e.preventDefault();
      this.setState({
        submit: {
          loading: true,
          text: '登录中...'
        }
      });
      this.props.form.validateFields((err, values) => {
        if (!err) {
          axios.post(Api.login, {
          userName: values.username,
          userPsw: values.password
          }).then(rsp => {
            this.setState({
              submit: {
                loading: false,
                text: '登录'
              }
            });
            const urlBeforeLogin = localStorage.getItem(CONSTANTS.REDIRECT_URL);
            if (urlBeforeLogin) {
              this.props.history.push(urlBeforeLogin)
            } else {
              this.props.history.push('/');
            }
          }).catch(err => {
            this.setState({
              submit: {
                loading: false,
                text: '登录'
              }
            });
          });
        } else {
          this.setState({
            submit: {
              loading: false,
              text: '登录'
            }
          });
        }
      });
    };
    
    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <div className="login-container">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <div className="login-title">记账本</div>
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [{ required: true, message: "请输入用户名!" }]
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                  placeholder="用户名"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [{ required: true, message: "请输入密码!" }]
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                  type="password"
                  placeholder="密码"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("remember", {
                valuePropName: "checked",
                initialValue: true
              })(<Checkbox>记住密码</Checkbox>)}
              <a className="login-form-forgot" href="null">
                忘记密码
              </a>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={this.state.submit.loading}
              >
                {this.state.submit.text}
              </Button>
              或者 <a href="null">前往注册!</a>
            </Form.Item>
          </Form>
        </div>
      );
    }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);
export default nprogressHoc(withRouter(WrappedNormalLoginForm));