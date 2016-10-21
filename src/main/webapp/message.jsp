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
  
  <body>
     ${message}
  </body>
</html>
