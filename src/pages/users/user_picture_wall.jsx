import React from "react"
import { Upload, Button, Icon,message } from 'antd';
import {reqRmAvatar} from "../../api";
import PropTypes from 'prop-types';
import {AVATAR_IMG_URL} from "../../utils/constant"
class UserPictureWall extends React.Component{
constructor(props) {
  super(props);
  this.state = {
  	fileList:[
  	    // { uid: 'avatar-init',      // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
          //       name: 'avatar-init.png',   // 文件名
          //       url:'http://localhost:3002/avatarupload/avatar-init.png'
  	    // }
             ]
  }
}
// 上传之前校验
beforeUpload=(file)=>{
  const imagetype = file.type === 'image/*' ;
  if (!imagetype) {
    message.error('You can only upload image/* file!');
  }
  // file.size以bytes为单位
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return imagetype && isLt2M;
}
// 处理图片上传的函数 info包含filelist和file，并从接口中获取所要返回的数据。添加url地址与服务气端的图片name
    handleChange = info => {
    let fileList =info.fileList?[...info.fileList]:[];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    if(fileList.length!==0){
        console.log(fileList)
    	 fileList = fileList.slice(-2);
    // 2. Read from response and show file link
    fileList = fileList.map(file => {
    	console.log(file)
      if (file.status==='done') {
        // Component will show file.url as link
        file.url = file.response.data.url;
        file.name=file.response.data.name
      }
      return file;
    });
}
    this.setState({ fileList });
  };

  //图片删除的回调
  remove=async (file)=>{
    const name=file.name;
    console.log(name)
    // if(name==='avatar-init.png'){
    // 	return false
    // }
    const result=await reqRmAvatar(name)
    if(result.status===0){
    	message.success('图片删除成功')
    }else{
    	message.error('图片删除失败')
    }
  }
  // 传递图片回父组件
  getImg=()=>{
  	const {fileList}=this.state;
  	return fileList;
  }
  componentDidMount(){
    //获取user界面的头像信息设置到fielist并展示
  	const {fileList}=this.state
  	const {avatarimg}=this.props;
  	if(avatarimg.length!==0){
  	const name=avatarimg[avatarimg.length-1].name;
  	const url=AVATAR_IMG_URL+name;
  	let file={
    name:name,
  	url:url,
  	uid:name
  	}
    fileList.push(file)
    this.setState({
    	fileList
    })
  	}
  	
  }
render(){
	const {fileList}=this.state
    // console.log(fileList)
const props = {
  name:"avatar",
  action:"/api/avatar/upload",
  listType: 'picture',

};
	return(
    <div>
    <Upload {...props}
    showUploadList={true}
    fileList={fileList}
    onChange={this.handleChange}
    onRemove={(file)=>this.remove(file)}
    >
    {
      fileList.length>1?null:(<Button><Icon type="upload" />Upload</Button>)
    }
    
    </Upload>
    </div>
		)
}
}
UserPictureWall.propTypes={
  	avatarimg:PropTypes.array
}
export default UserPictureWall