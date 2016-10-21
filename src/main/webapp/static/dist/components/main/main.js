define('components/main/main', function(require, exports, module) {

  /**
   * header 标签中的内容
   */
  var $ = require('node_modules/egis-jquery/jquery');
  var $aside = $('aside');
  var ajax=require('node_modules/egis-ajax/ajax').ajax;
  var tab=require('node_modules/egis-tab/tab');
  var loadCss=require('node_modules/egis-load-css/load-css');
  var doGenTsc=require('node_modules/egis-tsc/tsc').doGenTsc;
  //var TSCObject=require('egis-tsc').TSCObject;
  
  //var ec = require('echarts/echarts');
  //require('echarts/chart/bar');
  //require('echarts/chart/line');
  //require('echarts/chart/map');
  //var utilUser = require('components/util/utilUser');
  
  function render(){
      $aside.html("<!--<link rel=\"stylesheet\" type=\"text/css\" href=\"./main.css\">-->\r\n<div class=\"main-box main-guider\">\r\n    <div class=\"main-tit\">使用向导</div>\r\n    <div class=\"main-cont\">\r\n        <div class=\"main-guider-cont-steps clearfix\">\r\n            <a class=\"main-guider-cont-step main-guider-cont-step1 active\" href=\"javascript:;\">\r\n                新手入门\r\n            </a>\r\n            <div class=\"main-guider-arrowLine active\">\r\n                <div class=\"main-guider-arrowHeadRight\"></div>\r\n            </div>\r\n            <a class=\"main-guider-cont-step main-guider-cont-step2\" href=\"javascript:;\">\r\n                使用教程\r\n            </a>\r\n            <div class=\"main-guider-arrowLine\">\r\n                <div class=\"main-guider-arrowHeadRight\"></div>\r\n            </div>\r\n            <a class=\"main-guider-cont-step main-guider-cont-step3\" href=\"javascript:;\">\r\n                进阶使用\r\n            </a>\r\n            <div class=\"main-guider-arrowLine\">\r\n                <div class=\"main-guider-arrowHeadRight\"></div>\r\n            </div>\r\n            <a class=\"main-guider-cont-step main-guider-cont-step4\" href=\"javascript:;\">\r\n                常见问题\r\n            </a>\r\n            <div class=\"main-guider-arrowLine\">\r\n                <div class=\"main-guider-arrowHeadRight\"></div>\r\n            </div>\r\n            <a class=\"main-guider-cont-step main-guider-cont-step5\" href=\"javascript:;\">\r\n                使用建议\r\n            </a>\r\n        </div>\r\n        <div class=\"main-step-texts\">\r\n            <div class=\"main-step-text\">\r\n                欢迎进入报表系统！<br/>\r\n                初次使用建议阅读一下使用向导哦!\r\n            </div>\r\n            <div class=\"main-step-text none\">\r\n                2欢迎进入认证云企业自助服务平台！<br/>\r\n                使用HUE服务,首先需要在认证云管理平台内创建您的应用,您可进入应用管理,以创建您的第一个应用!\r\n            </div>\r\n            <div class=\"main-step-text none\">\r\n                3欢迎进入认证云企业自助服务平台！<br/>\r\n                使用HUE服务,首先需要在认证云管理平台内创建您的应用,您可进入应用管理,以创建您的第一个应用!\r\n            </div>\r\n            <div class=\"main-step-text none\">\r\n                4欢迎进入认证云企业自助服务平台！<br/>\r\n                使用HUE服务,首先需要在认证云管理平台内创建您的应用,您可进入应用管理,以创建您的第一个应用!\r\n            </div>\r\n            <div class=\"main-step-text none\">\r\n                5欢迎进入认证云企业自助服务平台！<br/>\r\n                使用HUE服务,首先需要在认证云管理平台内创建您的应用,您可进入应用管理,以创建您的第一个应用!\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div class=\"main-box main-table\">\r\n    <div class=\"main-tit\">实时数据总览</div>\r\n    <div class=\"main-cont main-table-cont\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-3 main-table-cont-data\">\r\n                <h3>700</h3>\r\n                开机设备数量\r\n            </div>\r\n            <div class=\"col-md-3 main-table-cont-data\">\r\n                <h3>300</h3>\r\n                关机设备数量\r\n            </div>\r\n            <div class=\"col-md-3 main-table-cont-data\">\r\n                <h3>200</h3>\r\n                待机设备数量\r\n            </div>\r\n            <div class=\"col-md-3 main-table-cont-data\">\r\n                <h3>1200</h3>\r\n                全部设备数量\r\n            </div>\r\n        </div>\r\n        <div class=\"main-table-cont-table\" id=\"realTimeDataTable\">\r\n\r\n        </div>\r\n    </div>\r\n</div>\r\n");
      tab($('.main-guider-cont-step'),$('.main-step-text'),'active',null,null,null,function(index){
          var $allLines=$('.main-guider-arrowLine'),
              $currLine=$allLines.eq(index);
          $allLines.removeClass('active');
          if($currLine.length>0){
              $currLine.addClass('active');
          }
      });
  
      var mobileUserChart = echarts.init(document.getElementById('realTimeDataTable'));
      mobileUserChart.setOption({
          //color:['#F8E005', '#12A151'],
          tooltip: {
              trigger: 'item'
              //,
              //formatter: function (params, ticket, callback) {
              //    var tipHtml = [],
              //        tipItem;
              //    for (var i = 0, pl = params.length; i < pl; i += 1) {
              //        tipItem = params[i];
              //        tipHtml.push(
              //            tipItem.seriesName +' : '  + (tipItem.series.originValue)+ (tipItem.series.unit || '')
              //        )
              //    }
              //    return tipHtml.join('<br />');
              //}
          },
          legend: {
              data: ['全部设备', '开机设备', '关机设备', '待机设备'],
              textStyle: {
                  color: '#000'
              }
          },
          toolbox: {
              show: false,
              feature: {
                  mark: {show: true},
                  dataView: {show: true, readOnly: false},
                  magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                  restore: {show: true},
                  saveAsImage: {show: true}
              }
          },
          grid: {
              borderWidth: 1,
              borderColor: '#ccc'
          },
          calculable: false,
          xAxis: [
              {
                  //show: false,
                  type: 'category',
                  data: [''],
                  axisLabel: {
                      textStyle: {
                          "color": "#ccc"
                      }
                  }
                  ,
                  axisLine: {
                      lineStyle: {
                          width: 1
                      }
                  }
              }
          ],
          yAxis: [
              {
                  //show:false,
                  type: 'value',
                  axisLabel: {
                      textStyle: {
                          "color": "#ccc"
                      }
                  }
                  ,
                  axisLine: {
                      lineStyle: {
                          width: 1
                      }
                  },
                  splitLine: {
                      show: true,
                      lineStyle: {
                          color: ['#ccc'],
                          width: 1,
                          type: 'solid'
                      }
                  }
              }
          ],
          series: [
  
              {
                  name: '开机设备',
                  type: 'bar',
                  data: [700],
                  originValue:700,
                  unit:'台'
              },
              {
                  name: '关机设备',
                  type: 'bar',
                  data: [300],
                  originValue:300,
                  unit:'台'
              },
              {
                  name: '待机设备',
                  type: 'bar',
                  data: [100],
                  originValue: 100,
                  unit: '台'
              },
              {
                  name: '全部设备',
                  type: 'bar',
                  data: [1200],
                  originValue:1200,
                  unit:'台'
              }
          ]
      });
  }
  
  //var $logout = $('#accountInfoBox').find('.logout');
  //utilUser.logout($logout);
  module.exports={
      render:render
  };

});
