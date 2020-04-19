import React from "react"
import UserAdd from './useradd'
import UserPictureWall from './user_picture_wall'
import { Card,Drawer,Button,Table,Pagination,Modal,message,Form, Icon, Input} from 'antd';
import LinkButton from '../../components/link-button';
import {AVATAR_IMG_URL} from '../../utils/constant'
import formateDate from '../../utils/dateUtils'
import {reqUsers,reqRemoveUser,reqUpdateUser} from '../../api'
const { confirm } = Modal;
class User extends React.Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	data:[],visible: false, placement: 'top',user:{},isshow:false
	  };
    this.getImg=React.createRef()
	}
  // 初始化列
	initColumns=()=>{
		this.columns=[
    {
    	title:'头像',
    	dataIndex:'Avatar',
    	key:'Avatar',
    	render:(avatar)=>{
    		// const num=avatar.length-1;
            let imgurl;
            if(avatar.length === 0){
                imgurl = ''
            }else{
                imgurl =AVATAR_IMG_URL + avatar[0].name;
                console.log(imgurl)
            }
    		return (
            <img src={imgurl} style={{width:60,height:60}}/>
    			)
    	}
    },
    {
    title: '用户名',
    dataIndex: 'userName',
    key:'userName'
    },
    {
    	title:'等级',
    	dataIndex:'vip',
    	key:'vip',
    	render:(vip)=>{
    		if(vip){
    			return 'VIP'
    		}else{
    			return '普通用户'
    		}
    	}
    },
    {
    	title:'创建时间',
    	dataIndex:'create_time',
    	key:'create_time',
    	render:(create_time)=>{
    		return formateDate(create_time)
    	}
    },
    {
    	title:'操作',
    	key:'action',
    	// user为当前点击的user信息
    	render:(user)=>{
    		return(
    			<span>
        <LinkButton onClick={()=>this.alterUser(user)}>修改</LinkButton>
        <LinkButton onClick={()=>this.showConfirm(user)}>删除</LinkButton>
                </span>
    			)
    	}

    }
		]
	}
  // 获得用户列表
	getUsers=async ()=>{
        const result=await reqUsers();
        console.log(result)
        if(result.status==0){
        	const data=result.data
        	this.setState({
        		data
        	})
        }
	}
  // 弹出更改用户对话框
	alterUser=(user)=>{
	    console.log(user)
		this.setState({visible:true,user:user})
	}
	onClose=()=>{
		this.setState({
			visible:false
		})
	}
  // 点击删除对话框确定按钮时调用
	showConfirm=(user)=>{
    const _id=user._id
    confirm({
    title: '是否删除此用户信息?',
    onOk:async ()=>{
      const result=await reqRemoveUser(_id);
      if(result.status==0){
      	message.success('删除用户信息成功')
      	this.getUsers()
      }else{
      	message.error('删除用户信息失败')
      }
    }
  });
}
// 更新用户操作
  update=async ()=>{
    const {user}=this.state;
    const _id=user._id;
    const AvatarArr=this.getImg.current.getImg();
    console.log(AvatarArr)
    const Avatar=AvatarArr.length!==0?AvatarArr[AvatarArr.length-1]:'avatar-init.png';
    const {getFieldsValue}=this.props.form;
    const value=getFieldsValue(['userName','password','vip']);
    const {userName,password,vip}=value;
    let vipVal = true;
    const result=await reqUpdateUser(_id,Avatar,userName,password,vipVal);
    console.log(result);
    if(result.status==0){
      message.success('更新成功')
      this.getUsers()
    }else{
        message.error('更新失败')
    }
  }
   handleOk = e => {
    this.setState({
      isshow: false,
    });
  };
	UNSAFE_componentWillMount(){
		this.initColumns()
		this.getUsers()
	}
  componentDidMount(){
    this.getUsers()
  }
    render(){
        const {getFieldDecorator}=this.props.form;
        const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 },
         };
    	const {data,user}=this.state
    	const total=data.length
        return(
            <div>
   <Card title="用户信息管理" extra={<Button type="primary" onClick={()=>{this.setState({isshow:true})}}>添加用户</Button>} style={{ width: '100%' }}>
      <Table columns={this.columns} 
      dataSource={data} 
      bordered
      rowKey='_id'
      pagination={{
    // 总条数
    total:total,
    defaultPageSize: 4
          }} 
      />
    </Card>

    <Drawer
          title="用户信息修改" // 抽屉式更改用户信息
          placement={this.state.placement}
          closable={true}
          onClose={this.onClose}
          visible={this.state.visible}
        >
        <Form className="login-form" {...formItemLayout} >
        <Form.Item>
          {getFieldDecorator('userName', {
          	initialValue:user.userName,
            rules: [{ required: true, message: '用户名不能为空' }],
          })(
            <Input
              prefix={<Icon type="user"  />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
          	initialValue:user.password,
            rules: [{ required: true, message: '密码不能为空' }],
          })(
            <Input
              prefix={<Icon type="lock" />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('vip', {
          	initialValue:user.vip? '是':'否'
          })(
            <Input
              prefix={<Icon type="lock" />}
              type="text"
              placeholder="是否为VIP"
            />,
          )}
        </Form.Item>
        <Form.Item style={{marginLeft:900,marginTop:-100}}>
        <Button type="primary" onClick={this.update}>更新</Button>
        </Form.Item>
      </Form>
      <div style={{width:300,cssFloat:'right',marginTop:-200,marginRight:400}}>
      <label>头像更新</label>
       <UserPictureWall ref={this.getImg} avatarimg={user.Avatar}/>
       </div>
        </Drawer>
         <Modal
          title="用户信息添加"
          visible={this.state.isshow}
          onOk={this.handleOk}
          onCancel={()=>this.setState({isshow:false})}
        >
        <UserAdd/>
        </Modal>
            </div>
        )
    }
}
export default Form.create()(User)