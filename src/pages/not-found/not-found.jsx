import React from "react"

import { Result, Button } from 'antd';
class NotFound extends React.Component{
	render(){
		return(
        <div>
         <Result
    status="404"
    title="404"
    subTitle="当前页面不存在！"
    extra={<Button type="primary" onClick={()=>this.props.history.replace('/home')}>回到主页</Button>}
  />,
        </div>
     
			)
	}
}

export default NotFound