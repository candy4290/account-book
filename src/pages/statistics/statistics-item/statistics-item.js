import React, { useState, useEffect } from "react";
import './statistics-item.less';
import BillItem from '../../../components/bill-item/bill-item';
import nprogressHoc from '../../../components/nprogress/nprogress';
import axios from "../../../config/httpClient";
import Api from '../../../utils/api';

function StatisticsItem(props) {
    let params = new URLSearchParams(props.location.search);
    const [month] = useState(params.get('month'));
    const [consumeDate] = useState(params.get('consumeDate'));
    const [isIncome] = useState(params.get('isIncome'));
    const [consumeType] = useState(params.get('consumeType'));
    const [billLists, setBillLists] = useState([]);
    useEffect(() => {
        if (consumeType) {
            statisticsDataOfMonth(month, consumeType);
        } else {
            statisticsDataOfDay(consumeDate, isIncome);
        }
    }, [month, consumeType, consumeDate, isIncome]);

    function statisticsDataOfMonth(date, type) {
        axios.post(Api.billList, {
        month: date,
        type: type
        }).then(rsp => {
            setBillLists(rsp);
        });
    }

    function statisticsDataOfDay(consumeDate, isIncome) {
        axios.post(Api.billListOfDay, {
            consumeDate,
            isIncome: isIncome === 'true'
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