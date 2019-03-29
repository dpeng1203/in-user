<template>
    <div class="account-manage">
        <div class="title">
            <span>费率信息</span>
        </div>  
        <div class="table">
            <div class="table-title">充值费率</div>
            <el-table
                :data="tableData"
                border
                size="small"
                style="width: 100%">
                <el-table-column
                    type="index"
                    width="50">
                </el-table-column>
                <el-table-column
                    prop="mch_id"
                    label="商户号"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="app_name"
                    label="应用名称"
                    width="160">
                </el-table-column>
                <el-table-column
                    prop="mch_name"
                    label="商户名称"
                    width="160">
                </el-table-column>
                <el-table-column
                    prop="is_default"
                    label="是否默认"
                    width="160">
                </el-table-column>
                <el-table-column
                    prop="rate"
                    label="费率（%）"
                    >
                </el-table-column>
            </el-table>
            <!-- <div class="block">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10,20,50,100, 200, 300, 400]"
                    :page-size="data.limit"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div> -->
        </div>

        <div class="table">
            <div class="table-title">代付费率</div>
            <el-table
                :data="tableData1"
                border
                size="small"
                style="width: 100%">
                <el-table-column
                    type="index"
                    width="50">
                </el-table-column>
                <el-table-column
                    prop="mch_id"
                    label="商户号"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="app_name"
                    label="应用名称"
                    width="200">
                </el-table-column>
                
                <el-table-column
                    prop="create_time"
                    label="创建时间"
                    width="280">
                </el-table-column>
                <el-table-column
                    prop="rate"
                    label="费率（%）"
                    >
                </el-table-column>
            </el-table>
            <!-- <div class="block">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10,20,50,100, 200, 300, 400]"
                    :page-size="data.limit"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div> -->
        </div>
    </div>
</template>

<script>
import changeData from '../../config/formatData'
import { merAppRate,merPayRate } from '../../config/api'
export default {
    name: 'cashList',
    data() {
        return{
            tableData: [],
            tableData1: [],
            // currentPage: 1,
            // total: 0,
            data: {
                mch_id: localStorage.id,
                offset: 0,
                limit: 100
            }
        }
    },
    methods: {
        
        //获得费率
        getMerAppRate() {
            merAppRate(this.data).then( res => {
                this.tableData = res.data
                this.tableData.forEach(ele => {
                    if(ele.rate) {
                        ele.rate = ele.rate/100
                    }
                    if(ele.is_default) {
                        ele.is_default = '是'
                    } else{
                        ele.is_default = '否'
                    }
                })
            })
        },

        //获得费率
        getMerPayRate() {
            merPayRate(this.data).then( res => {
                this.tableData1 = []
                res.data.app_name = '代付'
                this.tableData1.push(res.data)
                this.tableData1.forEach(ele => {
                    if(ele.rate) {
                        ele.rate = ele.rate/100
                    }
                    if(ele.create_time) {
                        ele.create_time = changeData(ele.create_time)
                    }
                    
                })
            })
        },

        // handleSizeChange(val) {
        //     console.log(`每页 ${val} 条`);
        //     this.data.limit = val
        //     this.getList()
        // },
        // handleCurrentChange(val) {
        //     console.log(`当前页: ${val}`);
        //     this.data.offset = (val - 1) * this.data.limit
        //     this.getList()
        // }

    },
    mounted() {
        this.getMerAppRate()
        this.getMerPayRate()
    }
}
</script>

<style lang='sass' scoped>
.account-manage
    color: #3D4060;
    padding-left: 30px
    .title 
        font-size: 20px
        font-weight: bold
    .table
        margin-top: 30px
        width: 900px
        .table-title
            margin-bottom: 10px
            font-size: 15px
            font-weight: bold
        .block
            padding: 30px 0
            text-align: center 
</style>