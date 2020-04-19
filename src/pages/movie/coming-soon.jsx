import React  from "react";
import { Pagination, Result,Button} from 'antd';
import "./coming-soon.less";
import {reqMovie} from "../../api";
import arrcovertStr from "../../utils/arrconvertstr";
import handleTitleLen from "../../utils/handletitlelen";

class ComingSoon extends React.Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	total:0,start:0,end:4,
      display:'block',is404:'none'
	  };
	}
	getMovie=async ()=>{
      const result=await reqMovie();
      var listArr=result.subjects;
      if(listArr.length==0){
         this.setState({
        display:'none',
        is404:'block'   
      })
      }
      // console.log(listArr);
      let movieArr=listArr.map((movie,index) => {
      	return(<div className="col-xs-3 col-md-3" key={index}>
        <a href="#" className="thumbnail">
        <img src={movie.images.small} alt="movie.title"/>
        </a>
          <div className="caption">
          <h3>{handleTitleLen(movie.title)}</h3>
           <p className="genres">类型:{arrcovertStr(movie.genres)}</p>
          </div>
          </div>)
      })
      const {start,end}=this.state;
      this.movieList=movieArr.slice(start, end);
      var total=listArr.length;
      this.setState({
      	total:total
      })
	}
	change=(page, pageSize)=>{
		const start=(page-1)*pageSize;
		const end=page*pageSize;
		this.setState({
			start,end
		})
		this.getMovie();
	}
  refresh=()=>{
    this.getMovie()
  }
	componentWillMount(){
		this.getMovie();
	}
	componentDidMount(){

	}
	shouldComponentUpdate(){
    return true;
  }
	render(){
		const {total,display,is404}=this.state;
		return(
        <div>
        <div className="movies-container" style={{display:display}}>
        <div className="row">
        {
         this.movieList
        }
        </div>
        <Pagination 
        defaultCurrent={1} 
        total={total} 
        pageSize={4} 
        onChange={(page, pageSize)=>{this.change(page, pageSize)}}
        style={{marginTop:20}}/>
        </div>
        <div style={{display:is404}}>
        <Result
    status="404"
    title="404"
    subTitle="访问的页面Not-found,请检查url地址是否正确"
    extra={<Button type="primary" onClick={this.refresh}>刷新</Button>}
  />
  </div>
  </div>
			)
	}
}
export default ComingSoon