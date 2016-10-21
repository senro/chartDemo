define('components/systemManage/privilegeManage/privilegeManage', function(require, exports, module) {

  
  var $ = require('node_modules/egis-jquery/jquery');
  var $aside = $('aside');
  //var utilUser = require('components/util/utilUser');
  
  function render(){
      $aside.html("日志管理内容");
      $(document).ready(function(){
  
  
      });
  }
  
  module.exports={
      render:render
  };

});
