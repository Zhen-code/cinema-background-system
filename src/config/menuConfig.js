const menuList=[
{
	title:'首页',
	icon:'home',
	key:'/home'
},
{
	title:'电影分类',
	icon:'compass',
	key:'/category',
	children:[
    {
    	title:'分类管理',
    	icon:'compass',
    	key:'/categorys'
    }
	]
},
{
	title:'影片汇总',
	icon:'video-camera',
    key:'/films',
	children:[
    {
    	title:'影片管理',
    	icon:'video-camera',
    	key:'/filmhomepage'
    }
	]
},
{
	title:'即将上映',
	icon:'video-camera',
    key:'/coming-soon'
},
{
	title:'用户',
	icon:'user',
	key:'/users',
	children:[
    {
    	title:'用户管理',
    	icon:'key',
    	key:'/user'
    }
	]
},
{
    title:'影院座位管理',
    icon:'tablet',
    key:'/theatre-seat'
},
{
	title:'站点位置',
	icon:'environment',
	key:'/sitelocation',
	children:[
    {
    	title:'当前位置',
    	icon:'chrome',
    	key:'/map'
    },
    {
    	title:'周边影院搜索',
    	icon:'chrome',
    	key:'/address-input'
    }
	]
}
];
export default menuList