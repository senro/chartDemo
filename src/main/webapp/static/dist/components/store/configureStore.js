define('components/store/configureStore.jsx', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports['default'] = configureStore;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _redux = require('node_modules/redux/lib/index');
  
  var _componentsReducers = require('components/reducers/index.jsx');
  
  var _componentsReducers2 = _interopRequireDefault(_componentsReducers);
  
  function configureStore(initialState) {
    var store = (0, _redux.createStore)(_componentsReducers2['default'], initialState);
  
    // if (module.hot) {
    //   // Enable Webpack hot module replacement for reducers
    //   module.hot.accept('../reducers', () => {
    //     const nextReducer = require('../reducers')
    //     store.replaceReducer(nextReducer)
    //   })
    // }
  
    return store;
  }
  
  module.exports = exports['default'];
  //# sourceMappingURL=/chartDemo/static/dist/components/store/configureStore.js.map
  

});
