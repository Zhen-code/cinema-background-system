import React from "react"
import { Card,Button,Table,Modal,message } from 'antd';
import LinkButton from "../../components/link-button";
import {reqCategorys,reqAddCategory,reqRemoveCategory,reqUpdateCategory} from "../../api";
import AddCategory from "./addcategory";
const { confirm } = Modal;
class Category extends React.Component{
	constructor(props) {
	  super(props);
	  this.state = {
	  	data:[],
	  	loading:true,
	  	visible:false
	  	
	  };
	}
	initColumn=()=>{
		this.columns = [
      {
        title: '类别名称',
        dataIndex: 'name',
        key:'name',
        width:'40%',

      },
      {
        title: '操作',
        key: 'action',
        width:'60%',
        // render参数为当前所在列的行数据
        render: (value) => (
      <span>
        <LinkButton onClick={()=>{this.setCategory(value)}}>修改</LinkButton>
        <LinkButton onClick={()=>{this.showDeleteConfirm(value)}}>删除</LinkButton>
      </span>
    )
      }
    ];
	}
	// 获取分类
	getCategorys=async ()=>{
		const result=await reqCategorys();
		if(result.status===0){
			const data=result.data;
			this.setState({
				data,loading:false
			})
		}
			this.categoryName='';
	}
	//更新分类并获取行对应的数据
setCategory=(value)=>{
	this.setState({visible:true});
	//获取对应category的name// console.log(value);
    this.categoryName=value.name||'';
}
	// 删除确认框
  showDeleteConfirm=(value)=>{
  confirm({
    title: '确定删除?',
    okText: '确定',
    okType: 'danger',
    cancelText: '取消',
    onOk:async ()=>{
    const _id=value._id;
    const result=await reqRemoveCategory(_id);
    if(result.status===0){
    	message.success('删除成功');
    	this.getCategorys();
    }else{
    	message.error('删除失败');
    }
    }
  });
}

	// 获取所有行数据
    onRow=(category)=>{
    	// console.log(category);
    	return {
    		// 点击所在行时返回行数据可以获取对应值的数据
    		 onClick: event => {
// console.log(category);
    		 	// 获取row对应category的_id,根据_id是否存在设置标题为添加或更新
    		 	this._id=category._id;
    		 	
    		 }
    	}
    }
    // 添加类别确认框
    handleOk=async ()=>{
    	const {getFieldValue}=this.form;
    	const categoryName=getFieldValue('categoryName');
        this.form.resetFields();
    	if(this._id){
    		const _id=this._id;
    		const result=await reqUpdateCategory(_id,categoryName);
    		if(result.status===0){
    			message.success('更新当前类别成功');

    			this.getCategorys();
    		}else{
    			message.error('更新失败');
    		}
    	}else{
    		const result=await reqAddCategory(categoryName);
    	if(result.status===0){
    		message.success('添加类别成功!');
    		this.getCategorys();
    	}else{
    		message.error(`${result.msg}`)
    	}
    	}
    	this._id=null;
    	this.categoryName='';
    	// 设置form给table用
    	this.setState({visible:false})
    	
    }
    componentWillMount(){
		
	}
	componentDidMount(){
		 this.initColumn();
		this.getCategorys();
		
	}
	componentDidUpdate(){

	}
    render(){
    	this.title=(<Button type="primary" onClick={()=>{this.setState({visible:true})}}>添加类别</Button>)
    	const data=this.state.data;
    	const {loading,visible}=this.state;
    	const title=this._id?'影片类别更新':'影片类别添加';
        return(
            <div>
    <Card title={this.title}>
       <Table
          rowKey='_id'
          bordered
          dataSource={data}
          columns={this.columns}
          loading={loading}
          onRow={this.onRow}
          pagination={{
           defaultCurrent:1,
           defaultPageSize:5,
           showQuickJumper:true,
           total:data.length
          }}
        />
        <Modal
          title={title}
          visible={visible}
          onOk={this.handleOk}
          onCancel={(event)=>{
            event.preventDefault();
            // 更新后把分类所在_id设置为空
            this._id=null;
            // 取消后categoryName置空在添加类别时不会再次显示
            this.categoryName='';
            this.form.resetFields();
          	this.setState({visible:false})}}
          
        >
        <AddCategory setForm={(form)=>{this.form=form}} categoryName={this.categoryName}/>
        </Modal>
    </Card>
    </div>
        )
    }
}
export default Category