import React from "react";
import {Link,withRouter} from "react-router-dom";
import { Menu, Icon, Button } from 'antd';
import menuList from "../../config/menuConfig";
const { SubMenu } = Menu;
class LeftNav extends React.Component{
  getMenus=(menuList)=>{
     let path = this.props.location.pathname;
   return this.menus=(menuList).map((menu) => {
      if(!menu.children){
         return (<Menu.Item key={menu.key}>
            <Link to={menu.key}>
            <Icon type={menu.icon} />
            <span>{menu.title}</span>
            </Link>
            </Menu.Item>)
      }else{
        const cMenu=menu.children.find(cMenu=>path.indexOf(cMenu.key)===0);
        if(cMenu){
         this.openkey=menu.key;
          
        }
        return (
          <SubMenu
            key={menu.key}
            title={
              <span>
              <Icon type={menu.icon}/>
              <span>{menu.title}</span>
            </span>
            }
          >
            {this.getMenus(menu.children)}
          </SubMenu>
        )
      }

    }
     
    )
  }
  UNSAFE_componentWillMount(){
    // 动态获得菜单项
    this.getMenus(menuList);
  }
    render(){
       // 获取当前路径路由
    let path = this.props.location.pathname
    if(path.indexOf('/filmhomepage')===0) { // 当前请求的是电影或其子路由界面
      path = '/filmhomepage';
    }
      // 取得要打开的菜单
      const openkey=this.openkey;
     
        return(
            <div className="left-nav">
            <Menu
          defaultSelectedKeys={[path]}
          defaultOpenKeys={[openkey]}
          mode="inline"
          theme="dark"  
        >
        {this.menus}
        </Menu>
            </div>
        )
    }
}
export default withRouter(LeftNav)