define('components/reducers/addUserModal.jsx', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports['default'] = addUserModal;
  
  var _componentsConstantsActionTypes = require('components/constants/ActionTypes.jsx');
  
  var initialState = {
    account: 'test@payegis.com',
    name: '',
    password: '',
    roler: ''
  };
  
  function addUserModal(state, action) {
    if (state === undefined) state = initialState;
  
    switch (action.type) {
      case _componentsConstantsActionTypes.ADD_USER:
        state.account = action.json.account;
        state.name = action.json.name;
        state.password = action.json.password;
        state.roler = action.json.roler;
  
        return state;
  
      default:
        return state;
    }
  }
  
  module.exports = exports['default'];
  //# sourceMappingURL=/chartDemo/static/dist/components/reducers/addUserModal.js.map
  

});
