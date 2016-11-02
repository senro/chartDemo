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
            data:[]
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name:'低价药指数',
                type:'line',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                data:[]
            }
        ]
    };
    window.apiHost="/chartDemo/service/";

    //综合指数
    var chartTogetherMonth = echarts.init(document.getElementById('chart-together-month'));

    chartTogetherMonth.showLoading();
    $.ajax({
        url:window.apiHost+"drugRecord/getDataPriceIndexByMonth.do",
        data:{},
        dataType:"json",
        type:"post",
        success:function(data){
            if(data.status==1){
                var allMonths=[];
                var allPriceIndex=[];
                for(var i=0;i<data.data.length;i++){
                    var monthPriceIndex=data.data[i];
                    allMonths.push(monthPriceIndex.month.replace(/\-01/g,""));
                    allPriceIndex.push(Number(monthPriceIndex.priceIndex).toFixed(2));
                }

                var chartTogetherMonth_lineOption= $.extend(true,lineOption,{});

                chartTogetherMonth.setOption(
                    $.extend(true,chartTogetherMonth_lineOption,{
                        xAxis: {
                            data: allMonths
                        },
                        series: [
                            {
                                name:'价格指数',
                                type:'line',
                                stack: '价格指数',
                                data:allPriceIndex
                            }
                        ]
                    })
                );

                chartTogetherMonth.hideLoading();
            }else{
                alert(data.detail);
            }
        }
    });

    var chartTogetherSeason = echarts.init(document.getElementById('chart-together-season'));

    chartTogetherSeason.showLoading();
    $.ajax({
        url:window.apiHost+"drugRecord/getDataPriceIndexBySeason.do",
        data:{},
        dataType:"json",
        type:"post",
        success:function(data){
            if(data.status==1){
                var allTimes=[];
                var allPriceIndex=[];
                for(var i=0;i<data.data.length;i++){
                    var priceIndex=data.data[i];
                    allTimes.push(priceIndex.season);
                    allPriceIndex.push(Number(priceIndex.priceIndex).toFixed(2));
                }

                var chart_lineOption= $.extend(true,lineOption,{});

                chartTogetherSeason.setOption(
                    $.extend(true,chart_lineOption,{
                        xAxis: {
                            data: allTimes
                        },
                        series: [
                            {
                                name:'价格指数',
                                type:'line',
                                stack: '价格指数',
                                data:allPriceIndex
                            }
                        ]
                    })
                );

                chartTogetherSeason.hideLoading();
            }else{
                alert(data.detail);
            }
        }
    });

    var chartTogetherYear = echarts.init(document.getElementById('chart-together-year'));

    chartTogetherYear.showLoading();
    $.ajax({
        url:window.apiHost+"drugRecord/getDataPriceIndexByYear.do",
        data:{},
        dataType:"json",
        type:"post",
        success:function(data){
            if(data.status==1){
                var allTimes=[];
                var allPriceIndex=[];
                for(var i=0;i<data.data.length;i++){
                    var priceIndex=data.data[i];
                    allTimes.push(priceIndex.year);
                    allPriceIndex.push(Number(priceIndex.priceIndex).toFixed(2));
                }

                var chart_lineOption= $.extend(true,lineOption,{});

                chartTogetherYear.setOption(
                    $.extend(true,chart_lineOption,{
                        xAxis: {
                            data: allTimes
                        },
                        series: [
                            {
                                name:'价格指数',
                                type:'line',
                                stack: '价格指数',
                                data:allPriceIndex
                            }
                        ]
                    })
                );

                chartTogetherYear.hideLoading();
            }else{
                alert(data.detail);
            }
        }
    });

    $('.chartBox-together a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        //e.target // newly activated tab
        //e.relatedTarget // previous active tab
        chartTogetherMonth.resize();
        chartTogetherSeason.resize();
        chartTogetherYear.resize();
    });

    //中药指数
    var chartCnMonth = echarts.init(document.getElementById('chart-cn-month'));

    chartCnMonth.showLoading();
    $.ajax({
        url:window.apiHost+"drugRecord/getDataPriceIndexByMonthAndType.do",
        data:{
            drugType:1
        },
        dataType:"json",
        type:"post",
        success:function(data){
            if(data.status==1){
                var allMonths=[];
                var allPriceIndex=[];
                for(var i=0;i<data.data.length;i++){
                    var monthPriceIndex=data.data[i];
                    allMonths.push(monthPriceIndex.month.replace(/\-01/g,""));
                    allPriceIndex.push(Number(monthPriceIndex.priceIndex).toFixed(2));
                }

                var chartCnMonth_lineOption= $.extend(true,lineOption,{});

                chartCnMonth.setOption(
                    $.extend(true,chartCnMonth_lineOption,{
                        xAxis: {
                            data: allMonths
                        },
                        series: [
                            {
                                name:'价格指数',
                                type:'line',
                                stack: '价格指数',
                                data:allPriceIndex
                            }
                        ]
                    })
                );

                chartCnMonth.hideLoading();
            }else{
                alert(data.detail);
            }
        }
    });

    var chartCnSeason = echarts.init(document.getElementById('chart-cn-season'));

    chartCnSeason.showLoading();
    $.ajax({
        url:window.apiHost+"drugRecord/getDataPriceIndexBySeasonAndType.do",
        data:{
            drugType:1
        },
        dataType:"json",
        type:"post",
        success:function(data){
            if(data.status==1){
                var allTimes=[];
                var allPriceIndex=[];
                for(var i=0;i<data.data.length;i++){
                    var priceIndex=data.data[i];
                    allTimes.push(priceIndex.season);
                    allPriceIndex.push(Number(priceIndex.priceIndex).toFixed(2));
                }

                var chart_lineOption= $.extend(true,lineOption,{});

                chartCnSeason.setOption(
                    $.extend(true,chart_lineOption,{
                        xAxis: {
                            data: allTimes
                        },
                        series: [
                            {
                                name:'价格指数',
                                type:'line',
                                stack: '价格指数',
                                data:allPriceIndex
                            }
                        ]
                    })
                );

                chartCnSeason.hideLoading();
            }else{
                alert(data.detail);
            }
        }
    });

    var chartCnYear = echarts.init(document.getElementById('chart-cn-year'));

    chartCnYear.showLoading();
    $.ajax({
        url:window.apiHost+"drugRecord/getDataPriceIndexByYearAndType.do",
        data:{
            drugType:1
        },
        dataType:"json",
        type:"post",
        success:function(data){
            if(data.status==1){
                var allTimes=[];
                var allPriceIndex=[];
                for(var i=0;i<data.data.length;i++){
                    var priceIndex=data.data[i];
                    allTimes.push(priceIndex.year);
                    allPriceIndex.push(Number(priceIndex.priceIndex).toFixed(2));
                }

                var chart_lineOption= $.extend(true,lineOption,{});

                chartCnYear.setOption(
                    $.extend(true,chart_lineOption,{
                        xAxis: {
                            data: allTimes
                        },
                        series: [
                            {
                                name:'价格指数',
                                type:'line',
                                stack: '价格指数',
                                data:allPriceIndex
                            }
                        ]
                    })
                );

                chartCnYear.hideLoading();
            }else{
                alert(data.detail);
            }
        }
    });

    $('.chartBox-cn a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        //e.target // newly activated tab
        //e.relatedTarget // previous active tab
        chartCnMonth.resize();
        chartCnSeason.resize();
        chartCnYear.resize();
    });

    //西药指数
    var chartEnMonth = echarts.init(document.getElementById('chart-en-month'));

    chartEnMonth.showLoading();
    $.ajax({
        url:window.apiHost+"drugRecord/getDataPriceIndexByMonthAndType.do",
        data:{
            drugType:0
        },
        dataType:"json",
        type:"post",
        success:function(data){
            if(data.status==1){
                var allMonths=[];
                var allPriceIndex=[];
                for(var i=0;i<data.data.length;i++){
                    var monthPriceIndex=data.data[i];
                    allMonths.push(monthPriceIndex.month.replace(/\-01/g,""));
                    allPriceIndex.push(Number(monthPriceIndex.priceIndex).toFixed(2));
                }

                var chartEnMonth_lineOption= $.extend(true,lineOption,{});

                chartEnMonth.setOption(
                    $.extend(true,chartEnMonth_lineOption,{
                        xAxis: {
                            data: allMonths
                        },
                        series: [
                            {
                                name:'价格指数',
                                type:'line',
                                stack: '价格指数',
                                data:allPriceIndex
                            }
                        ]
                    })
                );
                chartEnMonth.hideLoading();
            }else{
                alert(data.detail);
            }
        }
    });

    var chartEnSeason = echarts.init(document.getElementById('chart-en-season'));

    chartEnSeason.showLoading();
    $.ajax({
        url:window.apiHost+"drugRecord/getDataPriceIndexBySeasonAndType.do",
        data:{
            drugType:0
        },
        dataType:"json",
        type:"post",
        success:function(data){
            if(data.status==1){
                var allTimes=[];
                var allPriceIndex=[];
                for(var i=0;i<data.data.length;i++){
                    var priceIndex=data.data[i];
                    allTimes.push(priceIndex.season);
                    allPriceIndex.push(Number(priceIndex.priceIndex).toFixed(2));
                }

                var chart_lineOption= $.extend(true,lineOption,{});

                chartEnSeason.setOption(
                    $.extend(true,chart_lineOption,{
                        xAxis: {
                            data: allTimes
                        },
                        series: [
                            {
                                name:'价格指数',
                                type:'line',
                                stack: '价格指数',
                                data:allPriceIndex
                            }
                        ]
                    })
                );

                chartEnSeason.hideLoading();
            }else{
                alert(data.detail);
            }
        }
    });

    var chartEnYear = echarts.init(document.getElementById('chart-en-year'));

    chartEnYear.showLoading();
    $.ajax({
        url:window.apiHost+"drugRecord/getDataPriceIndexByYearAndType.do",
        data:{
            drugType:0
        },
        dataType:"json",
        type:"post",
        success:function(data){
            if(data.status==1){
                var allTimes=[];
                var allPriceIndex=[];
                for(var i=0;i<data.data.length;i++){
                    var priceIndex=data.data[i];
                    allTimes.push(priceIndex.year);
                    allPriceIndex.push(Number(priceIndex.priceIndex).toFixed(2));
                }

                var chart_lineOption= $.extend(true,lineOption,{});

                chartEnYear.setOption(
                    $.extend(true,chart_lineOption,{
                        xAxis: {
                            data: allTimes
                        },
                        series: [
                            {
                                name:'价格指数',
                                type:'line',
                                stack: '价格指数',
                                data:allPriceIndex
                            }
                        ]
                    })
                );

                chartEnYear.hideLoading();
            }else{
                alert(data.detail);
            }
        }
    });

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
                data:[],
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
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                data:[]
            }
        ]
    };

    //top10 价格
    var chartTop10Price = echarts.init(document.getElementById('chart-top10-price'));

    chartTop10Price.showLoading();
    $.ajax({
        url:window.apiHost+"drugRecord/getDataPriceIndexByYearTop10.do",
        data:{

        },
        dataType:"json",
        type:"post",
        success:function(data){
            if(data.status==1){
                var allDrugs=[];
                var allPriceIndex=[];
                for(var i=0;i<data.data.length;i++){
                    var priceIndex=data.data[i];
                    allDrugs.push(priceIndex.drugName);
                    allPriceIndex.push(Number(priceIndex.priceIndex).toFixed(2));
                }

                var chart_barOption= $.extend(true,barOption,{});

                chartTop10Price.setOption(
                    $.extend(true,chart_barOption,{
                        xAxis: {
                            data: allDrugs
                        },
                        series: [
                            {
                                name:'价格指数',
                                stack: '价格指数',
                                data:allPriceIndex
                            }
                        ]
                    })
                );

                chartTop10Price.hideLoading();
            }else{
                alert(data.detail);
            }
        }
    });

    //top10 销量
    var chartTop10Sale = echarts.init(document.getElementById('chart-top10-sale'));

    chartTop10Sale.showLoading();
    $.ajax({
        url:window.apiHost+"drugRecord/getDataSaleIndexByYearTop10.do",
        data:{

        },
        dataType:"json",
        type:"post",
        success:function(data){
            if(data.status==1){
                var allDrugs=[];
                var allSaleIndex=[];
                for(var i=0;i<data.data.length;i++){
                    var priceIndex=data.data[i];
                    allDrugs.push(priceIndex.drugName);
                    allSaleIndex.push(Number(priceIndex.priceIndex).toFixed(2));
                }

                var chart_barOption= $.extend(true,barOption,{});

                chartTop10Sale.setOption(
                    $.extend(true,chart_barOption,{
                        xAxis: {
                            data: allDrugs
                        },
                        series: [
                            {
                                name:'销量指数',
                                stack: '销量指数',
                                data:allSaleIndex
                            }
                        ]
                    })
                );

                chartTop10Sale.hideLoading();
            }else{
                alert(data.detail);
            }
        }
    });


});
