import React from 'react';
import nprogressHoc from '../../components/nprogress/nprogress';
import { Form, Input, Select, Button, DatePicker } from 'antd';
import moment from 'moment';
import axios from '../../config/httpClient';
const { Option } = Select;
const { TextArea } = Input;
const dateFormat = 'YYYY-MM-DD';
class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      submitLoading: false,
      consumeTypes: []
    };
    axios.get('/dict_zh.json',{ data: 'local'}).then(rsp => {
      const consumeTypes = [];
      for(let key in rsp.consumeType) {
        consumeTypes.push({key: key, value: rsp.consumeType[key]})
      }
      this.setState({
        consumeTypes: consumeTypes
      });
    })
  }

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
  
  render() {
    const { getFieldDecorator } = this.props.form;
    const config = {
        initialValue: moment(new Date(), dateFormat),
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
            {getFieldDecorator('date-picker', config)(<DatePicker laceholder="请选择日期" style={{width: '100%'}}/>)}
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
          })( <Select allowClear showSearch placeholder="请选择消费类型" style={{ width: '100%' }}>
            {this.state.consumeTypes.map((item) =>
            <Option value={item.key} key={item.key}>{item.value}</Option>
            )}
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