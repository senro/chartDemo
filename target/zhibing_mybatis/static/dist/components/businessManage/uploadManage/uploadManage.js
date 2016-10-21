define('components/businessManage/uploadManage/uploadManage', function(require, exports, module) {

  /**
   * header 标签中的内容
   */
  var $ = require('node_modules/egis-jquery/jquery');
  require('node_modules/egis-bootstrap/confirmation')();
  require('node_modules/egis-bootstrap/bootstrap')();
  require('node_modules/egis-datetimepicker/datetimepicker')();
  require('node_modules/egis-jquery-file-upload/jquery.fileupload');
  
  var ajax = require('node_modules/egis-ajax/ajax').ajax;
  var pagination = require('node_modules/egis-pagination/pagination');
  var template = require('node_modules/egis-template/template');
  var loadCss = require('node_modules/egis-load-css/load-css');
  var checkbox = require('node_modules/egis-checkbox/checkbox');
  var dateExtend = require('node_modules/egis-date-extend/date-extend');
  var validateForm=require('node_modules/egis-validate/validate').validateForm;
  var formVars=require('node_modules/egis-formvars/formvars');
  //var validateForm=require('egis-validate').validateForm;
  var systemMessage=require('node_modules/egis-system-message/system-message');
  var xhr = require('node_modules/egis-xhr/xhr'),
      clearEmptyValue = xhr.clearEmptyValue;
  //var utilUser = require('components/util/utilUser');
  var $aside = $('aside');
  var Vue=require('node_modules/vue/dist/vue.common');
  
  function render(){
      $aside.hide().html("\r\n<div class=\"page page-uploadManage\">\r\n    <div class=\"page-tit\">\r\n        <form role=\"form\" class=\"page-tit-form\" id=\"searchForm\">\r\n            数据管理\r\n            <input type=\"hidden\" name=\"page\" value=\"1\">\r\n            <input type=\"hidden\" name=\"size\" value=\"20\">\r\n            <input type=\"hidden\" name=\"order\" value=\"desc\">\r\n            <a href=\"javascript:;\" class=\"btn btn-primary pull-right btn-addData\" id=\"btn-addData\">\r\n                <span class=\"glyphicon glyphicon-plus\"></span>\r\n                新增数据\r\n            </a>\r\n        </form>\r\n    </div>\r\n    <div class=\"page-cont\">\r\n        <table id=\"listTable\" class=\"merchant-manage default-list box table table-hover table-bordered\">\r\n            <thead>\r\n            <tr>\r\n                <th>名称</th>\r\n                <th>数据所属月份</th>\r\n                <th>数据地址</th>\r\n                <th>\r\n                    修改日期\r\n                    <a class=\"btn-list-sort\" href=\"javascript:;\" title=\"排序\">\r\n                        <span class=\"glyphicon glyphicon-sort\"></span>\r\n                    </a>\r\n                </th>\r\n                <th>操作</th>\r\n            </tr>\r\n            <tbody>\r\n\r\n                <script id=\"list-tpl\" type=\"text/html\">\r\n                    {{ if loading }}\r\n                    <tr>\r\n                        <td colspan=\"5\">\r\n                            <span class=\"icon-loading\"></span>\r\n                        </td>\r\n                    </tr>\r\n                    {{ else if items && items.length > 0 }}\r\n                    {{each items as item i}}\r\n                    {{ if i%2==0 }}\r\n                    <tr>\r\n                        {{ else }}\r\n                    <tr class=\"trBg\">\r\n                        {{ /if }}\r\n                        <td>\r\n                            <a class=\"color-lightBlue\" title=\"{{ item.hospitalName }}\">\r\n                                {{ item.hospitalName }}\r\n                            </a>\r\n                        </td>\r\n                        <td>\r\n                            <a class=\"color-lightBlue\" title=\"{{ item.month }}\">\r\n                                {{ item.month }}\r\n                            </a>\r\n                        </td>\r\n                        <td>\r\n                            <a href=\"{{ item.dataUrl }}\" title=\"{{ item.dataUrl }}\">\r\n                                下载\r\n                            </a>\r\n                        </td>\r\n\r\n                        <td>\r\n                            <span title=\"{{ item.updateAt }}\">\r\n                                {{ item.updateAt }}\r\n                            </span>\r\n                        </td>\r\n                        <td>\r\n                            <!--<a class=\"btn btn-info btn-transparent btn-checkoutData\" href=\"javascript:;\" title=\"查看数据\" data-id=\"{{ item.id }}\">-->\r\n                                <!--<span class=\"glyphicon glyphicon-eye-open\"></span>-->\r\n                            <!--</a>-->\r\n                            <a class=\"btn btn-info btn-transparent btn-modify btn-updateData\" href=\"javascript:;\" title=\"编辑数据\" data-id=\"{{ item.id }}\">\r\n                                <span class=\"glyphicon glyphicon-edit\"></span>\r\n                            </a>\r\n                            <a class=\"btn btn-info btn-transparent btn-deleteData\" title=\"删除数据\" data-id=\"{{ item.id }}\" data-placement=\"left\" data-toggle=\"confirmation\" data-original-title=\"确认删除?\">\r\n                                <span class=\"glyphicon glyphicon-trash\"></span>\r\n                            </a>\r\n                        </td>\r\n                    </tr>\r\n                    {{/each}}\r\n                    {{else}}\r\n                    <tr>\r\n                        <td colspan=\"5\">未搜索到符合该条件的记录！</td>\r\n                    </tr>\r\n                    {{ /if }}\r\n                </script>\r\n\r\n            </tbody>\r\n        </table>\r\n\r\n        <div id=\"pagination\" class=\"pagination-wrap\">\r\n            <ul id=\"pagination-content\" class=\"page_box\">\r\n\r\n            </ul>\r\n        </div>\r\n\r\n    </div>\r\n</div>\r\n\r\n<!--上传excel弹框-->\r\n<div class=\"modal fade modal-addData\" id=\"modal-addData\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header clearfix\">\r\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\r\n                <h4 class=\"modal-title\">新增数据</h4>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                <form class=\"\" action=\"\" id=\"modal-addData-form\">\r\n                    <table class=\"modal-table modal-addRoller-table\">\r\n                        <tr>\r\n                            <td class=\"text-right\">数据月份</td>\r\n                            <td>\r\n                                <select class=\"form-control mt10\" name=\"month\" v-model=\"month\" required=\"required\" data-vd-msg=\"请选择月份！\">\r\n                                    <option value=\"\">请选择</option>\r\n                                    <option value=\"1\">1月</option>\r\n                                    <option value=\"2\">2月</option>\r\n                                    <option value=\"3\">3月</option>\r\n                                    <option value=\"4\">4月</option>\r\n                                    <option value=\"5\">5月</option>\r\n                                    <option value=\"6\">6月</option>\r\n                                    <option value=\"7\">7月</option>\r\n                                    <option value=\"8\">8月</option>\r\n                                    <option value=\"9\">9月</option>\r\n                                    <option value=\"10\">10月</option>\r\n                                    <option value=\"11\">11月</option>\r\n                                    <option value=\"12\">12月</option>\r\n                                </select>\r\n                            </td>\r\n                            <td class=\"color-red\">\r\n                                <!--<span class=\"color-red\">*</span>-->\r\n                                <!--<span class=\"errorMsg\"></span>-->\r\n                            </td>\r\n                        </tr>\r\n                        <tr>\r\n                            <td class=\"text-right\">上传数据</td>\r\n                            <td class=\"privileges\">\r\n                                <input type=\"hidden\" v-model=\"id\" name=\"id\"/>\r\n                                <input type=\"hidden\" v-model=\"fileKey\" readonly required=\"required\" data-vd-msg=\"请上传数据！\" name=\"fileKey\"/>\r\n                                <input id=\"fileupload\" type=\"file\" class=\"none\" name=\"file\" hidden=\"hidden\" multiple>\r\n                                <span>{{fileKey}}</span>\r\n                                <!--<a href=\"{{dataUrl}}\" target=\"_blank\">下载</a>-->\r\n                            </td>\r\n                            <td class=\"color-red\">\r\n                                <span class=\"errorMsg\"></span>\r\n                            </td>\r\n                        </tr>\r\n                    </table>\r\n                </form>\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"btn btn-gray btn-cancel\" data-dismiss=\"modal\">取消</button>\r\n                <button type=\"button\" class=\"btn btn-lightBlue btn-addDataConfirm\">确认</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n").fadeIn(500);
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
          month:'',
          fileKey:''
      };
  
      var $addDataModal=$('#modal-addData');
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
  
                  model_Data.preMonth=tmpDate.getFullYear()+'-'+dateExtend.normalizeSingleNum((model_Data.month>1?model_Data.month-1:model_Data.month))+'-01';
                  model_Data.month=tmpDate.getFullYear()+'-'+dateExtend.normalizeSingleNum(model_Data.month)+'-01';
  
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

});
