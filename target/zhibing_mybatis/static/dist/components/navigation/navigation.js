define('components/navigation/navigation', function(require, exports, module) {

  var $ = require('node_modules/egis-jquery/jquery');
  var template=require('node_modules/egis-template/template');
  var html="\r\n<a class=\"nav-header-btn\" href=\"javascript:;\"></a>\r\n<div class=\"nav-mask\"></div>\r\n<div class=\"nav\">\r\n    <div class=\"nav-header\">\r\n        <img class=\"nav-header-logo\" src=\"/chartDemo/static/dist/components/navigation/logo.png\" alt=\"\"/>\r\n        管理平台\r\n    </div>\r\n    {{ if content && content.length > 0 }}\r\n        {{ each content as item i }}\r\n            {{ if item.show }}\r\n                <div class=\"nav-group\">\r\n                    <a class=\"nav-btn nav-icon {{ item.iconClass }}\" href=\"{{ item.href }}\">\r\n                        {{ item.text }}\r\n                    </a>\r\n                    {{ if item.include && item.include.length > 0 }}\r\n                        <div class=\"nav-btn-sub\">\r\n                            {{ each item.include as subItem j }}\r\n                                {{ if subItem.show }}\r\n                                    <a class=\"nav-btn-sub-btn\" href=\"{{ subItem.href }}\">\r\n                                        ● {{ subItem.text }}\r\n                                    </a>\r\n                                {{ /if }}\r\n                            {{ /each }}\r\n                            <div class=\"bottom-padding\"></div>\r\n                        </div>\r\n                    {{ /if }}\r\n                </div>\r\n            {{ /if }}\r\n        {{ /each }}\r\n    {{ else }}\r\n        没有配置菜单\r\n    {{ /if }}\r\n</div>\r\n";
  var utilUser=require("components/util/utilUser");
  
  function render() {
      var $navigate = $('#navigate');
      var navigateRender=template.compile(html);
      var currHref=/\?/.test(window.location.hash)?window.location.hash.split('?')[0]:window.location.hash;
      $navigate.html(navigateRender({content:utilUser.getAuthoritiesNavInfo()}));
  
      var navigateWidth=$navigate.width();
      var containerMainPaddingLeft=parseInt($('.container-main').css('paddingLeft'));
  
      $('.nav-btn').click(function(){
          var $this=$(this);
          var $parent=$this.parent();
  
          $('.nav-btn-sub').css({
              height:0
          });
          $('.nav-group').removeClass('active');
  
          $parent.addClass('active');
  
          if($parent.find('.nav-btn-sub').length>0){
              $parent.find('.nav-btn-sub').css({
                  height:'auto'
              });
              //有子菜单
              $parent.find('.nav-btn-sub').find('.nav-btn-sub-btn').removeClass('active');
              $parent.find('.nav-btn-sub').find('.nav-btn-sub-btn').each(function(){
                  var $currSubNavBtn=$(this);
                  if($currSubNavBtn.attr('href')==$this.attr('href')){
                      $currSubNavBtn.addClass('active');
                      return false;
                  }
              });
          }
          //return false;
      });
  
      //给当前栏目加active
      $navigate.find('.nav-group').each(function(){
          var $currNavGroup=$(this);
          $currNavGroup.find('.nav-btn').each(function(){
              var $currNavBtn=$(this);
              if(new RegExp($currNavBtn.attr('href'),'g').test(currHref)){
                  //比对一级菜单
                  $currNavGroup.addClass('active');
                  $currNavBtn.click();
                  if($currNavGroup.find('.nav-btn-sub').length>0){
                      //有子菜单
                      $currNavGroup.find('.nav-btn-sub').find('.nav-btn-sub-btn').each(function(){
                          var $currSubNavBtn=$(this);
                          if(new RegExp($currSubNavBtn.attr('href'),'g').test(currHref)){
                              $currSubNavBtn.addClass('active');
                              return false;
                          }
                      });
                  }
                  return false;
              }else{
                  //比对二级子菜单
                  $currNavGroup.find('.nav-btn-sub').find('.nav-btn-sub-btn').each(function(){
                      var $currSubNavBtn=$(this);
  
                      if(new RegExp($currSubNavBtn.attr('href'),'g').test(currHref)){
                          $currNavBtn.click();
                          $currNavGroup.find('.nav-btn-sub').find('.nav-btn-sub-btn').removeClass('active');
                          $currSubNavBtn.addClass('active');
  
                          return false;
                      }
                  });
              }
          });
      });
  
      $('.nav-btn-sub-btn').click(function(){
          $('.nav-btn-sub-btn').removeClass('active');
          $(this).addClass('active');
          //return false;
      });
  
      //折叠菜单
      $('.nav-header-btn').click(function(){
          var currWidth=$navigate.width();
          if(currWidth>43){
              //关闭菜单
              $navigate.animate({
                  width:43
              },200);
              $('.container-main').animate({
                  "padding-left":containerMainPaddingLeft-(navigateWidth-43)
              },200);
              $navigate.find('.nav-header-btn').addClass('nav-header-btn-reverse');
              $navigate.find('.nav-mask').fadeIn(200);
  
          }else{
              //展开菜单
              $navigate.animate({
                  width:navigateWidth
              },200);
              $('.container-main').animate({
                  "padding-left":containerMainPaddingLeft
              },200);
              $navigate.find('.nav-header-btn').removeClass('nav-header-btn-reverse');
              $navigate.find('.nav-mask').fadeOut(200);
  
          }
  
          return false;
      });
  }
  
  module.exports={
      render:render
  };
  

});
