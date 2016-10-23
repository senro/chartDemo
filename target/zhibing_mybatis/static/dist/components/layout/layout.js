define('components/layout/layout', function(require, exports, module) {

  var $=require('node_modules/egis-jquery/jquery');
  var html="<div id=\"container\" class=\"container-fluid\">\n\n    <nav id=\"navigate\" class=\"navigate\"></nav>\n\n    <section class=\"container-main\">\n        <header class=\"header\">\n\n        </header>\n        <aside></aside>\n        <footer></footer>\n    </section>\n\n</div>\n";
  function render(){
      $('body').append(html);
  }
  module.exports={
      render:render
  };

});
