SpringMVC+Spring+MyBatis【chartDemo】
================================
上线用
`mvn package -Pprod -Dmaven.test.skip=true -Dfile.encoding=UTF-8` 
打个生产的包
上传到tomcat的webapps目录里
同时在
tomcat解压目录\conf\context.xml里加入
`<Context path="/" docBase="chartDemo" debug="0" privileged="true"/>`
path是相对于webapps目录的包路径，docBase是包名。

然后用tomcat的服务+包名访问页面，如果访问不了，检查
tomcat解压目录\log\catlina.当前日期.log 日志排除没有解压包的原因。

==================================
【特别注意】
上线时需要手动把 src/main/webapp/WEB-INF/lib/servlet-api-3.0-alpha-1.jar 放入tomcat 的lib中
