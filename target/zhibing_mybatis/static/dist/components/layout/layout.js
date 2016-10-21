define('components/layout/layout', function(require, exports, module) {

  var $=require('node_modules/egis-jquery/jquery');
  var html="<div id=\"container\" class=\"container-fluid\">\r\n\r\n    <nav id=\"navigate\" class=\"navigate\"></nav>\r\n\r\n    <section class=\"container-main\">\r\n        <header class=\"header\">\r\n\r\n        </header>\r\n        <aside></aside>\r\n        <footer></footer>\r\n    </section>\r\n\r\n</div>\r\n";
  function render(){
      $('body').append(html);
  }
  module.exports={
      render:render
  };

});
