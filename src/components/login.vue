<template>
    <div class="login">
        <div class="wrapper">
            <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" stretch class="tabs">
                <el-tab-pane label="登录" name="first">
                    <div class="user-login">
                        <div class="title">Alian用户登录</div>
                        <div><input type="text" placeholder="手机号" v-model="account"></div>
                        <div v-if="!showMes">
                            <div class="input-wrap" v-if="eyeOpen">
                                <input type="password" placeholder="密码" v-model="pw" @keyup.enter="login">
                                <img src="../assets/img/eye_close.png" alt=""  @click="showPw" > 
                            </div>
                            <div class="input-wrap" v-if="!eyeOpen">
                                <input type="text" placeholder="密码" v-model="pw" @keyup.enter="login">
                                <img src="../assets/img/eye_open.png" alt="" @click="showPw"> 
                            </div>
                        </div>
                        <div class="mes-login" v-if="showMes"> 
                            <input type="text" placeholder="短信验证码" v-model="code" class="mes-input">
                            <span v-show="show" @click="getCode" class="get-code">获取验证码</span>
                            <span v-show="!show" class="count">{{count}} s</span>
                        </div>
                        <div class="btn-wrapper" >
                            <div class="btn"  @click="showMes = !showMes" >切换登录方式 </div>
                            <div class="btn" @click="login" >登 <span>入</span> </div>
                        </div>
                    </div>
                    
                </el-tab-pane>
                <el-tab-pane label="注册" name="second">
                    <div class="user-login">
                        <div class="title">Alian用户注册</div>
                        <div><input type="text" placeholder="账号" v-model="account"></div>
                        
                        <div class="input-wrap" v-if="eyeOpen">
                            <input type="password" placeholder="密码" v-model="pw">
                            <img src="../assets/img/eye_close.png" alt=""  @click="showPw"> 
                        </div>
                        <div class="input-wrap" v-if="!eyeOpen">
                            <input type="text" placeholder="密码" v-model="pw">
                            <img src="../assets/img/eye_open.png" alt="" @click="showPw"> 
                        </div>
                        <div class="input-wrap" v-if="eyeOpen1">
                            <input type="password" placeholder="再次输入密码" v-model="pwAgain">
                            <img src="../assets/img/eye_close.png" alt=""  @click="showPw1"> 
                        </div>
                        <div class="input-wrap" v-if="!eyeOpen1">
                            <input type="text" placeholder="再次输入密码" v-model="pwAgain">
                            <img src="../assets/img/eye_open.png" alt="" @click="showPw1"> 
                        </div>
                        
                        <div class="mes-login" > 
                            <input type="text" placeholder="短信验证码" v-model="code" class="mes-input">
                            <span v-show="show" @click="getCode" class="get-code">获取验证码</span>
                            <span v-show="!show" class="count">{{count}} s</span>
                        </div>
                        <div class="btn-wrapper">
                            <div class="btn btn-zhuce" @click="sign">注册</div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        
    </div>    
</template>

<script>
import SlideVerify from 'vue-monoplasty-slide-verify';
import {login,code} from '../config/api'
export default {
    data() {
        return{ 
            show: true,      //60秒倒计时
            count: '',
            timer: null,
            showMes: true,          //登录方式
            activeName: 'first',
            eyeOpen: true,
            eyeOpen1: true,
            account: '',
            pw: '',
            pwAgain: '',
            code: ''
        }
    },
    methods: {
        getCode() {
            if(this.account == '') {
                this.$message.error('请输入手机号')
                return false
            }
            const TIME_COUNT = 60;
            if (!this.timer) {
                this.count = TIME_COUNT;
                this.show = false;
                let data = {
                    phone: this.account
                }
                code(data).then( res => {
                    this.$message.success('请查收短信！')
                })
                this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                    this.count--;
                    } else {
                    this.show = true;
                    clearInterval(this.timer);
                    this.timer = null;
                    }
                }, 1000)
            }
            
        },
        handleClick(tab, event) {
            // console.log(tab, event);
            if(this.activeName == 'second') {
                this.code= ''
            }
        },
        showPw() {
            this.eyeOpen = !this.eyeOpen
        },
        showPw1() {
            this.eyeOpen1 = !this.eyeOpen1
        },
        login() {
            if(this.account == '') {
                this.$message.error('请输入手机号')
                return false
            }
            let data = {}
            if(this.showMes) {
                if(this.code== '') {
                    this.$message.error('请输入短信验证码！')
                    return
                }
                data = {
                    phone: this.account,
                    code: this.code
                }
            }else{
                if(this.pw == '') {
                    this.$message.error('请输入密码!')
                    return false
                }
                data = {
                    phone: this.account,
                    password: this.pw
                }
            }
            login(data).then((res) => {
                localStorage.id = res.data.id
                localStorage.nickname = res.data.nickname
                if(res.data.audit_state === 1) {
                    this.$router.push('/home')
                    localStorage.name = res.data.base.mch_name
                    if(res.data.roles && res.data.roles.length != 0) {
                        let arr = res.data.roles.filter(ele => {
                            return ele.id == 1004
                        })
                        if(arr.length!=0) {
                            if(arr[0].permissions && arr[0].permissions.length!=0) {
                                arr[0].permissions.forEach(element => {
                                    if(element.id == 41002) {
                                        localStorage.rolesId = 41002
                                    }
                                })
                            }
                        }
                    }
                }else if( res.data.audit_state === 0 ){
                    this.$router.push({ path: '/merAudit', query: {list: res.data.base}})
                }else{
                    this.$router.push({ path: '/merAudit', query: {state: 2}})
                }
               
            })
        },
        sign() {
            if(this.account == '') {
                this.$message.error('请输入手机号！')
                return false
            }
            if(this.pw == '') {
                this.$message.error('请设置密码！')
                return false
            }
            if(this.pw != this.pwAgain) {
                this.$message.error('两次密码不一致，请重新输入')
                this.pwAgain = ''
                return false
            }
            if(this.code == '') {
                 this.$message.error('请输入短信验证码！')
                return false
            }
            let data= {
                phone: this.account,
                code: this.code,
                password: this.pw
            }
            login(data).then( res => {
                localStorage.id = res.data.id
                localStorage.nickname = res.data.nickname
                if(res.data.audit_state === 1) {
                    this.$message.error('该商户已注册！')
                }else if( res.data.audit_state === 0 ){
                    this.$router.push({ path: '/merAudit', query: {list: res.data.base}})
                }else{
                    this.$router.push({ path: '/merAudit', query: {state: 2}})
                }
            })
        }
    },
    mounted() {
        localStorage.clear()
    }
}
</script>

<style lang="sass" scoped>
.login
    width: 100%;
    height: 100vh
    background-image: url(../assets/img/background.jpg)
    background-size: 100% 100%;
    position: relative;
    .wrapper
        position: absolute
        top: 50%
        left: 50%
        margin-top: -230px
        margin-left: -185px
        width: 370px
        background: rgba(255,255,255, 0.2)
        margin-right: 250px
        border-radius: 5px
        // padding: 0px 30px
        text-align: center
        .user-login
            padding: 0 20px 30px
        .title 
            font-size: 20px
            font-weight: bold
            padding-bottom: 20px
        
        input
            border: 1px solid #B1B3C1;
            border-radius: 5px;
            font-size: 16px
            width: 100%
            height: 40px
            line-height: 40px
            margin-top: 20px
            padding-left: 20px
        .input-wrap
            position: relative
            img
                position: absolute
                right: 10px
                top: 32px
                width: 20px
                height: 20px
        .mes-login
            margin-top: 20px
            .mes-input
                width: 70%
                margin-top: 0px
            span
                display: inline-block
                font-size: 14px
                border: 1px solid #B1B3C1;
                width: 27%
                line-height: 38px
                margin-top: 0px
                border-radius: 5px;
            .get-code
                cursor: pointer
        .btn-wrapper
            // display: flex
            // align-items: center
            // justify-content: center
            margin-top: 40px
            .btn
                width: 100%
                margin: 0 auto  
                margin-top: 10px
                background: #00BFA6
                border: 1px solid #B1B3C1;
                border-radius: 5px;
                color: #fff
                height: 40px
                font-size: 16px
                line-height: 40px
                cursor: pointer
            span
                margin-left: 20px
            .btn-zhuce
                width: 300px
        .sign
            font-size: 13px
            color: #00BFA6
            margin-top: 10px
    .tabs
        background: rgba(255,255,255, 0.5)
</style>
