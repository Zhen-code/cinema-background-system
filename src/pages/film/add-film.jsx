import React from "react";
import { Card,Form, Icon, Input, Button,Select,message } from 'antd';
import {reqCategorys,reqAddFilm} from "../../api";
import RichTextEditor from "./rich-text-editor";
import PictureWall from "./picture-wall";
import LinkButton from "../../components/link-button";
const { Option } = Select;
class AddFilm extends React.Component{
	constructor(props) {
	  super(props);
	  // 创建ref容器接收子组件数据
	  this.getdetail=React.createRef();
	  this.getImg=React.createRef();
	  this.state = {
	  	categoryList:[]
	  };
	}
    getCategoryList=async ()=>{
    	const result=await reqCategorys();
    	if(result.status===0){
    		const categoryList=result.data;
    		this.setState({categoryList});
    		}

    	}
    getCategoryKey=(value,option)=>{
    	this.key=option.key;
    	// console.log(value,option.key)
    }
    // 表单提交
	handleSubmit=()=>{
	const {form: { validateFields }} = this.props;
	validateFields(async (errors, values) => {
		if(!errors){
			const parentId=this.key;
			const {name,type}=values;
			const detail=this.getdetail.current.gethtml();
            const imgs=this.getImg.current.getImg();
            console.log(imgs)
            const result=await reqAddFilm({parentId,name,type,detail,imgs});
            if(result.status===0){
            	message.success('影片添加成功')
            }else{
                message.error('添加失败');
            }

            
		}
});	
	}
	componentWillMount(){
		this.getCategoryList();
	}
	componentDidUpdate(){
      
	}
	render(){

		 const { getFieldDecorator } = this.props.form;
		  const formItemLayout ={
            labelCol: {span:6},
            wrapperCol: {span:16}
          }
          const {categoryList}=this.state;
          this.options=categoryList.map((item) => {
          	return(
            <Option value={item.name} key={item._id}>{item.name}</Option>
          		)
          })
           // 头部左侧标题
    const title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <Icon type='arrow-left' style={{fontSize: 20}}/>
        </LinkButton>
        <span>添加影片</span>
      </span>
    )
		return(
<div style={{marginLeft:100}}>
<Card  bordered={true} style={{width:600}} title={title}>
    <Form className="login-form" {...formItemLayout}>
        <Form.Item>
        <Select
    showSearch
    style={{ width: 360,marginLeft:120 }}
    placeholder="选择分类名称/输入搜索"
    optionFilterProp="children"
    // 获取key的id值
    onChange={this.getCategoryKey}
    autoClearSearchValue='true'
    filterOption={(input, option) =>{
    return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
    }
  >
  {
  	this.options
  }
  </Select>
        </Form.Item>
        <Form.Item label="影片名">
      {     
      	getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input filmname!' }],
          })(<Input placeholder="filmname"/>)
      }
        </Form.Item>
         <Form.Item label="类型">
      {     
      	getFieldDecorator('type', {
           initialValue:'',
          })(<Input placeholder="类型标签"/>)
      }
        </Form.Item>
        <Form.Item label="影片详情">
        </Form.Item>
        <Form.Item>
        <RichTextEditor ref={this.getdetail}/>
        </Form.Item>
        <Form.Item label="影片图片上传">
        </Form.Item>
        <Form.Item>
        <PictureWall ref={this.getImg}/>
        </Form.Item>
        <Form.Item>  
          <Button type="primary" onClick={this.handleSubmit} className="login-form-button" style={{width:'100%',marginLeft:100}}>
            提交
          </Button>
        </Form.Item>
      </Form> 
 </Card>
</div>
			)
	}
}
export default Form.create()(AddFilm)
// <Modal
//           width={626}
          
//           title='影片添加'
//           visible={isShow}
//           // onOk={}
//           onCancel={(event)=>{
//             event.preventDefault();
//             this.setState({isShow:false})
//             // 更新后把分类所在_id设置为空
//             // this._id=null;
//             // 取消后categoryName置空在添加类别时不会再次显示
//           }}
//         >
//         <AddFilm/>
//         </Modal>