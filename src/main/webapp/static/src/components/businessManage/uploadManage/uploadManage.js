/**
 * header 标签中的内容
 */
var $ = require('egis-jquery');
require('egis-bootstrap/confirmation')();
require('egis-bootstrap')();
require('egis-datetimepicker')($);
require('egis-jquery-file-upload')($);
var ajax=require('components/util/ajax').ajax;

require('egis-pagination')($);

var template = require('egis-template');
var loadCss = require('egis-load-css');
var checkbox = require('egis-checkbox');
var dateExtend = require('egis-date-extend');
var validateForm=require('egis-validate').validateForm;
var formVars=require('egis-formvars');
//var validateForm=require('egis-validate').validateForm;
var systemMessage=require('egis-system-message');
var xhr = require('egis-xhr'),
    clearEmptyValue = xhr.clearEmptyValue;
var utilUser = require('components/util/utilUser');
var $aside = $('aside');
var Vue=require('vue1.x/dist/vue');

function render(){
    $aside.hide().html(__inline('./uploadManage.html')).fadeIn(500);
    var $page=$('.page-uploadManage');
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
            window.apiHost+'data/listData.do',
            $context.serializeArray(),//clearEmptyValue($context)
            function (data) {
                var dataObj = data.data || {};

                $page.find('#listTable').find('tbody').html(listRender(dataObj));

                /*删除*/
                $page.find('#listTable .btn-deleteData').confirmation({
                    btnOkLabel: '确认',
                    btnCancelLabel: '取消',
                    onShow: function (event, element) {

                    },
                    onHide: function (event, element) {

                    },
                    onConfirm: function (event, element) {
                        var id =$(element).attr('data-id');
                        ajax(
                            window.apiHost+'data/deleteData.do',
                            {id:id},
                            function (data) {
                                systemMessage.info('删除成功！');
                                $searchForm.trigger('submit');
                            },
                            null,null,'get'
                        );
                    }
                });

                //分页
                $page.find('#pagination-content').pagination({
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
                $('#listTable').find('tbody').html(listRender({loading:true}));
            },function(){
                $submit.prop("disabled", false);         // 启用
            },'post'
        );
    }).trigger('submit');

    //排序按钮
    var $sortInput=$('input[name=order]');
    $('.btn-list-sort').click(function(){
        if($sortInput.val()=='desc'){
            $sortInput.val('asc');
            $(this).removeClass('active');
        }else{
            $sortInput.val('desc');
            $(this).addClass('active');
        }
        $searchForm.trigger('submit');
        return false;
    });

    var model_Data = {
        id:0,
        userId:0,
        year:'2016',
        month:'',
        fileKey:''
    };

    var $addDataModal=$('#modal-addData');

    //用户列表
    var userListRender=template.compile($('#user-list-tpl').html());
    ajax(
        window.apiHost+'users/listUser.do',
        null,//clearEmptyValue($context)
        function (data) {
            var dataObj = data.data || {};
            $('#userId').html(userListRender(dataObj));
        },
        null,null,'post'
    );

    utilUser.start();
    if(utilUser.loginInfo.roleId==1){
        $('.row-hospitalName').show();
    }

    //用vueJs 实现双向同步
    //Vue.config.debug = false;
    function initVue(){
        return new Vue({
            el: '#modal-addData',
            data: model_Data
        });
    }

    initVue();
    //新增数据
    var submitType='add';

    $('.btn-addData').click(function(){
        $addDataModal.modal('show');
        $addDataModal.find('.modal-title').html('新增数据');
        $addDataModal.find('form')[0].reset();
        model_Data.fileKey="";

        submitType='add';
        return false;
    });

    //设置合理性
    $page.on('click','.btn-validate',function(){
        var id=$(this).attr('data-id');
        var validate=$(this).attr('data-validate');
        //获取数据详情
        ajax(
            window.apiHost+'data/updateData.do',
            {
                id:id,
                validate:validate=='yes'?'no':'yes'
            },
            function (data) {
                systemMessage.info('设置为'+(validate=='yes'?'不':'')+'合理！');
                $searchForm.trigger('submit');
            },
            function () {

            },function(){

            },'post'
        );

        return false;
    });

    $page.on('click','.btn-updateData',function(){
        $addDataModal.modal('show');
        $addDataModal.find('.modal-title').html('修改数据');
        submitType='edit';
        var id=$(this).attr('data-id');

        //获取数据详情
        ajax(
            window.apiHost+'data/getDataById.do',
            {
                id:id
            },
            function (data) {
                var dataObj = data.data || {};
                model_Data= $.extend(model_Data,dataObj);
            },
            function () {

            },function(){

            },'post'
        );
        return false;
    });

    $addDataModal.find('.btn-addDataConfirm').click(function(){
        var $this=$(this);
        if(!$this.hasClass('disable')){
            if(validateForm($addDataModal.find('form'))){
                var url,msg;
                if(submitType=='add'){
                    url=window.apiHost+'data/addData.do';
                    msg='新增数据成功！';
                }else{
                    url=window.apiHost+'data/updateData.do';
                    msg='修改数据成功！';
                }
                var tmpDate=new Date();

                if((dateExtend.normalizeToSingleNum(model_Data.month)-1)!=0){
                    model_Data.preMonth=model_Data.year+'-'+dateExtend.normalizeSingleNum((dateExtend.normalizeToSingleNum(model_Data.month)-1))+'-01';
                }else{
                    model_Data.preMonth=model_Data.year+'-'+model_Data.month+'-01';
                }

                model_Data.month=model_Data.year+'-'+dateExtend.normalizeSingleNum(model_Data.month)+'-01';

                ajax(
                    url,
                    model_Data,
                    function (data) {
                        var dataObj = data.data || {};
                        systemMessage.info(msg);
                        $addDataModal.modal('hide');
                        $searchForm.trigger('submit');
                    },
                    function () {
                        $this.prop("disabled", true);          // 禁用
                    },function(){
                        $this.prop("disabled", false);         // 启用
                    },'post'
                );
            }
        }

        return false;
    });

    $('#btn-addFile').click(function(){
        $('#fileupload').click();
        return false;
    });

    $('#fileupload').change(function(){
        if(/\.xls|\.xlsx/.test($('#fileupload').val())){
            $('#fileupload').fileupload('enable');
        }else{
            $('#fileupload').fileupload('disable');
            systemMessage.error('请上传一个excel文件！');
        }
    });

    $('#fileupload').fileupload({
        url: window.apiHost+'web/uploadFile.do',
        dataType: 'json',
        done: function (e, data) {
            var data=data.result;
            //console.log(data);
            if(data.status==1){
                systemMessage.info('上传文件成功！');

                model_Data.fileKey=data.data;
            }else{
                systemMessage.error(data.detail);
            }

        }
    });
}

module.exports={
    render:render
};