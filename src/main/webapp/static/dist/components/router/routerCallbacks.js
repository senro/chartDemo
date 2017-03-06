define('components/router/routerCallbacks', function(require, exports, module) {

  var $=require('node_modules/egis-jquery/jquery');
  var routerCallbacks={};
  
  /*首页*/
  routerCallbacks.main=function(){
      require('components/main/main').render();
  };
  /*系统管理*/
  routerCallbacks.userManage=function(){
      require('components/systemManage/userManage/userManage.jsx').render();
  };
  routerCallbacks.addUser=function(){
      require('components/systemManage/userManage/addUser').render();
  };
  routerCallbacks.roleManage=function(){
      require('components/systemManage/roleManage/roleManage').render();
  };
  routerCallbacks.privilegeManage=function(){
      require('components/systemManage/privilegeManage/privilegeManage').render();
  };
  /*业务管理*/
  routerCallbacks.dataManage=function(){
      require('components/businessManage/dataManage/dataManage').render();
  };
  
  routerCallbacks.uploadManage=function(){
      require('components/businessManage/uploadManage/uploadManage').render();
  };
  
  routerCallbacks.cacheIndex=function(){
      require('components/cacheIndex/cacheIndex.jsx').render();
  };
  
  module.exports=routerCallbacks;

});
