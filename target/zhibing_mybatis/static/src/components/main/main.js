/**
 * header 标签中的内容
 */
var $ = require('egis-jquery');
var $aside = $('aside');
var ajax=require('egis-ajax').ajax;
var tab=require('egis-tab');
var loadCss=require('egis-load-css');
var doGenTsc=require('egis-tsc').doGenTsc;
//var TSCObject=require('egis-tsc').TSCObject;

//var ec = require('echarts/echarts');
//require('echarts/chart/bar');
//require('echarts/chart/line');
//require('echarts/chart/map');
//var utilUser = require('components/util/utilUser');

function render(){
    $aside.html(__inline('./main.html'));
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