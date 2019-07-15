import React, { useState, useEffect } from "react";
import './statistics.less';
import nprogressHoc from '../../components/nprogress/nprogress';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, Guide } from "bizcharts";
import DataSet from "@antv/data-set";
import axios from "../../config/httpClient";

function Statistics() {
  // 声明一个新的叫做 “count” 的 state 变量
  const [statisticsData, setStatisticsData] = useState(0);
  const { DataView } = DataSet;
  const { Html } = Guide;
  const data = [
    {
      item: "事例一",
      count: 40
    },
    {
      item: "事例二",
      count: 21
    },
    {
      item: "事例三",
      count: 17
    },
    {
      item: "事例四",
      count: 13
    },
    {
      item: "事例五",
      count: 9
    }
  ];
  const dv = new DataView();
  dv.source(data).transform({
    type: "percent",
    field: "count",
    dimension: "item",
    as: "percent"
  });
  const cols = {
    percent: {
      formatter: val => {
        val = val * 100 + "%";
        return val;
      }
    }
  };

  useEffect(() => {
    axios.post('/bill/statisticsDataOfMonth', {
      month: '2019-06'
    }).then(rsp => {
      console.log(rsp);
      setStatisticsData(rsp);
    })
  }, []);


  return (
    <div>
        <Chart
          height={window.innerWidth}
          data={dv}
          scale={cols}
          forceFit
        >
          <Coord type={"theta"} radius={0.75} innerRadius={0.6} />
          <Axis name="percent" />
          <Tooltip
            showTitle={false}
            itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
          />
          <Geom
            type="intervalStack"
            position="percent"
            color="item"
            tooltip={[
              "item*percent",
              (item, percent) => {
                percent = percent * 100 + "%";
                return {
                  name: item,
                  value: percent
                };
              }
            ]}
            style={{
              lineWidth: 1,
              stroke: "#fff"
            }}
          >
            <Label
              content="percent"
              formatter={(val, item) => {
                return item.point.item + ": " + val;
              }}
            />
          </Geom>
        </Chart>
      </div>
  );
}
export default nprogressHoc(Statistics);