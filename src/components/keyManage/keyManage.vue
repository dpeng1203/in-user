<template>
    <div class="key-manage">
        <div class="title">
            <span>密钥信息</span>
        </div>
        <div class="wrapper">
            <div class="item">
                <span class="name">商户密钥:</span>
                <input type="text"  v-model="key" >
            </div>
        </div>
        <div class="btn cancel" @click="getRandom">随机生成私钥</div>
        <div class="btn succ" @click="save">确认</div>
    </div>
</template>

<script>
import { key,randomKey,setKey } from '../../config/api'
export default {
    name: 'keyManage',
    data() {
        return{
            key: '',
            showBox: false
        }
    },
    methods:{
        getRandom() {
            let data = {
                "user_id": localStorage.id,
            }
            randomKey(data).then((res) => {
                console.log(res)
                this.key = res.data.key
                // this.list = res.data
            })
        },
        save() {
            this.$confirm('确定生成商户密钥?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.setKey()
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
        setKey() {
            let data = {
                user_id: localStorage.id,
                secret_key: this.key
            }
            setKey(data).then((res) => {
                
                localStorage.key = this.key
                console.log(localStorage.key)
                // this.list = res.data
            }, (err) => {
                console.log(err)
                this.$message.error('查询失败，请联系开发人员');
                // console.log("查询失败，请联系开发人员")
            })

        },
        getKey() {
            let data = {
                "user_id": localStorage.id,
            }
            key(data).then((res) => {
                console.log(res)
                if(res.data.key) {
                    this.key = res.data.key
                }
                // this.list = res.data
            })
        }

    },
    mounted() {
        this.getKey()
    }

}
</script>

<style lang='sass' scoped>
.key-manage
    color: #3D4060;
    padding-left: 30px
    .title 
        font-size: 20px
        font-weight: bold
    .wrapper
        padding-top: 40px 
        .item 
            margin-top: 30px
            font-size: 14px
            .name
                display: inline-block
                width: 120px
                font-size: 14px
                font-weight: bold
                text-align: center
            input
                border: 1px solid #B1B3C1;
                border-radius: 2px;
                width: 300px    
                height: 40px
                line-height: 40px
                padding-left: 20px 
    .btn
        display: inline-block
        width: 150px
        height: 40px
        line-height: 40px
        background: #00BFA6;
        border-radius: 25px;
        color: #fff
        font-weight: bold
        font-size: 16px
        text-align: center
        margin-top: 100px
    .cancel
        background:  #B1B3C1
    .succ
        margin-left: 20px
</style>
