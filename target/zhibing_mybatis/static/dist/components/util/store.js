define('components/util/store', function(require, exports, module) {

  module.exports={
      accountManage:{
          searchCondition :{
              page:'1',
              systemId:'',
              systemAccount:'',
              status: '',
              activeStartDate: '',
              activeEndDate:''
          }
      },
      authQuery :{
          searchCondition:{
              page:'1',
              systemId:'',
              account:'',
              businessMedia: '',
              authType: '',
              authChannel:'',
              authState: '',
              authDevice: '',
              startDate:'',
              endDate:''
          }
      }
  };

});
