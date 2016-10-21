define(function (require,exports,module) {

    var $=require('jquery');
    require('jquery-qrcode');
    require('header');
    require('footer');

    $('.spreadImageQR').qrcode({
        render	: "table",
        width:128,
        height:128,
        correctLevel:0,
        text:'http://baidu.com'});
});