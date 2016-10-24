var $=require('egis-jquery');
var ajax = require('egis-ajax').ajax;
var jsonstringify=require('egis-util').JSON_stringify;
var utilUser=require('components/util/utilUser');
var cookie = require('egis-cookie');
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
    cookie('set','userObj',jsonstringify(data.data));
    utilUser.start();
    //已登陆,根据路由进行跳转
    if(!window.location.hash){
        window.location.hash =utilUser.getDefaultIndex();
    }

},null,null,'get');