import  React from "react";
import {Form,Input,Button} from "antd";
import PropTypes from "prop-types";
const {Item}=Form;
class AddCategory extends React.Component{
    static propTypes={
    	setForm: PropTypes.func.isRequired
    }
    componentWillMount(){
    	this.props.setForm(this.props.form)
    }
	render(){
		const { getFieldDecorator } = this.props.form;
		const categoryName=this.props.categoryName;
		console.log(categoryName);
		 const formItemLayout = {
      labelCol: {
        span:6
      },
      wrapperCol: {
        span:16
      }
    };
		return(
        <div>
        <Form {...formItemLayout}>
        <Item label="影片类别名">
        {
        	getFieldDecorator('categoryName',{
            initialValue:categoryName,
            rules:[
            {
            	required: true, message: 'Please input your categoryname!'
            }
            ]
        	})(<Input placeholder="请输入类别名称"/>)
        }
        	
        </Item>
        </Form>
        </div>
     
			)
	}

}

export default Form.create()(AddCategory)