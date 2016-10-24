define('components/businessManage/dataManage/dataManage', function(require, exports, module) {

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
  
  var $aside = $('aside');
  var Vue=require('node_modules/vue/dist/vue.common');
  
  function render(){
      $aside.hide().html("\r\n<div class=\"page page-dataManage\">\r\n    <div class=\"page-tit\">\r\n        数据管理\r\n    </div>\r\n    <div class=\"page-search\">\r\n        <form role=\"form\" class=\"page-tit-form form-inline\" id=\"searchForm\">\r\n            <input type=\"hidden\" name=\"page\" value=\"1\">\r\n            <input type=\"hidden\" name=\"size\" value=\"20\">\r\n            <input type=\"hidden\" name=\"order\" value=\"desc\">\r\n            <div class=\"form-group\">\r\n                <label for=\"userId\">医院名称</label>\r\n                <select class=\"form-control\" id=\"userId\" name=\"userId\">\r\n                    <script type=\"text/html\" id=\"user-list-tpl\">\r\n                        {{ if items && items.length > 0 }}\r\n                        <option value=\"0\">请选择</option>\r\n                        {{ each items as item i }}\r\n                        <option value=\"{{item.id}}\">\r\n                            {{ item.name }}\r\n                        </option>\r\n                        {{ /each }}\r\n                        {{ else }}\r\n                        <option value=\"\">\r\n                            没有查到名称\r\n                        </option>\r\n                        {{ /if }}\r\n                    </script>\r\n                </select>\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <label>药名</label>\r\n                <input type=\"text\" class=\"form-control\" name=\"drugName\">\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <label>规格</label>\r\n                <input type=\"text\" class=\"form-control\" name=\"drugSpec\">\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <label>厂家</label>\r\n                <input type=\"text\" class=\"form-control\" name=\"drugFactory\">\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <label for=\"drugType\">类型</label>\r\n                <select class=\"form-control\" id=\"drugType\" name=\"drugType\">\r\n                    <option value=\"\">\r\n                        请选择\r\n                    </option>\r\n                    <option value=\"1\">\r\n                        中药\r\n                    </option>\r\n                    <option value=\"0\">\r\n                        西药\r\n                    </option>\r\n                </select>\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <label for=\"isValid\">合理性</label>\r\n                <select class=\"form-control\" id=\"isValid\" name=\"isValid\">\r\n                    <option value=\"\">\r\n                        请选择\r\n                    </option>\r\n                    <option value=\"1\">\r\n                        合理\r\n                    </option>\r\n                    <option value=\"0\">\r\n                        不合理\r\n                    </option>\r\n                </select>\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <label>所属月份</label>\r\n                <select class=\"form-control mt10\" name=\"month\">\r\n                    <option value=\"\">请选择</option>\r\n                    <option value=\"01\">1月</option>\r\n                    <option value=\"02\">2月</option>\r\n                    <option value=\"03\">3月</option>\r\n                    <option value=\"04\">4月</option>\r\n                    <option value=\"05\">5月</option>\r\n                    <option value=\"06\">6月</option>\r\n                    <option value=\"07\">7月</option>\r\n                    <option value=\"08\">8月</option>\r\n                    <option value=\"09\">9月</option>\r\n                    <option value=\"10\">10月</option>\r\n                    <option value=\"11\">11月</option>\r\n                    <option value=\"12\">12月</option>\r\n                </select>\r\n            </div>\r\n            <!--<div class=\"form-group\">-->\r\n            <!--<label for=\"startDate\">绑定日期</label>-->\r\n            <!--<input class=\"form-control date-box\" readonly placeholder=\"开始时间\" id=\"startDate\" name=\"startDate\" type=\"text\"/>-->\r\n            <!--~-->\r\n            <!--<input class=\"form-control date-box\" readonly placeholder=\"结束时间\" name=\"endDate\" type=\"text\"/>-->\r\n            <!--</div>-->\r\n            <button type=\"submit\" class=\"btn btn-primary\" id=\"btn-search\">\r\n                查询\r\n            </button>\r\n        </form>\r\n    </div>\r\n    <div class=\"page-cont\">\r\n        <table id=\"listTable\" class=\"merchant-manage default-list box table table-hover table-bordered\">\r\n            <thead>\r\n            <tr>\r\n                <th>医院名称</th>\r\n                <th>药名</th>\r\n                <th>规格</th>\r\n                <th>厂家</th>\r\n                <th>类型</th>\r\n                <th>当月销量</th>\r\n                <th>当月价格</th>\r\n                <th>是否合理</th>\r\n                <th>数据所属月份</th>\r\n                <th>\r\n                    修改日期\r\n                    <a class=\"btn-list-sort\" href=\"javascript:;\" title=\"排序\">\r\n                        <span class=\"glyphicon glyphicon-sort\"></span>\r\n                    </a>\r\n                </th>\r\n                <th>操作</th>\r\n            </tr>\r\n            <tbody>\r\n\r\n                <script id=\"list-tpl\" type=\"text/html\">\r\n                    {{ if loading }}\r\n                    <tr>\r\n                        <td colspan=\"11\">\r\n                            <span class=\"icon-loading\"></span>\r\n                        </td>\r\n                    </tr>\r\n                    {{ else if items && items.length > 0 }}\r\n                    {{each items as item i}}\r\n                    {{ if i%2==0 }}\r\n                    <tr>\r\n                        {{ else }}\r\n                    <tr class=\"trBg\">\r\n                        {{ /if }}\r\n                        <td>\r\n                            {{ item.hospitalName }}\r\n                        </td>\r\n                        <td>\r\n                            {{ item.drugName }}\r\n                        </td>\r\n                        <td>\r\n                            {{ item.drugSpec }}\r\n                        </td>\r\n                        <td>\r\n                            {{ item.drugFactory }}\r\n                        </td>\r\n                        <td>\r\n                            {{ (item.drugType==1?\"中药\":\"西药\") }}\r\n                        </td>\r\n                        <td>\r\n                            {{ item.sale }}\r\n                        </td>\r\n                        <td>\r\n                            {{ item.price }}\r\n                        </td>\r\n                        <td>\r\n                            {{ (item.isValid==1?\"合理\":\"不合理\") }}\r\n                        </td>\r\n                        <td>\r\n                            {{ item.month }}\r\n                        </td>\r\n\r\n                        <td>\r\n                            <span title=\"{{ item.updateAt }}\">\r\n                                {{ item.updateAt }}\r\n                            </span>\r\n                        </td>\r\n                        <td>\r\n                            <!--<a class=\"btn btn-info btn-transparent btn-checkoutDrugRecord\" href=\"javascript:;\" title=\"查看数据\" data-id=\"{{ item.id }}\">-->\r\n                                <!--<span class=\"glyphicon glyphicon-eye-open\"></span>-->\r\n                            <!--</a>-->\r\n                            <a class=\"btn btn-info btn-transparent btn-modify btn-updateDrugRecord\" href=\"javascript:;\" title=\"编辑数据\" data-id=\"{{ item.id }}\">\r\n                                <span class=\"glyphicon glyphicon-edit\"></span>\r\n                            </a>\r\n                            <!--<a class=\"btn btn-info btn-transparent btn-deleteDrugRecord\" title=\"删除数据\" data-id=\"{{ item.id }}\" data-placement=\"left\" data-toggle=\"confirmation\" data-original-title=\"确认删除?\">-->\r\n                                <!--<span class=\"glyphicon glyphicon-trash\"></span>-->\r\n                            <!--</a>-->\r\n                        </td>\r\n                    </tr>\r\n                    {{/each}}\r\n                    {{else}}\r\n                    <tr>\r\n                        <td colspan=\"11\">未搜索到符合该条件的记录！</td>\r\n                    </tr>\r\n                    {{ /if }}\r\n                </script>\r\n\r\n            </tbody>\r\n        </table>\r\n\r\n        <div id=\"pagination\" class=\"pagination-wrap\">\r\n            <ul id=\"pagination-content\" class=\"page_box\">\r\n\r\n            </ul>\r\n        </div>\r\n\r\n    </div>\r\n</div>\r\n\r\n<!--修改数据弹框-->\r\n<div class=\"modal fade modal-addDrugRecord\" id=\"modal-addDrugRecord\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header clearfix\">\r\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\r\n                <h4 class=\"modal-title\">修改数据</h4>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                <form class=\"\" action=\"\" id=\"modal-addDrugRecord-form\">\r\n                    <table class=\"modal-table modal-addRoller-table\">\r\n                        <tr>\r\n                            <td class=\"text-right\">医院名称</td>\r\n                            <td>\r\n                                <input type=\"hidden\" v-model=\"id\" name=\"id\"/>\r\n                                <input type=\"hidden\" v-model=\"userId\" name=\"userId\"/>\r\n                                <input type=\"hidden\" v-model=\"drugUnit\" name=\"drugUnit\"/>\r\n                                <input type=\"text\" class=\"form-control\" v-model=\"hospitalName\" name=\"hospitalName\" readonly required=\"required\" data-vd-msg=\"请填写名称！\" />\r\n                            </td>\r\n                            <td class=\"color-red\">\r\n                                <!--<span class=\"color-red\">*</span>-->\r\n                                <!--<span class=\"errorMsg\"></span>-->\r\n                            </td>\r\n                        </tr>\r\n                        <tr>\r\n                            <td class=\"text-right\">药名</td>\r\n                            <td>\r\n                                <input type=\"text\" class=\"form-control\" v-model=\"drugName\" readonly required=\"required\" data-vd-msg=\"请填写药名！\" name=\"drugName\"/>\r\n                            </td>\r\n                            <td class=\"color-red\">\r\n                                <!--<span class=\"color-red\">*</span>-->\r\n                                <!--<span class=\"errorMsg\"></span>-->\r\n                            </td>\r\n                        </tr>\r\n                        <tr>\r\n                            <td class=\"text-right\">规格</td>\r\n                            <td>\r\n                                <input type=\"text\" class=\"form-control\" v-model=\"drugSpec\" name=\"drugSpec\" readonly required=\"required\" data-vd-msg=\"请填写规格！\" />\r\n                            </td>\r\n                            <td class=\"color-red\">\r\n                                <!--<span class=\"color-red\">*</span>-->\r\n                                <!--<span class=\"errorMsg\"></span>-->\r\n                            </td>\r\n                        </tr>\r\n                        <tr>\r\n                            <td class=\"text-right\">厂家</td>\r\n                            <td>\r\n                                <input type=\"text\" class=\"form-control\" v-model=\"drugFactory\" name=\"drugFactory\" readonly required=\"required\" data-vd-msg=\"请填写厂家！\" />\r\n                            </td>\r\n                            <td class=\"color-red\">\r\n                                <!--<span class=\"color-red\">*</span>-->\r\n                                <!--<span class=\"errorMsg\"></span>-->\r\n                            </td>\r\n                        </tr>\r\n                        <tr>\r\n                            <td class=\"text-right\">类型</td>\r\n                            <td>\r\n                                <select class=\"form-control mt10\" name=\"drugType\" v-model=\"drugType\" readonly required=\"required\" data-vd-msg=\"请选择类型！\">\r\n                                    <option value=\"\">请选择</option>\r\n                                    <option value=\"1\">中药</option>\r\n                                    <option value=\"0\">西药</option>\r\n                                </select>\r\n                            </td>\r\n                            <td class=\"color-red\">\r\n                                <!--<span class=\"color-red\">*</span>-->\r\n                                <!--<span class=\"errorMsg\"></span>-->\r\n                            </td>\r\n                        </tr>\r\n                        <tr>\r\n                            <td class=\"text-right\">当月销量</td>\r\n                            <td>\r\n                                <input type=\"text\" class=\"form-control\" v-model=\"sale\" name=\"sale\" required=\"required\" data-vd-msg=\"请填写当月销量！\" />\r\n                            </td>\r\n                            <td class=\"color-red\">\r\n                                <!--<span class=\"color-red\">*</span>-->\r\n                                <!--<span class=\"errorMsg\"></span>-->\r\n                            </td>\r\n                        </tr>\r\n                        <tr>\r\n                            <td class=\"text-right\">当月价格</td>\r\n                            <td>\r\n                                <input type=\"text\" class=\"form-control\" v-model=\"price\" name=\"price\" required=\"required\" data-vd-msg=\"请填写当月价格！\" />\r\n                            </td>\r\n                            <td class=\"color-red\">\r\n                                <!--<span class=\"color-red\">*</span>-->\r\n                                <!--<span class=\"errorMsg\"></span>-->\r\n                            </td>\r\n                        </tr>\r\n                        <tr>\r\n                            <td class=\"text-right\">是否合理</td>\r\n                            <td>\r\n                                <select class=\"form-control mt10\" name=\"isValid\"  v-model=\"isValid\" readonly required=\"required\" data-vd-msg=\"请选择是否合理！\">\r\n                                    <option value=\"\">请选择</option>\r\n                                    <option value=\"1\">合理</option>\r\n                                    <option value=\"0\">不合理</option>\r\n                                </select>\r\n                            </td>\r\n                            <td class=\"color-red\">\r\n                                <!--<span class=\"color-red\">*</span>-->\r\n                                <!--<span class=\"errorMsg\"></span>-->\r\n                            </td>\r\n                        </tr>\r\n                        <tr>\r\n                            <td class=\"text-right\">所属月份</td>\r\n                            <td>\r\n                                <select class=\"form-control mt10\" name=\"month\" v-model=\"month\" readonly required=\"required\" data-vd-msg=\"请选择月份！\">\r\n                                    <option value=\"\">请选择</option>\r\n                                    <option value=\"01\">1月</option>\r\n                                    <option value=\"02\">2月</option>\r\n                                    <option value=\"03\">3月</option>\r\n                                    <option value=\"04\">4月</option>\r\n                                    <option value=\"05\">5月</option>\r\n                                    <option value=\"06\">6月</option>\r\n                                    <option value=\"07\">7月</option>\r\n                                    <option value=\"08\">8月</option>\r\n                                    <option value=\"09\">9月</option>\r\n                                    <option value=\"10\">10月</option>\r\n                                    <option value=\"11\">11月</option>\r\n                                    <option value=\"12\">12月</option>\r\n                                </select>\r\n                            </td>\r\n                            <td class=\"color-red\">\r\n                                <!--<span class=\"color-red\">*</span>-->\r\n                                <!--<span class=\"errorMsg\"></span>-->\r\n                            </td>\r\n                        </tr>\r\n                    </table>\r\n                </form>\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"btn btn-gray btn-cancel\" data-dismiss=\"modal\">取消</button>\r\n                <button type=\"button\" class=\"btn btn-lightBlue btn-addDrugRecordConfirm\">确认</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n").fadeIn(500);
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
  
                  model_DrugRecord.month=tempDate.getFullYear()+'-'+model_DrugRecord.month+'-01';
  
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

});
