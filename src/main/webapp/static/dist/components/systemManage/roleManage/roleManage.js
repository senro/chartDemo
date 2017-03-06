define('components/systemManage/roleManage/roleManage', function(require, exports, module) {

  /**
   * header 标签中的内容
   */
  var $ = require('node_modules/egis-jquery/jquery');
  var $aside = $('aside');
  //var utilUser = require('components/util/utilUser');
  
  function render(){
      $aside.html("角色管理内容");
      $(document).ready(function(){
  
  
      });
  }
  
  module.exports={
      render:render
  };

});
