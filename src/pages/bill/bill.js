import React from 'react';
import './bill.less';
import nprogressHoc from '../../components/nprogress/nprogress';
import axios from '../../config/httpClient';
class Bill extends React.Component {
    constructor() {
        super();
        axios.post('/user/list').then(rsp => {
            console.log(rsp);
        })
    }
    render() {
        return <div>bill</div>;
    }
}
export default nprogressHoc(Bill);