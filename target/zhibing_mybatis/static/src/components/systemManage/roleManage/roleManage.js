/**
 * header 标签中的内容
 */
var $ = require('egis-jquery');
var $aside = $('aside');
//var utilUser = require('components/util/utilUser');

function render(){
    $aside.html(__inline('./roleManage.html'));
    $(document).ready(function(){


    });
}

module.exports={
    render:render
};