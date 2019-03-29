import { myPost,myGet,myDelete } from './axioxLoading'

//  登录
export const login = p => myPost('/login/phone', p);

//获取code
export const code = p => myPost('/login/phone/verify_code', p);


//  账户明细
export const merInfo = p => myGet('/wallet',{params: p})
//  提现
export const deposit = p => myPost('/cash', p);
//  今日账单数据
export const todayNum = p => myGet('/bill/today',{params: p})
//  账单明细
export const billList = p => myGet('/bill',{params: p})
// 密钥
export const key = p => myGet('/user/secret',{params: p})
// 随机生成私钥
export const randomKey = p => myPost('/user/secret/random', p);
// 设置私钥
export const setKey = p => myPost('/user/secret', p);
//  查询结算信息
// export const settlement = p => myGet('/user/settlement',{params: p})
// 修改结算信息
// export const own = p => myPost('/user/settlement/own', p);

// 用户信息
// export const accountList = p => myGet('/admin/user/list',{params: p})

// 利率设置
// export const accountRate = p => myPost('/user/settlement/charge', p);

//  登出
export const loginOut = () => myDelete('/own')

//  重设密码
export const resetKey = p => myPost('/pwd/forget', p);

//  上传图片
export const imgUp = p => myPost('/files', p);

//  获取图片
export const getImg = p => myGet('/files/' + p)

//  提交审核
export const submitAudit = p => myPost('/user/base', p);

// 商户基本信息
export const merList = p => myGet('/user/base',{params: p})

//商户支付费率
export const merAppRate = p => myGet('/mch/app',{params: p})

//商户代付费率
export const merPayRate = p => myGet('/bankpay/mch/rate',{params: p})

// 提现列表
export const auditList = p => myGet('/cash/list',{params: p})

// 转入代付池
export const converMoney = p => myPost('/wallet/conversion', p);

// 代付充值录入
export const rechargeEnter = p => myPost('/wallet/recharge/mch', p);

// 查询进度
export const checkState = p => myGet('/wallet/recharge/mch',{params: p})

// 充值记录
export const rechargeList = p => myGet('/wallet/recharge/log',{params: p})

 
//  图标数据
export const chartData = p => myGet('/stats',{params: p})

// 主页数据统计
export const statsTotal = p => myGet('/stats/total',{params: p})

//分润统计
export const bonusStat = (p,n) => myGet('/stats/bonus/' + p, {params: n})


//首页支付数据统计
export const enterDate = (p,n) => myGet('/stats/bill/'+p,{params: n})

//首页支付数据统计
export const outDate = (p,n) => myGet('/stats/order/'+p,{params: n})



//  统一下单
export const payOrder = p => myPost('/pay/order', p)

// 补单
export const reissue = p => myPost('/bill/reissue', p)

//切换通道
export const changeChannel = p => myPost('/channel/mch/' + p)

//  代付明细
export const payList = p => myGet('/bankpay',{params: p})

//发起代付
export const sentPay = p => myPost('/bankpay/order', p)

//模板下载
export const downExcel = () => myGet('/bankpay/excel/export')

//导入excel
export const importExcel = p => myPost('/bankpay/excel/import', p)



//代理商列表
export const agentList = p => myGet('/mch/agency',{params: p})


//关联两个商户
export const lineAgent = p => myPost('/mch/agency',p)

//删除子账户
export const delChildAgent = p => myDelete('/mch/agency/'+ p)

// 查询子账户
export const available = p => myGet('/mch/agency/available',{params: p})

// 查询银行卡列表
export const cashList = () => myGet('/cash')

//通道列表
export const channelList = p => myGet('/channel/sys',{params: p})