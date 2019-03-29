import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import login from '@/components/login'
//商家管理
const merList = resolve => require(['../components/merManagement/merList'], resolve);
const merInfo = resolve => require(['../components/merManagement/merInfo'], resolve);
const merAudit = resolve => require(['../components/merManagement/merAudit'], resolve);
const cashList = resolve => require(['../components/merManagement/cashList'], resolve);
const merApp = resolve => require(['../components/merManagement/merApp'], resolve);
const sentPay = resolve => require(['../components/merManagement/sentPay'], resolve);

//测试商户--二维码
const codePay = resolve => require(['../components/channelTest/codePay'], resolve);
const cnt = resolve => require(['../components/channelTest/cntTest'], resolve);
const wz = resolve => require(['../components/channelTest/wz'], resolve);
const gmfk = resolve => require(['../components/channelTest/gmfk'], resolve);
const ct = resolve => require(['../components/channelTest/ct'], resolve);
const gPay = resolve => require(['../components/channelTest/gPay'], resolve);
const easyPay = resolve => require(['../components/channelTest/easyPay'], resolve);
const qrCode = resolve => require(['../components/channelTest/qrCode'], resolve);
const channelManage = resolve => require(['../components/channelTest/channelManage'], resolve);


//主页
const homeDetail = resolve => require(['../components/homeDetail/homeDetail'], resolve);

//交易管理
const billList = resolve => require(['../components/billManage/billList'], resolve);
const oneBillDetail = resolve => require(['../components/billManage/oneBillDetail'], resolve);
const payList = resolve => require(['../components/billManage/payList'], resolve);
const payDetail = resolve => require(['../components/billManage/payDetail'], resolve);

// 密钥管理
const keyManage = resolve => require(['../components/keyManage/keyManage'], resolve);
const resetKey = resolve => require(['../components/keyManage/resetKey'], resolve);

//代理管理
const agentList = resolve => require(['../components/agent/agentList'], resolve);
const agentPayList = resolve => require(['../components/agent/agentPayList'], resolve);


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home,
      // redirect: '/home/homeDetail',
      children:[
        //商家管理
        {path: 'merList', name: 'merList', component: merList},
        {path: 'merInfo', name: 'merInfo', component: merInfo},
        {path: 'cashList', name: 'cashList', component: cashList},
        {path: 'merApp', name: 'merApp', component: merApp},
        {path: 'sentPay', name: 'sentPay', component: sentPay},
        //测试
        {path: 'cnt', name: 'cnt', component: cnt},
        {path: 'codePay', name: 'codePay', component: codePay},
        {path: 'wz', name: 'wz', component: wz},
        {path: 'gmfk', name: 'gmfk', component: gmfk},
        {path: 'easyPay', name: 'easyPay', component: easyPay},
        {path: 'ct', name: 'ct', component: ct},
        {path: 'gPay', name: 'gPay', component: gPay},
        {path: 'qrCode', name: 'qrCode', component: qrCode},
        {path: 'channelManage', name: 'channelManage', component: channelManage},
        //主页
        {path: 'homeDetail', name: 'homeDetail', component: homeDetail},

        //交易管理
        {path: 'billList', name: 'billList', component: billList},
        {path: 'oneBillDetail', name: 'oneBillDetail', component: oneBillDetail},
        {path: 'payList', name: 'payList', component: payList},
        {path: 'payDetail', name: 'payDetail', component: payDetail},
        //密钥管理
        {path: 'keyManage', name: 'keyManage', component: keyManage},
        {path: 'resetKey', name: 'resetKey', component: resetKey},
        
        //  代理管理
        {path: 'agentList', name: 'agentList', component: agentList},
        {path: 'agentPayList', name: 'agentPayList', component: agentPayList},

      ]
    },
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/merAudit',
      name: 'merAudit',
      component: merAudit
    },
    // {
    //   path: '/cnt',
    //   name: 'cnt',
    //   component: cnt
    // }
  ]
})





