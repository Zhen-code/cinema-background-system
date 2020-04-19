import jsonp from 'jsonp'
import ajax from './ajax'
import {message} from 'antd'

const BASE='/api';

export const reqLogin=(adminName,password)=>ajax(BASE+'/login',{adminName,password},"POST");
// 获取用户信息
export const reqUsers=()=>ajax(BASE+'/users/get/info',{},"GET");
// 删除用户信息
export const reqRemoveUser=(_id)=>ajax(BASE+'/users/remove',{_id},"POST");
// 更新用户信息
export const reqUpdateUser=(_id,Avatar,userName,password,vip)=>ajax(BASE+'/users/info/change',{_id,Avatar,userName,password,vip},"POST");
//添加用户
export const reqAddUser=(userName,password,Avatar,vip)=>{
	return ajax(BASE+'/users/add',{userName,password,Avatar,vip},"POST")
}
export const reqWeather=(city)=>{
	return new Promise((resolve, reject) => {
		const url=`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
		jsonp(url,{},(err,data)=>{
			if(!err && data.status==='success'){
				const {currentCity}=data.results[0];
				const {weather,dayPictureUrl}=data.results[0].weather_data[0];
				const newWeather={currentCity,weather,dayPictureUrl};
				resolve(newWeather);
			}else{
				 message.error('获取天气信息失败!');
			}
		})
	})
}
 export const reqMovie=()=>{
	return new Promise((resolve, reject) => {
		const url='https://api.douban.com/v2/movie/coming_soon?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=20'
		// const url='https://douban.uieee.com/v2/movie/weekly?apikey=0df993c66c0c636e29ecbb5344252a4a';
		jsonp(url,{},(err,data)=>{
			if(!err){
				resolve(data);
			}
		})
	});
}

export const reqCategorys=()=>{
	return ajax(BASE+'/Category/get',{},"GET");
}
export const reqAddCategory=(categoryName)=>{
   return ajax(BASE+'/Category/add',{categoryName},"POST");
}
export const reqRemoveCategory=(_id)=>{
	return ajax(BASE+'/Category/remove',{_id},'POST');
}
export const reqUpdateCategory=(_id,categoryName)=>{
	return ajax(BASE+'/Category/update',{_id,categoryName},"POST");
}
export const reqFilmsList=(PageNum,PageSize)=>{
	return ajax(BASE+'/film/get',{PageNum,PageSize},"GET");
}
export const reqRemoveImg=(name)=>{
	return ajax('/manage/img/delete',{name},"POST");
}
export const reqAddFilm=({parentId,name,type,imgs,detail})=>{
	return ajax(BASE+'/film/add',{parentId,name,type,imgs,detail},"POST");
}
export const reqUpdateFilm = ({_id,parentId,name,type,imgs,detail})=>{
	return ajax(BASE+'/film/update',{_id,parentId,name,type,imgs,detail},"POST");
}
export const reqDelFilm=(_id)=>{
	return ajax(BASE+'/film/delete',{_id},"POST");
}
export const reqSeates=()=>{
	return ajax(BASE+'/get/seates',{},"GET");
}
export const reqUpdateSeate=(row,num,status)=>{
	return ajax(BASE+'/update/seatstatu',{row,num,status},"POST");
}
// 移除用户头像
export const reqRmAvatar=(name)=>ajax(BASE+'/avatar/delete',{name},"POST")