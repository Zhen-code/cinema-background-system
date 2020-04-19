
#Available Scripts

In the project directory, you can run:

* `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

* `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

* `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

* `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

#  安装配置包文件模块
**打开本地npm命令控制台，执行npm install **

#  运行项目
`npm start`

##  默认打开:localhost:3000
**Note：如果项目打不开,请检查部分依赖包是否已经正确安装,各依赖间版本是否对等匹配**

###  react-router-dom路由
### Redirect, Route, Switch,Link,withRouter

# 不采用nginx在前台项目的packagejson中需设置代理："proxy": "http://localhost:3002"

#开发环境的项目打包后不能使用代理 解决方法：1.开启nginx服务器集群：设置如下：

1. 打开nginx.conf配置文件 

所有请求(不与下面匹配的请求(表示任意路由路径))都转发给前台应用
        location / {
	    proxy_pass  http://localhost:3000;
	}    
所有以/api开头的请求都转发给后台服务器应用
	location ~ /api/ {
	    proxy_pass  http://localhost:3002;
	}
当访问nginx服务器时会根据路径跳转到前台或后台

2. 解决方法2：打包好的项目文件直接放在后台public目录下面作为静态文件使用，访问的端口号为后台端口，前后台一致