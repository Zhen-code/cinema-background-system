import React from "react";
import {Layout} from "antd";
import {Redirect, Route, Switch} from 'react-router-dom';
import Home from "../home/home"
import Header from "../../components/header"
import LeftNav from "../../components/leftNav"
import Category from "../categorys/categorys";
import FilmHomepage from "../film/filmhomepage";
import ComingSoon from "../movie/coming-soon";
import User from "../users/user";
import TheatreSeat from "../theatreSeat/theatre-seat"
import MapSite from "../map/map";
import EditAddress from "../map/address-input";
import "./admin.less";
import NotFound from "../not-found/not-found"
const { Footer, Sider, Content } = Layout;
class Admin extends React.Component{
    render(){
        return(
            <div>
                <Layout className="layout">
                    <Header/>
                    <Layout className="layout">
                        <Sider><LeftNav/></Sider>
                        <Content className="content"> 
                        <Switch>
                        <Redirect from='/' exact to='/home'/>
                        <Route path='/home' component={Home}></Route>
                        <Route path='/categorys' component={Category}></Route>
                        <Route path='/filmhomepage' component={FilmHomepage}></Route>
                        <Route path='/coming-soon' component={ ComingSoon}></Route>
                        <Route path='/user' component={User}></Route>
                        <Route path='/theatre-seat' component={TheatreSeat}></Route>
                        <Route path='/map' component={MapSite}></Route>
                        <Route path='/address-input' component={ EditAddress}></Route>
                        <Route component={NotFound}></Route>
                        </Switch>
                        </Content> 
                    </Layout>
                    <Footer className="footer">推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
                </Layout>
            </div>
        )
    }
}
export default Admin
