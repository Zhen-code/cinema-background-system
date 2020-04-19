import React from "react";
// import { Map } from 'react-amap';
import "./search-periphery.less";
import {Button,Input} from "antd";
const AMap = window.AMap;  //此处的引用document.ejs全局AMap对象，不做window事件是找不到的
 class Search extends React.Component{

    state={
      site:''
    }
    shouldComponentUpdate(nextProps,nextState){
      return true;
    }
    componentDidMount() {
       this.updateSite();
 
    }
    componentDidUpdate(){
      this.updateSite();
    }
    updateSite=()=>{
      var site=this.state.site;
      var map = new AMap.Map('container', {
          resizeEnable: true,
          center:[113.254599,23.108402],
          zoom:11
      });
     AMap.service('AMap.PlaceSearch',function(){//回调函数
          //实例化PlaceSearch
          const placeSearch= new AMap.PlaceSearch({
            pageSize: 5,//每页显示多少行
            pageIndex: 1,//显示的下标从那个开始
            type:'餐饮服务',//类别，可以以|后面加其他类
            city: "020", //城市
            map: map,//显示地图
            panel: "result"//服务显示的面板
          });
          //TODO: 使用placeSearch对象调用关键字搜索的功能
          placeSearch.search(site, function(status, result) {
            
          });
      })
    }
    query=(e)=>{
       if(e){
        e.preventDefault();
       }
       var value=this.input.state.value;
       this.setState({
        site:value
       })
    }

    render() {
         
        return (
        <div className="map-content">
        <div id="container"></div>
        <div id="result" ></div>
        <div id="search-form">
        <label>周边查询:</label><Input ref={(input) => this.input = input} type="text" />
        <Button type="primary" onClick={this.query}>查询</Button>
        </div>
        </div>
        )
    }
}
export default Search