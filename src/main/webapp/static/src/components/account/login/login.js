//@require fis-mod
var $=require('egis-jquery');
var ajax=require('egis-ajax').ajax;
var jsonstringify=require('egis-util').JSON_stringify;
var cookie=require('egis-cookie');
var checkbox=require('egis-checkbox');
var $submitBtn= $('#loginSubmit');
var systemMessage = require('egis-system-message');
var hex_md5=require('egis-tsc/md5-min').hex_md5;
var regs=require('egis-validate/regs');
var utilUser=require('components/util/utilUser');

checkbox('multiCheckbox','multiCheckbox_hover');

var rememberUsername=cookie('get','rememberUsername');
if(rememberUsername){
    $('input[name=email]').val(rememberUsername);
}


$submitBtn.click(function(){
    var username=$('input[name=email]').val();
    var password= $('input[name=password]').val();

    if(!$submitBtn.hasClass('disable')){
       if(regs['email'].test(username)){
            ajax(window.apiHost + 'web/login.do',{email:username,password:password},function(data){
                //console.log(data);
                cookie('set','userObj',jsonstringify(data.data));
                utilUser.start();
                if($('.rememberMeCheckbox').hasClass('multiCheckbox_hover')){
                    cookie('set','rememberUsername',username);
                }
                window.location.href= window.baseUrl + '/index.html'+utilUser.getDefaultIndex();

            },function(){
                $submitBtn.html('登录中...');
                $submitBtn.addClass('disable');
            },function(){
                $submitBtn.html('登录');
                $submitBtn.removeClass('disable');
            });
        }else{
            systemMessage.info('请输入正确的邮箱！');
        }

    }
    return false;
});

$(document).keydown(function(e) {
    if (e.keyCode == 13){
        $submitBtn.click();
    }
});


