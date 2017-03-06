define('components/businessManage/dataManage/dataManage', function(require, exports, module) {

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
  var FormVars=require('node_modules/egis-formvars/formvars');
  //var validateForm=require('egis-validate').validateForm;
  var systemMessage=require('node_modules/egis-system-message/system-message');
  var xhr = require('node_modules/egis-xhr/xhr'),
      clearEmptyValue = xhr.clearEmptyValue;
  
  var $aside = $('aside');
  var Vue=require('node_modules/vue1.x/dist/vue');
  
  function render(){
      $aside.hide().html("\n<div class=\"page page-dataManage\">\n    <div class=\"page-tit\">\n        数据管理\n    </div>\n    <div class=\"page-search\">\n        <form role=\"form\" class=\"page-tit-form form-inline\" id=\"searchForm\">\n            <input type=\"hidden\" name=\"page\" value=\"1\">\n            <input type=\"hidden\" name=\"size\" value=\"20\">\n            <input type=\"hidden\" name=\"order\" value=\"desc\">\n            <div class=\"form-group\">\n                <label for=\"userId\">医院名称</label>\n                <select class=\"form-control\" id=\"userId\" name=\"userId\">\n                    <script type=\"text/html\" id=\"user-list-tpl\">\n                        {{ if items && items.length > 0 }}\n                        <option value=\"0\">请选择</option>\n                        {{ each items as item i }}\n                        <option value=\"{{item.id}}\">\n                            {{ item.name }}\n                        </option>\n                        {{ /each }}\n                        {{ else }}\n                        <option value=\"\">\n                            没有查到名称\n                        </option>\n                        {{ /if }}\n                    </script>\n                </select>\n            </div>\n            <div class=\"form-group\">\n                <label>药名</label>\n                <input type=\"text\" class=\"form-control\" name=\"drugName\">\n            </div>\n            <div class=\"form-group\">\n                <label>规格</label>\n                <input type=\"text\" class=\"form-control\" name=\"drugSpec\">\n            </div>\n            <div class=\"form-group\">\n                <label>厂家</label>\n                <input type=\"text\" class=\"form-control\" name=\"drugFactory\">\n            </div>\n            <div class=\"form-group\">\n                <label for=\"drugType\">类型</label>\n                <select class=\"form-control\" id=\"drugType\" name=\"drugType\">\n                    <option value=\"\">\n                        请选择\n                    </option>\n                    <option value=\"1\">\n                        中药\n                    </option>\n                    <option value=\"0\">\n                        西药\n                    </option>\n                </select>\n            </div>\n            <div class=\"form-group\">\n                <label for=\"isValid\">合理性</label>\n                <select class=\"form-control\" id=\"isValid\" name=\"isValid\">\n                    <option value=\"\">\n                        请选择\n                    </option>\n                    <option value=\"1\">\n                        合理\n                    </option>\n                    <option value=\"0\">\n                        不合理\n                    </option>\n                </select>\n            </div>\n            <div class=\"form-group\">\n                <label>所属年份</label>\n                <select class=\"form-control mt10\" name=\"year\">\n                    <option value=\"\">请选择</option>\n                    <option value=\"2015\">2015</option>\n                    <option value=\"2016\">2016</option>\n                    <option value=\"2017\">2017</option>\n                    <option value=\"2018\">2018</option>\n                    <option value=\"2019\">2019</option>\n                    <option value=\"2020\">2020</option>\n                    <option value=\"2021\">2021</option>\n                    <option value=\"2022\">2022</option>\n                </select>\n            </div>\n            <div class=\"form-group\">\n                <label>所属月份</label>\n                <select class=\"form-control mt10\" name=\"month\">\n                    <option value=\"\">请选择</option>\n                    <option value=\"01\">1月</option>\n                    <option value=\"02\">2月</option>\n                    <option value=\"03\">3月</option>\n                    <option value=\"04\">4月</option>\n                    <option value=\"05\">5月</option>\n                    <option value=\"06\">6月</option>\n                    <option value=\"07\">7月</option>\n                    <option value=\"08\">8月</option>\n                    <option value=\"09\">9月</option>\n                    <option value=\"10\">10月</option>\n                    <option value=\"11\">11月</option>\n                    <option value=\"12\">12月</option>\n                </select>\n            </div>\n            <!--<div class=\"form-group\">-->\n            <!--<label for=\"startDate\">绑定日期</label>-->\n            <!--<input class=\"form-control date-box\" disabled placeholder=\"开始时间\" id=\"startDate\" name=\"startDate\" type=\"text\"/>-->\n            <!--~-->\n            <!--<input class=\"form-control date-box\" disabled placeholder=\"结束时间\" name=\"endDate\" type=\"text\"/>-->\n            <!--</div>-->\n            <button type=\"submit\" class=\"btn btn-primary\" id=\"btn-search\">\n                查询\n            </button>\n        </form>\n    </div>\n    <div class=\"page-cont\">\n        <table id=\"listTable\" class=\"merchant-manage default-list box table table-hover table-bordered\">\n            <thead>\n            <tr>\n                <th>医院名称</th>\n                <th>药名</th>\n                <th>规格</th>\n                <th>厂家</th>\n                <th>类型</th>\n                <th>当月销量</th>\n                <th>当月价格</th>\n                <th>是否合理</th>\n                <th>数据所属月份</th>\n                <th>\n                    修改日期\n                    <a class=\"btn-list-sort\" href=\"javascript:;\" title=\"排序\">\n                        <span class=\"glyphicon glyphicon-sort\"></span>\n                    </a>\n                </th>\n                <th>操作</th>\n            </tr>\n            <tbody>\n\n                <script id=\"list-tpl\" type=\"text/html\">\n                    {{ if loading }}\n                    <tr>\n                        <td colspan=\"11\">\n                            <span class=\"icon-loading\"></span>\n                        </td>\n                    </tr>\n                    {{ else if items && items.length > 0 }}\n                    {{each items as item i}}\n                    {{ if i%2==0 }}\n                    <tr>\n                        {{ else }}\n                    <tr class=\"trBg\">\n                        {{ /if }}\n                        <td>\n                            {{ item.hospitalName }}\n                        </td>\n                        <td>\n                            {{ item.drugName }}\n                        </td>\n                        <td>\n                            {{ item.drugSpec }}\n                        </td>\n                        <td>\n                            {{ item.drugFactory }}\n                        </td>\n                        <td>\n                            {{ (item.drugType==1?\"中药\":\"西药\") }}\n                        </td>\n                        <td>\n                            {{ item.sale }}\n                        </td>\n                        <td>\n                            {{ item.price }}\n                        </td>\n                        <td>\n                            {{ (item.isValid==1?\"合理\":\"不合理\") }}\n                        </td>\n                        <td>\n                            {{ item.month }}\n                        </td>\n\n                        <td>\n                            <span title=\"{{ item.updateAt }}\">\n                                {{ item.updateAt }}\n                            </span>\n                        </td>\n                        <td>\n                            <!--<a class=\"btn btn-info btn-transparent btn-checkoutDrugRecord\" href=\"javascript:;\" title=\"查看数据\" data-id=\"{{ item.id }}\">-->\n                                <!--<span class=\"glyphicon glyphicon-eye-open\"></span>-->\n                            <!--</a>-->\n                            <a class=\"btn btn-info btn-transparent btn-modify btn-updateDrugRecord\" href=\"javascript:;\" title=\"编辑数据\" data-id=\"{{ item.id }}\">\n                                <span class=\"glyphicon glyphicon-edit\"></span>\n                            </a>\n                            <a class=\"btn btn-info btn-transparent btn-deleteDrugRecord\" title=\"删除数据\" data-id=\"{{ item.id }}\" data-placement=\"left\" data-toggle=\"confirmation\" data-original-title=\"确认删除?\">\n                                <span class=\"glyphicon glyphicon-trash\"></span>\n                            </a>\n                        </td>\n                    </tr>\n                    {{/each}}\n                    {{else}}\n                    <tr>\n                        <td colspan=\"11\">未搜索到符合该条件的记录！</td>\n                    </tr>\n                    {{ /if }}\n                </script>\n\n            </tbody>\n        </table>\n\n        <div id=\"pagination\" class=\"pagination-wrap\">\n            <ul id=\"pagination-content\" class=\"page_box\">\n\n            </ul>\n        </div>\n\n    </div>\n</div>\n\n<!--修改数据弹框-->\n<div class=\"modal fade modal-addDrugRecord\" id=\"modal-addDrugRecord\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\n    <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header clearfix\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n                <h4 class=\"modal-title\">修改数据</h4>\n            </div>\n            <div class=\"modal-body\">\n                <form class=\"\" action=\"\" id=\"modal-addDrugRecord-form\">\n                    <table class=\"modal-table modal-addRoller-table\">\n                        <tr>\n                            <td class=\"text-right\">医院名称</td>\n                            <td>\n                                <input type=\"hidden\" v-model=\"id\" name=\"id\"/>\n                                <input type=\"hidden\" v-model=\"userId\" name=\"userId\"/>\n                                <input type=\"hidden\" v-model=\"drugUnit\" name=\"drugUnit\"/>\n                                <input type=\"text\" class=\"form-control\" v-model=\"hospitalName\" name=\"hospitalName\" disabled required=\"required\" data-vd-msg=\"请填写名称！\" />\n                            </td>\n                            <td class=\"color-red\">\n                                <!--<span class=\"color-red\">*</span>-->\n                                <!--<span class=\"errorMsg\"></span>-->\n                            </td>\n                        </tr>\n                        <tr>\n                            <td class=\"text-right\">药名</td>\n                            <td>\n                                <input type=\"text\" class=\"form-control\" v-model=\"drugName\" disabled required=\"required\" data-vd-msg=\"请填写药名！\" name=\"drugName\"/>\n                            </td>\n                            <td class=\"color-red\">\n                                <!--<span class=\"color-red\">*</span>-->\n                                <!--<span class=\"errorMsg\"></span>-->\n                            </td>\n                        </tr>\n                        <tr>\n                            <td class=\"text-right\">规格</td>\n                            <td>\n                                <input type=\"text\" class=\"form-control\" v-model=\"drugSpec\" name=\"drugSpec\" disabled required=\"required\" data-vd-msg=\"请填写规格！\" />\n                            </td>\n                            <td class=\"color-red\">\n                                <!--<span class=\"color-red\">*</span>-->\n                                <!--<span class=\"errorMsg\"></span>-->\n                            </td>\n                        </tr>\n                        <tr>\n                            <td class=\"text-right\">厂家</td>\n                            <td>\n                                <input type=\"text\" class=\"form-control\" v-model=\"drugFactory\" name=\"drugFactory\" disabled required=\"required\" data-vd-msg=\"请填写厂家！\" />\n                            </td>\n                            <td class=\"color-red\">\n                                <!--<span class=\"color-red\">*</span>-->\n                                <!--<span class=\"errorMsg\"></span>-->\n                            </td>\n                        </tr>\n                        <tr>\n                            <td class=\"text-right\">类型</td>\n                            <td>\n                                <select class=\"form-control mt10\" name=\"drugType\" v-model=\"drugType\" disabled required=\"required\" data-vd-msg=\"请选择类型！\">\n                                    <option value=\"\">请选择</option>\n                                    <option value=\"1\">中药</option>\n                                    <option value=\"0\">西药</option>\n                                </select>\n                            </td>\n                            <td class=\"color-red\">\n                                <!--<span class=\"color-red\">*</span>-->\n                                <!--<span class=\"errorMsg\"></span>-->\n                            </td>\n                        </tr>\n                        <tr>\n                            <td class=\"text-right\">当月销量</td>\n                            <td>\n                                <input type=\"text\" class=\"form-control\" v-model=\"sale\" name=\"sale\" required=\"required\" data-vd-msg=\"请填写当月销量！\" />\n                            </td>\n                            <td class=\"color-red\">\n                                <!--<span class=\"color-red\">*</span>-->\n                                <!--<span class=\"errorMsg\"></span>-->\n                            </td>\n                        </tr>\n                        <tr>\n                            <td class=\"text-right\">当月价格</td>\n                            <td>\n                                <input type=\"text\" class=\"form-control\" v-model=\"price\" name=\"price\" required=\"required\" data-vd-msg=\"请填写当月价格！\" />\n                            </td>\n                            <td class=\"color-red\">\n                                <!--<span class=\"color-red\">*</span>-->\n                                <!--<span class=\"errorMsg\"></span>-->\n                            </td>\n                        </tr>\n                        <tr>\n                            <td class=\"text-right\">是否合理</td>\n                            <td>\n                                <select class=\"form-control mt10\" name=\"isValid\"  v-model=\"isValid\" disabled required=\"required\" data-vd-msg=\"请选择是否合理！\">\n                                    <option value=\"\">请选择</option>\n                                    <option value=\"1\">合理</option>\n                                    <option value=\"0\">不合理</option>\n                                </select>\n                            </td>\n                            <td class=\"color-red\">\n                                <!--<span class=\"color-red\">*</span>-->\n                                <!--<span class=\"errorMsg\"></span>-->\n                            </td>\n                        </tr>\n                        <tr>\n                            <td class=\"text-right\">所属年份</td>\n                            <td>\n                                <select class=\"form-control mt10\" name=\"year\" v-model=\"year\" disabled required=\"required\" data-vd-msg=\"请选择年份！\">\n                                    <option value=\"\">请选择</option>\n                                    <option value=\"2015\">2015</option>\n                                    <option value=\"2016\">2016</option>\n                                    <option value=\"2017\">2017</option>\n                                    <option value=\"2018\">2018</option>\n                                    <option value=\"2019\">2019</option>\n                                    <option value=\"2020\">2020</option>\n                                    <option value=\"2021\">2021</option>\n                                    <option value=\"2022\">2022</option>\n                                </select>\n                            </td>\n                            <td class=\"color-red\">\n                                <!--<span class=\"color-red\">*</span>-->\n                                <!--<span class=\"errorMsg\"></span>-->\n                            </td>\n                        </tr>\n                        <tr>\n                            <td class=\"text-right\">所属月份</td>\n                            <td>\n                                <select class=\"form-control mt10\" name=\"month\" v-model=\"month\" disabled required=\"required\" data-vd-msg=\"请选择月份！\">\n                                    <option value=\"\">请选择</option>\n                                    <option value=\"01\">1月</option>\n                                    <option value=\"02\">2月</option>\n                                    <option value=\"03\">3月</option>\n                                    <option value=\"04\">4月</option>\n                                    <option value=\"05\">5月</option>\n                                    <option value=\"06\">6月</option>\n                                    <option value=\"07\">7月</option>\n                                    <option value=\"08\">8月</option>\n                                    <option value=\"09\">9月</option>\n                                    <option value=\"10\">10月</option>\n                                    <option value=\"11\">11月</option>\n                                    <option value=\"12\">12月</option>\n                                </select>\n                            </td>\n                            <td class=\"color-red\">\n                                <!--<span class=\"color-red\">*</span>-->\n                                <!--<span class=\"errorMsg\"></span>-->\n                            </td>\n                        </tr>\n                    </table>\n                </form>\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-gray btn-cancel\" data-dismiss=\"modal\">取消</button>\n                <button type=\"button\" class=\"btn btn-lightBlue btn-addDrugRecordConfirm\">确认</button>\n            </div>\n        </div>\n    </div>\n</div>\n\n").fadeIn(500);
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
  
          var formVars=new FormVars($context.serializeArray());
  
          if(formVars.getItem('month') && !formVars.getItem('year')){
              systemMessage.alert('请先选择年份！');
              return false;
          }
          if(formVars.getItem('month') && formVars.getItem('year')){
              formVars.setItem('month',formVars.getItem('year')+"-"+formVars.getItem('month')+"-"+"01");
          }
          ajax(
              window.apiHost+'drugRecord/listDrugRecord.do',
              formVars.value(),//clearEmptyValue($context)
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
          month:'',
          year:''
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
                  dataObj.year=dataObj.month.split('-')[0];
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
  
                  model_DrugRecord.month=model_DrugRecord.year+'-'+model_DrugRecord.month+'-01';
  
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
