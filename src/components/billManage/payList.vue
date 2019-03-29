<template>
    <div class="pay-list">
        <div class="title">
            <span>代付管理</span>
        </div>
        
        <div class="search">
            <div class="search-ct">
                <div class="search-name">状态</div>
                <el-select v-model="data.status" placeholder="请选择" class="pay-state">
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
                <!-- <el-autocomplete
                    class="inline-input"
                    v-model="state2"
                    :fetch-suggestions="querySearch"
                    placeholder="请输入内容"
                    :trigger-on-focus="false"
                    @select="handleSelect"
                ></el-autocomplete> -->
                <el-input class="inline-input" v-model="data.mch_order_id" placeholder="请输入商户订单号" clearable></el-input>
            </div>
             <div class="search-ct">
                <div class="search-name">系统订单号</div>
                <el-input class="inline-input" v-model="data.sys_order_id" placeholder="请输入系统订单号" clearable></el-input>
            </div>
            <div class="search-ct">
                <div class="search-name">收款人</div>
                <el-input class="inline-input" v-model="data.acc_name" placeholder="请输入收款人" clearable></el-input>
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
                <div class="search-btn" @click="sentPay" v-if="rolesId == 41002">发起代付</div>
            </div>
        </div>
        <!-- 蒙层 -->
        <div class="maks" v-if="showPayBox"></div>

        <!-- 发起代付 -->
        <div class="box-wrapper" v-if="showPayBox">
            <el-tabs v-model="activeName2" type="card" @tab-click="handleClick2">
                <el-tab-pane label="批量导入" name="first">
                    <div class="btn-wrapper" >
                        <input type="file" class="input-file" accept=".csv, 
                        application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        ref="file"
                        @change="getFile">
                        <div class="box-btn" @click="down">模板下载</div>
                        <div class="box-btn" >导入Excel</div>
                        <div class="box-btn" @click="showPayBox = false">取消</div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="发起代付" name="second">
                    <div>
                        <el-radio v-model="parms.pay_type" label="1">对私</el-radio>
                        <el-radio v-model="parms.pay_type" label="2">对公</el-radio>
                    </div>
                    <div><input type="text" v-model="parms.acc_name" placeholder="请输入姓名" class="add_color"></div>
                    <div><input type="text"  v-model="parms.money" placeholder="请输入金额" class="add_color"></div>
                    <div v-if="parms.pay_type == 2"><input type="text" v-model="parms.issuer" placeholder="请输入联行号" class="add_color"></div>
                    <div><input type="text"  v-model="parms.acc_no" placeholder="请输入收款卡号" class="add_color"></div>
                    <div><input type="text" v-model="parms.mobile" placeholder="请输入手机号"></div>
                    <div><input type="text" v-model="parms.bank_name" placeholder="请输入银行名称"></div>
                    <div><input type="text" v-model="parms.bank_no" placeholder="请输入银行编码"></div>
                    <div class="btn-wrapper" >
                        <div class="box-btn" @click="saveSentPay" >确定</div>
                        <div class="box-btn" @click="showPayBox = false">取消</div>
                    </div>
                    <!-- <div><input type="text" placeholder="提现金额（元）" v-model="money" class="add_color" ></div> -->
                    <!-- <div><input type="password" placeholder="账户密码" v-model="data.password" class="add_color"></div> -->
                    <!-- <div><input type="text" placeholder="身份证（选填）" v-model="data.identity_card"></div>
                    <div><input type="text" placeholder="预留手机（选填）" v-model="data.reserve_phone"></div> -->
                </el-tab-pane>      
                
            </el-tabs>
            
        </div>
        <!-- <div class="num-wrapper">
            <div class="num">成交总金额：<span>{{ total }}</span> 元</div>
            <div class="num">成交总手续费：<span>{{ mchCharge }}</span> 元</div>
            <div class="num">成交总笔数：<span>{{ count }}</span> 笔</div>
        </div> -->

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
                style="width: 100%"
                >
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
                    prop="acc_name"
                    label="收款人姓名"
                    show-overflow-tooltip
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="mch_order_id"
                    show-overflow-tooltip
                    label="商户订单号"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="sys_order_id"
                    label="系统订单号"
                    show-overflow-tooltip
                    width="130">
                </el-table-column>
                <!-- <el-table-column
                    prop="super_order_id"
                    label="上游订单号"
                    width="220">
                </el-table-column> -->
                <el-table-column
                    prop="pay_type"
                    label="代付类型"
                    show-overflow-tooltip
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="charge_type"
                    label="结算类型"
                    show-overflow-tooltip
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="bank_payment_id"
                    label="通道"
                    show-overflow-tooltip
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="money"
                    label="金额"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="charge_money"
                    label="手续费"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="create_time"
                    label="创建时间"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="status"
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
import utils from '../../assets/js/util'
import md5 from '../../assets/js/md5China.js'
import { payList,available,key,sentPay,downExcel,importExcel } from '../../config/api'
export default {
    name: "billDetail",
    data() {
        return{
            rolesId: localStorage.rolesId,
            showPayBox: false,
            activeName2: 'first',
            key: '',                //私钥
            parms: {                //发起代付数据
                acc_name: '',
                money: '',
                acc_no: '',
                pay_type: '1',
                issuer: '',
                mobile: '',
                bank_name: '',
                bank_no: ''
            },


            state2: '',         //商户模糊
            mchList: [],         //查询商户列表
            total_count: 0,
            currentPage: 1,
            total: '',
            mchCharge: '',
            count: '',
            options1: [{
                value: '',
                label: '请选择'
                },{
                value: '1',
                label: '新订单'
                }, {
                value: '2',
                label: '进行中'
                }, {
                value: '3',
                label: '交易成功'
                }, {
                value: '4',
                label: '交易失败'
                }],
            options2: [{
                value: '',
                label: '请选择'
                },{
                value: '1',
                label: '对私'
                }, {
                value: '2',
                label: '对公'
                }],
            data: {
                mch_ids: localStorage.id,
                status: null,
                mch_order_id: null,
                sys_order_id: null,
                acc_name: null,
                pay_type: null,
                start_time: null,
                end_time: null,
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
        handleClick2(tab, event) {
            // console.log(tab, event);
            // console.log(this.activeName)
            if(this.activeName2 == 'second') {
                if(this.key == '') {
                    this.getKey()
                }
            }
        },

        getSum() {
            moneySum(this.data).then((res) => {
                this.total = Number(res.data.sum)/100 || 0
                this.mchCharge = Number(res.data.mch_charge)/100 || 0
                this.count = res.data.count || 0
            })
        },
        //商户收搜
        handleSelect(item) {
            this.data.mch_name = item.value
            this.getList()
            // this.getSum()
        },
        //关键字查询
        querySearch(queryString, cb) {
            this.mchList = []
            getMch(queryString).then( res => {
                let list = res.data
                list.forEach( ele => {
                    let obj = {}
                    obj.value = ele
                    this.mchList.push(obj)
                })
            })
            cb(this.mchList)
        },
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
            const month = start.getMonth()
            const year = start.getFullYear()
            if(month == 0) {
                start.setFullYear(year - 1)
                start.setMonth(11)
            }else{
                start.setMonth(month - 1)
            }
            this.value7 = [start,end]
            this.searchBtn()
        },
        //搜索
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
            this.getList()
            // this.getSum()
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
            this.excelUrl = hostName + '/bankpay/export?'
            Object.keys(this.data).map((key)=>{
                this.excelUrl += key + '=' + this.data[key] +'&';    
            })
            console.log(this.excelUrl)
            window.location.href = this.excelUrl

        },
        //交易列表
        getList() {
            if(this.checkedCities.length > 0) {
                this.data.mch_ids = this.checkedCities.join(',')
            }else{
                this.data.mch_ids = localStorage.id
            }
            payList(this.data).then((res) => {
                this.total_count = res.data.total_count
                this.tableData = res.data.data_list
                this.tableData.forEach( ele => {
                    if(ele.money && ele.money != '') {
                        ele.money = ele.money/100
                    }
                    if(ele.charge_money && ele.charge_money != '') {
                        ele.charge_money = ele.charge_money/100
                    }
                    if( ele.create_time ) {
                        ele.create_time = changeData(ele.create_time)
                    }
                    if( ele.trade_time ) {
                        ele.trade_time = changeData(ele.trade_time)
                    }
                    if(ele.status == 1) {
                        ele.status = '新订单'
                    }else if(ele.status == 2) {
                        ele.status = '进行中'
                    }else if(ele.status == 3) {
                        ele.status = '交易成功'
                    }else if(ele.status == 4) {
                        ele.status = '交易失败'
                    }else{
                        ele.status = '状态异常'
                    }
                    if(ele.pay_type && ele.pay_type == 1) {
                        ele.pay_type = '对私'
                    } else if(ele.pay_type == 2) {
                        ele.pay_type = '对公'
                    }
                    if(ele.charge_type && ele.charge_type == 1) {
                        ele.charge_type = '定额'
                    } else if(ele.charge_type == 2) {
                        ele.charge_type = '百分比'
                    }
                    if(ele.bank_payment_id && ele.bank_payment_id == 1) {
                        ele.bank_payment_id = '平安'
                    }else if(ele.bank_payment_id == 2) {
                        ele.bank_payment_id = '先锋'
                    }
                })
               
            })
        },
        //详情
        handleClick(row) {
            this.$router.push({path: '/home/payDetail',query:{row: row}})
        },
        handleSizeChange(val) {
            this.data.limit = val
            this.getList()
        },
        handleCurrentChange(val) {
            this.data.offset = (val -1) * this.data.limit
            this.getList()
        },


        getAvailable() {
            let data = {
                type: 2
            }
            available(data).then( res => {
                this.is_agency = res.data.is_agency
                if(res.data.is_agency) {
                    let arr = res.data.sub_ids
                    arr.push(localStorage.id)
                    this.cities = arr
                    this.checkedCities = arr
                }

                this.getList()
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
        },

        //发起代付
        sentPay() {
            this.showPayBox = true
        },
        //获取密钥
        getKey() {
            let data = {
                user_id: localStorage.id,
            }
            key(data).then((res) => {
                if(res.data.key) {
                    this.key = res.data.key
                } else{
                    this.$message.error('请先设置密钥！！')
                }
            })
        },
        //发起代付
        saveSentPay() {
            if(this.parms.acc_name == '') {
                this.$message.error('请输入姓名！！')
                return
            }
            if(this.parms.money == '') {
                this.$message.error('请输入金额！！')
                return
            }
            if(this.parms.acc_no == '') {
                this.$message.error('请输入银行卡号！！')
                return
            }
            let data = JSON.parse(JSON.stringify(this.parms))
            data.money = this.parms.money * 100
            data.mch_id = localStorage.id
            data.mch_order_id = localStorage.id + new Date().getTime()
            for(var key in data) {
                if(data[key] === '') {
                    delete data[key]
                }
            }
            //  ASCII字典序排序
            let sortData = utils.sort_ASCII(data)
            let dataStr = ''
            Object.keys(sortData).map((key)=>{
                dataStr += key + '=' + sortData[key] +'&';    
            })
            dataStr += 'key=' + this.key
            // console.log(dataStr)
            //签名
            data.sign=md5(dataStr).toUpperCase()
            sentPay(data).then( res => {
                // console.log(res)
                if(res.data.code == 'A000') {
                    this.$message.success('请求成功！')
                }else {
                    this.$message.error(res.data.message)
                }
            })
        },
        //上传文件
        // uploadFile($event){
        //     console.log($event.target.files[0])
        // },
        getFile() {
            // console.log(this.$refs.file.files[0])
            let file = this.$refs.file.files[0]
            let param = new FormData()   // 创建form对象
            param.append('file', file)   // 通过append向form对象添加数据
            importExcel(param).then(res => {
                this.$message.success('导入成功！！')
            })
        },
        down() {
            window.location.href = hostName + '/bankpay/excel/export'
            // downExcel().then(res => {
            //     this.$message.success('下载成功！！')
            //     window.location.href = hostName + '/bankpay/excel/export'
            // })
        }
    },
    mounted() {
        // this.getSum()
        this.getAvailable()
    }

}
</script>

<style lang='sass' scoped>
.pay-list
    color: #3D4060;
    padding-left: 30px
    .maks
        position: fixed
        left: 0
        top: 0
        background: rgba(0, 0, 0, .3)
        width: 100%
        z-index: 1
        height: 100%
    .title 
        font-size: 20px
        font-weight: bold
    .num-wrapper
        margin-top: 30px
        font-size: 18px
        .num
            display: inline-block
            margin-right: 50px
            margin-top: 15px
            font-size: 14px
            span
                color: red
    .search
        display: flex
        margin-top: 10px
        .search-ct
            margin-left: 20px
            .search-name
                font-size: 12px
                line-height: 18.2px
                padding-bottom: 10px
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
                font-size: 13px
                margin: 0 0 0 10px
        .search-ct:first-child
            margin-left: 0
           
    .table
        margin-top: 40px
        width: 1250px
        .block
            padding: 30px 0
            text-align: center 

    .box-wrapper
        position: fixed
        top: 30%
        left: 50%
        margin-top: -175px
        margin-left: -150px
        z-index: 2
        width: 500px
        background: #fff
        border-radius: 5px
        padding: 40px 30px 60px
        text-align: center
        input
            border: 1px solid #B1B3C1;
            border-radius: 2px;
            font-size: 16px
            width: 100%
            height: 40px
            line-height: 40px
            margin-top: 10px
            padding-left: 20px
        .add_color
            border: 1px solid #00BFA6;
            background: #fff
        .btn-wrapper
            display: flex
            align-items: center
            justify-content: center
            position: relative
            .input-file 
                position: absolute
                top: 40px
                width: 100px
                opacity: 0
            .box-btn
                width: 100px
                margin: 50px 20px 0 20px
                background: #00BFA6
                border: 1px solid #B1B3C1;
                border-radius: 2px;
                color: #fff
                height: 40px
                font-size: 16px
                line-height: 38px
</style>
