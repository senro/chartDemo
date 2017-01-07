/**
 * Created with IntelliJ IDEA.
 * User: senro
 * Date: 16/11/20
 * Time: 下午1:08
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function () {

    var searchResultModal={
        loading:false,
        items:[]
    };
    var searchResultVm=new Vue({
        el: '#searchResultModal',
        data: searchResultModal
    });

    var searchModal={
        cpmbm:'',
        cpm:'',
        scs:''
    };
    var searchVm=new Vue({
        el: '#searchModal',
        data: searchModal,
        methods: {
            search: function () {
                $.ajax({
                    url:'/chartDemo/queryApi/queryPrice.do',
                    data:searchModal,
                    dataType:'json',//服务器返回json格式数据
                    type:'post',//HTTP请求类型
                    beforeSend:function () {
                        searchResultModal.loading=true;
                    },
                    success:function(data){
                        if(data.status==1){
                            searchResultModal.items=data.data;
                        }else{
                            mui.toast(data.detail);
                            searchResultModal.items=[];
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
            }
        },
        watch:{
            'productNo': function (value, oldVal) {
                if(value){
                    if(value != null && /^[0-9]*$/g.test(value)){
                        //newValue = value;
                    }else{
                        mui.toast('请输入数字！');
                        searchModal.cpmbm=oldVal;
                    }
                }
            }
        }
    });
});
