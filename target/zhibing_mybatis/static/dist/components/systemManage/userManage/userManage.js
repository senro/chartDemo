define('components/systemManage/userManage/userManage.jsx', function(require, exports, module) {

  'use strict';
  
  var $ = require('node_modules/egis-jquery/jquery');
  require('node_modules/egis-bootstrap/confirmation')();
  require('node_modules/egis-bootstrap/bootstrap')();
  var ajax = require('node_modules/egis-ajax/ajax').ajax;
  var pagination = require('node_modules/egis-pagination/pagination');
  var template = require('node_modules/egis-template/template');
  var loadCss = require('node_modules/egis-load-css/load-css');
  var checkbox = require('node_modules/egis-checkbox/checkbox');
  //var validateForm=require('egis-validate').validateForm;
  var systemMessage = require('node_modules/egis-system-message/system-message');
  var xhr = require('node_modules/egis-xhr/xhr'),
      clearEmptyValue = xhr.clearEmptyValue;
  //var utilUser = require('components/util/utilUser');
  var $aside = $('aside');
  var Vue = require('node_modules/vue/dist/vue.common');
  var getQueryString = require('node_modules/egis-get-query-string/get-query-string');
  var regs = require('node_modules/egis-validate/regs');
  var validateForm = require('node_modules/egis-validate/validate').validateForm;
  
  function render() {
      $aside.html("<div class=\"page page-userManage\">\r\n    <div class=\"page-tit\">\r\n        <form role=\"form\" class=\"page-tit-form\" id=\"searchForm\">\r\n            用户管理\r\n            <input type=\"hidden\" name=\"page\" value=\"1\">\r\n            <input type=\"hidden\" name=\"size\" value=\"10\">\r\n            <input type=\"hidden\" name=\"order\" value=\"desc\">\r\n            <a href=\"javascript:;\" class=\"btn btn-primary pull-right btn-addUser\" id=\"btn-addUser\">\r\n                <span class=\"glyphicon glyphicon-plus\"></span>\r\n                创建新用户\r\n            </a>\r\n        </form>\r\n    </div>\r\n    <div class=\"page-cont\">\r\n        <table id=\"listTable\" class=\"merchant-manage default-list box table table-hover table-bordered\">\r\n            <thead>\r\n            <tr>\r\n                <th>用户</th>\r\n                <th>医院名称</th>\r\n                <th>角色</th>\r\n                <!--<th>状态</th>-->\r\n                <th>修改日期</th>\r\n                <th>操作</th>\r\n            </tr>\r\n            <tbody>\r\n                <script type=\"text/html\" id=\"list-tpl\">\r\n                    {{ if items && items.length > 0 }}\r\n                    {{each items as item i}}\r\n                    <tr>\r\n                        <td>{{ item.email }}</td>\r\n                        <td>{{ item.name }}</td>\r\n                        <td>\r\n                            {{ if item.roleId == 1}}\r\n                                超级管理员\r\n                            {{ else if item.roleId == 2}}\r\n                                审核员\r\n                            {{else}}\r\n                                普通用户\r\n                            {{/if}}\r\n                        </td>\r\n                        <!--<td>{{ item.state }}</td>-->\r\n                        <td>{{ item.updateAt }}</td>\r\n                        <td>\r\n                            <!--<a class=\"btn btn-info btn-transparent btn-modify\" title=\"已启用\" data-toggle=\"modal\" data-id=\"{{ item.id }}\" data-target=\"#modal-modifyService1\">-->\r\n                                <!--<span class=\"glyphicon glyphicon-ok-circle\"></span>-->\r\n                            <!--</a>-->\r\n                            <a class=\"btn btn-info btn-transparent btn-updateUser\" title=\"编辑用户\" data-id=\"{{ item.id }}\">\r\n                                <span class=\"glyphicon glyphicon-edit\"></span>\r\n                            </a>\r\n                            <a class=\"btn btn-info btn-transparent btn-delete\" title=\"删除用户\" data-id=\"{{ item.id }}\" data-name=\"{{ item.name }}\" data-placement=\"left\" data-toggle=\"confirmation\" data-original-title=\"确认删除?\">\r\n                                <span class=\"glyphicon glyphicon-trash\"></span>\r\n                            </a>\r\n                        </td>\r\n                    </tr>\r\n                    {{/each}}\r\n                    {{else}}\r\n                    <tr>\r\n                        <td colspan=\"5\">未搜索到符合该条件的记录！</td>\r\n                    </tr>\r\n                    {{ /if }}\r\n                </script>\r\n            </tbody>\r\n        </table>\r\n\r\n        <div id=\"pagination\" class=\"pagination-wrap\">\r\n            <ul id=\"pagination-content\" class=\"page_box\">\r\n\r\n            </ul>\r\n        </div>\r\n\r\n    </div>\r\n\r\n</div>\r\n\r\n<!--新增用户弹框-->\r\n<div class=\"modal fade modal-addUser\" id=\"modal-addUser\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header clearfix\">\r\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\r\n                <h4 class=\"modal-title\">新增用户</h4>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                <form class=\"\" action=\"\" id=\"modal-addUser-form\">\r\n                    <table class=\"modal-table modal-addUser-table\">\r\n                        <tr>\r\n                            <td class=\"text-right\">账号</td>\r\n                            <td>\r\n                                <input type=\"text\" name=\"email\" v-model=\"email\" required=\"required\" class=\"form-control unitInput\"\r\n                                       data-vd-msg=\"请输入账号\" data-vd-type=\"email\" data-vd-typeMsg=\"请输入一个邮箱\" placeholder=\"请输入一个邮箱\"/>\r\n                            </td>\r\n                            <td class=\"color-red\">\r\n                                <span class=\"color-red\">*</span>\r\n                                <span class=\"errowMsg\"></span>\r\n                            </td>\r\n                        </tr>\r\n                        <tr>\r\n                            <td class=\"text-right\">医院名称</td>\r\n                            <td>\r\n                                <input type=\"text\" name=\"name\" v-model=\"name\" required=\"required\" class=\"form-control unitInput\"\r\n                                       data-vd-msg=\"请输入名称\"/>\r\n                            </td>\r\n                            <td class=\"color-red\">\r\n                                <span class=\"color-red\">*</span>\r\n                                <span class=\"errowMsg\"></span>\r\n                            </td>\r\n                        </tr>\r\n                        <tr>\r\n                            <td class=\"text-right\">密码</td>\r\n                            <td>\r\n                                <input type=\"password\" name=\"password\" v-model=\"password\" required=\"required\"\r\n                                       class=\"form-control unitInput\" data-vd-msg=\"请输入密码\"/>\r\n                            </td>\r\n                            <td class=\"color-red\">\r\n                                <span class=\"color-red\">*</span>\r\n                                <span class=\"errowMsg\"></span>\r\n                            </td>\r\n                        </tr>\r\n                        <tr>\r\n                            <td class=\"text-right\">确认密码</td>\r\n                            <td>\r\n                                <input type=\"password\" name=\"rePassword\" v-model=\"rePassword\" required=\"required\"\r\n                                       class=\"form-control unitInput\" data-vd-msg=\"请输入确认密码\"/>\r\n                            </td>\r\n                            <td class=\"color-red\">\r\n                                <span class=\"color-red\">*</span>\r\n                                <span class=\"errowMsg\"></span>\r\n                            </td>\r\n                        </tr>\r\n                        <tr>\r\n                            <td class=\"text-right\">角色</td>\r\n                            <td>\r\n                                <label>\r\n                                    <input type=\"radio\" name=\"roleId\" v-model=\"roleId\" value=\"1\" required=\"required\" data-vd-msg=\"请选择一个角色\">\r\n                                    超级管理员\r\n                                </label>\r\n\r\n                                <label>\r\n                                    <input type=\"radio\" name=\"roleId\" v-model=\"roleId\" value=\"2\" required=\"required\" data-vd-msg=\"请选择一个角色\">\r\n                                    审核员\r\n                                </label>\r\n\r\n                                <label>\r\n                                    <input type=\"radio\" name=\"roleId\" v-model=\"roleId\" value=\"3\" required=\"required\" data-vd-msg=\"请选择一个角色\">\r\n                                    普通用户\r\n                                </label>\r\n                            </td>\r\n                            <td class=\"color-red\">\r\n                                <span class=\"errowMsg\"></span>\r\n                            </td>\r\n                        </tr>\r\n                    </table>\r\n                </form>\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"btn btn-gray btn-cancel\" data-dismiss=\"modal\">取消</button>\r\n                <button type=\"button\" class=\"btn btn-lightBlue btn-addUserConfirm\">确认</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");
  
      var $searchForm = $('#searchForm'),
          $pageNum = $searchForm.find('input[name=page]'),
          $pageSize = $searchForm.find('input[name=size]'),
          $pagination = $('#pagination');
      /*列表展示*/
      var listRender = template.compile($('#list-tpl').html());
      $searchForm.on('submit', function (event) {
          var $context = $(this),
              $submit = $context.find('input[type=submit]');
  
          if (event) {
              event.preventDefault();
          }
          if ($submit.prop("disabled")) {
              return false;
          }
          ajax(window.apiHost + 'users/listUser.do', clearEmptyValue($context), function (data) {
              var dataObj = data.data || {};
  
              $('.page-userManage #listTable').find('tbody').html(listRender(dataObj));
  
              /*删除*/
              $('.page-userManage #listTable .btn-delete').confirmation({
                  btnOkLabel: '确认',
                  btnCancelLabel: '取消',
                  onShow: function onShow(event, element) {},
                  onHide: function onHide(event, element) {},
                  onConfirm: function onConfirm(event, element) {
                      var id = $(element).attr('data-id');
                      var name = $(element).attr('data-name');
                      if (name != 'superDevAdmin') {
                          ajax(window.apiHost + 'users/deleteUser.do', { id: id }, function (data) {
                              $searchForm.trigger('submit');
                              systemMessage.info("删除用户成功！");
                          }, null, null, 'get');
                      } else {
                          systemMessage.alert("此管理员不能被删除！");
                      }
                  }
              });
  
              //分页
              $('#pagination-content').pagination({
                  $form: $context,
                  first: "<<",
                  prev: "<",
                  next: ">",
                  last: ">>",
                  pageSize: parseInt($pageSize.val()),
                  totalSize: dataObj.totalElements,
                  info: true,
                  infoContainer: '.pagination-wrap',
                  paginationInfoTpl: '<div class="pagination-TotalInfo">总条数 ' + dataObj.totalElements + ' 条</div>' + '<div class="pagination-info-content">' + '<input type="text" class="info-currentPage" name="currentPage" />' + '&nbsp;/&nbsp;' + dataObj.totalPages + '页&nbsp;&nbsp;' + '<a href="javascript:;" class="info-goToPage">GO</a>' + '</div>',
                  visiblePages: 5,
                  onPageClick: function onPageClick(event, page) {
                      $pageNum.val(page);
                      $context.trigger('submit');
                  }
              });
          }, function () {
              $submit.prop("disabled", true); // 禁用
          }, function () {
              $submit.prop("disabled", false); // 启用
          }, 'get');
      }).trigger('submit');
  
      var model_User = {
          id: 0,
          email: '',
          name: "",
          password: "",
          rePassword: "",
          roleId: ""
      };
      var $addUserModal = $('#modal-addUser');
  
      //用vueJs 实现双向同步
      //Vue.config.debug = false;
      function initVue() {
          return new Vue({
              el: '#modal-addUser',
              data: model_User
          });
      }
      initVue();
      //新增用户
      var submitType = 'add';
  
      $('.btn-addUser').click(function () {
          $addUserModal.modal('show');
          $addUserModal.find('.modal-title').html('新增用户');
          $addUserModal.find('form')[0].reset();
          submitType = 'add';
          return false;
      });
  
      $('.page-userManage').on('click', '.btn-updateUser', function () {
          $addUserModal.modal('show');
          $addUserModal.find('.modal-title').html('修改用户');
          $addUserModal.find('form')[0].reset();
          submitType = 'edit';
          var id = $(this).attr('data-id');
  
          //获取用户详情
          ajax(window.apiHost + 'users/getUserById.do', {
              id: id
          }, function (data) {
              var dataObj = data.data || {};
              model_User = $.extend(model_User, dataObj);
          }, function () {}, function () {}, 'post');
          return false;
      });
  
      $addUserModal.find('.btn-addUserConfirm').click(function () {
          var $this = $(this);
          if (!$this.hasClass('disable')) {
              if (validateForm($addUserModal.find('form'))) {
                  if (model_User.password == model_User.rePassword) {
                      var url, msg;
                      if (submitType == 'add') {
                          url = window.apiHost + 'users/addUser.do';
                          msg = '新增用户成功！';
                      } else {
                          url = window.apiHost + 'users/updateUser.do';
                          msg = '修改用户成功！';
                      }
                      ajax(url, model_User, function (data) {
                          var dataObj = data.data || {};
                          systemMessage.info(msg);
                          $addUserModal.modal('hide');
                          $searchForm.trigger('submit');
                      }, function () {
                          $this.prop("disabled", true); // 禁用
                      }, function () {
                          $this.prop("disabled", false); // 启用
                      }, 'post');
                  } else {
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
  //# sourceMappingURL=/chartDemo/static/dist/components/systemManage/userManage/userManage.js.map
  

});
