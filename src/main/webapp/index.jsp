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
      <link rel="stylesheet" href="static/lib/Nivo-Slider-master/themes/default/default.css" type="text/css" media="screen"/>
      <link rel="stylesheet" href="static/lib/Nivo-Slider-master/nivo-slider.css" type="text/css" media="screen"/>
      <link rel="stylesheet" type="text/css" href="static/css/index.css">
  </head>
  
  <body class="">
      <div class="header">

      </div>
      <div class="container mt15">
          <div class="clearfix">
              <div class="slider-wrapper theme-default slide">

                  <div id="slider" class="nivoSlider">
                      <a href="#">
                          <img src="static/images/1.jpg" alt="" title="This is an example of a caption"/>
                      </a>

                      <a href="#">
                          <img src="static/images/2.jpg" alt="" title="This is an example of a caption"/>
                      </a>

                      <a href="#">
                          <img src="static/images/3.jpg" alt="" title="#htmlcaption"/>
                      </a>
                  </div>

                  <div id="htmlcaption" class="nivo-html-caption">
                      <strong>This</strong> is an example of a <em>HTML</em> caption with <a href="#">a link</a>.
                  </div>

              </div>
              <div class="news">
                  <div class="news-box news-box-intro">
                      <h3>
                          低价药品价格指数说明
                      </h3>
                      <p>
                          <em>Git</em>是一个分布式的版本控制系统，最初由<strong>Linus Torvalds</strong>编写，用作Linux内核代码的管理...
                          <a class="checkAllLink pull-right" href="#">
                              [查看全文]
                          </a>
                      </p>
                  </div>
                  <div class="news-box news-box-list clearfix">
                      <h3>
                          新闻动态
                      </h3>
                      <ul>
                          <li>
                              <a href="#">
                                  新闻资讯
                              </a>
                              <span class="pull-right">
                                  2016-09-13
                              </span>
                          </li>
                          <li>
                              <a href="#">
                                  新闻资讯
                              </a>
                              <span class="pull-right">
                                  2016-09-13
                              </span>
                          </li>
                          <li>
                              <a href="#">
                                  新闻资讯
                              </a>
                              <span class="pull-right">
                                  2016-09-13
                              </span>
                          </li>
                          <li>
                              <a href="#">
                                  新闻资讯
                              </a>
                              <span class="pull-right">
                                  2016-09-13
                              </span>
                          </li>
                          <li>
                              <a href="#">
                                  新闻资讯
                              </a>
                              <span class="pull-right">
                                  2016-09-13
                              </span>
                          </li>
                      </ul>
                      <a href="#" class="moreLink pull-right">
                          更多>>
                      </a>
                  </div>
              </div>
          </div>
          <div class="tabbable chartBox chartBox-together">
              <ul class="nav nav-tabs">
                  <li class="chartBox-titText">
                      低价药品价格指数
                  </li>
                  <li class="active">
                      <a href="#chartBox-together-panel-month" data-toggle="tab">月指数</a>
                  </li>
                  <li>
                      <a href="#chartBox-together-panel-season" data-toggle="tab">季指数</a>
                  </li>
                  <li>
                      <a href="#chartBox-together-panel-year" data-toggle="tab">年指数</a>
                  </li>
                  <li class="pull-right searchBox">
                      <input type="text" class="form-control" placeholder="搜索单个药品指数" />
                      <button class="btn btn-primary">
                          搜索
                      </button>
                  </li>
              </ul>
              <div class="tab-content">
                  <div class="tab-pane active" id="chartBox-together-panel-month">
                     <div class="chartContainer" id="chart-together-month">

                     </div>
                  </div>
                  <div class="tab-pane" id="chartBox-together-panel-season">
                      <div class="chartContainer" id="chart-together-season">

                      </div>
                  </div>
                  <div class="tab-pane" id="chartBox-together-panel-year">
                      <div class="chartContainer" id="chart-together-year">

                      </div>
                  </div>
              </div>
          </div>
          <div class="clearfix mt15">
              <div class="tabbable chartBox chartBox-cn pull-left" id="tabs-237986">
                  <ul class="nav nav-tabs">
                      <li class="chartBox-titText">
                          低价药品中药价格指数
                      </li>
                      <li class="active">
                          <a href="#chartBox-cn-panel-month" data-toggle="tab">月指数</a>
                      </li>
                      <li>
                          <a href="#chartBox-cn-panel-season" data-toggle="tab">季指数</a>
                      </li>
                      <li>
                          <a href="#chartBox-cn-panel-year" data-toggle="tab">年指数</a>
                      </li>
                  </ul>
                  <div class="tab-content">
                      <p class="publicTime">
                          发布日期：2016-09-23（星期三）
                      </p>
                      <div class="tab-pane active" id="chartBox-cn-panel-month">
                          <div class="chartContainer" id="chart-cn-month">

                          </div>
                      </div>
                      <div class="tab-pane" id="chartBox-cn-panel-season">
                          <div class="chartContainer" id="chart-cn-season">

                          </div>
                      </div>
                      <div class="tab-pane" id="chartBox-cn-panel-year">
                          <div class="chartContainer" id="chart-cn-year">

                          </div>
                      </div>
                  </div>
              </div>
              <div class="tabbable chartBox chartBox-en pull-right">
                  <ul class="nav nav-tabs">
                      <li class="chartBox-titText">
                          低价药品西药价格指数
                      </li>
                      <li class="active">
                          <a href="#chartBox-en-panel-month" data-toggle="tab">月指数</a>
                      </li>
                      <li>
                          <a href="#chartBox-en-panel-season" data-toggle="tab">季指数</a>
                      </li>
                      <li>
                          <a href="#chartBox-en-panel-year" data-toggle="tab">年指数</a>
                      </li>
                  </ul>
                  <div class="tab-content">
                      <p class="publicTime">
                          发布日期：2016-09-23（星期三）
                      </p>
                      <div class="tab-pane active" id="chartBox-en-panel-month">
                          <div class="chartContainer" id="chart-en-month">

                          </div>
                      </div>
                      <div class="tab-pane" id="chartBox-en-panel-season">
                          <div class="chartContainer" id="chart-en-season">

                          </div>
                      </div>
                      <div class="tab-pane" id="chartBox-en-panel-year">
                          <div class="chartContainer" id="chart-en-year">

                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="tabbable chartBox chartBox-top10 chartBox-top10-price mt15">
              <ul class="nav nav-tabs">
                  <li class="chartBox-titText">
                      部分低价药品最新价格指数(按2015年销量排名前十位)
                  </li>

              </ul>
              <div class="tab-content">
                  <div class="tab-pane active" id="chartBox-top10-price-panel">
                      <div class="chartContainer" id="chart-top10-price">

                      </div>
                  </div>
              </div>
          </div>
          <div class="tabbable chartBox chartBox-top10 chartBox-top10-sale mt15">
              <ul class="nav nav-tabs">
                  <li class="chartBox-titText">
                      部分低价药品最新销量指数(按2015年销量排名前十位)
                  </li>
              </ul>
              <div class="tab-content">
                  <div class="tab-pane active" id="chartBox-top10-sale-panel">
                      <div class="chartContainer" id="chart-top10-sale">

                      </div>
                  </div>
              </div>
          </div>
      </div>

      <div class="footer mt15">

      </div>

      <script src="static/lib/jquery/jquery-1.9.1.min.js" type="text/javascript"></script>
      <script src="static/lib/bootstrap-3.3.7-dist/js/bootstrap.js" type="text/javascript"></script>
      <script src="static/lib/echarts/echarts.js" type="text/javascript"></script>
      <script src="static/lib/Nivo-Slider-master/jquery.nivo.slider.js" type="text/javascript"></script>
      <script src="static/js/index.js" type="text/javascript"></script>
  </body>
</html>
