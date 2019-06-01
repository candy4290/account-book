import React from 'react';
import nprogressHoc from '../../components/nprogress/nprogress';
import { Form, Input, Select, Button, DatePicker } from 'antd';
const { Option } = Select;
const { TextArea } = Input;

class Book extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        submitLoading: false
      };
    
      handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            this.setState({
                submitLoading: true
            })
            console.log('Received values of form: ', values);
          }
        });
      };
    
      handleConfirmBlur = e => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
      };
    
      compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
          callback('Two passwords that you enter is inconsistent!');
        } else {
          callback();
        }
      };
    
      validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      };

      handleChange = value => {

      };
    
      handleWebsiteChange = value => {
        let autoCompleteResult;
        if (!value) {
          autoCompleteResult = [];
        } else {
          autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
      };
    
      render() {
        const { getFieldDecorator } = this.props.form;
        const config = {
            rules: [{ type: 'object', required: true, message: '请选择日期!' }],
        };
        const formItemLayout = {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 4 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 20 },
          },
        };
        const tailFormItemLayout = {
          wrapperCol: {
            xs: {
              span: 24,
              offset: 0,
            },
            sm: {
              span: 20,
              offset: 4,
            },
          },
        };
        return (
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <Form.Item label="日期">
                {getFieldDecorator('date-picker', config)(<DatePicker placeholder="请选择日期" style={{width: '100%'}}/>)}
            </Form.Item>
            <Form.Item label="金额">
              {getFieldDecorator('money', {
                rules: [
                  {
                    required: true,
                    message: '请输入金额',
                  },
                ],
              })(<Input type="number" placeholder="请输入金额" />)}
            </Form.Item>
            <Form.Item label="消费类型" hasFeedback>
              {getFieldDecorator('consumeType', {
                rules: [
                  {
                    required: true,
                    message: '请选择消费类型!',
                  }
                ],
              })( <Select allowClear showSearch placeholder="请选择消费类型" style={{ width: '100%' }} onChange={this.handleChange}>
                <Option value="餐饮美食">餐饮美食</Option>
                <Option value="交通出行">交通出行</Option>
                <Option value="服饰美容">服饰美容</Option>
                <Option value="日常缴费">日常缴费</Option>
                <Option value="文体教育">文体教育</Option>
                <Option value="休闲娱乐">休闲娱乐</Option>
                <Option value="人情往来">人情往来</Option>
                <Option value="公益">公益</Option>
                <Option value="通讯物流">通讯物流</Option>
                <Option value="住房物业">住房物业</Option>
                <Option value="工资收入">工资收入</Option>
            </Select>)}
            </Form.Item>
            <Form.Item label="备注" hasFeedback>
              {getFieldDecorator('remark', {
                rules: [
                ],
              })(<TextArea
                placeholder="备注"
                autosize={{ minRows: 4, maxRows: 4 }}
              />)}
            </Form.Item>
            <Form.Item {...tailFormItemLayout} style={{textAlign: "center"}}>
              <Button type="primary" htmlType="submit" style={{width: '100%'}} loading={this.state.submitLoading}>
                提交
              </Button>
            </Form.Item>
          </Form>
        );
      }
}
const WrappedRegistrationForm = Form.create({ name: 'submit' })(Book);
export default nprogressHoc(WrappedRegistrationForm);