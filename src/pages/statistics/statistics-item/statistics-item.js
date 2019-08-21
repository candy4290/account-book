import React, { useState, useEffect } from "react";
import './statistics-item.less';
import { BillItem } from '../../../components/bill-item/bill-item';
import nprogressHoc from '../../../components/nprogress/nprogress';
import axios from "../../../config/httpClient";

function StatisticsItem() {
    const [billLists, setBillLists] = useState([]);
    useEffect(() => {
        statisticsDataOfMonth('2019-08');
    }, []);

    function statisticsDataOfMonth(date, type) {
        axios.post('/bill/billList', {
        month: date,
        type: type
        }).then(rsp => {
            setBillLists(rsp);
        });
    }
  

    return (
        <div className="statistics-item">
            {billLists.map(item => 
                <BillItem key={item.id} bill={item} />
            )}
        </div>
    );
}
export default nprogressHoc(StatisticsItem);