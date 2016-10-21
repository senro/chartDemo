define('components/footer/footer', function(require, exports, module) {

  var $ = require('jquery');
  
  function domReady() {
  
      var $footer = $('footer');
      $footer.load(window.baseUrl+"/components/footer/footer.html", function(html){
          //alert("header have been loaded");
          //console.log(html);
      });
  }
  
  $(document).ready(domReady);

});
