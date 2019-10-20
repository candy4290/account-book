import React, { useState, useEffect } from "react";
import nprogressHoc from '../../components/nprogress/nprogress';
import BillItem from '../../components/bill-item/bill-item';
// import axios from "../../../config/httpClient";
import { Input, Icon } from 'antd';
import './search-bill.less';

function SearchBill(props) {
    const [billLists, setBillLists] = useState([]);
    useEffect(() => {
console.log('---');
    }, []);
    function pressEnter(e) {
        console.log(e);
    }
    return (
        <div className="search-bill">
            <div className="search-bill-header">
                <Input prefix={<Icon type="search" />} onChange={(event) => pressEnter(event)} placeholder="请输入订单相关信息" />
            </div>
            <div className="cxx-bill-list">
                {/* {billLists.map(item => 
                    <BillItem key={item.id} bill={item} />
                )} */}
            </div>
        </div>
    );

}
export default nprogressHoc(SearchBill);