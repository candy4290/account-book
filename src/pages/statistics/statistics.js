import React, { useState, useEffect } from "react";
import './statistics.less';
import nprogressHoc from '../../components/nprogress/nprogress';
import axios from "../../config/httpClient";
import ReactEcharts from 'echarts-for-react';
import { getInstant } from '../../utils/json-util';
import { DatePicker } from 'antd';
import moment from 'moment';
const { MonthPicker } = DatePicker;
const monthFormat = 'YYYY-MM';

function Statistics() {
  // 声明一个新的叫做 “count” 的 state 变量
  const [statisticsData, setStatisticsData] = useState();
  const [statisticsTotal, setStatisticsTotal] = useState();
  const [statisticsTotalIncome, setStatisticsTotalIncome] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
      statisticsDataOfMonth(moment(new Date()).format(monthFormat));
  }, []);

  function statisticsDataOfMonth(date) {
    axios.post('/bill/statisticsDataOfMonth', {
      month: date
    }).then(rsp => {
      const consumeList = [];
      const incomeList = [];
      let totalConsume = 0;
      let totalIncome = 0;
      rsp.forEach(item => {
        if (item.money <= 0) {
          consumeList.push(item);
          totalConsume += item.money;
        } else {
          incomeList.push(item);
          totalIncome += item.money;
        }
      });
      setStatisticsData(consumeList);
      setStatisticsTotal((0 - totalConsume).toFixed(2));
      setStatisticsTotalIncome((totalIncome).toFixed(2));
    });
  }
  
  function getOption() {
    const legends = [];
    const data = [];
    if (statisticsData) {
      statisticsData.forEach(item => {
        const name = getInstant('consumeType.' + item.consumeType);
        legends.push(name);
        data.push({
          value: 0 - item.money,
          name: name
        });
      })
    }
    return {
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c}¥ ({d}%)"
      },
      series: [
        {
          name:'消费类型',
          type:'pie',
          radius: ['50%', '70%'],
          data: data
        }
      ]
    }
  }

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current > moment().endOf('day');
  }

  function onChange(date) {
    statisticsDataOfMonth(moment(date).format(monthFormat));
  }

  return (
    <div className="statistics">
      <MonthPicker disabledDate={disabledDate} onChange={(event) => {onChange(event)}} defaultValue={moment(new Date(), monthFormat)} format={monthFormat} placeholder="Select month"></MonthPicker>
      <div className="statistics-type">
        <div className={currentIndex === 0 ? 'statistics-type-item hover' : 'statistics-type-item' } onClick={
          () => setCurrentIndex(0)
        }>支出</div>
        <div className={currentIndex === 1 ? 'statistics-type-item hover' : 'statistics-type-item' } onClick={
          () => setCurrentIndex(1)
        }>收入</div>
      </div>
      { currentIndex === 0 ?
      // 总支出
      <div>
        <div className="statistics-data">
          <span className="statistics-data-name">总支出</span>
          <span className="statistics-data-total"><span style={{fontSize: '16px', display: 'inline'}}>¥</span> {statisticsTotal}</span>
        </div>
        <ReactEcharts
          option={getOption()}
          notMerge={true}
          lazyUpdate={true}
          theme={"theme_name"} />
      </div>
      :
      // 总收入
      <div>
        <div className="statistics-data">
          <span className="statistics-data-name">总收入</span>
          <span className="statistics-data-total"><span style={{fontSize: '16px', display: 'inline'}}>¥</span> {statisticsTotalIncome}</span>
        </div>
      </div>
    }
    </div>
  );
}
export default nprogressHoc(Statistics);