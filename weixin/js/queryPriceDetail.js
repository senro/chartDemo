/**
 * Created with IntelliJ IDEA.
 * User: senro
 * Date: 16/11/20
 * Time: 下午1:08
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function () {

    var searchResultModal={
        data:{}
    };
    var searchResultVm=new Vue({
        el: '#searchResultModal',
        data: searchResultModal
    });

    $('#searchResultModal').show();

    var id=getQueryString('id');
    $.ajax({
        url:'/chartDemo/queryApi/queryPriceDetail.do',
        data:{
            id:id
        },
        dataType:'json',//服务器返回json格式数据
        type:'post',//HTTP请求类型
        beforeSend:function () {
            searchResultModal.loading=true;
        },
        success:function(data){
            if(data.status==1){
                searchResultModal.data=data.data;
            }else{
                mui.toast(data.detail);
                setTimeout(function(){
                    window.location.href="queryPrice.html";
                },1000);
            }
        },
        complete:function () {
            searchResultModal.loading=false;

        },
        error:function(xhr,type,errorThrown){
            //异常处理；
            mui.toast("请求异常");
        }
    });
});
