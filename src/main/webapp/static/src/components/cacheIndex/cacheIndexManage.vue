<template>
    <div id="cacheIndexManage">
        <el-form :inline="true" :model="search" class="form-search">

            <el-form-item class="pull-right">
                <el-button type="primary" @click="showAddDialog">增加</el-button>
            </el-form-item>
        </el-form>

        <el-table
                :data="tableData"
                v-loading="tableLoading"
                element-loading-text="拼命加载中"
                border
                style="width: 100%">


            <el-table-column
                    inline-template
                    label="月份"
                   >
                         <span>
                            {{ row.month }}
                         </span>
            </el-table-column>


            <el-table-column
                    inline-template
                    label="季度"
                   >
                         <span>
                            {{ row.season }}
                         </span>
            </el-table-column>


            <el-table-column
                    inline-template
                    label="年份"
                   >
                         <span>
                            {{ row.year }}
                         </span>
            </el-table-column>


            <el-table-column
                    inline-template
                    label="月指数"
                   >
                         <span>
                            {{ row.monthIndex }}
                         </span>
            </el-table-column>


            <el-table-column
                    inline-template
                    label="月销售额"
                   >
                         <span>
                            {{ row.monthSale }}
                         </span>
            </el-table-column>


            <el-table-column
                    inline-template
                    label="季指数"
                   >
                         <span>
                            {{ row.seasonIndex }}
                         </span>
            </el-table-column>


            <el-table-column
                    inline-template
                    label="季销售额"
                   >
                         <span>
                            {{ row.seasonSale }}
                         </span>
            </el-table-column>


            <el-table-column
                    inline-template
                    label="年指数"
                   >
                         <span>
                            {{ row.yearIndex }}
                         </span>
            </el-table-column>


            <el-table-column
                    inline-template
                    label="年销售额"
                   >
                         <span>
                            {{ row.yearSale }}
                         </span>
            </el-table-column>


            <el-table-column
                    inline-template
                    label="西药月指数"
                   >
                         <span>
                            {{ row.westMonthIndex }}
                         </span>
            </el-table-column>


            <el-table-column
                    inline-template
                    label="西药月销售额"
                   >
                         <span>
                            {{ row.westMonthSale }}
                         </span>
            </el-table-column>


            <el-table-column
                    inline-template
                    label="西药季指数"
                   >
                         <span>
                            {{ row.westSeasonIndex }}
                         </span>
            </el-table-column>


            <el-table-column
                    inline-template
                    label="西药季销售额"
                   >
                         <span>
                            {{ row.westSeasonSale }}
                         </span>
            </el-table-column>


            <el-table-column
                    inline-template
                    label="西药年指数"
                   >
                         <span>
                            {{ row.westYearIndex }}
                         </span>
            </el-table-column>


            <el-table-column
                    inline-template
                    label="西药年销售额"
                   >
                         <span>
                            {{ row.westYearSale }}
                         </span>
            </el-table-column>


            <el-table-column
                    inline-template
                    label="中药月指数"
                   >
                         <span>
                            {{ row.eastMonthIndex }}
                         </span>
            </el-table-column>


            <el-table-column
                    inline-template
                    label="中药月销售额"
                   >
                         <span>
                            {{ row.eastMonthSale }}
                         </span>
            </el-table-column>


            <el-table-column
                    inline-template
                    label="中药季指数"
                   >
                         <span>
                            {{ row.eastSeasonIndex }}
                         </span>
            </el-table-column>


            <el-table-column
                    inline-template
                    label="中药季销售额"
                   >
                         <span>
                            {{ row.eastSeasonSale }}
                         </span>
            </el-table-column>


            <el-table-column
                    inline-template
                    label="中药年指数"
                   >
                         <span>
                            {{ row.eastYearIndex }}
                         </span>
            </el-table-column>


            <el-table-column
                    inline-template
                    label="中药年销售额"
                   >
                         <span>
                            {{ row.eastYearSale }}
                         </span>
            </el-table-column>


            <el-table-column
                    inline-template
                    label="创建时间"
                   >
                         <span>
                            {{ row.createAt }}
                         </span>
            </el-table-column>


            <el-table-column
                    inline-template
                    label="修改时间"
                   >
                         <span>
                            {{ row.updateAt }}
                         </span>
            </el-table-column>


            <el-table-column
                    :context="_self"
                    inline-template
                    label="操作">
                <div>
                    <el-button
                            size="small"
                            @click="handleEdit($index, row)">
                        编辑
                    </el-button>
                    <el-button
                            size="small"
                            type="danger"
                            @click="handleDelete($index, row)">
                        删除
                    </el-button>
                </div>
            </el-table-column>
        </el-table>

        <el-pagination
                class="pagination-list"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="search.page"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="search.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalItems">
        </el-pagination>

        <el-dialog :title="dialogFormTitle" v-model="dialogFormVisible">
            <el-form :model="dialogForm">

                <el-form-item label="月份" :label-width="formLabelWidth">
                    <el-input v-model="dialogForm.month" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="季度" :label-width="formLabelWidth">
                    <el-input v-model="dialogForm.season" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="年份" :label-width="formLabelWidth">
                    <el-input v-model="dialogForm.year" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="月指数" :label-width="formLabelWidth">
                    <el-input v-model="dialogForm.monthIndex" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="月销售额" :label-width="formLabelWidth">
                    <el-input v-model="dialogForm.monthSale" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="季指数" :label-width="formLabelWidth">
                    <el-input v-model="dialogForm.seasonIndex" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="季销售额" :label-width="formLabelWidth">
                    <el-input v-model="dialogForm.seasonSale" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="年指数" :label-width="formLabelWidth">
                    <el-input v-model="dialogForm.yearIndex" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="年销售额" :label-width="formLabelWidth">
                    <el-input v-model="dialogForm.yearSale" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="西药月指数" :label-width="formLabelWidth">
                    <el-input v-model="dialogForm.westMonthIndex" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="西药月销售额" :label-width="formLabelWidth">
                    <el-input v-model="dialogForm.westMonthSale" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="西药季指数" :label-width="formLabelWidth">
                    <el-input v-model="dialogForm.westSeasonIndex" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="西药季销售额" :label-width="formLabelWidth">
                    <el-input v-model="dialogForm.westSeasonSale" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="西药年指数" :label-width="formLabelWidth">
                    <el-input v-model="dialogForm.westYearIndex" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="西药年销售额" :label-width="formLabelWidth">
                    <el-input v-model="dialogForm.westYearSale" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="中药月指数" :label-width="formLabelWidth">
                    <el-input v-model="dialogForm.eastMonthIndex" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="中药月销售额" :label-width="formLabelWidth">
                    <el-input v-model="dialogForm.eastMonthSale" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="中药季指数" :label-width="formLabelWidth">
                    <el-input v-model="dialogForm.eastSeasonIndex" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="中药季销售额" :label-width="formLabelWidth">
                    <el-input v-model="dialogForm.eastSeasonSale" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="中药年指数" :label-width="formLabelWidth">
                    <el-input v-model="dialogForm.eastYearIndex" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="中药年销售额" :label-width="formLabelWidth">
                    <el-input v-model="dialogForm.eastYearSale" auto-complete="off"></el-input>
                </el-form-item>


            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="onDialogFormSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
  import ajax from 'components/utils/ajax.jsx';


export default {
  data () {

    return {
        totalItems:0,
        search: {

          page:1,
          size:10
        },
        tableLoading:false,
        tableData: [],
        dialogFormType:'add',
        dialogFormTitle:'增加',
        dialogFormVisible: false,
        dialogForm: {

               id: '',

               month: '',

               season: '',

               year: '',

               monthIndex: '',

               monthSale: '',

               seasonIndex: '',

               seasonSale: '',

               yearIndex: '',

               yearSale: '',

               westMonthIndex: '',

               westMonthSale: '',

               westSeasonIndex: '',

               westSeasonSale: '',

               westYearIndex: '',

               westYearSale: '',

               eastMonthIndex: '',

               eastMonthSale: '',

               eastSeasonIndex: '',

               eastSeasonSale: '',

               eastYearIndex: '',

               eastYearSale: ''

        },
        formLabelWidth: '120px'
    }
  },
  created: function () {
    var vm=this;

    vm.getCacheIndex(vm.search);
  },
  methods: {
      getCacheIndex(param){
          /*ajax请求列表数据*/
          var vm=this;
          vm.tableLoading=true;
          ajax(window.apiHost+'cacheIndex/getCacheIndex.do',param,function(data){
              vm.tableData=data.data.items;
              vm.totalItems=parseInt(data.data.totalElements);
          },function(){
            vm.tableLoading=false;
          },"get");
      },
      addCacheIndex(param){
          /*ajax新增数据*/
          var vm=this;
          vm.tableLoading=true;
          ajax(window.apiHost+'cacheIndex/addCacheIndex.do',param,function(data){
             vm.$message('新增成功！');
             vm.getCacheIndex(vm.search);
          },function(){
            vm.tableLoading=false;
          },"get");
      },
      updateCacheIndex(param){
          /*ajax修改数据*/
          var vm=this;
          vm.tableLoading=true;
          ajax(window.apiHost+'cacheIndex/updateCacheIndex.do',param,function(data){
             vm.$message('修改成功！');
             vm.getCacheIndex(vm.search);
          },function(){
            vm.tableLoading=false;
          },"get");
      },
      deleteCacheIndex(param){
          /*ajax修改数据*/
          var vm=this;
          vm.tableLoading=true;
          ajax(window.apiHost+'cacheIndex/deleteCacheIndex.do',param,function(data){
              vm.$message('删除成功！');
              vm.getCacheIndex(vm.search);
          },function(){
              vm.tableLoading=false;
          },"get");
      },
      handleEdit(index, row) {
        var vm=this;
        console.log(index, row);
        this.dialogFormTitle="修改";
        this.dialogFormType="edit";
        this.dialogFormVisible=true;

        
            
                this.dialogForm.id=row.id;
            
            
                this.dialogForm.id=row.id;
            
        
            
            
                this.dialogForm.month=row.month;
            
        
            
            
                this.dialogForm.season=row.season;
            
        
            
            
                this.dialogForm.year=row.year;
            
        
            
            
                this.dialogForm.monthIndex=row.monthIndex;
            
        
            
            
                this.dialogForm.monthSale=row.monthSale;
            
        
            
            
                this.dialogForm.seasonIndex=row.seasonIndex;
            
        
            
            
                this.dialogForm.seasonSale=row.seasonSale;
            
        
            
            
                this.dialogForm.yearIndex=row.yearIndex;
            
        
            
            
                this.dialogForm.yearSale=row.yearSale;
            
        
            
            
                this.dialogForm.westMonthIndex=row.westMonthIndex;
            
        
            
            
                this.dialogForm.westMonthSale=row.westMonthSale;
            
        
            
            
                this.dialogForm.westSeasonIndex=row.westSeasonIndex;
            
        
            
            
                this.dialogForm.westSeasonSale=row.westSeasonSale;
            
        
            
            
                this.dialogForm.westYearIndex=row.westYearIndex;
            
        
            
            
                this.dialogForm.westYearSale=row.westYearSale;
            
        
            
            
                this.dialogForm.eastMonthIndex=row.eastMonthIndex;
            
        
            
            
                this.dialogForm.eastMonthSale=row.eastMonthSale;
            
        
            
            
                this.dialogForm.eastSeasonIndex=row.eastSeasonIndex;
            
        
            
            
                this.dialogForm.eastSeasonSale=row.eastSeasonSale;
            
        
            
            
                this.dialogForm.eastYearIndex=row.eastYearIndex;
            
        
            
            
                this.dialogForm.eastYearSale=row.eastYearSale;
            
        
            
            
        
            
            
        

      },
      handleDelete(index, row) {
        var vm=this;
        console.log(index, row);

          vm.deleteCacheIndex({id:row.id});

      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.search.size=val;
      },
      handleCurrentChange(val) {
        var vm=this;
        vm.search.page = val;

        vm.getCacheIndex(vm.search);
      },
      showAddDialog() {
      
        this.dialogFormTitle="增加";
        this.dialogFormType="add";
        this.dialogFormVisible=true;

        
          
            this.dialogForm.id=undefined;
          
        
          
            this.dialogForm.month=undefined;
          
        
          
            this.dialogForm.season=undefined;
          
        
          
            this.dialogForm.year=undefined;
          
        
          
            this.dialogForm.monthIndex=undefined;
          
        
          
            this.dialogForm.monthSale=undefined;
          
        
          
            this.dialogForm.seasonIndex=undefined;
          
        
          
            this.dialogForm.seasonSale=undefined;
          
        
          
            this.dialogForm.yearIndex=undefined;
          
        
          
            this.dialogForm.yearSale=undefined;
          
        
          
            this.dialogForm.westMonthIndex=undefined;
          
        
          
            this.dialogForm.westMonthSale=undefined;
          
        
          
            this.dialogForm.westSeasonIndex=undefined;
          
        
          
            this.dialogForm.westSeasonSale=undefined;
          
        
          
            this.dialogForm.westYearIndex=undefined;
          
        
          
            this.dialogForm.westYearSale=undefined;
          
        
          
            this.dialogForm.eastMonthIndex=undefined;
          
        
          
            this.dialogForm.eastMonthSale=undefined;
          
        
          
            this.dialogForm.eastSeasonIndex=undefined;
          
        
          
            this.dialogForm.eastSeasonSale=undefined;
          
        
          
            this.dialogForm.eastYearIndex=undefined;
          
        

            this.dialogForm.eastYearSale=undefined;

      },
      onSearchSubmit() {
        console.log('submit!');
        var vm=this;

        vm.getCacheIndex(vm.search);
      },
      onDialogFormSubmit() {
       var vm=this;
        console.log('submit!'+JSON.stringify(this.dialogForm));

        if(this.dialogFormType === 'add'){
            

            this.dialogForm.id=undefined;

            vm.addCacheIndex(this.dialogForm);
        }else{
            vm.updateCacheIndex(this.dialogForm);
        }
        this.dialogFormVisible=false;
      }
  }
}

</script>

<style>
.form-search{
  margin-top:20px;
}
.pagination-list{
  margin-top:20px;
  text-align: right;
}
.main{
  padding: 20px;
}


</style>
