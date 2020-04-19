import React, { Component } from 'react';
import {Input} from "antd";
import "./index.less";
// 1. 需要在index.html全局引入高德地图
// 2. 在使用的页面中需要使用 window.AMap;
const AMap = window.AMap;
const AMapUI = window.AMapUI;
//进入页面时自动定位
//可以通过选址定位
//可以通过拖拽微调选址
class GetCinema extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 设置位置经纬度
            selectionCenter: []
        };
    }

    componentWillMount(){
      
     
    }
    componentDidMount(){
        this.getLocation()
        this.searchSiteSelection()

    }
    shouldComponentUpdate(newProps,newState){

      return true;
    }
     componentWillUpdate(){
        // 定位state更新重新调用获取周边信息
        this.getLocation();
        this.searchSiteSelection();
     }
     componentWillUnmount(){
        
       this.setState = (state, callback) => {
            return;
        }
     }
    // 12,[116.171731,40.06682]
    //获取当前定位并显示周边查找
     getLocation=()=>{
        var that=this;
        let map, geolocation;
        //加载地图，调用浏览器定位服务
        map = new AMap.Map('container', {
            resizeEnable: true,
            // 地图初始位置
            center:[113.580936,23.511761]
            
        });
        // 周边查找
        AMap.service(["AMap.PlaceSearch"], function() {
        //构造地点查询类
        var placeSearch = new AMap.PlaceSearch({ 
            type: '电影院', // 兴趣点类别
            pageSize: 3, // 单页显示结果条数
            pageIndex: 1, // 页码
            city: "020", // 兴趣点城市
            citylimit: true,  //是否强制限制在设置的城市内搜索
            map: map, // 展现结果的地图实例
            panel: "panel", // 结果列表将在此容器中进行展示。
            autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });
        // console.log(that.state.selectionCenter);
        let selectionCenter=that.state.selectionCenter;
        // 当前位置不可用默认定位到珠江新城获取影院信息
        var cpoint =selectionCenter.length==0?[113.321206,23.119293]:that.state.selectionCenter; //中心点坐标
        placeSearch.searchNearBy('', cpoint, 5000, function(status, result) {

        });
    });
        // 开启浏览器自动定位，浏览器站点非https无法获取
        map.plugin('AMap.Geolocation', function () {
            geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,//超过10秒后停止定位，默认：无穷大
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                buttonPosition: 'RB',

            });
            map.addControl(geolocation);
            geolocation.getCurrentPosition();
            AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
            AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
        });
        //解析定位结果
        function onComplete(data) {
            // 定位成功则设置当前位置并搜索周边
            // that.setState({
            //     selectionCenter:data.position
            // })
            let poi = data.position.toString().split(",");
            that.dragSiteSelection(15, poi)
        }
        //解析定位错误信息
        function onError(data) {
            
            alert('非https站点不能成功定位');
        }
    }
    //通过搜索来获取定位信息
    searchSiteSelection = () => {
        // 获取全局this
        var that=this;
        AMapUI.loadUI(['misc/PoiPicker'], function (PoiPicker) {
            let poiPicker = new PoiPicker({
                input: 'pickerInput'
            });
            //初始化poiPicker    
            window.poiPicker = poiPicker;
            //选取了某个POI
            poiPicker.on('poiPicked', function (poiResult) {
                let poi = poiResult.item.location.toString().split(",");
                that.dragSiteSelection(15, poi)
            });
        });
    }

    //拖拽位置选择
    dragSiteSelection = (zoom, center) => {
        // 获取全局this
        var that=this;
        AMapUI.loadUI(['misc/PositionPicker'], function (PositionPicker) {
            let map = new AMap.Map('container', {
                zoom: zoom,
                resizeEnable: true,
                center: center
            })
            let positionPicker = new PositionPicker({
                mode: 'dragMap',//设定为拖拽地图模式，可选'dragMap[拖拽地图]'、'dragMarker[拖拽点]'，默认为'dragMap'
                map: map,
                // iconStyle: { //自定义图标外观
                //     url: '//webapi.amap.com/ui/1.0/assets/position-picker2.png', //图片地址
                //     ancher: [24, 40], //要显示的点大小，将缩放图片
                //     size: [48, 48]    //锚点的位置，即被size缩放之后，图片的什么位置作为选中的位置
                // }
            });
            // 通过手动搜索定位获取地理坐标设置到当前要服务类型的搜索区域范围内
            positionPicker.on('success', (positionResult)=>{
                // 获取位置
                const position=[positionResult.position.lng, positionResult.position.lat];
                that.setState({
                    //设置坐标
                    selectionCenter:position
                })
                let locationMsg = {
                    lng: positionResult.position.lng,   // 经度
                    lat: positionResult.position.lat,   // 维度
                    address: positionResult.address,    // 详细地址
                    nearestJunction: positionResult.nearestJunction,  // 最近的路口
                    nearestRoad: positionResult.nearestRoad,          // 最近的路
                    nearestPOI: positionResult.nearestPOI             // 最近的POI
                }
                //将数据抛出到address-input处理
                that.props.getLocationMsg(locationMsg);
            });

            positionPicker.on('fail', function (positionResult) {
                // 海上或海外无法获得地址信息
                alert('选址失败请稍后重试')
            });
            positionPicker.start();
        });
    }
    
    render() {

        return (
            <div id="GetLocation" >
                <Input type="primary" id="pickerInput" placeholder= "输入地点获取周边影院" />
                <div id="container"></div>
                <div id="panel"></div>
            </div>
        );
    }
}

export default GetCinema;