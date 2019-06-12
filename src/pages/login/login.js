import React from 'react';
import './login.less';
import { Form, Icon, Input, Button, Checkbox } from "antd";
import {withRouter} from "react-router-dom";
import nprogressHoc from '../../components/nprogress/nprogress';
import axios from '../../config/httpClient';
class Login extends React.Component {
  constructor(props) {
    super();
  }
  handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          axios.post('/user/login', {
          userName: values.username,
          userPsw: values.password
          }).then(rsp => {
            this.props.history.push('/');
          }).catch(err => {
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
              >
                登录
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