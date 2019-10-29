import React, { useState, useEffect } from "react";
import nprogressHoc from '../../components/nprogress/nprogress';
import BillItem from '../../components/bill-item/bill-item';
import axios from '../../config/httpClient';
// import axios from "../../../config/httpClient";
import { Input, Icon } from 'antd';
import './search-bill.less';
import Api from "../../utils/api";

function SearchBill(props) {
    const [remark, setRemark] = useState('');
    const [billLists, setBillLists] = useState([]);
    useEffect(() => {
        if (remark) {
            axios.post(Api.billListByRemark, {remark: remark}).then(rsp => {
                setBillLists(rsp);
            });
        }
    }, [remark]);
    function pressEnter(e) {
        e.persist()
        setRemark(e.target.value);
    }
    return (
        <div className="search-bill">
            <div className="search-bill-header">
                <Input prefix={<Icon type="search" />} onPressEnter={(e) => pressEnter(e)} placeholder="请输入订单相关信息" />
            </div>
            <div>
                {billLists.map(item => 
                    <BillItem key={item.id} bill={item} />
                )}
            </div>
        </div>
    );

}
export default nprogressHoc(SearchBill);