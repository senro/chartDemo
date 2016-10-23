
var $ = require('egis-jquery');
require('egis-bootstrap/confirmation')();
require('egis-bootstrap')();
var ajax = require('egis-ajax').ajax;
var pagination = require('egis-pagination');
var template = require('egis-template');
var loadCss = require('egis-load-css');
var checkbox = require('egis-checkbox');
//var validateForm=require('egis-validate').validateForm;
var systemMessage=require('egis-system-message');
var xhr = require('egis-xhr'),
    clearEmptyValue = xhr.clearEmptyValue;
//var utilUser = require('components/util/utilUser');
var $aside = $('aside');
var Vue=require('vue');
var getQueryString=require('egis-get-query-string');
var regs=require('egis-validate/regs');
var validateForm=require('egis-validate').validateForm;

function render(){
    $aside.html(__inline('./userManage.html'));

    var $searchForm = $('#searchForm'),
        $pageNum = $searchForm.find('input[name=page]'),
        $pageSize = $searchForm.find('input[name=size]'),
        $pagination = $('#pagination');
    /*列表展示*/
    var listRender=template.compile($('#list-tpl').html());
    $searchForm.on('submit', function (event) {
        var $context = $(this),
            $submit = $context.find('input[type=submit]');

        if (event) {
            event.preventDefault();
        }
        if ($submit.prop("disabled")) {
            return false;
        }
        ajax(
            window.apiHost+'users/listUser.do',
            clearEmptyValue($context),
            function (data) {
                var dataObj = data.data || {};

                $('.page-userManage #listTable').find('tbody').html(listRender(dataObj));


                /*删除*/
                $('.page-userManage #listTable .btn-delete').confirmation({
                    btnOkLabel: '确认',
                    btnCancelLabel: '取消',
                    onShow: function (event, element) {

                    },
                    onHide: function (event, element) {

                    },
                    onConfirm: function (event, element) {
                        var id =$(element).attr('data-id');
                        var name=$(element).attr('data-name');
                        if(name!='superDevAdmin'){
                            ajax(
                                window.apiHost+'users/deleteUser.do',
                                {id:id},
                                function (data) {
                                    $searchForm.trigger('submit');
                                    systemMessage.info("删除用户成功！");
                                },
                                null,null,'get'
                            );
                        }else{
                            systemMessage.alert("此管理员不能被删除！");
                        }
                    }
                });

                //分页
                $('#pagination-content').pagination({
                    $form:$context,
                    first: "<<",
                    prev : "<",
                    next : ">",
                    last : ">>",
                    pageSize:parseInt($pageSize.val()),
                    totalSize:dataObj.totalElements,
                    info: true,
                    infoContainer:'.pagination-wrap',
                    paginationInfoTpl:
                    '<div class="pagination-TotalInfo">总条数 '+dataObj.totalElements+' 条</div>'+
                    '<div class="pagination-info-content">' +
                    '<input type="text" class="info-currentPage" name="currentPage" />' +
                    '&nbsp;/&nbsp;'+ dataObj.totalPages +'页&nbsp;&nbsp;' +
                    '<a href="javascript:;" class="info-goToPage">GO</a>' +
                    '</div>',
                    visiblePages: 5,
                    onPageClick: function (event, page) {
                        $pageNum.val(page);
                        $context.trigger('submit');
                    }
                });

            },
            function () {
                $submit.prop("disabled", true);          // 禁用
            },function(){
                $submit.prop("disabled", false);         // 启用
            },'get'
        );
    }).trigger('submit');
    
    var model_User = {
        id:0,
        email:'',
        name: "",
        password: "",
        rePassword: "",
        roleId: ""
    };
    var $addUserModal=$('#modal-addUser');

    //用vueJs 实现双向同步
    //Vue.config.debug = false;
    function initVue(){
        return new Vue({
            el: '#modal-addUser',
            data: model_User
        });
    }
    initVue();
    //新增用户
    var submitType='add';

    $('.btn-addUser').click(function(){
        $addUserModal.modal('show');
        $addUserModal.find('.modal-title').html('新增用户');
        $addUserModal.find('form')[0].reset();
        submitType='add';
        return false;
    });

    $('.page-userManage').on('click','.btn-updateUser',function(){
        $addUserModal.modal('show');
        $addUserModal.find('.modal-title').html('修改用户');
        $addUserModal.find('form')[0].reset();
        submitType='edit';
        var id=$(this).attr('data-id');

        //获取用户详情
        ajax(
            window.apiHost+'users/getUserById.do',
            {
                id:id
            },
            function (data) {
                var dataObj = data.data || {};
                model_User= $.extend(model_User,dataObj);
            },
            function () {

            },function(){

            },'post'
        );
        return false;
    });

    $addUserModal.find('.btn-addUserConfirm').click(function(){
        var $this=$(this);
        if(!$this.hasClass('disable')){
            if(validateForm($addUserModal.find('form'))){
                if(model_User.password==model_User.rePassword){
                    var url,msg;
                    if(submitType=='add'){
                        url=window.apiHost+'users/addUser.do';
                        msg='新增用户成功！';
                    }else{
                        url=window.apiHost+'users/updateUser.do';
                        msg='修改用户成功！';
                    }
                    ajax(
                        url,
                        model_User,
                        function (data) {
                            var dataObj = data.data || {};
                            systemMessage.info(msg);
                            $addUserModal.modal('hide');
                            $searchForm.trigger('submit');
                        },
                        function () {
                            $this.prop("disabled", true);          // 禁用
                        },function(){
                            $this.prop("disabled", false);         // 启用
                        },'post'
                    );
                }else{
                    systemMessage.alert("两次密码不相同！");
                }

            }
        }

        return false;
    });
}

//module.exports={
//    render:render
//};

exports.render = render;
