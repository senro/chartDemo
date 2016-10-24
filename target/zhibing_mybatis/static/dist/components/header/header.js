define('components/header/header', function(require, exports, module) {

  /**
   * header 标签中的内容
   */
  var $ = require('node_modules/egis-jquery/jquery');
  require('node_modules/egis-bootstrap/bootstrap')();
  var loadCss=require('node_modules/egis-load-css/load-css');
  var doGenTsc=require('node_modules/egis-tsc/tsc').doGenTsc;
  var ajax=require('node_modules/egis-ajax/ajax').ajax;
  //var utilUser = require('components/util/utilUser');
  var $header = $('header');
  var cookie=require('node_modules/egis-cookie/cookie');
  var userObj= JSON.parse(cookie('get','userObj'));
  
  function render(){
      $header.html("<a href=\"javascript:;\" class=\"header-item header-item-userName\">\r\n\r\n</a>\r\n<!--<a href=\"#\" class=\"header-item header-item-bind none\">绑定时空令</a>-->\r\n<!--<a class=\"header-item header-item-modifyPass none\" href=\"#\">修改密码</a>-->\r\n<a class=\"header-item header-item-loginOut btn-loginOut\" href=\"javascript:;\">安全退出</a>\r\n");
  
      //显示用户名
      $('.header-item-userName').html(userObj.name);
  
      $('.btn-loginOut').click(function(){
          ajax(window.apiHost+'web/loginOut.do',null,function (data) {
              window.location.href=window.baseUrl+"/login.html";
          });
          return false;
      });
  }
  
  //var $logout = $('#accountInfoBox').find('.logout');
  //utilUser.logout($logout);
  module.exports={
      render:render
  };

});
