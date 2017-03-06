define('components/actions/addUserModal.jsx', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.addUser = addUser;
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
  
  var _componentsConstantsActionTypes = require('components/constants/ActionTypes.jsx');
  
  var types = _interopRequireWildcard(_componentsConstantsActionTypes);
  
  function addUser(json) {
    return { type: types.ADD_TODO, json: json };
  }
  //# sourceMappingURL=/chartDemo/static/dist/components/actions/addUserModal.js.map
  

});
