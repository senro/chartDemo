define('components/businessManage/uploadManage/uploadManage', function(require, exports, module) {

  /**
   * header 标签中的内容
   */
  var $ = require('node_modules/egis-jquery/jquery');
  require('node_modules/egis-bootstrap/confirmation')();
  require('node_modules/egis-bootstrap/bootstrap')();
  require('node_modules/egis-datetimepicker/datetimepicker')($);
  require('node_modules/egis-jquery-file-upload/jquery.fileupload')($);
  var ajax=require('components/util/ajax').ajax;
  
  require('node_modules/egis-pagination/pagination')($);
  
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
  var utilUser = require('components/util/utilUser');
  var $aside = $('aside');
  var Vue=require('node_modules/vue1.x/dist/vue');
  
  function render(){
      $aside.hide().html("\n<div class=\"page page-uploadManage\">\n    <div class=\"page-tit\">\n        <form role=\"form\" class=\"page-tit-form\" id=\"searchForm\">\n            上传管理\n            <input type=\"hidden\" name=\"page\" value=\"1\">\n            <input type=\"hidden\" name=\"size\" value=\"20\">\n            <input type=\"hidden\" name=\"order\" value=\"desc\">\n            <a href=\"javascript:;\" class=\"btn btn-primary pull-right btn-addData\" id=\"btn-addData\">\n                <span class=\"glyphicon glyphicon-plus\"></span>\n                新增数据\n            </a>\n        </form>\n    </div>\n    <div class=\"page-cont\">\n        <table id=\"listTable\" class=\"merchant-manage default-list box table table-hover table-bordered\">\n            <thead>\n            <tr>\n                <th>医院名称</th>\n                <th>数据所属月份</th>\n                <th>数据地址</th>\n                <th>\n                    修改日期\n                    <a class=\"btn-list-sort\" href=\"javascript:;\" title=\"排序\">\n                        <span class=\"glyphicon glyphicon-sort\"></span>\n                    </a>\n                </th>\n                <th>操作</th>\n            </tr>\n            <tbody>\n\n                <script id=\"list-tpl\" type=\"text/html\">\n                    {{ if loading }}\n                    <tr>\n                        <td colspan=\"5\">\n                            <span class=\"icon-loading\"></span>\n                        </td>\n                    </tr>\n                    {{ else if items && items.length > 0 }}\n                    {{each items as item i}}\n                    {{ if i%2==0 }}\n                    <tr>\n                        {{ else }}\n                    <tr class=\"trBg\">\n                        {{ /if }}\n                        <td>\n                            <a class=\"color-lightBlue\" title=\"{{ item.hospitalName }}\">\n                                {{ item.hospitalName }}\n                            </a>\n                        </td>\n                        <td>\n                            <a class=\"color-lightBlue\" title=\"{{ item.month }}\">\n                                {{ item.month }}\n                            </a>\n                        </td>\n                        <td>\n                            <a href=\"{{ item.dataUrl }}\" title=\"{{ item.dataUrl }}\">\n                                下载\n                            </a>\n                        </td>\n\n                        <td>\n                            <span title=\"{{ item.updateAt }}\">\n                                {{ item.updateAt }}\n                            </span>\n                        </td>\n                        <td>\n                            {{ if item.validate==\"yes\" }}\n                                <a class=\"btn btn-info btn-transparent btn-validate\" href=\"javascript:;\" title=\"是否合理\" data-validate=\"{{ item.validate }}\" data-id=\"{{ item.id }}\">\n                                    <span class=\"glyphicon glyphicon-eye-open\"></span>\n                                </a>\n                            {{ else }}\n                                <a class=\"btn btn-info btn-transparent btn-validate\" href=\"javascript:;\" title=\"是否合理\" data-validate=\"{{ item.validate }}\" data-id=\"{{ item.id }}\">\n                                    <span class=\"glyphicon glyphicon-eye-close\"></span>\n                                </a>\n                            {{ /if }}\n\n                            <a class=\"btn btn-info btn-transparent btn-modify btn-updateData\" href=\"javascript:;\" title=\"编辑数据\" data-id=\"{{ item.id }}\">\n                                <span class=\"glyphicon glyphicon-edit\"></span>\n                            </a>\n                            <a class=\"btn btn-info btn-transparent btn-deleteData\" title=\"删除数据\" data-id=\"{{ item.id }}\" data-placement=\"left\" data-toggle=\"confirmation\" data-original-title=\"确认删除?\">\n                                <span class=\"glyphicon glyphicon-trash\"></span>\n                            </a>\n                        </td>\n                    </tr>\n                    {{/each}}\n                    {{else}}\n                    <tr>\n                        <td colspan=\"5\">未搜索到符合该条件的记录！</td>\n                    </tr>\n                    {{ /if }}\n                </script>\n\n            </tbody>\n        </table>\n\n        <div id=\"pagination\" class=\"pagination-wrap\">\n            <ul id=\"pagination-content\" class=\"page_box\">\n\n            </ul>\n        </div>\n\n    </div>\n</div>\n\n<!--上传excel弹框-->\n<div class=\"modal fade modal-addData\" id=\"modal-addData\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\n    <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header clearfix\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n                <h4 class=\"modal-title\">新增数据</h4>\n            </div>\n            <div class=\"modal-body\">\n                <form class=\"\" action=\"\" id=\"modal-addData-form\">\n                    <table class=\"modal-table modal-addRoller-table\">\n                        <tr class=\"row-hospitalName none\">\n                            <td class=\"text-right\">医院名称</td>\n                            <td>\n                                <select class=\"form-control\" id=\"userId\" name=\"userId\" v-model=\"userId\">\n                                    <script type=\"text/html\" id=\"user-list-tpl\">\n                                        {{ if items && items.length > 0 }}\n                                        <option value=\"0\">请选择</option>\n                                        {{ each items as item i }}\n                                        <option value=\"{{item.id}}\">\n                                            {{ item.name }}\n                                        </option>\n                                        {{ /each }}\n                                        {{ else }}\n                                        <option value=\"\">\n                                            没有查到名称\n                                        </option>\n                                        {{ /if }}\n                                    </script>\n                                </select>\n                            </td>\n                            <td class=\"color-red\">\n                                <!--<span class=\"color-red\">*</span>-->\n                                <!--<span class=\"errorMsg\"></span>-->\n                            </td>\n                        </tr>\n                        <tr>\n                            <td class=\"text-right\">数据年份</td>\n                            <td>\n                                <select class=\"form-control mt10\" name=\"year\" v-model=\"year\" required=\"required\" data-vd-msg=\"请选择年份！\">\n                                    <option value=\"\">请选择</option>\n                                    <option value=\"2015\">2015</option>\n                                    <option value=\"2016\">2016</option>\n                                    <option value=\"2017\">2017</option>\n                                    <option value=\"2018\">2018</option>\n                                    <option value=\"2019\">2019</option>\n                                    <option value=\"2020\">2020</option>\n                                    <option value=\"2021\">2021</option>\n                                    <option value=\"2022\">2022</option>\n                                </select>\n                            </td>\n                            <td class=\"color-red\">\n                                <!--<span class=\"color-red\">*</span>-->\n                                <!--<span class=\"errorMsg\"></span>-->\n                            </td>\n                        </tr>\n                        <tr>\n                            <td class=\"text-right\">数据月份</td>\n                            <td>\n                                <select class=\"form-control mt10\" name=\"month\" v-model=\"month\" required=\"required\" data-vd-msg=\"请选择月份！\">\n                                    <option value=\"\">请选择</option>\n                                    <option value=\"01\">1月</option>\n                                    <option value=\"02\">2月</option>\n                                    <option value=\"03\">3月</option>\n                                    <option value=\"04\">4月</option>\n                                    <option value=\"05\">5月</option>\n                                    <option value=\"06\">6月</option>\n                                    <option value=\"07\">7月</option>\n                                    <option value=\"08\">8月</option>\n                                    <option value=\"09\">9月</option>\n                                    <option value=\"10\">10月</option>\n                                    <option value=\"11\">11月</option>\n                                    <option value=\"12\">12月</option>\n                                </select>\n                            </td>\n                            <td class=\"color-red\">\n                                <!--<span class=\"color-red\">*</span>-->\n                                <!--<span class=\"errorMsg\"></span>-->\n                            </td>\n                        </tr>\n                        <tr>\n                            <td class=\"text-right\">上传数据</td>\n                            <td class=\"privileges\">\n                                <input type=\"hidden\" v-model=\"id\" name=\"id\"/>\n                                <input type=\"hidden\" v-model=\"fileKey\" readonly required=\"required\" data-vd-msg=\"请上传数据！\" name=\"fileKey\"/>\n                                <input id=\"fileupload\" type=\"file\" class=\"none\" name=\"file\" hidden=\"hidden\" multiple>\n                                <span>{{fileKey}}</span>\n                                <!--<a href=\"{{dataUrl}}\" target=\"_blank\">下载</a>-->\n                            </td>\n                            <td class=\"color-red\">\n                                <span class=\"errorMsg\"></span>\n                            </td>\n                        </tr>\n                    </table>\n                </form>\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-gray btn-cancel\" data-dismiss=\"modal\">取消</button>\n                <button type=\"button\" class=\"btn btn-lightBlue btn-addDataConfirm\">确认</button>\n            </div>\n        </div>\n    </div>\n</div>\n\n").fadeIn(500);
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
                      model_Data.preMonth=(Number(model_Data.year)-1)+'-12-01';
                  }
  
                  model_Data.month=model_Data.year+'-'+model_Data.month+'-01';
  
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
