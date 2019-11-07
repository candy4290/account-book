import React, { useState, useEffect } from "react";
import './statistics.less';
import nprogressHoc from '../../components/nprogress/nprogress';
import axios from "../../config/httpClient";
import ReactEcharts from 'echarts-for-react';
import { getInstant } from '../../utils/json-util';
import { DatePicker } from 'antd';
import moment from 'moment';
import {withRouter} from "react-router-dom";
import Api from '../../utils/api';
import { dayNumbsOfMonth, getDateByMonthAndIndex } from '../../utils/date-util';
const { MonthPicker } = DatePicker;
const monthFormat = 'YYYY-MM';

function Statistics(props) {
  // 声明一个新的叫做 “count” 的 state 变量
  const [currentMonth, setCurrentMonth] = useState(moment(new Date())); // 当前统计的月份 默认值为当前月份
  const [statisticsData, setStatisticsData] = useState();
  const [statisticsTotal, setStatisticsTotal] = useState();
  const [statisticsTotalIncome, setStatisticsTotalIncome] = useState();
  const [statisticsDayInOfMonth, setStatisticsDayInOfMonth] = useState([]);
  const [statisticsDayOutOfMonth, setStatisticsDayOutOfMonth] = useState([]);
  const [onEvents] = useState({
    'click': chartClick
  });
  const [onLineEvents] = useState({
    'click': chartLineClick
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    statisticsDataOfMonth(currentMonth.format(monthFormat));
    statisticsDayOfMonth(currentMonth.format(monthFormat));
  }, [currentMonth]);

  function statisticsDataOfMonth(date) {
    axios.post(Api.statisticsDataOfMonth, {
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

  /**
   * 查询某月中每一天的收入总额、支出总额
   *
   * @param {*} date
   */
  function statisticsDayOfMonth(date) {
    axios.post(Api.statisticsDayOfMonth, {
      month: date
    }).then(rsp => {
      const dayOfMonth = dayNumbsOfMonth();
      const statisticsDayInOfMonth = new Array(dayOfMonth);
      const statisticsDayOutOfMonth = new Array(dayOfMonth);
      rsp.forEach(item => {
        const dayIndex = item.consume_date.slice(8) - 1;
        statisticsDayInOfMonth[dayIndex] = (item.money_in).toFixed(2);
        statisticsDayOutOfMonth[dayIndex] = (0 - item.money_out).toFixed(2);
      });
      setStatisticsDayInOfMonth(statisticsDayInOfMonth)
      setStatisticsDayOutOfMonth(statisticsDayOutOfMonth)
    });
  }
  
  function getPieOption() {
    const data = [];
    if (statisticsData) {
      statisticsData.forEach(item => {
        const name = getInstant('consumeType.' + item.consumeType);
        data.push({
          value: 0 - item.money,
          name: name,
          consumeType: item.consumeType
        });
      })
    }
    return {
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c}¥ ({d}%)"
      },
      legend: {
        padding: [0, 0],
        y: 'bottom',
      },
      series: [
        {
          name:'消费类型',
          type:'pie',
          radius: ['50%', '70%'],
          data: data,
          label: {
            formatter: "{b}: {c}¥ ({d}%)"
          }
        }
      ]
    }
  }

  function getLineOption() {
    const currentMonth1 = currentMonth.format('MM');
    const dayInMonth = [];
    const dayNums = dayNumbsOfMonth(+currentMonth1 - 1);
    for (let i = 0; i < dayNums; i++) {
      dayInMonth.push(`${currentMonth1}-${i + 1}`)
    }
    return {
      tooltip: {
          trigger: 'axis'
      },
      legend: {
          data:['收入','支出']
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      toolbox: {
          feature: {
              saveAsImage: {}
          }
      },
      xAxis: {
          type: 'category',
          boundaryGap: false,
          data: dayInMonth
      },
      yAxis: {
          type: 'value'
      },
      series: [
          {
              name:'收入',
              type:'line',
              data: statisticsDayInOfMonth
          },
          {
              name:'支出',
              type:'line',
              data: statisticsDayOutOfMonth
          },
      ]
    }
  }

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current > moment().endOf('day');
  }

  function onChange(date) {
    setCurrentMonth(moment(date));
  }

  function chartClick(e) {
    props.history.push({pathname: '/statistics/item', search: `?month=${currentMonth.format(monthFormat)}&consumeType=${e.data.consumeType}`});
  }

  function chartLineClick(e) {
    props.history.push({pathname: '/statistics/item', search: `?consumeDate=${getDateByMonthAndIndex(currentMonth.format(monthFormat), e.dataIndex)}&isIncome=${e.seriesName === '收入'}`});
  }

  return (
    <div className="statistics">
      <MonthPicker disabledDate={disabledDate} onChange={(event) => {onChange(event)}} defaultValue={currentMonth} format={monthFormat} placeholder="Select month"></MonthPicker>
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
        <div className="statistics-title">每日收支</div>
        <ReactEcharts
          className="statistics-chart"
          style={{height: 400}}
          onEvents={onLineEvents}
          option={getLineOption()}
          notMerge={true}
          lazyUpdate={true}
          theme={"theme_name"} />
        <div className="statistics-title">支出分类</div>
        <ReactEcharts
          style={{height: 400}}
          onEvents={onEvents}
          option={getPieOption()}
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
export default nprogressHoc(withRouter(Statistics));