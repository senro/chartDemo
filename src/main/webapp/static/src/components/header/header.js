/**
 * header 标签中的内容
 */
var $ = require('egis-jquery');
require('egis-bootstrap')();
var loadCss=require('egis-load-css');
var doGenTsc=require('egis-tsc').doGenTsc;
var ajax=require('egis-ajax').ajax;
//var utilUser = require('components/util/utilUser');
var $header = $('header');
var cookie=require('egis-cookie');
var userObj= JSON.parse(cookie('get','userObj'));

function render(){
    $header.html(__inline("./header.html"));

    //显示用户名
    $('.header-item-userName').html(userObj.username);

}

//var $logout = $('#accountInfoBox').find('.logout');
//utilUser.logout($logout);
module.exports={
    render:render
};