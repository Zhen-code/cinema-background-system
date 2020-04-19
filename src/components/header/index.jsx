import React from "react";
import {withRouter} from "react-router-dom";
import { Modal} from 'antd';
import "./index.less";
import LinkButton from "../link-button";
import menuList from "../../config/menuConfig";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import formateDate from "../../utils/dateUtils";
import {reqWeather} from "../../api";
const { confirm } = Modal;
class Header extends React.Component{
  constructor(props) {
    super(props);
  
    this.state = {
      currentTime:formateDate(new Date())
    };
  }
  // 退出登录
  logOut=()=>{
  confirm({
    title: '确定是否退出?',
    onOk:()=>{
      // 设置内存中的用户为空
  memoryUtils.user='';
  // 本地用户移除
   storageUtils.removeUser();
   // 跳转到登录界面
   this.props.history.replace('/login');
    },
  });
}
// 获得时间
getTime=()=>{
  setInterval(() => {
    let currentTime=formateDate(new Date());
    this.setState({currentTime});
  }, 1000);
}
//获得天气
getWeather=async (city)=>{
  const result=await reqWeather(city);
  this.weather=result.weather;
  this.dayPictureUrl=result.dayPictureUrl;
  this.currentCity=result.currentCity;
}
// 获取当前标题
getTitle=(menuList)=>{
  let path=this.props.location.pathname;
  let title;
  menuList.forEach(menu=>{
    if(menu.key===path){
      title=menu.title;
    }else if(menu.children){
      const cMenu=menu.children.find(cMenu=>path.indexOf(cMenu.key)===0);
      if(cMenu){
        title=menu.title;
      }
    }
  })
  return title;
}
 componentDidMount(){
  this.getTime();
  this.getWeather('广州');
 }
    render(){
       // 获取本地存取的用户
        const user=storageUtils.getUser();
      
        // 获取时间
        const {currentTime}=this.state;
        // 获得标题
        const title=this.getTitle(menuList);
        this.username=user.adminName
    return(
        <div className="header">
        <div className="header-left">
        <div className="local-weather">
        <p>当前所在城市:{this.currentCity}</p>
        <p><img src={this.dayPictureUrl} alt="weather" style={{marginRight:10}}/>天气:{this.weather}</p>
        </div>
        <span className="title">{title}</span>
        </div>
        <div className="header-right">
        <p>
         <span>欢迎&nbsp;{this.username}</span>
         <LinkButton onClick={this.logOut} style={{color:'black'}}>退出</LinkButton>
         </p>
         <p>时间:{currentTime}</p>
        </div>
        </div>
        )
    }
}
export default withRouter(Header)