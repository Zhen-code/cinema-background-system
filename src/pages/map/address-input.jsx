import React, { Component } from 'react';
import GetCinema from './get-cinema'
// 使用外部css文件表
import "./index.less";
class EditAddress extends Component {
  constructor (props) {
    super(props);
    this.state = {
      locationMsg:{},
      style:{'display': 'none'}
    };
  }
  componentWillMount(){

  }
 
     getLocationMsg=(locationMsg)=>{
    //如果不为空的话显示提示
    if(Object.keys(locationMsg).length !== 0){
      this.setState({ 
        locationMsg:locationMsg,
        style:{'display': 'block'}
      })
    }
  }
  
 
 
  render() {

    // 当前位置经纬度
    // <li class="list-group-item">经纬度：<span>{this.state.locationMsg.lng},{this.state.locationMsg.lat}</span></li>
    // <li class="list-group-item">最近的POI:<span>{this.state.locationMsg.nearestPOI}</span></li>
    return (
      <div id="EditAddress">
         <GetCinema getLocationMsg={this.getLocationMsg}/>
         <div style={this.state.style} className="address_box">
         <div className="alert alert-warning" role="alert">当前自动搜索位置范围5km,仅限广州范围内</div>
         <ul className="list-group">
  <li className="list-group-item">详细地址:<span>{this.state.locationMsg.address}</span></li>
  <li className="list-group-item">最近的路口:<span>{this.state.locationMsg.nearestJunction}</span></li>
  <li className="list-group-item">最近的路:<span>{this.state.locationMsg.nearestRoad}</span></li>
</ul>
        </div>
      </div>
    );
  }
}

export default EditAddress;