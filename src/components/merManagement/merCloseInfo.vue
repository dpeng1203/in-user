<template>
    <div class="mer-close-info">
        <div class="title">
            <span>商户结算信息详情</span>
        </div>
        <div class="wrapper">
            <div class="item">
                <span class="name">姓名</span>
                <input type="text"  v-model="name" placeholder="请输入姓名">
            </div>
            <div class="item">
                <span class="name">身份证</span>
                <input type="text"  v-model="identity_card " placeholder="请输入身份证">
            </div>
            <div class="item">
                <span class="name">银行卡号</span>
                <input type="text" v-model="bankcard_number " placeholder="请输入银行卡">
            </div>
            <div class="item">
                <span class="name">手机号</span>
                <input type="text" v-model="reserved_phone " placeholder="请输入手机号">
            </div>
            <div class="item">
                <span class="name">开户支行</span>
                <input type="text" v-model="sub_bank " placeholder="请输入开户支行">
            </div>
            <div class="btn" @click="save">确认</div>
        </div>

    </div>    
</template>

<script>
// import { settlement,own } from '../../config/api'
export default {
    name: 'merCloseInfo',
    data() {
        return{
            name: '',
            identity_card: '',
            bankcard_number: '',
            reserved_phone: '',
            sub_bank: ''
        }
    },
    methods: {
        getSettlement() {
            let data = {
                user_id: localStorage.id
            }
            settlement(data).then((res) => {
                console.log(res)
                if(res.data && res.data != '') {
                    this.name = res.data.name
                    this.identity_card = res.data.identity_card
                    this.bankcard_number = res.data.bankcard_number
                    this.reserved_phone = res.data.reserved_phone
                    this.sub_bank = res.data.sub_bank
                }
            })
        },
        save() {
            if(this.name == '') {
                this.$message({
                    showClose: true,
                    message: '请输入姓名',
                    type: 'warning'
                });
                return false
            }
            if(this.identity_card == '') {
                this.$message({
                    showClose: true,
                    message: '请输入身份证',
                    type: 'warning'
                });
                return false
            }
            if(this.bankcard_number == '') {
                this.$message({
                    showClose: true,
                    message: '请输入银行卡',
                    type: 'warning'
                });
                return false
            }
            if(this.reserved_phone == '') {
                this.$message({
                    showClose: true,
                    message: '请输入手机号',
                    type: 'warning'
                });
                return false
            }
            if(this.sub_bank == '') {
                this.$message({
                    showClose: true,
                    message: '请输入开户支行',
                    type: 'warning'
                });
                return false
            }
            this.$confirm('确定修改信息?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.saveBtn()
                this.$message({
                    type: 'success',
                    message: '设置成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });          
            });
        },
        saveBtn() {
            let data = {
                user_id: localStorage.id,
                name: this.name,
                identity_card: this.identity_card,
                bankcard_number: this.bankcard_number,
                reserved_phone: this.reserved_phone,
                sub_bank: this.sub_bank
            }
            own(data).then((res) => {
                console.log(res)
            })
        }
    },
    mounted() {
        this.getSettlement()
    }

}
</script>

<style lang='sass' scoped>
.mer-close-info
    color: #3D4060;
    padding-left: 30px
    .title 
        font-size: 24px
        font-weight: bold
    .wrapper
        padding: 40px 0 0 0
        .item 
            margin-top: 20px
            font-size: 14px
            .name
                display: inline-block
                width: 180px
                font-size: 14px
                font-weight: bold
            input
                border: 1px solid #B1B3C1;
                border-radius: 2px;
                width: 350px    
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
