import React from "react"
import { Card,Button,Table,Modal,message } from 'antd';
import LinkButton from "../../components/link-button";
import {reqFilmsList,reqDelFilm} from "../../api";
import formateDate from "../../utils/dateUtils";
import {PageSize} from "../../utils/constant";
const { confirm } = Modal;
// import AddFilm from "./add-film";
class Film extends React.Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	data:[],loading:false,isShow:false,total:0

	  }
	}
    initColumns=()=>{
    	 this.columns = [
      {
        title: '影片名称',
        dataIndex: 'name',
        key:'name',
        width:'15%'
      },
      {
        title:'类型',
        dataIndex:'type',
        key:'type',
        width:'15%'
      },
      {
        title:'创建时间',
        dataIndex:'createtime',
        key:'createtime',
        width:'15%',
        render:(createtime)=>{

        return	formateDate(createtime)
        }
        
      },
       {
        title:'详情',
        dataIndex:'detail',
        key:'detail',
        width:'15%',
        render:(detail)=>{
        	return <div dangerouslySetInnerHTML = {{ __html: detail }} />
        }
      },
      {
        title: '操作',
        key: 'action',
        width:'40%',
        // render参数为当前所在列的行数据
        render: (filmValue) => (
      <span>
        <LinkButton onClick={()=>{this.props.history.push({pathname:'/filmhomepage/update-film',state : filmValue})}}>修改</LinkButton>
        <LinkButton onClick={()=>{this.showDeleteConfirm(filmValue)}}>删除</LinkButton>
      </span>
    )
      }
      
      ]
    }
  showDeleteConfirm=(filmValue)=>{
  
  confirm({
    title: '确定是否删除当前项?',
    content:`影片:${filmValue.name}` ,
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk:async ()=>{
      const _id=filmValue._id;
      const result=await reqDelFilm(_id);
      if(result.status===0){
      	message.success('删除成功');
      	this.getFilms(12)
      }else{
      	message.error(result.msg);
      }
    }
  });
}
    getFilms=async (PageNum)=>{
    this.PageNum=parseInt(PageNum);
    // console.log(this.PageNum);
    const result=await reqFilmsList(PageNum,PageSize);
    if(result.status===0){
    	// 获取分页列表下的数据
    	const data=result.data.List;
    	const total=result.data.total;
    	this.setState({data,total});
    }else{
    	message.error('获取影片列表失败');
    }
    }
    pageChange=(page,pageSize)=>{
    	this.getFilms(page);
    }
	componentWillMount(){
		this.initColumns();
		// 传string需转为int
		this.getFilms('2');
	}
    render(){
    	this.title=(<Button type="primary" onClick={()=>{this.props.history.push('/filmhomepage/add-film')}}>添加影片</Button>);
    	const {data,loading,total}=this.state;
        return(
    <div>
    <Card title={this.title}>
    <Table 
    columns={this.columns} 
    dataSource={data} 
    bordered
    rowKey='_id'
    loading={loading}
    onRow={this.onRow}
    pagination={{
    onChange:(page,pageSize)=>this.pageChange(page,pageSize),
    // 总条数
    total:total,
    current: this.PageNum,
    defaultPageSize: PageSize,
	showQuickJumper:true,
          }}
    />
    </Card>
    </div>
 
        )
    }
}
export default Film