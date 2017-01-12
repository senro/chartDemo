/**
 * header 标签中的内容
 */
var $ = require('egis-jquery');
require('egis-bootstrap')();
var ajax=require('components/util/ajax').ajax;
//var utilUser = require('components/util/utilUser');
var $header = $('header');
var cookie=require('egis-cookie');
var userObj= JSON.parse(cookie('get','userObj'));

function render(){
    $header.html(__inline("./header.html"));

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