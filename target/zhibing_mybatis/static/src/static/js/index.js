//@require fis-mod

require('components/util/utilRouter');
require('layout').render();
require('header').render();
require('navigation').render();
//var $ = require('egis-jquery');
//var navigation = require('navigation');
//var header = require('header');
////var footer=require('footer');
//
var router=require('router');
//var cookie = require('egis-cookie');
//window.userObj = JSON.parse(cookie('get', 'userObj'));     // 全局登录信息
//
router();
//window.location.href="/#/businessManage/strategyManage/addStrategy";