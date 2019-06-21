import React from 'react';
import './bill.less';
import nprogressHoc from '../../components/nprogress/nprogress';
import axios from '../../config/httpClient';
import { BillItem } from '../../components/bill-item/bill-item';
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
    render() {
        return <div>{this.state.billLists.map(item => 
            <BillItem key={item.id} bill={item} />
        )}</div>;
    }
}
export default nprogressHoc(Bill);