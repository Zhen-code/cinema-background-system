import React from "react";
import {data} from "./hotdata";
const AMap = window.AMap;  //此处的引用document.ejs全局AMap对象，不做window事件是找不到的
 class Hot extends React.Component{

    heatmapLoad = (map)=>{//热力图
        let heatmap;
        map.plugin(["AMap.Heatmap"], function () {
            //初始化heatmap对象
            heatmap = new AMap.Heatmap(map, {
                radius: 25, //给定半径
                opacity: [0, 0.8]
            });
            //设置数据集：该数据为北京部分“公园”数据
            heatmap.setDataSet({
                data: data, //热力图数据
                max: 100
            });

        });

    };

    componentDidMount() {
    	//此处获取Map的div元素使用的是id， 当然也是可以使用ref的形式
    	//ref获取div元素  ref={(ref)=>{this.mapBox = ref};}  此处写在div元素上  
    	//DidMount获取  let {mapBox} = this  将new AMap 中 'mapBox' 引号去掉即可
        let map = new AMap.Map('mapBox', {//启动3D地图
            zoom:11,//级别
            center: [116.397428, 39.90923],//中心点坐标
            pitch:50,
            //rotation:-15,
            viewMode:'3D',//开启3D视图,默认为关闭
            buildingAnimation:true,//楼块出现是否带动画
        });
        this.heatmapLoad(map);
    }

    render() {
        return (<div>
            <div id='mapBox' style={{width:'100%',height:'500px'}}/>
        </div>)
    }
}
export default Hot