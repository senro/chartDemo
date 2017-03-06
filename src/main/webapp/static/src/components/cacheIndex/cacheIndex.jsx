
import cacheIndexManage from '/components/cacheIndex/cacheIndexManage.vue'
import ElementUI from 'element-ui'

var $ = require('egis-jquery');
var Vue = require('vue/dist/vue');
var $aside = $('aside');

require('es6-promise').polyfill();

Vue.use(ElementUI);

function render(){
    $aside.html('<div id="aside"></div>');
    new Vue({
        el: '#aside',
        render: function(h){
            return h(cacheIndexManage);
        }
    });
}

module.exports={
    render:render
};