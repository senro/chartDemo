/**
 * Created with IntelliJ IDEA.
 * User: senro
 * Date: 16/10/6
 * Time: 下午10:05
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function () {

    window.apiHost='service/';


    var $page=$('.page-dataManage');
    var $searchForm = $('#searchForm'),
        $pageNum = $searchForm.find('input[name=page]'),
        $pageSize = $searchForm.find('input[name=size]'),
        $pagination = $('#pagination');

    /*列表展示*/
    var listRender=template.compile($('#list-tpl').html());
    $searchForm.on('submit', function (event) {
        var $context = $(this),
            $submit = $context.find('input[type=submit]');

        if (event) {
            event.preventDefault();
        }
        if ($submit.prop("disabled")) {
            return false;
        }

        $.ajax(
            {
                url: window.apiHost + 'drugRecord/listDrugRecord.do',
                type:'post',
                data:$context.serializeArray(),//clearEmptyValue($context)
                success:function (data) {
                    var dataObj = data.data || {};

                    $page.find('#listTable').find('tbody').html(listRender(dataObj));

                    //分页
                    $page.find('#pagination-content').pagination({
                        $form: $context,
                        first: "<<",
                        prev: "<",
                        next: ">",
                        last: ">>",
                        pageSize: parseInt($pageSize.val()),
                        totalSize: dataObj.totalElements,
                        info: true,
                        infoContainer: '.pagination-wrap',
                        paginationInfoTpl: '<div class="pagination-TotalInfo">总条数 ' + dataObj.totalElements + ' 条</div>' +
                        '<div class="pagination-info-content">' +
                        '<input type="text" class="info-currentPage" name="currentPage" />' +
                        '&nbsp;/&nbsp;' + dataObj.totalPages + '页&nbsp;&nbsp;' +
                        '<a href="javascript:;" class="info-goToPage">GO</a>' +
                        '</div>',
                        visiblePages: 5,
                        onPageClick: function (event, page) {
                            $pageNum.val(page);
                            $context.trigger('submit');
                        }
                    });

                },
                beforeSend:function () {
                    $submit.prop("disabled", true);          // 禁用
                    $('#listTable').find('tbody').html(listRender({loading: true}));
                },
                complete:function () {
                    $submit.prop("disabled", false);         // 启用
                }
            }
        );
    }).trigger('submit');

    if(getQueryString('drugName')){
        $searchForm.find('input[name=drugName]').val(getQueryString('drugName'));
        $searchForm.trigger('submit');
    }
    //排序按钮
    var $sortInput=$('input[name=order]');
    $('.btn-list-sort').click(function(){
        if($sortInput.val()=='desc'){
            $sortInput.val('asc');
            $(this).removeClass('active');
        }else{
            $sortInput.val('desc');
            $(this).addClass('active');
        }
        $searchForm.trigger('submit');
        return false;
    });

    //搜索单个药品
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
            type: 'value',
            min:95
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
    var chartSingleDrugName = echarts.init(document.getElementById('chart-single-drugName'));

    var $singleDrugNameInput=$('.input-search-single-drugName');
    var $singleDrugNameModal=$('#modal-single-drugName');

    $('body').on('click','.btn-checkChart',function(){
        var $this=$(this);

        if($.trim($this.attr('data-drugName'))){
            $.ajax({
                url:window.apiHost+"drugRecord/getDataPriceIndexByMonthAndDrugName.do",
                data:{
                    drugName:$this.attr('data-drugName')
                },
                dataType:"json",
                type:"post",
                success:function(data){
                    if(data.status==1){
                        var allMonths=[];
                        var allPriceIndex=[];
                        if(data.data.length>=2){
                            $singleDrugNameModal.find('.modal-title').html($this.attr('data-drugName')+' 的价格指数');
                            $singleDrugNameModal.modal('show');

                            for(var i=0;i<data.data.length;i++){
                                var monthPriceIndex=data.data[i];
                                allMonths.push(monthPriceIndex.month.replace(/\-01/g,""));
                                allPriceIndex.push(Number(monthPriceIndex.priceIndex).toFixed(2));
                            }

                            var chartSingleDrugName_lineOption= $.extend(true,lineOption,{});
                            chartSingleDrugName_lineOption.xAxis.data=[];
                            chartSingleDrugName_lineOption.series[0].data=[];

                            chartSingleDrugName.setOption(
                                $.extend(true,chartSingleDrugName_lineOption,{
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

                            setTimeout(function () {
                                chartSingleDrugName.resize();
                            },300);

                        }else{
                            alert("没有搜到该药品相关数据！");
                        }
                    }else{
                        alert(data.detail);
                    }
                },
                beforeSend:function () {

                },
                complete:function(){

                }
            });

        }else{
            alert("药品名称不能为空！");
        }

        return false;
    });

});
