<template>
    <el-menu
        mode="horizontal"
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#34395D"
        text-color="#fff"
        router
        active-text-color="#00B7AD">
        <el-menu-item index="/home/homeDetail">
            <i class="el-icon-menu"></i>
            <span slot="title">主页</span>
        </el-menu-item>
        <el-submenu index="2">
            <template slot="title">
                <i class="el-icon-printer"></i>
                <span>账户管理</span>
            </template>
            <el-menu-item index="/home/merList">账户查询</el-menu-item>
            <el-menu-item index="/home/merInfo">基本信息</el-menu-item>
            <el-menu-item index="/home/cashList">提现列表</el-menu-item>
            <el-menu-item index="/home/merApp">费率信息</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
            <template slot="title">
                <i class="el-icon-printer"></i>
                <span>交易管理</span>
            </template>
            <el-menu-item index="/home/billList">
                <i class="el-icon-document"></i>
                <span slot="title">充值交易</span>
            </el-menu-item>
            <el-menu-item index="/home/payList">
                <i class="el-icon-document"></i>
                <span slot="title">代付交易</span>
            </el-menu-item>
        </el-submenu>
        <el-submenu index="4">
            <template slot="title">
                <i class="el-icon-setting"></i>
                <span>密码管理</span>
            </template>
            <el-menu-item index="/home/keyManage">密钥管理</el-menu-item>
            <el-menu-item index="/home/resetKey">修改密码</el-menu-item>
            <!-- <el-menu-item index="4-3">交易密码</el-menu-item> -->
        </el-submenu>
        <!-- <el-submenu index="5" v-if="showPay">
            <template slot="title">
                <i class="el-icon-goods"></i>
                <span>通道测试</span>
            </template>
            <el-menu-item index="/home/codePay" >
                <i class="el-icon-document"></i>
                <span slot="title">个码</span>
            </el-menu-item>
            <el-menu-item index="/home/wz" >
                <i class="el-icon-document"></i>
                <span slot="title">网众</span>
            </el-menu-item>
            <el-menu-item index="/home/gmfk">
                <i class="el-icon-document"></i>
                <span slot="title">个码-风控</span>
            </el-menu-item>
            <el-menu-item index="/home/ct">
                <i class="el-icon-document"></i>
                <span slot="title">畅通支付</span>
            </el-menu-item>
            <el-menu-item index="/home/gPay" >
                <i class="el-icon-document"></i>
                <span slot="title">GPay支付</span>
            </el-menu-item>
            <el-menu-item index="/home/cnt" >
                <i class="el-icon-document"></i>
                <span slot="title">cnt测试</span>
            </el-menu-item>
            <el-menu-item index="/home/easyPay" >
                <i class="el-icon-document"></i>
                <span slot="title">easyPay</span>
            </el-menu-item>
            <el-menu-item index="/home/qrCode" >
                <i class="el-icon-document"></i>
                <span slot="title">BNT支付</span>
            </el-menu-item>
        </el-submenu> -->
        <el-submenu index="7">
            <template slot="title">
                <i class="el-icon-goods"></i>
                <span>商户管理</span>
            </template>
            <el-menu-item index="/home/agentList">
                <span slot="title">支付商户</span>
            </el-menu-item>
            <el-menu-item index="/home/agentPayList">
                <span slot="title">代付商户</span>
            </el-menu-item>
        </el-submenu>

        <el-menu-item index="/home/channelManage" v-if="showPay">
            <i class="el-icon-menu"></i>
            <span slot="title">通道测试</span>
        </el-menu-item>
    </el-menu>
            
</template>

<script>
import Bus from './bus'

export default {
    name: 'tabs',
    data() {
        return{
            showPay: false,
            isCollapse: false
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath)
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath)
        }

    },
    mounted() {
        if(localStorage.nickname == "13066668888") {
            this.showPay = true
        }
        Bus.$on('log', content => { 
            this.isCollapse = content
        });
    }
}
</script>

<style lang="sass" scoped>
    // .tac 
        // width: 287px
        // flex-shrink: 0
        // .el-menu-vertical-demo
        //     height: calc(100vh - 111px)
    // .el-menu-vertical-demo:not(.el-menu--collapse) 
    //     width: 220px;
    //     min-height: calc(100vh - 111px)
    //     flex-shrink: 0
</style>
