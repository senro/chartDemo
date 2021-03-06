var Router=require('egis-director').Router;
var routerCallbacks=require('./routerCallbacks');

//定义路由
var route = {

    /*系统管理*/
    //用户管理
    "/systemManage/userManage":routerCallbacks.userManage,
    /*业务管理*/
    //数据管理
    "/businessManage/dataManage":routerCallbacks.dataManage,

    "/businessManage/uploadManage":routerCallbacks.uploadManage,

    "/cacheIndex":routerCallbacks.cacheIndex

};

//初始化路由
var router =Router(route).configure({
    notfound:function(){
        window.location.href='/';
    }
});
function init(){
    router.init();
}
module.exports=init;