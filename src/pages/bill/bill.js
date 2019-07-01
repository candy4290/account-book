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
            billLists: []
        }
    }
    componentDidMount() {
        axios.post('/user/billList').then((rsp) => {
            this.setState({
                billLists: rsp
            });
        })
    }
    onChange(date) {
        console.log(moment(date).format(monthFormat));
    }
    render() {
        return <div>
            <MonthPicker onChange={(event) => {this.onChange(event)}} defaultValue={moment(new Date(), monthFormat)} format={monthFormat} placeholder="Select month"></MonthPicker>
            {this.state.billLists.map(item => 
                <BillItem key={item.id} bill={item} />
            )};
        </div>
    }
}
export default nprogressHoc(Bill);