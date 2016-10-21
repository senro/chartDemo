//@require node_modules/fis-mod/mod.js

require('components/util/utilRouter');
require('components/layout/layout').render();
require('components/header/header').render();
require('components/navigation/navigation').render();
//var $ = require('egis-jquery');
//var navigation = require('navigation');
//var header = require('header');
////var footer=require('footer');
//
var router=require('components/router/router');
//var cookie = require('egis-cookie');
//window.userObj = JSON.parse(cookie('get', 'userObj'));     // 全局登录信息
//
router();
//window.location.href="/#/businessManage/strategyManage/addStrategy";