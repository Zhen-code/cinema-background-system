import React from "react";
// import ReactDOM from 'react-dom';
import { Map,Marker } from 'react-amap';
import MyMapComponent from "./map-component";
class MapSite extends React.Component{
	constructor(props) {
	  super(props);
	  this.state = {
	  	    mapZoom: 13, //地图缩放等级 （zoom）
            mapKey: '63bab3908c4ff34f5cd677236c29a774',//开发者key
            status:{
            zoomEnable: true,
            dragEnable: true
            }, 
            mapCenter:[113.254599,23.108402],//地图中心点
            mapMake :[113.254599,23.108402],//marker标记点
            icon: '//vdata.amap.com/icons/b18/1/2.png'
            }
	}
    componentWillUnmount(){
    
    }
	render(){
		const {mapZoom,mapKey,status,mapCenter,mapMake,icon}=this.state;
		return (
        <div style={{width: '100%', height: '600px'}}>
        <Map amapkey={mapKey} center={mapCenter} zoom={mapZoom} status={status}>
          <Marker position={mapMake} icon={icon} />
        <MyMapComponent />
      </Map>
        </div>)
  
			
	}
}

export default MapSite