define("components/businessManage/dataManage/dataManage",function(n,r,t){function e(){function n(){return new u({el:"#modal-addDrugRecord",data:b})}c.hide().html('\r\n<div class="page page-dataManage">\r\n    <div class="page-tit">\r\n        数据管理\r\n    </div>\r\n    <div class="page-search">\r\n        <form role="form" class="page-tit-form form-inline" id="searchForm">\r\n            <input type="hidden" name="page" value="1">\r\n            <input type="hidden" name="size" value="20">\r\n            <input type="hidden" name="order" value="desc">\r\n            <div class="form-group">\r\n                <label for="userId">医院名称</label>\r\n                <select class="form-control" id="userId" name="userId">\r\n                    <script type="text/html" id="user-list-tpl">\r\n                        {{ if items && items.length > 0 }}\r\n                        <option value="0">请选择</option>\r\n                        {{ each items as item i }}\r\n                        <option value="{{item.id}}">\r\n                            {{ item.name }}\r\n                        </option>\r\n                        {{ /each }}\r\n                        {{ else }}\r\n                        <option value="">\r\n                            没有查到名称\r\n                        </option>\r\n                        {{ /if }}\r\n                    </script>\r\n                </select>\r\n            </div>\r\n            <div class="form-group">\r\n                <label>药名</label>\r\n                <input type="text" class="form-control" name="drugName">\r\n            </div>\r\n            <div class="form-group">\r\n                <label>规格</label>\r\n                <input type="text" class="form-control" name="drugSpec">\r\n            </div>\r\n            <div class="form-group">\r\n                <label>厂家</label>\r\n                <input type="text" class="form-control" name="drugFactory">\r\n            </div>\r\n            <div class="form-group">\r\n                <label for="drugType">类型</label>\r\n                <select class="form-control" id="drugType" name="drugType">\r\n                    <option value="">\r\n                        请选择\r\n                    </option>\r\n                    <option value="1">\r\n                        中药\r\n                    </option>\r\n                    <option value="0">\r\n                        西药\r\n                    </option>\r\n                </select>\r\n            </div>\r\n            <div class="form-group">\r\n                <label for="isValid">合理性</label>\r\n                <select class="form-control" id="isValid" name="isValid">\r\n                    <option value="">\r\n                        请选择\r\n                    </option>\r\n                    <option value="1">\r\n                        合理\r\n                    </option>\r\n                    <option value="0">\r\n                        不合理\r\n                    </option>\r\n                </select>\r\n            </div>\r\n            <div class="form-group">\r\n                <label>所属年份</label>\r\n                <select class="form-control mt10" name="year">\r\n                    <option value="">请选择</option>\r\n                    <option value="2015">2015</option>\r\n                    <option value="2016">2016</option>\r\n                    <option value="2017">2017</option>\r\n                    <option value="2018">2018</option>\r\n                    <option value="2019">2019</option>\r\n                    <option value="2020">2020</option>\r\n                    <option value="2021">2021</option>\r\n                    <option value="2022">2022</option>\r\n                </select>\r\n            </div>\r\n            <div class="form-group">\r\n                <label>所属月份</label>\r\n                <select class="form-control mt10" name="month">\r\n                    <option value="">请选择</option>\r\n                    <option value="01">1月</option>\r\n                    <option value="02">2月</option>\r\n                    <option value="03">3月</option>\r\n                    <option value="04">4月</option>\r\n                    <option value="05">5月</option>\r\n                    <option value="06">6月</option>\r\n                    <option value="07">7月</option>\r\n                    <option value="08">8月</option>\r\n                    <option value="09">9月</option>\r\n                    <option value="10">10月</option>\r\n                    <option value="11">11月</option>\r\n                    <option value="12">12月</option>\r\n                </select>\r\n            </div>\r\n            <!--<div class="form-group">-->\r\n            <!--<label for="startDate">绑定日期</label>-->\r\n            <!--<input class="form-control date-box" disabled placeholder="开始时间" id="startDate" name="startDate" type="text"/>-->\r\n            <!--~-->\r\n            <!--<input class="form-control date-box" disabled placeholder="结束时间" name="endDate" type="text"/>-->\r\n            <!--</div>-->\r\n            <button type="submit" class="btn btn-primary" id="btn-search">\r\n                查询\r\n            </button>\r\n        </form>\r\n    </div>\r\n    <div class="page-cont">\r\n        <table id="listTable" class="merchant-manage default-list box table table-hover table-bordered">\r\n            <thead>\r\n            <tr>\r\n                <th>医院名称</th>\r\n                <th>药名</th>\r\n                <th>规格</th>\r\n                <th>厂家</th>\r\n                <th>类型</th>\r\n                <th>当月销量</th>\r\n                <th>当月价格</th>\r\n                <th>是否合理</th>\r\n                <th>数据所属月份</th>\r\n                <th>\r\n                    修改日期\r\n                    <a class="btn-list-sort" href="javascript:;" title="排序">\r\n                        <span class="glyphicon glyphicon-sort"></span>\r\n                    </a>\r\n                </th>\r\n                <th>操作</th>\r\n            </tr>\r\n            <tbody>\r\n\r\n                <script id="list-tpl" type="text/html">\r\n                    {{ if loading }}\r\n                    <tr>\r\n                        <td colspan="11">\r\n                            <span class="icon-loading"></span>\r\n                        </td>\r\n                    </tr>\r\n                    {{ else if items && items.length > 0 }}\r\n                    {{each items as item i}}\r\n                    {{ if i%2==0 }}\r\n                    <tr>\r\n                        {{ else }}\r\n                    <tr class="trBg">\r\n                        {{ /if }}\r\n                        <td>\r\n                            {{ item.hospitalName }}\r\n                        </td>\r\n                        <td>\r\n                            {{ item.drugName }}\r\n                        </td>\r\n                        <td>\r\n                            {{ item.drugSpec }}\r\n                        </td>\r\n                        <td>\r\n                            {{ item.drugFactory }}\r\n                        </td>\r\n                        <td>\r\n                            {{ (item.drugType==1?"中药":"西药") }}\r\n                        </td>\r\n                        <td>\r\n                            {{ item.sale }}\r\n                        </td>\r\n                        <td>\r\n                            {{ item.price }}\r\n                        </td>\r\n                        <td>\r\n                            {{ (item.isValid==1?"合理":"不合理") }}\r\n                        </td>\r\n                        <td>\r\n                            {{ item.month }}\r\n                        </td>\r\n\r\n                        <td>\r\n                            <span title="{{ item.updateAt }}">\r\n                                {{ item.updateAt }}\r\n                            </span>\r\n                        </td>\r\n                        <td>\r\n                            <!--<a class="btn btn-info btn-transparent btn-checkoutDrugRecord" href="javascript:;" title="查看数据" data-id="{{ item.id }}">-->\r\n                                <!--<span class="glyphicon glyphicon-eye-open"></span>-->\r\n                            <!--</a>-->\r\n                            <a class="btn btn-info btn-transparent btn-modify btn-updateDrugRecord" href="javascript:;" title="编辑数据" data-id="{{ item.id }}">\r\n                                <span class="glyphicon glyphicon-edit"></span>\r\n                            </a>\r\n                            <a class="btn btn-info btn-transparent btn-deleteDrugRecord" title="删除数据" data-id="{{ item.id }}" data-placement="left" data-toggle="confirmation" data-original-title="确认删除?">\r\n                                <span class="glyphicon glyphicon-trash"></span>\r\n                            </a>\r\n                        </td>\r\n                    </tr>\r\n                    {{/each}}\r\n                    {{else}}\r\n                    <tr>\r\n                        <td colspan="11">未搜索到符合该条件的记录！</td>\r\n                    </tr>\r\n                    {{ /if }}\r\n                </script>\r\n\r\n            </tbody>\r\n        </table>\r\n\r\n        <div id="pagination" class="pagination-wrap">\r\n            <ul id="pagination-content" class="page_box">\r\n\r\n            </ul>\r\n        </div>\r\n\r\n    </div>\r\n</div>\r\n\r\n<!--修改数据弹框-->\r\n<div class="modal fade modal-addDrugRecord" id="modal-addDrugRecord" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\r\n    <div class="modal-dialog">\r\n        <div class="modal-content">\r\n            <div class="modal-header clearfix">\r\n                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\r\n                <h4 class="modal-title">修改数据</h4>\r\n            </div>\r\n            <div class="modal-body">\r\n                <form class="" action="" id="modal-addDrugRecord-form">\r\n                    <table class="modal-table modal-addRoller-table">\r\n                        <tr>\r\n                            <td class="text-right">医院名称</td>\r\n                            <td>\r\n                                <input type="hidden" v-model="id" name="id"/>\r\n                                <input type="hidden" v-model="userId" name="userId"/>\r\n                                <input type="hidden" v-model="drugUnit" name="drugUnit"/>\r\n                                <input type="text" class="form-control" v-model="hospitalName" name="hospitalName" disabled required="required" data-vd-msg="请填写名称！" />\r\n                            </td>\r\n                            <td class="color-red">\r\n                                <!--<span class="color-red">*</span>-->\r\n                                <!--<span class="errorMsg"></span>-->\r\n                            </td>\r\n                        </tr>\r\n                        <tr>\r\n                            <td class="text-right">药名</td>\r\n                            <td>\r\n                                <input type="text" class="form-control" v-model="drugName" disabled required="required" data-vd-msg="请填写药名！" name="drugName"/>\r\n                            </td>\r\n                            <td class="color-red">\r\n                                <!--<span class="color-red">*</span>-->\r\n                                <!--<span class="errorMsg"></span>-->\r\n                            </td>\r\n                        </tr>\r\n                        <tr>\r\n                            <td class="text-right">规格</td>\r\n                            <td>\r\n                                <input type="text" class="form-control" v-model="drugSpec" name="drugSpec" disabled required="required" data-vd-msg="请填写规格！" />\r\n                            </td>\r\n                            <td class="color-red">\r\n                                <!--<span class="color-red">*</span>-->\r\n                                <!--<span class="errorMsg"></span>-->\r\n                            </td>\r\n                        </tr>\r\n                        <tr>\r\n                            <td class="text-right">厂家</td>\r\n                            <td>\r\n                                <input type="text" class="form-control" v-model="drugFactory" name="drugFactory" disabled required="required" data-vd-msg="请填写厂家！" />\r\n                            </td>\r\n                            <td class="color-red">\r\n                                <!--<span class="color-red">*</span>-->\r\n                                <!--<span class="errorMsg"></span>-->\r\n                            </td>\r\n                        </tr>\r\n                        <tr>\r\n                            <td class="text-right">类型</td>\r\n                            <td>\r\n                                <select class="form-control mt10" name="drugType" v-model="drugType" disabled required="required" data-vd-msg="请选择类型！">\r\n                                    <option value="">请选择</option>\r\n                                    <option value="1">中药</option>\r\n                                    <option value="0">西药</option>\r\n                                </select>\r\n                            </td>\r\n                            <td class="color-red">\r\n                                <!--<span class="color-red">*</span>-->\r\n                                <!--<span class="errorMsg"></span>-->\r\n                            </td>\r\n                        </tr>\r\n                        <tr>\r\n                            <td class="text-right">当月销量</td>\r\n                            <td>\r\n                                <input type="text" class="form-control" v-model="sale" name="sale" required="required" data-vd-msg="请填写当月销量！" />\r\n                            </td>\r\n                            <td class="color-red">\r\n                                <!--<span class="color-red">*</span>-->\r\n                                <!--<span class="errorMsg"></span>-->\r\n                            </td>\r\n                        </tr>\r\n                        <tr>\r\n                            <td class="text-right">当月价格</td>\r\n                            <td>\r\n                                <input type="text" class="form-control" v-model="price" name="price" required="required" data-vd-msg="请填写当月价格！" />\r\n                            </td>\r\n                            <td class="color-red">\r\n                                <!--<span class="color-red">*</span>-->\r\n                                <!--<span class="errorMsg"></span>-->\r\n                            </td>\r\n                        </tr>\r\n                        <tr>\r\n                            <td class="text-right">是否合理</td>\r\n                            <td>\r\n                                <select class="form-control mt10" name="isValid"  v-model="isValid" required="required" data-vd-msg="请选择是否合理！">\r\n                                    <option value="">请选择</option>\r\n                                    <option value="1">合理</option>\r\n                                    <option value="0">不合理</option>\r\n                                </select>\r\n                            </td>\r\n                            <td class="color-red">\r\n                                <!--<span class="color-red">*</span>-->\r\n                                <!--<span class="errorMsg"></span>-->\r\n                            </td>\r\n                        </tr>\r\n                        <tr>\r\n                            <td class="text-right">所属年份</td>\r\n                            <td>\r\n                                <select class="form-control mt10" name="year" v-model="year" disabled required="required" data-vd-msg="请选择年份！">\r\n                                    <option value="">请选择</option>\r\n                                    <option value="2015">2015</option>\r\n                                    <option value="2016">2016</option>\r\n                                    <option value="2017">2017</option>\r\n                                    <option value="2018">2018</option>\r\n                                    <option value="2019">2019</option>\r\n                                    <option value="2020">2020</option>\r\n                                    <option value="2021">2021</option>\r\n                                    <option value="2022">2022</option>\r\n                                </select>\r\n                            </td>\r\n                            <td class="color-red">\r\n                                <!--<span class="color-red">*</span>-->\r\n                                <!--<span class="errorMsg"></span>-->\r\n                            </td>\r\n                        </tr>\r\n                        <tr>\r\n                            <td class="text-right">所属月份</td>\r\n                            <td>\r\n                                <select class="form-control mt10" name="month" v-model="month" disabled required="required" data-vd-msg="请选择月份！">\r\n                                    <option value="">请选择</option>\r\n                                    <option value="01">1月</option>\r\n                                    <option value="02">2月</option>\r\n                                    <option value="03">3月</option>\r\n                                    <option value="04">4月</option>\r\n                                    <option value="05">5月</option>\r\n                                    <option value="06">6月</option>\r\n                                    <option value="07">7月</option>\r\n                                    <option value="08">8月</option>\r\n                                    <option value="09">9月</option>\r\n                                    <option value="10">10月</option>\r\n                                    <option value="11">11月</option>\r\n                                    <option value="12">12月</option>\r\n                                </select>\r\n                            </td>\r\n                            <td class="color-red">\r\n                                <!--<span class="color-red">*</span>-->\r\n                                <!--<span class="errorMsg"></span>-->\r\n                            </td>\r\n                        </tr>\r\n                    </table>\r\n                </form>\r\n            </div>\r\n            <div class="modal-footer">\r\n                <button type="button" class="btn btn-gray btn-cancel" data-dismiss="modal">取消</button>\r\n                <button type="button" class="btn btn-lightBlue btn-addDrugRecordConfirm">确认</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n').fadeIn(500);var r=o(".page-dataManage"),t=o("#searchForm"),e=t.find("input[name=page]"),p=t.find("input[name=size]"),m=(o("#pagination"),i.compile(o("#user-list-tpl").html()));a(window.apiHost+"users/listUser.do",null,function(n){var t=n.data||{};r.find("#userId").html(m(t))},null,null,"post");var g=i.compile(o("#list-tpl").html());t.on("submit",function(n){var i=o(this),d=i.find("input[type=submit]");if(n&&n.preventDefault(),d.prop("disabled"))return!1;var c=new s(i.serializeArray());return c.getItem("month")&&!c.getItem("year")?(l.alert("请先选择年份！"),!1):(c.getItem("month")&&c.getItem("year")&&c.setItem("month",c.getItem("year")+"-"+c.getItem("month")+"-01"),void a(window.apiHost+"drugRecord/listDrugRecord.do",c.value(),function(n){var d=n.data||{};r.find("#listTable").find("tbody").html(g(d)),r.find("#listTable .btn-deleteDrugRecord").confirmation({btnOkLabel:"确认",btnCancelLabel:"取消",onShow:function(){},onHide:function(){},onConfirm:function(n,r){var e=o(r).attr("data-id");a(window.apiHost+"drugRecord/deleteDrugRecord.do",{id:e},function(){l.info("删除成功！"),t.trigger("submit")},null,null,"get")}}),r.find("#pagination-content").pagination({$form:i,first:"<<",prev:"<",next:">",last:">>",pageSize:parseInt(p.val()),totalSize:d.totalElements,info:!0,infoContainer:".pagination-wrap",paginationInfoTpl:'<div class="pagination-TotalInfo">总条数 '+d.totalElements+' 条</div><div class="pagination-info-content"><input type="text" class="info-currentPage" name="currentPage" />&nbsp;/&nbsp;'+d.totalPages+'页&nbsp;&nbsp;<a href="javascript:;" class="info-goToPage">GO</a></div>',visiblePages:5,onPageClick:function(n,r){e.val(r),i.trigger("submit")}})},function(){d.prop("disabled",!0),o("#listTable").find("tbody").html(g({loading:!0}))},function(){d.prop("disabled",!1)},"post"))}).trigger("submit");var v=o("input[name=order]");o(".btn-list-sort").click(function(){return"desc"==v.val()?(v.val("asc"),o(this).removeClass("active")):(v.val("desc"),o(this).addClass("active")),t.trigger("submit"),!1});var b={id:0,userId:0,hospitalName:"",drugName:"",drugSpec:"",drugUnit:"",drugFactory:"",drugType:"",sale:"",price:"",isValid:"",month:"",year:""},f=o("#modal-addDrugRecord");n(),r.on("click",".btn-updateDrugRecord",function(){f.modal("show");var n=o(this).attr("data-id");return a(window.apiHost+"drugRecord/getDrugRecordById.do",{id:n},function(n){var r=n.data||{};r.year=r.month.split("-")[0],r.month=r.month.split("-")[1],b=o.extend(b,r)},function(){},function(){},"post"),!1}),f.find(".btn-addDrugRecordConfirm").click(function(){var n=o(this);return n.hasClass("disable")||d(f.find("form"))&&(b.month=b.year+"-"+b.month+"-01",a(window.apiHost+"drugRecord/updateDrugRecord.do",b,function(n){n.data||{};l.info("修改数据成功！"),f.modal("hide"),t.trigger("submit")},function(){n.prop("disabled",!0)},function(){n.prop("disabled",!1)},"post")),!1})}var o=n("node_modules/egis-jquery/jquery");n("node_modules/egis-bootstrap/confirmation")(),n("node_modules/egis-bootstrap/bootstrap")(),n("node_modules/egis-datetimepicker/datetimepicker")(o),n("node_modules/egis-jquery-file-upload/jquery.fileupload")(o);var a=n("components/util/ajax").ajax;n("node_modules/egis-pagination/pagination")(o);var i=n("node_modules/egis-template/template"),d=(n("node_modules/egis-load-css/load-css"),n("node_modules/egis-checkbox/checkbox"),n("node_modules/egis-date-extend/date-extend"),n("node_modules/egis-validate/validate").validateForm),s=n("node_modules/egis-formvars/formvars"),l=n("node_modules/egis-system-message/system-message"),p=n("node_modules/egis-xhr/xhr"),c=(p.clearEmptyValue,o("aside")),u=n("node_modules/vue1.x/dist/vue");t.exports={render:e}});