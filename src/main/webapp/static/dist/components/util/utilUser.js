define('components/util/utilUser', function(require, exports, module) {

  var $ = require('node_modules/egis-jquery/jquery'),
      xhr = require('node_modules/egis-xhr/xhr'),
      jsonGet = xhr.json,
      jsonPost = xhr.jsonpost,
      apiHost = window.apiHost,
      cookie = require('node_modules/egis-cookie/cookie'),
      jsonstringfy = require('node_modules/egis-util/util').JSON_stringify,
      systemMessage = require('node_modules/egis-system-message/system-message');
  
  
  var User = {
      defaultIndex:"",
      loginCookieName: 'userObj',
      loginInfo: {},
      getDefaultIndex:function () {
          if(this.loginInfo.roleId==1){
              //超级管理员
              this.defaultIndex="#/systemManage/userManage";
          }else if(this.loginInfo.roleId==2){
              //审核员
              this.defaultIndex="#/businessManage/dataManage";
          }else if(this.loginInfo.roleId==3){
              //普通用户
              this.defaultIndex="#/businessManage/uploadManage";
          }
          return this.defaultIndex;
      },
      //
      start: function () {
         var $loginInfo = cookie('get', this.loginCookieName);
         if ($loginInfo) {
             this.loginInfo = $.parseJSON($loginInfo);
         }
      },
      //
      //login: function () {
      //    window.location.href = 'login.html';
      //},
      //
      //logout: function ($button) {
      //    var $user = this;
      //
      //    $button.on('click', function () {
      //        var $that = $(this);
      //
      //        $.ajax($.extend({
      //            url: apiHost + 'logout.do',
      //            beforeSend: function () {
      //            }
      //        }, jsonPost)).
      //            done(function (data) {
      //                if (data.status == 1) {
      //                    cookie('del', this.loginCookieName);
      //                    $user.login();
      //                } else {
      //                    systemMessage.alert(data.detail || '退出失败，请重试！');
      //                }
      //            }).fail(function () {
      //                systemMessage.error('退出失败，请重试！')
      //            }).
      //            always(function () {
      //            });
      //    });
      //},
      authoritiesDictionary:function(name){
          switch (name){
              case  '首页':
                  return 'main';
                  break;
              case  '系统管理':
                  return 'systemManage';
                  break;
              case  '用户管理':
                  return 'userManage';
                  break;
              case  '角色管理':
                  return 'roleManage';
                  break;
              case  '权限管理':
                  return 'privilegeManage';
                  break;
              case  '业务管理':
                  return 'businessManage';
                  break;
              case  '数据管理':
                  return 'dataManage';
                  break;
          }
      },
      getAuthoritiesNavInfo:function(name){
          var obj=[
              {
                  text:'首页',
                  href:'#/main',
                  show:false,
                  iconClass:'nav-icon-index'
              },
              {
                  text:'系统管理',
                  href:'#/systemManage/userManage',
                  show:true,
                  iconClass:'nav-icon-systemManage',
                  include:[
                      {
                          text:'用户管理',
                          show:true,
                          href:'#/systemManage/userManage'
                      },
                      {
                          text:'权限管理',
                          show:false,
                          href:'#/systemManage/privilegeManage'
                      },
                      {
                          text:'角色管理',
                          show:false,
                          href:'#/systemManage/roleManage'
                      }
                  ]
              },
              {
                  text:'业务管理',
                  href:'#/businessManage/dataManage',
                  show:true,
                  iconClass:'nav-icon-businessManage',
                  include:[
                      {
                          text:'上传管理',
                          show:true,
                          href:'#/businessManage/uploadManage'
                      },
                      {
                          text:'数据管理',
                          show:true,
                          href:'#/businessManage/dataManage'
                      }
                  ]
              },
              {
                  text:'缓存指数',
                  href:'#/cacheIndex',
                  show:false,
                  iconClass:'nav-icon-devCenter'
              }
          ];
  
          if(cookie('get','userObj')){
              var userObj=JSON.parse(cookie('get','userObj'));
              if(userObj.roleId==1){
                  //超级管理员
  
                  if(userObj.email && userObj.email=="584233821@qq.com"){
                      obj[3].show=true;
                  }
  
              }else if(userObj.roleId==2){
                  //审核员
                  obj[1].show=false;//隐藏系统管理
                  obj[2].include[0].show=false;//隐藏上传管理
  
              }else if(userObj.roleId==3){
                  //普通用户
                  obj[1].show=false;//隐藏系统管理
                  obj[2].include[1].show=false;//隐藏数据管理
                  obj[2].href="#/businessManage/uploadManage";
  
              }
          }
  
  
          //var User=this;
          //var authorities=User.getAuthorities();
          //
          ////通过权限配置菜单显示表
          //if(authorities&&authorities.length>0){
          //    for(var i=0;i<authorities.length;i++){
          //        var authoritedNavName=User.authoritiesDictionary(authorities[i].authority);
          //        for(var navName in obj){
          //            if(authoritedNavName==navName){
          //                obj[authoritedNavName].show=true;
          //            }else if(obj[navName].include){
          //                for( subNavName in obj[navName].include){
          //                    if(subNavName==authoritedNavName){
          //                        obj[navName].include[authoritedNavName].show=true;
          //                    }
          //                }
          //            }
          //        }
          //    }
          //}else{
          //    //alert('权限设置有问题：'+jsonstringfy(authorities));
          //    window.location.href='login.html';
          //}
          //
          ////通过权限配置菜单跳转链接
          //
          //for(var navName in obj){
          //    if(obj[navName].include){
          //        var subMenu=[];
          //        for( subNavName in obj[navName].include){
          //            if(obj[navName].include[subNavName].show&&obj[navName].href==''){
          //                //默认设置跳转到子菜单的第一个
          //                obj[navName].href=obj[navName].include[subNavName].href;
          //            }
          //            subMenu.push(obj[navName].include[subNavName].href);
          //        }
          //        obj[navName]['subMenu']=subMenu.join(',');
          //    }
          //}
  
          return obj;
      }
      //setName: function ($name) {
      //    this.loginInfo.name = $name;
      //    cookie('del', this.loginCookieName);
      //    //console.log(this.loginInfo);
      //    this.saveUserInfo(jsonstringfy(this.loginInfo));
      //},
      //
      //setMobile: function ($mobile) {
      //    this.loginInfo.mobile = $mobile;
      //    this.saveUserInfo(jsonstringfy(this.loginInfo));
      //}
  
  
  };
  
  //User.start();
  
  return User;

});
