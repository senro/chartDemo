define('components/cacheIndex/cacheIndexManage.vue', function(require, exports, module) {

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _componentsUtilsAjaxJsx = require('components/utils/ajax.jsx');
  
  var _componentsUtilsAjaxJsx2 = _interopRequireDefault(_componentsUtilsAjaxJsx);
  
  exports['default'] = {
      data: function data() {
  
          return {
              totalItems: 0,
              search: {
  
                  page: 1,
                  size: 10
              },
              tableLoading: false,
              tableData: [],
              dialogFormType: 'add',
              dialogFormTitle: '增加',
              dialogFormVisible: false,
              dialogForm: {
  
                  id: '',
  
                  month: '',
  
                  season: '',
  
                  year: '',
  
                  monthIndex: '',
  
                  monthSale: '',
  
                  seasonIndex: '',
  
                  seasonSale: '',
  
                  yearIndex: '',
  
                  yearSale: '',
  
                  westMonthIndex: '',
  
                  westMonthSale: '',
  
                  westSeasonIndex: '',
  
                  westSeasonSale: '',
  
                  westYearIndex: '',
  
                  westYearSale: '',
  
                  eastMonthIndex: '',
  
                  eastMonthSale: '',
  
                  eastSeasonIndex: '',
  
                  eastSeasonSale: '',
  
                  eastYearIndex: '',
  
                  eastYearSale: ''
  
              },
              formLabelWidth: '120px'
          };
      },
      created: function created() {
          var vm = this;
  
          vm.getCacheIndex(vm.search);
      },
      methods: {
          getCacheIndex: function getCacheIndex(param) {
              /*ajax请求列表数据*/
              var vm = this;
              vm.tableLoading = true;
              (0, _componentsUtilsAjaxJsx2['default'])(window.apiHost + 'cacheIndex/getCacheIndex.do', param, function (data) {
                  vm.tableData = data.data.items;
                  vm.totalItems = parseInt(data.data.totalElements);
              }, function () {
                  vm.tableLoading = false;
              }, "get");
          },
          addCacheIndex: function addCacheIndex(param) {
              /*ajax新增数据*/
              var vm = this;
              vm.tableLoading = true;
              (0, _componentsUtilsAjaxJsx2['default'])(window.apiHost + 'cacheIndex/addCacheIndex.do', param, function (data) {
                  vm.$message('新增成功！');
                  vm.getCacheIndex(vm.search);
              }, function () {
                  vm.tableLoading = false;
              }, "get");
          },
          updateCacheIndex: function updateCacheIndex(param) {
              /*ajax修改数据*/
              var vm = this;
              vm.tableLoading = true;
              (0, _componentsUtilsAjaxJsx2['default'])(window.apiHost + 'cacheIndex/updateCacheIndex.do', param, function (data) {
                  vm.$message('修改成功！');
                  vm.getCacheIndex(vm.search);
              }, function () {
                  vm.tableLoading = false;
              }, "get");
          },
          deleteCacheIndex: function deleteCacheIndex(param) {
              /*ajax修改数据*/
              var vm = this;
              vm.tableLoading = true;
              (0, _componentsUtilsAjaxJsx2['default'])(window.apiHost + 'cacheIndex/deleteCacheIndex.do', param, function (data) {
                  vm.$message('删除成功！');
                  vm.getCacheIndex(vm.search);
              }, function () {
                  vm.tableLoading = false;
              }, "get");
          },
          handleEdit: function handleEdit(index, row) {
              var vm = this;
              console.log(index, row);
              this.dialogFormTitle = "修改";
              this.dialogFormType = "edit";
              this.dialogFormVisible = true;
  
              this.dialogForm.id = row.id;
  
              this.dialogForm.id = row.id;
  
              this.dialogForm.month = row.month;
  
              this.dialogForm.season = row.season;
  
              this.dialogForm.year = row.year;
  
              this.dialogForm.monthIndex = row.monthIndex;
  
              this.dialogForm.monthSale = row.monthSale;
  
              this.dialogForm.seasonIndex = row.seasonIndex;
  
              this.dialogForm.seasonSale = row.seasonSale;
  
              this.dialogForm.yearIndex = row.yearIndex;
  
              this.dialogForm.yearSale = row.yearSale;
  
              this.dialogForm.westMonthIndex = row.westMonthIndex;
  
              this.dialogForm.westMonthSale = row.westMonthSale;
  
              this.dialogForm.westSeasonIndex = row.westSeasonIndex;
  
              this.dialogForm.westSeasonSale = row.westSeasonSale;
  
              this.dialogForm.westYearIndex = row.westYearIndex;
  
              this.dialogForm.westYearSale = row.westYearSale;
  
              this.dialogForm.eastMonthIndex = row.eastMonthIndex;
  
              this.dialogForm.eastMonthSale = row.eastMonthSale;
  
              this.dialogForm.eastSeasonIndex = row.eastSeasonIndex;
  
              this.dialogForm.eastSeasonSale = row.eastSeasonSale;
  
              this.dialogForm.eastYearIndex = row.eastYearIndex;
  
              this.dialogForm.eastYearSale = row.eastYearSale;
          },
          handleDelete: function handleDelete(index, row) {
              var vm = this;
              console.log(index, row);
  
              vm.deleteCacheIndex({ id: row.id });
          },
          handleSizeChange: function handleSizeChange(val) {
              console.log('每页 ' + val + ' 条');
              this.search.size = val;
          },
          handleCurrentChange: function handleCurrentChange(val) {
              var vm = this;
              vm.search.page = val;
  
              vm.getCacheIndex(vm.search);
          },
          showAddDialog: function showAddDialog() {
  
              this.dialogFormTitle = "增加";
              this.dialogFormType = "add";
              this.dialogFormVisible = true;
  
              this.dialogForm.id = undefined;
  
              this.dialogForm.month = undefined;
  
              this.dialogForm.season = undefined;
  
              this.dialogForm.year = undefined;
  
              this.dialogForm.monthIndex = undefined;
  
              this.dialogForm.monthSale = undefined;
  
              this.dialogForm.seasonIndex = undefined;
  
              this.dialogForm.seasonSale = undefined;
  
              this.dialogForm.yearIndex = undefined;
  
              this.dialogForm.yearSale = undefined;
  
              this.dialogForm.westMonthIndex = undefined;
  
              this.dialogForm.westMonthSale = undefined;
  
              this.dialogForm.westSeasonIndex = undefined;
  
              this.dialogForm.westSeasonSale = undefined;
  
              this.dialogForm.westYearIndex = undefined;
  
              this.dialogForm.westYearSale = undefined;
  
              this.dialogForm.eastMonthIndex = undefined;
  
              this.dialogForm.eastMonthSale = undefined;
  
              this.dialogForm.eastSeasonIndex = undefined;
  
              this.dialogForm.eastSeasonSale = undefined;
  
              this.dialogForm.eastYearIndex = undefined;
  
              this.dialogForm.eastYearSale = undefined;
          },
          onSearchSubmit: function onSearchSubmit() {
              console.log('submit!');
              var vm = this;
  
              vm.getCacheIndex(vm.search);
          },
          onDialogFormSubmit: function onDialogFormSubmit() {
              var vm = this;
              console.log('submit!' + JSON.stringify(this.dialogForm));
  
              if (this.dialogFormType === 'add') {
  
                  this.dialogForm.id = undefined;
  
                  vm.addCacheIndex(this.dialogForm);
              } else {
                  vm.updateCacheIndex(this.dialogForm);
              }
              this.dialogFormVisible = false;
          }
      }
  };
  module.exports = exports['default'];
  //# sourceMappingURL=/chartDemo/static/dist/components/cacheIndex/cacheIndexManage.js.map
  
  ;
  (function(template){
  
  module && module.exports && (module.exports.template = template);
  
  exports && exports.default && (exports.default.template = template);
  
  })("\n<div id=\"cacheIndexManage\">\n    <el-form :inline=\"true\" :model=\"search\" class=\"form-search\">\n\n        <el-form-item class=\"pull-right\">\n            <el-button type=\"primary\" @click=\"showAddDialog\">增加</el-button>\n        </el-form-item>\n    </el-form>\n\n    <el-table\n            :data=\"tableData\"\n            v-loading=\"tableLoading\"\n            element-loading-text=\"拼命加载中\"\n            border\n            style=\"width: 100%\">\n\n\n        <el-table-column\n                inline-template\n                label=\"月份\"\n               >\n                     <span>\n                        {{ row.month }}\n                     </span>\n        </el-table-column>\n\n\n        <el-table-column\n                inline-template\n                label=\"季度\"\n               >\n                     <span>\n                        {{ row.season }}\n                     </span>\n        </el-table-column>\n\n\n        <el-table-column\n                inline-template\n                label=\"年份\"\n               >\n                     <span>\n                        {{ row.year }}\n                     </span>\n        </el-table-column>\n\n\n        <el-table-column\n                inline-template\n                label=\"月指数\"\n               >\n                     <span>\n                        {{ row.monthIndex }}\n                     </span>\n        </el-table-column>\n\n\n        <el-table-column\n                inline-template\n                label=\"月销售额\"\n               >\n                     <span>\n                        {{ row.monthSale }}\n                     </span>\n        </el-table-column>\n\n\n        <el-table-column\n                inline-template\n                label=\"季指数\"\n               >\n                     <span>\n                        {{ row.seasonIndex }}\n                     </span>\n        </el-table-column>\n\n\n        <el-table-column\n                inline-template\n                label=\"季销售额\"\n               >\n                     <span>\n                        {{ row.seasonSale }}\n                     </span>\n        </el-table-column>\n\n\n        <el-table-column\n                inline-template\n                label=\"年指数\"\n               >\n                     <span>\n                        {{ row.yearIndex }}\n                     </span>\n        </el-table-column>\n\n\n        <el-table-column\n                inline-template\n                label=\"年销售额\"\n               >\n                     <span>\n                        {{ row.yearSale }}\n                     </span>\n        </el-table-column>\n\n\n        <el-table-column\n                inline-template\n                label=\"西药月指数\"\n               >\n                     <span>\n                        {{ row.westMonthIndex }}\n                     </span>\n        </el-table-column>\n\n\n        <el-table-column\n                inline-template\n                label=\"西药月销售额\"\n               >\n                     <span>\n                        {{ row.westMonthSale }}\n                     </span>\n        </el-table-column>\n\n\n        <el-table-column\n                inline-template\n                label=\"西药季指数\"\n               >\n                     <span>\n                        {{ row.westSeasonIndex }}\n                     </span>\n        </el-table-column>\n\n\n        <el-table-column\n                inline-template\n                label=\"西药季销售额\"\n               >\n                     <span>\n                        {{ row.westSeasonSale }}\n                     </span>\n        </el-table-column>\n\n\n        <el-table-column\n                inline-template\n                label=\"西药年指数\"\n               >\n                     <span>\n                        {{ row.westYearIndex }}\n                     </span>\n        </el-table-column>\n\n\n        <el-table-column\n                inline-template\n                label=\"西药年销售额\"\n               >\n                     <span>\n                        {{ row.westYearSale }}\n                     </span>\n        </el-table-column>\n\n\n        <el-table-column\n                inline-template\n                label=\"中药月指数\"\n               >\n                     <span>\n                        {{ row.eastMonthIndex }}\n                     </span>\n        </el-table-column>\n\n\n        <el-table-column\n                inline-template\n                label=\"中药月销售额\"\n               >\n                     <span>\n                        {{ row.eastMonthSale }}\n                     </span>\n        </el-table-column>\n\n\n        <el-table-column\n                inline-template\n                label=\"中药季指数\"\n               >\n                     <span>\n                        {{ row.eastSeasonIndex }}\n                     </span>\n        </el-table-column>\n\n\n        <el-table-column\n                inline-template\n                label=\"中药季销售额\"\n               >\n                     <span>\n                        {{ row.eastSeasonSale }}\n                     </span>\n        </el-table-column>\n\n\n        <el-table-column\n                inline-template\n                label=\"中药年指数\"\n               >\n                     <span>\n                        {{ row.eastYearIndex }}\n                     </span>\n        </el-table-column>\n\n\n        <el-table-column\n                inline-template\n                label=\"中药年销售额\"\n               >\n                     <span>\n                        {{ row.eastYearSale }}\n                     </span>\n        </el-table-column>\n\n\n        <el-table-column\n                inline-template\n                label=\"创建时间\"\n               >\n                     <span>\n                        {{ row.createAt }}\n                     </span>\n        </el-table-column>\n\n\n        <el-table-column\n                inline-template\n                label=\"修改时间\"\n               >\n                     <span>\n                        {{ row.updateAt }}\n                     </span>\n        </el-table-column>\n\n\n        <el-table-column\n                :context=\"_self\"\n                inline-template\n                label=\"操作\">\n            <div>\n                <el-button\n                        size=\"small\"\n                        @click=\"handleEdit($index, row)\">\n                    编辑\n                </el-button>\n                <el-button\n                        size=\"small\"\n                        type=\"danger\"\n                        @click=\"handleDelete($index, row)\">\n                    删除\n                </el-button>\n            </div>\n        </el-table-column>\n    </el-table>\n\n    <el-pagination\n            class=\"pagination-list\"\n            @size-change=\"handleSizeChange\"\n            @current-change=\"handleCurrentChange\"\n            :current-page=\"search.page\"\n            :page-sizes=\"[10, 20, 50, 100]\"\n            :page-size=\"search.size\"\n            layout=\"total, sizes, prev, pager, next, jumper\"\n            :total=\"totalItems\">\n    </el-pagination>\n\n    <el-dialog :title=\"dialogFormTitle\" v-model=\"dialogFormVisible\">\n        <el-form :model=\"dialogForm\">\n\n            <el-form-item label=\"月份\" :label-width=\"formLabelWidth\">\n                <el-input v-model=\"dialogForm.month\" auto-complete=\"off\"></el-input>\n            </el-form-item>\n\n\n            <el-form-item label=\"季度\" :label-width=\"formLabelWidth\">\n                <el-input v-model=\"dialogForm.season\" auto-complete=\"off\"></el-input>\n            </el-form-item>\n\n\n            <el-form-item label=\"年份\" :label-width=\"formLabelWidth\">\n                <el-input v-model=\"dialogForm.year\" auto-complete=\"off\"></el-input>\n            </el-form-item>\n\n\n            <el-form-item label=\"月指数\" :label-width=\"formLabelWidth\">\n                <el-input v-model=\"dialogForm.monthIndex\" auto-complete=\"off\"></el-input>\n            </el-form-item>\n\n\n            <el-form-item label=\"月销售额\" :label-width=\"formLabelWidth\">\n                <el-input v-model=\"dialogForm.monthSale\" auto-complete=\"off\"></el-input>\n            </el-form-item>\n\n\n            <el-form-item label=\"季指数\" :label-width=\"formLabelWidth\">\n                <el-input v-model=\"dialogForm.seasonIndex\" auto-complete=\"off\"></el-input>\n            </el-form-item>\n\n\n            <el-form-item label=\"季销售额\" :label-width=\"formLabelWidth\">\n                <el-input v-model=\"dialogForm.seasonSale\" auto-complete=\"off\"></el-input>\n            </el-form-item>\n\n\n            <el-form-item label=\"年指数\" :label-width=\"formLabelWidth\">\n                <el-input v-model=\"dialogForm.yearIndex\" auto-complete=\"off\"></el-input>\n            </el-form-item>\n\n\n            <el-form-item label=\"年销售额\" :label-width=\"formLabelWidth\">\n                <el-input v-model=\"dialogForm.yearSale\" auto-complete=\"off\"></el-input>\n            </el-form-item>\n\n\n            <el-form-item label=\"西药月指数\" :label-width=\"formLabelWidth\">\n                <el-input v-model=\"dialogForm.westMonthIndex\" auto-complete=\"off\"></el-input>\n            </el-form-item>\n\n\n            <el-form-item label=\"西药月销售额\" :label-width=\"formLabelWidth\">\n                <el-input v-model=\"dialogForm.westMonthSale\" auto-complete=\"off\"></el-input>\n            </el-form-item>\n\n\n            <el-form-item label=\"西药季指数\" :label-width=\"formLabelWidth\">\n                <el-input v-model=\"dialogForm.westSeasonIndex\" auto-complete=\"off\"></el-input>\n            </el-form-item>\n\n\n            <el-form-item label=\"西药季销售额\" :label-width=\"formLabelWidth\">\n                <el-input v-model=\"dialogForm.westSeasonSale\" auto-complete=\"off\"></el-input>\n            </el-form-item>\n\n\n            <el-form-item label=\"西药年指数\" :label-width=\"formLabelWidth\">\n                <el-input v-model=\"dialogForm.westYearIndex\" auto-complete=\"off\"></el-input>\n            </el-form-item>\n\n\n            <el-form-item label=\"西药年销售额\" :label-width=\"formLabelWidth\">\n                <el-input v-model=\"dialogForm.westYearSale\" auto-complete=\"off\"></el-input>\n            </el-form-item>\n\n\n            <el-form-item label=\"中药月指数\" :label-width=\"formLabelWidth\">\n                <el-input v-model=\"dialogForm.eastMonthIndex\" auto-complete=\"off\"></el-input>\n            </el-form-item>\n\n\n            <el-form-item label=\"中药月销售额\" :label-width=\"formLabelWidth\">\n                <el-input v-model=\"dialogForm.eastMonthSale\" auto-complete=\"off\"></el-input>\n            </el-form-item>\n\n\n            <el-form-item label=\"中药季指数\" :label-width=\"formLabelWidth\">\n                <el-input v-model=\"dialogForm.eastSeasonIndex\" auto-complete=\"off\"></el-input>\n            </el-form-item>\n\n\n            <el-form-item label=\"中药季销售额\" :label-width=\"formLabelWidth\">\n                <el-input v-model=\"dialogForm.eastSeasonSale\" auto-complete=\"off\"></el-input>\n            </el-form-item>\n\n\n            <el-form-item label=\"中药年指数\" :label-width=\"formLabelWidth\">\n                <el-input v-model=\"dialogForm.eastYearIndex\" auto-complete=\"off\"></el-input>\n            </el-form-item>\n\n\n            <el-form-item label=\"中药年销售额\" :label-width=\"formLabelWidth\">\n                <el-input v-model=\"dialogForm.eastYearSale\" auto-complete=\"off\"></el-input>\n            </el-form-item>\n\n\n        </el-form>\n        <div slot=\"footer\" class=\"dialog-footer\">\n            <el-button @click=\"dialogFormVisible = false\">取 消</el-button>\n            <el-button type=\"primary\" @click=\"onDialogFormSubmit\">确 定</el-button>\n        </div>\n    </el-dialog>\n</div>\n");
  

});
