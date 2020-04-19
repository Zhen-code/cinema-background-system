import React from "react";
import {Form,Input,Icon,Button,message} from "antd"
import "./login.less";
import {reqLogin} from "../../api";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";

const Item=Form.Item;
class Login extends React.Component{
	login=(event)=>{
    event.preventDefault();
    const {form}=this.props;
    form.validateFields(async (err,values)=>{
    	if(!err){
    		const {username,password}=values;
    		const result=await reqLogin(username,password);
    		// console.log(result);
			if(result.status===0){
				message.success('登录成功!');
                const user=result.data;
				memoryUtils.user=user;
                storageUtils.saveUser(user);
				this.props.history.replace('/'); 
			}
    	}else{
    		console.log('err');
    	}
    })

	}
	// 自定义密码校验
	validateToNextPassword=(rule,value,callback)=>{
		const {form}=this.props;
		const pwdReg=/^[a-zA-Z0-9_]+$/;
        if(value.length<4){
        	callback('密码大于等于4位')
        }else if(value.length>12){
        	callback('必须小于等于 12 位')
        }else if(!pwdReg.test(value)){
        	callback("密码必须是英文、数组或下划线组成");
        }else{
        	callback();
        }
	}
	render(){
		const {getFieldDecorator}=this.props.form;
		return(
        <div className="login">
        <header className="login-header">
        	<h1 style={{color:'#fff'}}>电影后台管理系统</h1>
        </header>
        <section className="section-content">
        	<h3>管理员登录</h3>
        	<Form onSubmit={this.login}>
        		<Item>
        		{getFieldDecorator('username',{
        		 initialValue:'',
                 rules: [
              {
                required: true,
                message: 'Please input your name',
              }
            ],
        		})(<Input prefix={<Icon type="user"/>} placeholder="请输入用户名" />)	
        	    }
        		</Item>
        		<Item>
        		{
        			getFieldDecorator('password',{
        			initialValue:'',
                    rules: [
              {
                required: true,
                message: 'Please input your name',
              },
               {
                validator: this.validateToNextPassword,
              }
              ]
        			})(<Input prefix={<Icon type="lock"/>} placeholder="请输入密码" type="password"/>)
        			
        		}
        		</Item>
        		<Item>
        		<Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
        		</Item>
        	</Form>
        </section>
        </div>
			)
	}
}
export default Form.create()(Login)