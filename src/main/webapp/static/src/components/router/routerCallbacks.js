var $=require('egis-jquery');
var routerCallbacks={};

/*系统管理*/
routerCallbacks.userManage=function(){
    require('components/systemManage/userManage/userManage').render();
};
/*业务管理*/
routerCallbacks.dataManage=function(){
    require('components/businessManage/dataManage/dataManage').render();
};

routerCallbacks.uploadManage=function(){
    require('components/businessManage/uploadManage/uploadManage').render();
};

routerCallbacks.cacheIndex=function(){
    require('components/cacheIndex/cacheIndex').render();
};

module.exports=routerCallbacks;