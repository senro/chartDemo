<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
      <title>index</title>
	  <meta http-equiv="pragma" content="no-cache">
	  <meta http-equiv="cache-control" content="no-cache">
	  <meta http-equiv="expires" content="0">
	  <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	  <meta http-equiv="description" content="This is my page">
	  <link rel="stylesheet" type="text/css" href="static/lib/bootstrap-3.3.7-dist/css/bootstrap.css">
      <link rel="stylesheet" type="text/css" href="static/css/index.css">
      <link rel="stylesheet" type="text/css" href="static/css/drugSearch.css">
  </head>
  
  <body class="">
      <div class="header">
        <%--todo 此处共用贵司的头部--%>
      </div>
      <div class="container mt15">

          <div class="page page-dataManage">
              <h4 class="page-tit">
                  药品搜索
              </h4>
              <div class="page-search">
                  <form role="form" class="page-tit-form form-inline" id="searchForm">
                      <input type="hidden" name="page" value="1">
                      <input type="hidden" name="size" value="20">
                      <input type="hidden" name="order" value="desc">
                      <div class="form-group">
                          <label>药名</label>
                          <input type="text" class="form-control" name="drugName">
                      </div>
                      <div class="form-group">
                          <label>厂家</label>
                          <input type="text" class="form-control" name="drugFactory">
                      </div>
                      <!--<div class="form-group">-->
                      <!--<label for="startDate">绑定日期</label>-->
                      <!--<input class="form-control date-box" readonly placeholder="开始时间" id="startDate" name="startDate" type="text"/>-->
                      <!--~-->
                      <!--<input class="form-control date-box" readonly placeholder="结束时间" name="endDate" type="text"/>-->
                      <!--</div>-->
                      <button type="submit" class="btn btn-primary" id="btn-search">
                          查询
                      </button>
                  </form>
              </div>
              <div class="page-cont">
                  <table id="listTable" class="merchant-manage default-list box table table-hover table-bordered">
                      <thead>
                      <tr>
                          <th>药名</th>
                          <th>规格</th>
                          <th>厂家</th>
                          <th>当月销量</th>
                          <th>当月价格</th>
                          <th>
                              指数
                          </th>
                      </tr>
                      <tbody>

                      <script id="list-tpl" type="text/html">
                          {{ if loading }}
                          <tr>
                              <td colspan="6" class="text-center">
                                  <span class="icon-loading"></span>
                              </td>
                          </tr>
                          {{ else if items && items.length > 0 }}
                          {{each items as item i}}
                          {{ if i%2==0 }}
                          <tr>
                              {{ else }}
                          <tr class="trBg">
                              {{ /if }}
                              <td>
                                  {{ item.drugName }}
                              </td>
                              <td>
                                  {{ item.drugSpec }}
                              </td>
                              <td>
                                  {{ item.drugFactory }}
                              </td>
                              <td>
                                  {{ item.sale }}
                              </td>
                              <td>
                                  {{ item.price }}
                              </td>

                              <td>
                                  <a href="javascript:;" class="btn-checkChart" data-drugName="{{ item.drugName }}">
                                      走势图
                                  </a>
                              </td>
                          </tr>
                          {{/each}}
                          {{else}}
                          <tr>
                              <td colspan="11">未搜索到符合该条件的记录！</td>
                          </tr>
                          {{ /if }}
                      </script>

                      </tbody>
                  </table>

                  <div id="pagination" class="pagination-wrap">
                      <ul id="pagination-content" class="page_box">

                      </ul>
                  </div>

              </div>
          </div>

      </div>

      <div class="footer mt15">
          <%--todo 此处共用贵司的友情链接和版权--%>
      </div>

      <!-- Modal -->
      <div class="modal fade modal-single-drugName" id="modal-single-drugName" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div class="modal-dialog">
              <div class="modal-content">
                  <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                      <h4 class="modal-title" id="myModalLabel">单个药品指数</h4>
                  </div>
                  <div class="modal-body">
                      <div class="chartContainer" id="chart-single-drugName">

                      </div>
                  </div>
                  <div class="modal-footer">
                      <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                  </div>
              </div>
          </div>
      </div>

      <script src="static/lib/jquery/jquery-1.9.1.min.js" type="text/javascript"></script>
      <script src="static/lib/bootstrap-3.3.7-dist/js/bootstrap.js" type="text/javascript"></script>
      <script src="static/lib/echarts/echarts.js" type="text/javascript"></script>
      <script src="static/js/pagination.js" type="text/javascript"></script>
      <script src="static/js/template.js" type="text/javascript"></script>
      <script src="static/js/get-query-string.js" type="text/javascript"></script>
      <script src="static/js/drugSearch.js" type="text/javascript"></script>
  </body>
</html>
