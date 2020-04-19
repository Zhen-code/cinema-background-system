import React from "react"
import {Form,Button,Icon,Input,Radio,message} from "antd"
import UserPictureWall from "./user_picture_wall"
import {reqAddUser} from "../../api"
class UserAdd extends React.Component{
 constructor(props) {
  super(props);

  this.state = {
  	vip:'false',avatar:''
  };
  this.avatar=React.createRef()
}
// 改变radio时的回调
 onChange = e => {
    this.setState({
      vip: e.target.value
    });
  };
  handleSubmit=(e)=>{
  e.preventDefault();
  let imgArr = this.avatar.current.getImg();
  // 获取头像名,是否为会员
  const {vip}=this.state;
  const {validateFields}=this.props.form;
   validateFields(async (err, values) => {
      // values为接收验证的值：用户名/密码
      if(!err){
      let userName=values.userName;
      let password=values.password;
      let avatar = imgArr[imgArr.length-1];
      console.log(avatar)
      const result=await reqAddUser(userName,password,avatar,vip);
      if(result.status==0){
      	message.success('添加用户成功')
      }else{
      	message.error(result.msg)
      }
      }
     
    });
 
  }
  UNSAFE_componentWillMount(){
  	
  }
  componentDidMount(){
  	const arr=this.avatar.current.getImg()?this.avatar.current.getImg():[]

  	if(arr.length!=0){
  		 const img=arr[arr.length-1]
    const avatar=img.name
    // console.log(avatar)
    this.setState({
    	avatar
    })
  	}
   
  	
  }
  UNSAFE_componentWillUpdate(){
   
  }
render(){
	const {getFieldDecorator}=this.props.form
 const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
   return(
   <div>
   	<Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="名称">
          {getFieldDecorator('userName', {
              rules:[{
                required: true,
                message: 'Please input Name',
              }
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              }
            ],
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="是否为会员">
        <Radio.Group onChange={this.onChange} value={this.state.vip}>
        <Radio value={'false'}>
          普通用户
        </Radio>
        <br />
        <Radio value={'true'}>
          VIP会员
        </Radio>
        </Radio.Group>
        </Form.Item>
        <Form.Item label="用户头像">
        <UserPictureWall avatarimg={[]} ref={this.avatar} />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
   </div>
		)
}

}

export default Form.create()(UserAdd)