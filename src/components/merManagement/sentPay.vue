<template>
    <div class="sent-pay">
        <div class="title">
            <img src="../../assets/img/ic_back.png" alt="" @click="$router.go(-1)">
            <span>发起代付</span>
        </div>
        <div class="wrapper">
            <div class="item">
                <span class="name">代付类型</span>
                <el-radio v-model="parms.pay_type" label="1">对私</el-radio>
                <el-radio v-model="parms.pay_type" label="2">对公</el-radio>
            </div>
            <div class="item">
                <span class="name"><span class="tip">*</span>姓名</span>
                <input type="text" v-model="parms.acc_name" placeholder="请输入姓名">
            </div>
            <div class="item">
                <span class="name"><span class="tip">*</span>金额</span>
                <input type="text"  v-model="parms.money" placeholder="请输入金额">
            </div>
            <div class="item">
                <span class="name"><span class="tip">*</span>收款卡号</span>
                <input type="text"  v-model="parms.acc_no" placeholder="请输入收款卡号">
            </div>
            
            <div class="item" v-if="parms.pay_type == 2">
                <span class="name"><span class="tip">*</span>联行号</span>
                <input type="text" v-model="parms.issuer" placeholder="请输入联行号">
            </div>
            <div class="item">
                <span class="name">手机号</span>
                <input type="text" v-model="parms.mobile" placeholder="请输入手机号">
            </div>
            <div class="item">
                <span class="name">银行名称</span>
                <input type="text" v-model="parms.bank_name" placeholder="请输入银行名称">
            </div>
            <div class="item">
                <span class="name">银行编码</span>
                <input type="text" v-model="parms.bank_no" placeholder="请输入银行编码">
            </div>
            <div class="btn" @click="save">确认</div>
        </div>

    </div>       
</template>

<script>
import utils from '../../assets/js/util'
// import {hex_md5,str_md5} from '../../assets/js/md5.js'
import md5 from '../../assets/js/md5China.js'
import { key,sentPay } from '../../config/api'
export default {
    data() {
        return{
            key: '',
            parms: {
                acc_name: '',
                money: '',
                acc_no: '',
                pay_type: '1',
                issuer: '',
                mobile: '',
                bank_name: '',
                bank_no: ''
            }
            
        }
    },
    methods: {
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
        save() {
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
            console.log(dataStr)
            //签名
            data.sign=md5(dataStr).toUpperCase()
            sentPay(data).then( res => {
                console.log(res)
                if(res.data.code == 'A000') {
                    this.$message.success('请求成功！')
                }else {
                    this.$message.error(res.data.message)
                }
            })
        }
    },
    mounted() {
        this.getKey()
    }
}
</script>

<style lang='sass' scoped>
.sent-pay
    color: #3D4060;
    padding-left: 30px
    .title 
        font-size: 24px
        font-weight: bold
    .wrapper
        padding: 20px 0 0 0
        .item 
            margin-top: 15px
            font-size: 14px
            .tip
                color: red
            .name
                display: inline-block
                width: 150px
                font-size: 14px
                font-weight: bold
            input
                border: 1px solid #B1B3C1;
                border-radius: 2px;
                width: 280px    
                height: 40px
                line-height: 40px
                padding-left: 20px 
    .btn
        display: inline-block
        padding: 0 40px
        width: 160px
        height: 50px
        line-height: 50px
        background: #00BFA6;
        border-radius: 25px;
        color: #fff
        font-weight: bold
        font-size: 16px
        text-align: center
        margin: 50px 0 100px 0
</style>
