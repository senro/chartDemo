define('components/util/utilRouter', function(require, exports, module) {

  var $=require('node_modules/egis-jquery/jquery');
  var ajax = require('node_modules/egis-ajax/ajax').ajax;
  //var currUrl=window.location.href,
  //    cookie = require('cookie'),
  //    utilUser=require('components/util/utilUser'),
  //    authoritiesNavInfo=utilUser.getAuthoritiesNavInfo();
  //
  //var $loginInfo = cookie('get', 'userObj');
  //if (!$loginInfo) {
  //    window.location.href = 'login.html';
  //    return true;
  //}
  //
  //if(currUrl==window.baseUrl+'/'||currUrl==window.baseUrl+'/index.html'){
  //
  //    for(var navName in authoritiesNavInfo) {
  //        if (authoritiesNavInfo[navName].show) {
  //            if(authoritiesNavInfo[navName].include){
  //                for(var subNavName in authoritiesNavInfo[navName].include){
  //                    if(authoritiesNavInfo[navName].include[subNavName].show){
  //                        window.location.href=window.baseUrl+'/index.html#/'+navName+'/'+subNavName;
  //                        return;
  //                    }
  //                }
  //            }else{
  //                window.location.href = window.baseUrl + '/index.html#/' + navName + '/' + navName;
  //                return;
  //            }
  //        }
  //    }
  //
  //}
  
  //判断是否登录
  ajax(window.apiHost+'web/checkLogin.do',null,function(data){
      //已登陆,根据路由进行跳转
      if(!window.location.hash){
          window.location.hash ='#/businessManage/dataManage';
      }
  
  },null,null,'get');

});
