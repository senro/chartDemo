/**
 * header 标签中的内容
 */
var $ = require('egis-jquery');
require('egis-bootstrap/confirmation')();
require('egis-bootstrap')();
require('egis-datetimepicker')($);
require('egis-jquery-file-upload')($);

var ajax=require('components/util/ajax').ajax;
var pagination = require('egis-pagination');
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

var $aside = $('aside');
var Vue=require('vue1.x/dist/vue');

function render(){
    $aside.hide().html(__inline('./dataManage.html')).fadeIn(500);
    var $page=$('.page-dataManage');
    var $searchForm = $('#searchForm'),
        $pageNum = $searchForm.find('input[name=page]'),
        $pageSize = $searchForm.find('input[name=size]'),
        $pagination = $('#pagination');

    //用户列表
    var userListRender=template.compile($('#user-list-tpl').html());
    ajax(
        window.apiHost+'users/listUser.do',
        null,//clearEmptyValue($context)
        function (data) {
            var dataObj = data.data || {};
            $page.find('#userId').html(userListRender(dataObj));
        },
        null,null,'post'
    );

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
            window.apiHost+'drugRecord/listDrugRecord.do',
            $context.serializeArray(),//clearEmptyValue($context)
            function (data) {
                var dataObj = data.data || {};

                $page.find('#listTable').find('tbody').html(listRender(dataObj));

                /*删除*/
                $page.find('#listTable .btn-deleteDrugRecord').confirmation({
                    btnOkLabel: '确认',
                    btnCancelLabel: '取消',
                    onShow: function (event, element) {

                    },
                    onHide: function (event, element) {

                    },
                    onConfirm: function (event, element) {
                        var id =$(element).attr('data-id');
                        ajax(
                            window.apiHost+'drugRecord/deleteDrugRecord.do',
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

    var model_DrugRecord = {
        id:0,
        userId:0,
        hospitalName:'',
        drugName:'',
        drugSpec:'',
        drugUnit:'',
        drugFactory:'',
        drugType:'',
        sale:'',
        price:'',
        isValid:'',
        month:''
    };

    var $addDrugRecordModal=$('#modal-addDrugRecord');
    //用vueJs 实现双向同步
    //Vue.config.debug = false;
    function initVue(){
        return new Vue({
            el: '#modal-addDrugRecord',
            data: model_DrugRecord
        });
    }

    initVue();

    //修改数据
    $page.on('click','.btn-updateDrugRecord',function(){
        $addDrugRecordModal.modal('show');

        var id=$(this).attr('data-id');

        //获取数据详情
        ajax(
            window.apiHost+'drugRecord/getDrugRecordById.do',
            {
                id:id
            },
            function (data) {
                var dataObj = data.data || {};
                dataObj.month=dataObj.month.split('-')[1];
                model_DrugRecord= $.extend(model_DrugRecord,dataObj);
            },
            function () {

            },function(){

            },'post'
        );
        return false;
    });

    $addDrugRecordModal.find('.btn-addDrugRecordConfirm').click(function(){
        var $this=$(this);
        if(!$this.hasClass('disable')){
            if(validateForm($addDrugRecordModal.find('form'))){
                var tempDate=new Date();

                //model_DrugRecord.month=tempDate.getFullYear()+'-'+model_DrugRecord.month+'-01';

                ajax(
                    window.apiHost+'drugRecord/updateDrugRecord.do',
                    model_DrugRecord,
                    function (data) {
                        var dataObj = data.data || {};
                        systemMessage.info('修改数据成功！');
                        $addDrugRecordModal.modal('hide');
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

}

module.exports={
    render:render
};