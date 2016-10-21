
var $ = require('egis-jquery');
var $aside = $('aside');
//var utilUser = require('components/util/utilUser');

function render(){
    $aside.html(__inline('./privilegeManage.html'));
    $(document).ready(function(){


    });
}

module.exports={
    render:render
};