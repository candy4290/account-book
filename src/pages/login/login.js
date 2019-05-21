import React, { Component } from 'react';
import './login.less';
import { Form, Icon, Input, Button, Checkbox } from "antd";

class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log("Received values of form: ", values);
          }
        });
      };
    
      render() {
        const { getFieldDecorator } = this.props.form;
        return (
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
              <a className="login-form-forgot" href="">
                忘记密码
              </a>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
              或者 <a href="">前往注册!</a>
            </Form.Item>
          </Form>
        );
      }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);
export default WrappedNormalLoginForm;