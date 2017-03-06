define('components/cacheIndex/cacheIndex.jsx', function(require, exports, module) {

  'use strict';
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _componentsCacheIndexCacheIndexManageVue = require('components/cacheIndex/cacheIndexManage.vue');
  
  var _componentsCacheIndexCacheIndexManageVue2 = _interopRequireDefault(_componentsCacheIndexCacheIndexManageVue);
  
  var _elementUi = require('node_modules/element-ui/lib/element-ui.common');
  
  var _elementUi2 = _interopRequireDefault(_elementUi);
  
  var $ = require('node_modules/egis-jquery/jquery');
  var Vue = require('node_modules/vue/dist/vue');
  var $aside = $('aside');
  
  require('node_modules/es6-promise/dist/es6-promise').polyfill();
  
  Vue.use(_elementUi2['default']);
  
  function render() {
      $aside.html('<div id="aside"></div>');
      new Vue({
          el: '#aside',
          render: function render(h) {
              return h(_componentsCacheIndexCacheIndexManageVue2['default']);
          }
      });
  }
  
  module.exports = {
      render: render
  };
  //# sourceMappingURL=/chartDemo/static/dist/components/cacheIndex/cacheIndex.js.map
  

});
