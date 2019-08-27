import React from 'react';
import nprogressHoc from '../../components/nprogress/nprogress';
import { Form, Input, Select, Button, DatePicker, message } from 'antd';
import moment from 'moment';
import axios from '../../config/httpClient';
import { getInstant } from '../../utils/json-util';
import Api from '../../utils/api';
const { Option } = Select;
const { TextArea } = Input;
const dateFormat = 'YYYY-MM-DD';
class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: +this.props.match.params.id,
      confirmDirty: false,
      autoCompleteResult: [],
      submitLoading: false,
      consumeTypes: [],
      billDetail: {}
    };
    if (!isNaN(this.state.id)) {
      this.queryBillById(this.state.id);
    }
  }

  componentDidMount() {
    this.setState({
      consumeTypes: getInstant('consumeType')
    });
  }

  queryBillById(id) {
    axios.post(Api.billDetail, {
      id: id
    }).then(rsp => {
      this.setState({
        billDetail: rsp
      });
      this.props.form.setFieldsValue({
        consumeDate: moment(this.state.billDetail.consumeDate),
        moment: this.state.billDetail.money < 0 ? '-' : '+',
        consumeType: this.state.billDetail.consumeType,
        money: Math.abs(this.state.billDetail.money),
        remark: this.state.billDetail.remark,
      });
    }).catch(() => {

    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({
            submitLoading: true
        });
        let req = {
          consumeDate: moment(values.consumeDate).format(dateFormat),
          consumeType: values.consumeType,
          money: +((+(values.prefix + values.money)).toFixed(2)),
          remark: values.remark
        }
        if (!isNaN(this.state.id)) {
          req = Object.assign(req, {id: this.state.id});
        }
        axios.post(Api.bill, req).then(rsp => {
          this.setState({
            submitLoading: false
          });
          if (!isNaN(this.state.id)) {
            message.success('更新成功！');
          } else {
            this.props.form.resetFields();
            message.success('本条记录已入账！');
          }
        }).catch(() => {
          this.props.form.resetFields();
          this.setState({
            submitLoading: false
          });
        });
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
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '-',
    })(
      <Select style={{ width: 70 }}>
        <Option value="-">-</Option>
        <Option value="+">+</Option>
      </Select>,
    );
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{padding: 24}}>
        <Form.Item label="日期" hasFeedback>
          {getFieldDecorator('consumeDate', config)(<DatePicker laceholder="请选择日期" style={{width: '100%'}}/>)}
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
        <Form.Item label="金额" hasFeedback>
          {getFieldDecorator('money', {
            rules: [
              {
                required: true,
                message: '请输入金额',
              },
            ],
          })(<Input addonBefore={prefixSelector} type="number" placeholder="请输入金额" />)}
        </Form.Item>
        <Form.Item label="备注" hasFeedback>
          {getFieldDecorator('remark', {
            rules: [],
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