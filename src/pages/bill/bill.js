import React from 'react';
import './bill.less';
import nprogressHoc from '../../components/nprogress/nprogress';
import axios from '../../config/httpClient';
import { BillItem } from '../../components/bill-item/bill-item';
import { DatePicker } from 'antd';
import moment from 'moment';
const { MonthPicker } = DatePicker;
const monthFormat = 'YYYY-MM';
class Bill extends React.Component {
    constructor() {
        super();
        this.state = {
            billLists: [],
            payAmount: 0,
            incomeAmout: 0
        }
    }
    componentDidMount() {
       this.queryBillList(moment(new Date()).format(monthFormat));
    }

    queryBillList(month) {
        axios.post('/user/billList', {month: month}).then((rsp) => {
            this.getStaticData(rsp);
            this.setState({
                billLists: rsp
            });
        })
    }

    getStaticData(list) {
        let payAmount = 0, incomeAmout = 0;
        list.forEach(item => {
            if (item.money < 0) {
                payAmount += item.money;
            } else {
                incomeAmout += item.money;
            }
        });
        this.setState({
            payAmount: 0 - payAmount,
            incomeAmout: incomeAmout
        })
    }

    disabledDate(current) {
        // Can not select days before today and today
        return current && current > moment().endOf('day');
      }

    onChange(date) {
        this.queryBillList(moment(date).format(monthFormat));
    }
    render() {
        return <div className="cxx-bill">
            <div className="cxx-bill-static">
                <MonthPicker disabledDate={this.disabledDate} onChange={(event) => {this.onChange(event)}} defaultValue={moment(new Date(), monthFormat)} format={monthFormat} placeholder="Select month"></MonthPicker>
                <div>
                    <span>支出 ¥ {this.state.payAmount.toFixed(2)}</span>
                    <span>收入 ¥ {this.state.incomeAmout.toFixed(2)}</span>
                </div>
            </div>
            <div className="cxx-bill-list">
                {this.state.billLists.map(item => 
                    <BillItem key={item.id} bill={item} />
                )}
            </div>
        </div>
    }
}
export default nprogressHoc(Bill);