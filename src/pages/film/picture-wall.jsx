import React from "react";
import { Upload, Icon, Modal,message } from 'antd';
import {BASE_IMG_URL} from "../../utils/constant";
import {reqRemoveImg} from "../../api";
class PictureWall extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
    previewVisible: false,previewImage: '',fileList:[] 
}
}
 // 获取图片
  getImg=()=>{
    const {fileList}=this.state;
    let imgList=[];
    imgList=fileList.map((item) => {
      return item.name;
    })
    console.log(imgList)
    return imgList;

  }

  getBase64=(file)=>{
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  })
  }
  handleCancel = () => this.setState({ previewVisible: false });
  handlePreview=async (file)=>{
   if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj);
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  }
  handleChange = async ({ fileList,file }) =>{

    if(file.status==='done'){
  	const result=file.response;
  	if(result.status===0){
  		message.success('图片上传成功');
  		const {name,url}=result.data;
  		file=fileList[fileList.length-1];
  		file.name=name;
  		// console.log(file.name+'-');
  		file.url=url;

  	}else{
  		message.error('图片上传失败');
  	}
  }else if(file.status==='removed'){
        const name=file.name;
        // console.log(name+'--');
        const result=await reqRemoveImg(name);
        // console.log(result);
        if(result.status===0){
        	message.success('图片删除成功');
        }else{
        	message.error('图片删除失败!');
        }
  }
  // 此处一定要更新才能获得status
  	this.setState({ fileList });
  }
  render(){
    // const img=this.getImg();
    // console.log(img);
  const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (<div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>);
    return(
       <div className="clearfix">
        <Upload
          action="/api/manage/img/upload"
          listType="picture-card"
          name="image"
          accet="image/*"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
			);
      
  }
	
}
export default PictureWall 
// fileList: [
//       {
//         uid: '-1',
//         name: 'image.png',
//         status: 'done',
//         url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//       },
//       {
//         uid: '-2',
//         name: 'image.png',
//         status: 'done',
//         url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//       }
//     ],

			
		
  
	