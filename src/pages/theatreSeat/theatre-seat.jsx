import React from "react"
import { Button,Cascader, message} from 'antd';
import "./theatre-seat.less";
import vacancy from "../../assets/images/booked.png";
import booked from "../../assets/images/vacancy.png";
import {reqSeates,reqUpdateSeate} from "../../api";
class TheatreSeat extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      rows:[],
      options:[],
      statu:[]//设置二级联表行中选中的座位标识，返回所在行与座位
    }
  }
  
  // 获取座位列表
  getSeates=async ()=>{
    const result=await reqSeates();
    if(result.status===0){
      const rowArr=result.data;
        var rows=rowArr.map((row,index) => {
        // console.log(row.seates);
        return (
        <li className="list-group-item" key={index}>
        <span>第{index+1}排</span>
        {
          row.seates.map((seat,index) => {
            return (
            <img src={seat.status==="0"?booked:vacancy} alt="0" key={index}/>
              )
          })
        }
        </li>
          )
      })
        this.setState({
          rows
        })
    }
    // console.log(result);
  }
  // 获取二级联表的数据
  getManageSeat=async ()=>{
  const result=await reqSeates();
  if(result.status===0){
    const allSeat=result.data;
    var options=allSeat.map((item,index) => {
      // 获取行seates个数
      if(item.seates){
         var children=item.seates.map((child,index) => {
          return ({
           value: child.num,
           label: child.num,
           isLeaf:true
          })
        })
      }
      return ({
         value: item.row,
         label: item.row,
         isLeaf:false,
         children:children
      })
    })
  }
  this.setState({
    options
  })
  }
  
  // 级联改变时获取选项与值
  onChange=(value)=>{
   this.setState({
    statu:value
   })
  }
  reserve=async (status)=>{
    const {statu}=this.state
    const row=statu[0]
    const num=statu[1]
    const result=await reqUpdateSeate(row,num,status)
    if(result.status===0){
      message.success('座位已预定')
      this.getSeates()
    }
  }
  empty=async (status)=>{
    const {statu}=this.state
    const row=statu[0];
    const num=statu[1];
    const result=await reqUpdateSeate(row,num,status)
    if(result.status===0){
      message.success('座位已置空')
      this.getSeates()
    }
  }
  UNSAFE_componentWillMount(){
   this.getSeates()
   this.getManageSeat()
  }
  componentDidMount(){
    
  }
    render(){
     const {rows,options}=this.state;
        return(
        <div>
        <p className="bg-success">影院座位号管理显示列表</p>	
        <ul className="list-group">
        {
          rows
        }
        </ul>
        <div className="hint-seats">
          <span className="label label-default">未预定</span>
          <span className="label label-danger">已预定</span>
        </div>
        <div className="manage-seate">
          <h3>座位管理</h3>
          <Cascader
    defaultValue={[1,'1']}//数据库row为number类型，seates.num为string
    options={options}
    onChange={(value, selectedOptions) =>{this.onChange(value, selectedOptions)}}/>
          <Button type="primary" className="btn" style={{marginRight:6}} onClick={()=>{this.reserve('1')}}>选中</Button>
          <Button type="primary" className="btn" onClick={()=>{this.empty('0')}}>置空</Button>
        </div>
        </div>
        )
    }
}
export default  TheatreSeat