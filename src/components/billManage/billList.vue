<template>
    <div class="bill-detail">
        <div class="title">
            <span>充值管理</span>
        </div>
        <!-- <div class="num-wrapper">
            <div class="num">今日成交金额：<span>{{ total }}</span> 元</div>
            <div class="num">今日成交笔数：<span>{{ count }}</span> 笔</div>
        </div> -->
        <div class="search">
            <div class="search-ct">
                <div class="search-name">状态</div>
                <el-select v-model="data.status" placeholder="请选择状态" class="pay-state">
                    <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="search-ct">
                <div class="search-name">商户订单号</div>
                <el-input class="inline-input" v-model="data.mch_order_id" placeholder="请输入商户订单号"></el-input>
            </div>
             <div class="search-ct">
                <div class="search-name">系统订单号</div>
                <el-input class="inline-input" v-model="data.sys_order_id" placeholder="请输入系统订单号"></el-input>
            </div>
            <div class="search-ct">
                <div class="search-name">支付类型</div>
                <el-select v-model="data.pay_type" placeholder="请选择" class="pay-state">
                    <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <!-- <div class="search-ct">
                <div class="search-name">交易时间</div>
                <el-date-picker
                    v-model="date1"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
            </div> -->
        </div>
        <div class="search">
            
            <div class="search-ct">
                <div class="search-name">选择日期范围</div>
                <el-date-picker
                    v-model="value7"
                    type="daterange"
                    unlink-panels
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                   >
                </el-date-picker>
                <div class="rapid-btn" @click="searchToday">今日</div>
                <div class="rapid-btn" @click="searchYest">昨日</div>
                <div class="rapid-btn" @click="searchWeek">本周</div>
                <div class="rapid-btn" @click="searchLastWeek">上周</div>
                <div class="rapid-btn" @click="searchMonth">本月</div>
                <div class="rapid-btn" @click="searchLastMonth">上月</div>
                <div class="search-btn" @click="searchBtn">搜索</div>
                <div class="search-btn" @click="excel">导出</div>
            </div>
        </div>

        <div style="margin-top: 20px" v-if="is_agency">
            <p style="font-size: 16px">商户号：</p>
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
        </div>
        


        <div class="table">
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
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="mch_name"
                    label="商户名称"
                    show-overflow-tooltip
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="mch_order_id"
                    label="商户订单号"
                    show-overflow-tooltip
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="sys_order_id"
                    label="系统订单号"
                    show-overflow-tooltip
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="pay_type"
                    label="支付类型"
                    width="90">
                </el-table-column>
                <!-- <el-table-column
                    prop="channel"
                    label="通道"
                    width="110">
                </el-table-column> -->
                <el-table-column
                    prop="money"
                    label="下单金额(元)"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="msg"
                    label="付款金额(元)"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="mch_charge"
                    label="手续费"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="create_time"
                    label="创建时间"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="state"
                    label="状态"
                    width="90">
                </el-table-column>
                <el-table-column
                label="操作"
                >
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
                </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10,20,50,100, 200, 300, 400]"
                    :page-size="data.limit"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total_count">
                </el-pagination>
            </div>
        </div>
        
    </div>
</template>

<script>
import changeData from '../../config/formatData'
import hostName from '../../config/hostName'
import { todayNum,billList,available } from '../../config/api'
export default {
    name: "billDetail",
    data() {
        return{
            total_count: 0,
            currentPage: 1,
            total: '',
            count: '',
            options1: [{
                value: '',
                label: '请选择'
                },{
                value: '1',
                label: '待支付'
                }, {
                value: '2',
                label: '交易进行中'
                }, {
                value: '3',
                label: '交易成功'
                }, {
                value: '4',
                label: '交易失败'
                }, {
                value: '9',
                label: '超时关闭'
                }],
            options2: [{
                value: '',
                label: '请选择'
                },{
                value: 'alipay',
                label: '支付宝'
                }, {
                value: 'wx',
                label: '微信'
                }],
            data: {
                status: null,
                sys_order_id: null,
                pay_type: null,
                start_time: null,
                end_time: null,
                mch_ids: localStorage.id,
                offset: 0,
                limit: 10
            },
            tableData: [],
            value7: null,
            is_agency: false,

            checkAll: true,
            checkedCities: [],
            cities: [],
            isIndeterminate: false
        }
    },
    methods: {
        // getTodayNum() {
        //     let data = {
        //         mch_id: localStorage.id
        //     }
        //     todayNum(data).then((res) => {
        //         console.log(res)
        //         this.total = Number(res.data.total)/100
        //         this.count = res.data.count
        //     })
        // },
        //今日
        searchToday() {
            const end = new Date();
            const start = new Date(new Date().toLocaleDateString())
            start.setTime(start.getTime())
            this.value7 = [start,end]
            this.searchBtn()
        },
        // 昨日
        searchYest() {
            const start = new Date();
            const end = new Date(new Date().toLocaleDateString())
            end.setTime(end.getTime())
            start.setTime(end.getTime() - 3600 * 1000 * 24 * 1)
            this.value7 = [start,end]
            this.searchBtn()
        },
        //本周
        searchWeek() {
            const end = new Date();
            const start = new Date(new Date().toLocaleDateString())
            const nowDayOfWeek = start.getDay()
            if(nowDayOfWeek == 0) {
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 6)
            }else{
                start.setTime(start.getTime() - 3600 * 1000 * 24 * (nowDayOfWeek - 1));
            }
            this.value7 = [start,end]
            this.searchBtn()
        },
        //上周
        searchLastWeek() {
            const start = new Date()
            const end = new Date(new Date().toLocaleDateString());
            const nowDayOfWeek = end.getDay()
            if(nowDayOfWeek == 0) {
                end.setTime(end.getTime() - 3600 * 1000 * 24 * 6)
            }else{
                end.setTime(end.getTime() - 3600 * 1000 * 24 * (nowDayOfWeek - 1));
            }
            start.setTime(end.getTime() - 3600 * 1000 * 24 * 7);
            this.value7 = [start,end]
            this.searchBtn()
        },
        //本月
        searchMonth() {
            const end = new Date();
            const start = new Date();
            start.setDate(1);
            start.setHours(0);
            start.setSeconds(0);
            start.setMinutes(0);
            start.getTime();
            this.value7 = [start,end]
            this.searchBtn()
        },
        //上月
        searchLastMonth() {
            const start = new Date()
            const end = new Date();
            start.setDate(1);
            start.setHours(0);
            start.setSeconds(0);
            start.setMinutes(0);
            end.setDate(1);
            end.setHours(0);
            end.setSeconds(0);
            end.setMinutes(0);
            end.getTime();
            const month = start.getMonth()
            const year = start.getFullYear()
            if(month == 0) {
                start.setFullYear(year - 1)
                start.setMonth(11)
            }else{
                start.setMonth(month - 1)
            }
            start.getTime()
            this.value7 = [start,end]
            this.searchBtn()
        },

        searchBtn() {
            if(this.value7 != null) {
                this.data.start_time = this.value7[0]
                this.data.end_time = this.value7[1]
            } else{
                this.data.start_time = null
                this.data.end_time = null
            }
            for( var key in this.data) {
                if(this.data[key] === null || this.data[key] === '') {
                    delete this.data[key]
                }
            }
            this.data.offset = 0
            this.getBillList()
        },
        getBillList() {
            if(this.checkedCities.length > 0) {
                this.data.mch_ids = this.checkedCities.join(',')
            }else{
                this.data.mch_ids = localStorage.id
            }
            billList(this.data).then((res) => {
                console.log(res)
                this.tableData = res.data.data_list
                this.tableData.forEach( ele => {
                    if(ele.money && ele.money != '') {
                        ele.money = ele.money/100
                    }
                    if(ele.mch_charge && ele.mch_charge != '') {
                        ele.mch_charge = ele.mch_charge/100
                    }
                    if( ele.create_time ) {
                        ele.create_time = changeData(ele.create_time)
                    }
                    if( ele.trade_time ) {
                        ele.trade_time = changeData(ele.trade_time)
                    }
                    if( ele.state == 1 ) {
                        ele.state = '待支付'
                    }else if( ele.state == 2 ) {
                        ele.state = '交易进行中'
                    }else if( ele.state == 3 ) {
                        ele.state = '交易成功'
                    }else if( ele.state == 4 ) {
                        ele.state = '交易失败'
                    }else if( ele.state == 9 ) {
                        ele.state = '超时关闭'
                    }else{
                        ele.state = '状态异常'
                    }
                })
                this.total_count = res.data.total_count
            })
        },

        //导出excel
        excel() {
            if(this.value7 != null) {
                this.data.start_time = this.value7[0]
                this.data.end_time = this.value7[1]
                var dateee = new Date(this.data.start_time).toJSON();
                this.data.start_time = new Date(+new Date(dateee)).toISOString()
                var dateee1 = new Date(this.data.end_time).toJSON();
                this.data.end_time = new Date(+new Date(dateee1)).toISOString()
            } else{
                this.data.start_time = null
                this.data.end_time = null
            }
            for( var key in this.data) {
                if(this.data[key] === null || this.data[key] === '') {
                    delete this.data[key]
                }
            }
            this.excelUrl = hostName + '/bill/export?'
            Object.keys(this.data).map((key)=>{
                this.excelUrl += key + '=' + this.data[key] +'&';    
            })
            console.log(this.excelUrl)
            window.location.href = this.excelUrl

        },
        handleClick(row) {
            this.$router.push({path: '/home/oneBillDetail',query: {billInfo: row}})
        },
        
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.data.limit = val
            this.getBillList()
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.data.offset = (val -1) * this.data.limit
            this.getBillList()
        },

        getAvailable() {
            let data = {
                type: 1
            }
            available(data).then( res => {
                this.is_agency = res.data.is_agency
                if(res.data.is_agency) {
                    let arr = res.data.sub_ids
                    arr.push(localStorage.id)
                    this.cities = arr
                    this.checkedCities = arr
                }

                this.getBillList()
            })
        },

        handleCheckAllChange(val) {
            this.checkedCities = val ? this.cities : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.cities.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
            console.log(this.checkedCities)
        }

    },
    mounted() {
        console.log(this.currentPage)
        // this.getTodayNum()
        this.getAvailable()
    }

}
</script>

<style lang='sass' scoped>
.bill-detail
    color: #3D4060;
    padding-left: 30px
    .title 
        font-size: 20px
        font-weight: bold
    .num-wrapper
        margin-top: 30px
        font-size: 18px
        .num
            margin-top: 15px
            font-size: 14px
            span
                color: red
    .search
        display: flex
        margin-top: 10px
        .search-ct
            margin-left: 30px
            .search-name
                font-size: 12px
                line-height: 18.2px
                padding-bottom: 10px
            input
                margin-top: 10px
                border: 1px solid #B1B3C1
                border-radius: 2px
                width: 200px
                height: 40px
                line-height: 40px
                padding: 20px
                font-size: 14px
                background: #fff
            .inline-input
                width: 180px
            .pay-state
                width: 180px
            .rapid-btn
                display: inline-block
                width: 40px
                height: 35px
                line-height: 35px
                text-align: center
                border: 1px solid #00DB00
                color: #00DB00
                border-radius: 5px;
                font-size: 14px
                margin-left: 2px
                cursor: pointer
            .search-btn
                display: inline-block
                width: 80px
                height: 35px
                line-height: 35px
                text-align: center
                color: #fff
                background: #00BFA6;
                border-radius: 25px;
                font-size: 14px
                margin: 0 0 0 20px
        .search-ct:first-child
            margin-left: 0
           
    .table
        margin-top: 40px
        width: 1250px
        .block
            padding: 30px 0
            text-align: center 
</style>
