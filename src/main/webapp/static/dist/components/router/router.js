define('components/router/router', function(require, exports, module) {

  var Router=require('node_modules/egis-director/director').Router;
  var routerCallbacks=require('components/router/routerCallbacks');
  
  //定义路由
  var route = {
      /*首页*/
      "/main":routerCallbacks.main,
      /*系统管理*/
      //用户管理
      "/systemManage/userManage":routerCallbacks.userManage,
  
      "/systemManage/userManage/addUser":routerCallbacks.addUser,
      //角色管理
      "/systemManage/roleManage":routerCallbacks.roleManage,
      //日志管理
      "/systemManage/privilegeManage":routerCallbacks.privilegeManage,
      /*业务管理*/
      //数据管理
      "/businessManage/dataManage":routerCallbacks.dataManage,
  
      "/businessManage/uploadManage":routerCallbacks.uploadManage
  
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

});
