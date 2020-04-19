import React from "react"
import ReactEcharts from 'echarts-for-react';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";
import "./home.less";
class Home extends React.Component{
  constructor(props) {
    super(props);
    
  }
  getOption=()=>{
    return {
      title: {
        text: '周均访问量'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['浏览量','访客数']
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
        data: ['周一','周二','周三','周四','周五','周六','周日']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name:'访客数',
            type:'line',
            stack: '总量',
           data:[110, 120, 136, 180, 200, 300, 400]
        },
        {
            name:'浏览量',
            type:'line',
            stack: '总量',
            data:[200, 220, 200, 300, 550, 600, 610]
            
        }
    ]
    }
  }
  USAFE_componentWillMount(){
 
  }
  componentDidMount(){
    
  }
    render(){
      const data = [
      {
        year: "一月份",
        sales: 10
      },
      {
        year: "二月份",
        sales: 50
      },
      {
        year: "三月份",
        sales: 30
      },
      {
        year: "四月份",
        sales: 20
      },
      {
        year: "五月份",
        sales: 18
      },
      {
        year: "六月份",
        sales: 26
      },
      {
        year: "七月份",
        sales: 9
      },
      {
        year: "十月份",
        sales: 10
      },
      {
        year: "十一月份",
        sales: 8
      },
      {
        year: "十二月份",
        sales: 10
      }
    ];
    const cols = {
      sales: {
        tickInterval: 20
      }
    };
        return(
          <div>
       <div className="countVistor">
       <ReactEcharts option={this.getOption()} />
       </div>
        <div className="profile">
        <span>收益单位:K</span>
        <Chart height={500} width={600} data={data} scale={cols} forceFit>
          <Axis name="year" />
          <Axis name="sales" />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom type="interval" position="year*sales" />
        </Chart>
      </div>
       </div>
        )
    }
}
export default Home