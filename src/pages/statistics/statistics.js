import React, { useState, useEffect } from "react";
import './statistics.less';
import nprogressHoc from '../../components/nprogress/nprogress';
import axios from "../../config/httpClient";
import ReactEcharts from 'echarts-for-react';
import { getInstant } from '../../utils/json-util';

function Statistics() {
  // 声明一个新的叫做 “count” 的 state 变量
  const [statisticsData, setStatisticsData] = useState();
  const [statisticsTotal, setStatisticsTotal] = useState();

  useEffect(() => {
    axios.post('/bill/statisticsDataOfMonth', {
      month: '2019-07'
    }).then(rsp => {
      setStatisticsData(rsp);
      let total = 0;
      rsp.forEach(item => {
        total += item.money;
      });
      setStatisticsTotal((0 - total).toFixed(2))
    })
  }, []);
  
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

  return (
    <div className="statistics">
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
  );
}
export default nprogressHoc(Statistics);