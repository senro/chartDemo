define("components/router/routerCallbacks",function(e,n,a){var o=(e("node_modules/egis-jquery/jquery"),{});o.main=function(){e("components/main/main").render()},o.userManage=function(){e("components/systemManage/userManage/userManage.jsx").render()},o.addUser=function(){e("components/systemManage/userManage/addUser").render()},o.roleManage=function(){e("components/systemManage/roleManage/roleManage").render()},o.privilegeManage=function(){e("components/systemManage/privilegeManage/privilegeManage").render()},o.dataManage=function(){e("components/businessManage/dataManage/dataManage").render()},o.uploadManage=function(){e("components/businessManage/uploadManage/uploadManage").render()},o.cacheIndex=function(){e("components/cacheIndex/cacheIndex.jsx").render()},a.exports=o});