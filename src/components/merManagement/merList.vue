<template>
    <div class="add-peopel">
        <div class="title">
            <span>账户明细</span>
        </div>
        <div class="wrapper">
            <div class="item">
                <span class="name">交易金额（元）:</span>
                <span>{{list.recharge}}</span>
            </div>
            <div class="item">
                <span class="name">分润金额（元）:</span>
                <span>{{list.bonus}}</span>
            </div>
            <div class="item">
                <span class="name">在途金额（元）:</span>
                <span>{{list.pending}}</span>
            </div>
            <div class="item">
                <span class="name">入账中金额（元）:</span>
                <span>{{list.entering}}</span>
            </div>
            <div class="item">
                <span class="name">冻结金额（元）:</span>
                <span>{{list.freeze}}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="item">
                <span class="name">账户余额（元）:</span>
                <span>{{list.total}}</span>
            </div>
            <div class="item">
                <span class="name">可用余额（元）:</span>
                <span>{{list.available}}</span>
            </div>
            <div class="btn" @click="save">提现</div>
            
            <div class="item">
                <span class="name">代付金额（元）:</span>
                <span>{{list.reservoir}}</span>
            </div>
            <div class="btn" @click="showEnterBox = true">代付充值录入</div>
            <!-- <div class="btn" @click="sentPay" v-if="rolesId == 41002">发起代付</div> -->
        </div>
        <!-- 代付充值录入 -->
        <div class="enter-wrapper">
            <!-- <div class="btn" @click="showEnterBox = true">代付充值录入</div> -->
            <div class="list-title">充值列表:</div>
            <div class="table">
                <el-table :data="tableData" border style="width: 100%" size="small">
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column property="account_name" label="姓名" width="80"></el-table-column>
                    <el-table-column property="account_no" label="银行卡号" width="160"></el-table-column>
                    <el-table-column property="recevie_bank" label="备付金账户标识" width="120"></el-table-column>
                    <el-table-column property="money" label="金额" width="120"></el-table-column>
                    <el-table-column property="type" label="类型" width="120"></el-table-column>
                    <el-table-column property="status" label="状态" width="120"></el-table-column>
                    <el-table-column property="create_time" label="创建时间" width="170"></el-table-column>
                    <el-table-column
                        label="操作"
                        >
                        <template slot-scope="scope">
                            <el-button @click="handleCheck(scope.row)" type="text" size="small" v-if="scope.row.status == '进行中'">进度查询</el-button>
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
                        :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
        <!-- <div class="wrapper">
            <div class="item">
                <span class="name">代付金额（元）:</span>
                <span>{{list.reservoir}}</span>
            </div>
            <div class="item">
                <span class="name"></span>
                <span></span>
            </div>
            <div class="item">
                <span class="name"></span>
                <span></span>
            </div>
            <div class="item">
                <span class="name"></span>
                <span></span>
            </div>
            <el-tooltip content="已接入系统代付，将账户余额转入代付池，不可回转" placement="top" effect="light">
                <div class="btn" @click="rollIn">转入</div>
            </el-tooltip>
            <el-tooltip content="适用于已接入系统代付的商户提现下发" placement="top" effect="light">
                <div class="btn" @click="sentPay" v-if="id == 1067">发起代付</div>
            </el-tooltip>
        </div> -->

        <div class="maks" v-if="showBox || showEnterBox || showPayBox"></div>
        <div class="box">
            <!-- 提现 -->
            <div class="box-wrapper" v-if="showBox">
                <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane label="到银行卡" name="first">
                        <el-select v-model="value6" placeholder="请选择" style="width: 100%" @change="changeBank">
                            <el-option
                                v-for="item in cities"
                                :key="item.value"
                                :label="item.label"
                                :value="item.bankcard_number">
                                <span style="float: left">{{ item.open_bank }}</span>
                                <span style="float: left;margin-left: 80px">{{ item.bankcard_number }}</span>
                                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span>
                            </el-option>
                        </el-select>
                        <div><input type="text" placeholder="开户行（**银行）" v-model="data.open_bank" class="add_color"></div>
                        <div><input type="text" placeholder="开户支行（**省**市**支行）" v-model="data.sub_bank" class="add_color"></div>
                        <div><input type="text" placeholder="银行卡号" v-model="data.bankcard_number" class="add_color"></div>
                        <div><input type="text" placeholder="姓名" v-model="data.name" class="add_color"></div>
                        <div><input type="text" placeholder="提现金额（元）" v-model="money" class="add_color" ></div>
                        <div><input type="password" placeholder="账户密码" v-model="data.password" class="add_color"></div>
                        <!-- <div><input type="text" placeholder="身份证（选填）" v-model="data.identity_card"></div>
                        <div><input type="text" placeholder="预留手机（选填）" v-model="data.reserve_phone"></div> -->
                    </el-tab-pane>      
                    <el-tab-pane label="转入代付" name="second">
                        <div><input type="text" placeholder="提现金额（元）" v-model="rollMoney" class="add_color" ></div>
                        <div><input type="password" placeholder="账户密码" v-model="rollPw" class="add_color"></div>
                        <div><input type="text" value="先锋支付有限公司备付金"  disabled></div>
                        <div><input type="text" value="0000300000000236"  disabled></div>
                        <div><input type="text" value="中国银联股份有限公司"  disabled></div>
                    </el-tab-pane>
                </el-tabs>
                <div class="btn-wrapper" >
                    <div class="box-btn" @click="sure" >确定</div>
                    <div class="box-btn" @click="out">取消</div>
                </div>
            </div>
            <!-- 发起代付 -->
            <!-- <div class="box-wrapper" v-if="showPayBox">
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
                    </el-tab-pane>      
                </el-tabs>
            </div> -->
            <!-- 代付充值录入 -->
            <div class="box-wrapper" v-if="showEnterBox">
                <el-tabs v-model="activeName1" type="card" >
                    <el-tab-pane label="代付充值录入" name="first">
                        <div>
                            <el-select v-model="enterDate.recevie_bank" placeholder="请选择备付金账户标识" style="width: 100%">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div><input type="text" placeholder="姓名" v-model="enterDate.account_name" class="add_color"></div>
                        <div><input type="text" placeholder="金额" v-model="enterDateMoney" class="add_color"></div>
                        <div><input type="text" placeholder="银行卡号" v-model="enterDate.account_no" class="add_color"></div>
                    </el-tab-pane>
                </el-tabs>
                <div class="btn-wrapper" >
                    <div class="box-btn" @click="sureEnter" >确定</div>
                    <div class="box-btn" @click="showEnterBox = false">取消</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import formatDate from '../../config/formatData'
import utils from '../../assets/js/util'
import md5 from '../../assets/js/md5China.js'
import hostName from '../../config/hostName'
import { merInfo,deposit,converMoney,cashList,rechargeEnter,rechargeList,checkState,key,sentPay,downExcel,importExcel } from '../../config/api'
export default {
    name: 'merList',
    data() {
        return{
            id: localStorage.id,
            // rolesId: localStorage.rolesId,
            activeName: 'first',
            activeName1: 'first',
            // activeName2: 'first',
            list: {},
            money: '',
            rollMoney: '',      //转入金额
            rollPw: '',         //转入密码
            showBox: false,
            showEnterBox: false,
            showPayBox: false,
            data: {
                password: '',
                open_bank: '',
                sub_bank: '',
                bankcard_number: '',
                name: '',
                identity_card: '',
                reserve_phone: ''
            },
            options: [{
                value: 'UPOPJS',
                label: '银联'
                }, {
                value: 'NUCC',
                label: '网联'
            }],
            enterDateMoney: '',
            enterDate: {
                mch_id: localStorage.id,
                account_name: '',
                money: '',
                account_no: '',
                recevie_bank: '',
            },
            tableData: [],
            rechargeData: {         //列表请求参数
                mch_id: localStorage.id,
                offset: 0,
                limit: 10
            },
            currentPage: 1,
            total: 0,
            cities: [],
            value6: '',

            // key: '',                //私钥
            // parms: {                //发起代付数据
            //     acc_name: '',
            //     money: '',
            //     acc_no: '',
            //     pay_type: '1',
            //     issuer: '',
            //     mobile: '',
            //     bank_name: '',
            //     bank_no: ''
            // }
        }
    },
    methods: {
        handleClick(tab, event) {
            // console.log(tab, event);
            // console.log(this.activeName)
        },
        // handleClick2(tab, event) {
        //     if(this.activeName2 == 'second') {
        //         if(this.key == '') {
        //             this.getKey()
        //         }
        //     }
        // },
        //表格分页
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.rechargeData.limit = val
            this.getList()
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.rechargeData.offset = (val - 1) * this.rechargeData.limit
            this.getList()
        },
        //表格列表
        getList() {
            rechargeList(this.rechargeData).then( res => {
                this.tableData = res.data.data_list
                this.total = res.data.total_count
                this.tableData.forEach( ele => {
                    if(ele.money) {
                        ele.money = ele.money/100
                    }
                    ele.create_time = formatDate(ele.create_time)
                    if(ele.type == 1) {
                        if(ele.recevie_bank&&ele.recevie_bank!='') {
                            ele.type = '线下充值-商户'
                        }else{
                            ele.type = '线下充值-系统'
                        }
                    }else if(ele.type == 2) {
                        ele.type = '余额转换'
                    }
                    if(ele.status == 1) {
                        ele.status = '进行中'
                    }else if(ele.status == 2) {
                        ele.status = '充值失败'
                    }else if(ele.status == 3) {
                        ele.status = '充值成功'
                    }
                    if(ele.recevie_bank === 'UPOPJS') {
                        ele.recevie_bank = '银联'
                    }else if(ele.recevie_bank === 'NUCC') {
                        ele.recevie_bank = '网联'
                    }
                })
            })
        },
        //进度查询
        handleCheck(row) {
            let data = {
                id: row.id
            }
            checkState(data).then(res => {
                this.$message.success('成功！！')
                this.getList()
            })
        },
        getMerInfo() {
            let data = {
                mch_id: localStorage.id
            }
            merInfo(data).then((res) => {
                this.list = res.data
                this.list.recharge = this.list.recharge/100
                this.list.bonus = this.list.bonus/100
                this.list.total = this.list.total/100
                this.list.pending = this.list.pending/100
                this.list.reservoir = this.list.reservoir/100
                this.list.entering = this.list.entering/100
                this.list.freeze = this.list.freeze/100
                this.list.available = this.list.available/100
            })
        },
        //转入代付
        rollIn() {
            if(this.rollMoney == '') {
                this.$message.error('请输入转入金额')
                return false
            }
            if(this.rollPw == '') {
                this.$message.error('请输入转入密码')
                return false
            }
            let data = {
                mch_id: localStorage.id,
                money: this.rollMoney * 100,
                password: this.rollPw,
                open_bank: '其他/中国银联股份有限公司',
                bankcard_number: '0000300000000236',
                name: '先锋支付有限公司备付金'
            }
            deposit(data).then((res) => {
                this.$message({
                    message: '请求成功，请等待审核',
                    type: 'success'
                });
                this.getMerInfo()
                this.showBox = false
            })
        },
        //发起代付
        // sentPay() {
        //     // this.$router.push('/home/sentPay')
        //     this.showPayBox = true
        // },
        save() {
            this.showBox = true
            cashList().then( res => {
                this.cities = res.data.list
            })
        },
        
        changeBank(item) {
            console.log(item)
            let bankItem = this.cities.filter(ele => {
                return ele.bankcard_number === item
            })
            console.log(bankItem)
            this.data.open_bank = bankItem[0].open_bank
            this.data.bankcard_number = bankItem[0].bankcard_number
            this.data.name = bankItem[0].name
            this.data.sub_bank = bankItem[0].sub_bank

        },
        out() {
            this.showBox =false
        },
        //提现确认
        sure() {
            if(this.activeName == 'first') {
                this.getDeposit()
            }else if(this.activeName == 'second') {
                this.rollIn()
            }
        },
        //代付充值录入确认
        sureEnter() {
            this.enterDate.money = this.enterDateMoney * 100
            for(var key in this.enterDate) {
                if(this.enterDate[key] === '') {
                    this.$message.error('请将信息填写完整')
                    return false
                }
            }
            rechargeEnter(this.enterDate).then(res => {
                if(res.data.resCode === '00000') {
                    this.$message.success('成功！！')
                    this.showEnterBox = false
                    this.rechargeData.offset = 0
                    this.getList()
                }
            })
        },
        //到银行卡
        getDeposit() {
            if(this.money == '') {
                this.$message.error('请输入提现金额')
                return false
            }
            if(this.data.password == '') {
                this.$message.error('请输入密码')
                return false
            }
            if(this.data.open_bank == '') {
                this.$message.error('请输入开户行')
                return false
            }
            if(this.data.sub_bank == '') {
                this.$message.error('请输入开户支行')
                return false
            }
            if(this.data.bankcard_number == '') {
                this.$message.error('请输入银行卡号')
                return false
            }
            if(this.data.name == '') {
                this.$message.error('请输入姓名')
                return false
            }
            this.data.money = this.money * 100
            this.data.mch_id = localStorage.id
            deposit(this.data).then((res) => {
                this.getMerInfo()
                this.$message({
                    message: '请求成功，请等待审核',
                    type: 'success'
                });
                this.showBox = false
            })
        },
        //获取密钥
        // getKey() {
        //     let data = {
        //         user_id: localStorage.id,
        //     }
        //     key(data).then((res) => {
        //         if(res.data.key) {
        //             this.key = res.data.key
        //         } else{
        //             this.$message.error('请先设置密钥！！')
        //         }
        //     })
        // },
        //发起代付
        // saveSentPay() {
        //     if(this.parms.acc_name == '') {
        //         this.$message.error('请输入姓名！！')
        //         return
        //     }
        //     if(this.parms.money == '') {
        //         this.$message.error('请输入金额！！')
        //         return
        //     }
        //     if(this.parms.acc_no == '') {
        //         this.$message.error('请输入银行卡号！！')
        //         return
        //     }
        //     let data = JSON.parse(JSON.stringify(this.parms))
        //     data.money = this.parms.money * 100
        //     data.mch_id = localStorage.id
        //     data.mch_order_id = localStorage.id + new Date().getTime()
        //     for(var key in data) {
        //         if(data[key] === '') {
        //             delete data[key]
        //         }
        //     }
        //     //  ASCII字典序排序
        //     let sortData = utils.sort_ASCII(data)
        //     let dataStr = ''
        //     Object.keys(sortData).map((key)=>{
        //         dataStr += key + '=' + sortData[key] +'&';    
        //     })
        //     dataStr += 'key=' + this.key
        //     console.log(dataStr)
        //     //签名
        //     data.sign=md5(dataStr).toUpperCase()
        //     sentPay(data).then( res => {
        //         console.log(res)
        //         if(res.data.code == 'A000') {
        //             this.$message.success('请求成功！')
        //         }else {
        //             this.$message.error(res.data.message)
        //         }
        //     })
        // },
        //上传文件
        // uploadFile($event){
        //     console.log($event.target.files[0])
        // },
        // getFile() {
        //     // console.log(this.$refs.file.files[0])
        //     let file = this.$refs.file.files[0]
        //     let param = new FormData()   // 创建form对象
        //     param.append('file', file)   // 通过append向form对象添加数据
        //     importExcel(param).then(res => {
        //         this.$message.success('导入成功！！')
        //     })
        // },
        // down() {
        //     window.location.href = hostName + '/bankpay/excel/export'
        //     // downExcel().then(res => {
        //     //     this.$message.success('下载成功！！')
        //     //     window.location.href = hostName + '/bankpay/excel/export'
        //     // })
        // }
    },
    mounted() {
        this.getMerInfo()
        this.getList()
    }
}
</script>

<style lang='sass' scoped>
.add-peopel
    color: #3D4060;
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
        padding-left: 30px
        img
            width: 35px
            height: 35px
    .wrapper
        display: flex
        align-items: center
        margin-left: -20px
        // padding: 40px 0 0 30px
        // width: 600px
        .item 
            margin-top: 30px
            margin-left: 50px
            font-size: 14px
            .name
                display: inline-block
                width: 120px
                font-size: 13px
                font-weight: bold
            input
                border: 1px solid #B1B3C1;
                border-radius: 2px;
                width: 240px    
                height: 40px
                line-height: 40px
                padding-left: 20px 
    
    .btn
        display: inline-block
        // width: 80px
        padding: 0 20px
        height: 30px
        line-height: 30px
        background: #00BFA6;
        border-radius: 15px;
        color: #fff
        // font-weight: bold
        font-size: 14px
        text-align: center
        margin-top: 30px
        margin-left: 30px
    .enter-wrapper
        padding-left: 30px
        margin-top: 30px
        .list-title
            font-size: 16px
            font-weight: bold
        .btn
            margin-top: 30px
        .table
            margin-top: 10px
            width: 1050px
            .block
                padding: 30px 0
                text-align: center 

    .cancel
        background:  #B1B3C1
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
        .box-title 
            font-size: 20px
            font-weight: bold
            padding-bottom: 20px
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