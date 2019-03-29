<template>
    <div class="reset-key">
        <div class="title">
            <span>修改密码</span>
        </div>
        <div class="wrapper">
            <div class="item">
                <span class="name">原密码:</span>
                <input type="password"  v-model="key1" >
            </div>
            <div class="item">
                <span class="name">新密码:</span>
                <input type="password"  v-model="key2" >
            </div>
            <div class="item">
                <span class="name">确认新密码:</span>
                <input type="password"  v-model="key3" >
            </div>
        </div>
        <div class="btn" @click="save">确认</div>
    </div>    
</template>

<script>
import { resetKey } from '../../config/api'
export default {
    data() {
        return{
            key1: '',
            key2: '',
            key3: ''
        }
    },
    methods: {
        save() {
            if( this.key2!=this.key3 ) {
                this.$message.error('两次输入密码不一致');
                return false
            }
            this.$confirm('确定修改商户密码?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.resetKey()
                
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });          
            });
            
        },
        resetKey() {
            let data = {
                user_id: localStorage.id,
                old_pwd: this.key1,
                new_pwd: this.key2
            }
            resetKey(data).then( res => {
                this.$message({
                    type: 'success',
                    message: '修改成功!'
                });
            })
        }
    },

}
</script>

<style lang='sass' scoped>
.reset-key
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
</style>
