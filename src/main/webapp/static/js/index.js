/**
 * Created with IntelliJ IDEA.
 * User: senro
 * Date: 16/10/6
 * Time: 下午10:05
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function () {

    // 轮播插件
    $('#slider').nivoSlider();

    var lineOption={
        title: {
            text: ''
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['低价药指数']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['2016-01-01','2016-02-01','2016-03-01','2016-04-01','2016-05-01','2016-06-01','2016-07-01']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name:'低价药指数',
                type:'line',
                stack: '总量',
                data:[120, 132, 101, 134, 90, 230, 210]
            }
        ]
    };

    //综合指数
    var chartTogetherMonth = echarts.init(document.getElementById('chart-together-month'));

    chartTogetherMonth.setOption(
        $.extend(true,lineOption,{})
    );

    var chartTogetherSeason = echarts.init(document.getElementById('chart-together-season'));

    chartTogetherSeason.setOption(
        $.extend(true,lineOption,{})
    );

    var chartTogetherYear = echarts.init(document.getElementById('chart-together-year'));

    chartTogetherYear.setOption(
        $.extend(true,lineOption,{})
    );

    $('.chartBox-together a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        //e.target // newly activated tab
        //e.relatedTarget // previous active tab
        chartTogetherMonth.resize();
        chartTogetherSeason.resize();
        chartTogetherYear.resize();
    });

    //中药指数
    var chartCnMonth = echarts.init(document.getElementById('chart-cn-month'));

    chartCnMonth.setOption(
        $.extend(true,lineOption,{})
    );

    var chartCnSeason = echarts.init(document.getElementById('chart-cn-season'));

    chartCnSeason.setOption(
        $.extend(true,lineOption,{})
    );

    var chartCnYear = echarts.init(document.getElementById('chart-cn-year'));

    chartCnYear.setOption(
        $.extend(true,lineOption,{})
    );

    $('.chartBox-cn a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        //e.target // newly activated tab
        //e.relatedTarget // previous active tab
        chartCnMonth.resize();
        chartCnSeason.resize();
        chartCnYear.resize();
    });

    //西药指数
    var chartEnMonth = echarts.init(document.getElementById('chart-en-month'));

    chartEnMonth.setOption(
        $.extend(true,lineOption,{})
    );

    var chartEnSeason = echarts.init(document.getElementById('chart-en-season'));

    chartEnSeason.setOption(
        $.extend(true,lineOption,{})
    );

    var chartEnYear = echarts.init(document.getElementById('chart-en-year'));

    chartEnYear.setOption(
        $.extend(true,lineOption,{})
    );

    $('.chartBox-en a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        //e.target // newly activated tab
        //e.relatedTarget // previous active tab
        chartEnMonth.resize();
        chartEnSeason.resize();
        chartEnYear.resize();
    });

    //top 10
    var barOption={
        color: ['#ff0000'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : ['阿苯达唑片(肠虫清)', '阿莫西林胶囊', '艾司唑仑片', '氨茶碱片', '倍他米松片', '布地奈德鼻喷剂（雷诺考特）', '单硝酸异山梨酯分散片(欣康)'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'价格',
                type:'bar',
                barWidth: '60%',
                data:[10, 52, 200, 334, 390, 330, 220]
            }
        ]
    };

    //top10 价格
    var chartTop10Price = echarts.init(document.getElementById('chart-top10-price'));

    chartTop10Price.setOption(
        $.extend(true,barOption,{})
    );

    //top10 销量
    var chartTop10Sale = echarts.init(document.getElementById('chart-top10-sale'));

    chartTop10Sale.setOption(
        $.extend(true,barOption,{
            series : [
                {
                    name:'销量',
                    data:[100, 52, 100, 334, 39, 33, 180]
                }
            ]
        })
    );

});
