<template>
    <div class="data-detail">
        <div class="stat-wrapper">
            <div class="data-wrapper">
                <div class="title">
                    <span>支付数据：</span>
                    <el-select v-model="value1" placeholder="请选择" @change="changeEnterDate">
                        <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </div>
                <div class="pay-box">
                    <div class="content">
                        <div class="cont-title">成功收款金额</div>
                        <div class="money"><span class="number">{{enterDate.suc_money}}</span>万元</div>
                    </div>
                    <div class="content">
                        <div class="cont-title">成功订单量</div>
                        <div class="money"><span class="number">{{enterDate.suc_count}}</span>笔</div>
                    </div>
                    <div class="content">
                        <div class="cont-title">未成功收款金额</div>
                        <div class="money"><span class="number">{{enterDate.fail_money}}</span>万元</div>
                    </div>
                    <div class="content">
                        <div class="cont-title">未成功订单量</div>
                        <div class="money"><span class="number">{{enterDate.fail_count}}</span>笔</div>
                    </div>
                    <div class="content">
                        <div class="cont-title">成功率</div>
                        <div class="money"><span class="number">{{enterDate.rate}}</span>%</div>
                    </div>
                    <div class="content">
                        <div class="cont-title">支付收益</div>
                        <div class="money"><span class="number">{{enterDate.profit}}</span>元</div>
                    </div>
                </div>
                <!-- <div class="pay-box">
                    <div class="content">
                        <div class="cont-title">总手续费</div>
                        <div class="money"><span class="number">{{enterDate.charge}}</span>元</div>
                    </div>
                    <div class="content">
                        <div class="cont-title">成功率</div>
                        <div class="money"><span class="number">{{enterDate.rate}}</span>%</div>
                    </div>
                    
                    <div class="content">
                        <div class="cont-title">支付收益</div>
                        <div class="money"><span class="number">{{enterDate.profit}}</span>元</div>
                    </div>
                </div> -->
            </div>
            <div class="data-wrapper">
                <div class="title">
                    <span>代付数据：</span>
                    <el-select v-model="value2" placeholder="请选择" @change="changeOutDate">
                        <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </div>
                <div class="pay-box">
                    <div class="content">
                        <div class="cont-title">成功代付金额</div>
                        <div class="money"><span class="number">{{outDate.suc_money}}</span>万元</div>
                    </div>
                    <div class="content">
                        <div class="cont-title">成功订单量</div>
                        <div class="money"><span class="number">{{outDate.suc_count}}</span>笔</div>
                    </div>
                    <div class="content">
                        <div class="cont-title">未成功代付金额</div>
                        <div class="money"><span class="number">{{outDate.fail_money}}</span>万元</div>
                    </div>
                    <div class="content">
                        <div class="cont-title">未成功订单量</div>
                        <div class="money"><span class="number">{{outDate.fail_count}}</span>笔</div>
                    </div>
                    <div class="content">
                        <div class="cont-title">成功率</div>
                        <div class="money"><span class="number">{{outDate.rate}}</span>%</div>
                    </div>
                    <div class="content">
                        <div class="cont-title">代付收益</div>
                        <div class="money"><span class="number">{{outDate.profit}}</span>元</div>
                    </div>
                </div>
                <!-- <div class="pay-box">
                    <div class="content">
                        <div class="cont-title">总手续费</div>
                        <div class="money"><span class="number">{{outDate.charge}}</span>元</div>
                    </div>
                    <div class="content">
                        <div class="cont-title">成功率</div>
                        <div class="money"><span class="number">{{outDate.rate}}</span>%</div>
                    </div>
                    
                    <div class="content">
                        <div class="cont-title">代付收益</div>
                        <div class="money"><span class="number">{{outDate.profit}}</span>元</div>
                    </div>
                </div> -->
            </div>
        </div>
        <div>
            <div class="chart-wrapper" >
                <div class="chart-title">每小时交易金额</div>
                <div class="chart-ct">
                    <div id="c1"></div>
                </div>
            </div>
        </div>
        <div>
            <div class="chart-wrapper" >
                <div class="chart-title">每小时交易数量</div>
                <div class="chart-ct">
                    <div id="c2"></div>
                </div>
            </div>
        </div>
        
        
    </div>
       
</template>

<script>
import { chartData,enterDate,outDate } from '../../config/api'
import G2 from '@antv/g2';
export default {
    data() {
        return{
            serverData: [],
            options: [
                {value: '0d',label: '今天'},{value: '1d',label: '昨天'},{value: '3d',label: '最近3天'},{value: '7d',label: '最近一周'},
                {value: '1m',label: '最近一月'},{value: '3m',label: '最近三月'},{value: '1y',label: '最近一年'}
            ],
            value: '0d',

            options1: [
                {value: '0d',label: '今天'},{value: '1d',label: '昨天'},{value: '3d',label: '最近3天'},{value: '7d',label: '最近一周'},
                {value: '1m',label: '最近一月'},{value: '3m',label: '最近三月'},{value: '1y',label: '最近一年'}
            ],
            value1: '0d',
            options2: [
                {value: '0d',label: '今天'},{value: '1d',label: '昨天'},{value: '3d',label: '最近3天'},{value: '7d',label: '最近一周'},
                {value: '1m',label: '最近一月'},{value: '3m',label: '最近三月'},{value: '1y',label: '最近一年'}
            ],
            value2: '0d',
            enterDate: {},
            outDate: {},
            gridData1: [],
            gridData2: [],
            dialogTableVisible1: false,
            dialogTableVisible2: false
        }
    },
    methods:{
        getMoneyChart() {
            var chart = new G2.Chart({
                container: 'c1',
                forceFit: true,
                height: 300,
                padding: [ 20, 20, 95, 80 ]
            });
            chart.source(this.serverData, {
                hour: {
                    range: [0, 1]
                }                
            });
            chart.tooltip({
                crosshairs: {
                    type: 'line'
                }
            });
            chart.axis('sum', {
                label: {
                    formatter: function formatter(val) {
                        return val + '万元';
                    }
                }
            });
            chart.axis('hour', {
                label: {
                    formatter: function formatter(val) {
                        return val + '时';
                    }
                }
            });
            chart.line().position('hour*sum').color('status');
            chart.point().position('hour*sum').color('status').size(4).shape('circle').style({
                stroke: '#fff',
                lineWidth: 1
            });
            chart.render();
        },
        getOrderChart() {
            var chart = new G2.Chart({
                container: 'c2',
                forceFit: true,
                height: 300,
                padding: [ 20, 20, 95, 80 ]
            });
            chart.source(this.serverData, {
                hour: {
                    range: [0, 1]
                }                
            });
            chart.tooltip({
                crosshairs: {
                    type: 'line'
                }
            });
            chart.axis('count', {
                label: {
                    formatter: function formatter(val) {
                        return val + '笔';
                    }
                }
            });
            chart.axis('hour', {
                label: {
                    formatter: function formatter(val) {
                        return val + '时';
                    }
                }
            });
            chart.line().position('hour*count').color('status');
            chart.point().position('hour*count').color('status').size(4).shape('circle').style({
                stroke: '#fff',
                lineWidth: 1
            });
            chart.render();
        },

        //精确js加法运算
        add(num1, num2) {
            const num1Digits = (num1.toString().split('.')[1] || '').length;
            const num2Digits = (num2.toString().split('.')[1] || '').length;
            const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
            return (num1 * baseNum + num2 * baseNum) / baseNum;
        },

        //最新统计
        getData() {
            let data = {
                mch_id: localStorage.id
            }
            chartData(data).then( res => {
                this.serverData = res.data
                this.serverData.forEach( ele => {
                    ele.sum = ele.sum/100/10000
                    if(ele.status == 3) {
                        ele.status = '交易成功'
                    }else if(ele.status == 1) {
                        ele.status = '待支付'
                    }else {
                        ele.status = '交易失败'
                    }
                })
                this.getMoneyChart()
                this.getOrderChart()
            })
        },
        //支付数据
        getEnterDate() {
            let data = {
                mch_id: localStorage.id
            }
            enterDate(this.value1,data).then(res => {
                let date = res.data
                date.fail_money = date.fail_money/100/10000
                date.suc_money = date.suc_money/100/10000
                if(data.profit) {
                    date.profit = (date.profit/100).toFixed(2)
                }else{
                    date.profit = 0
                }
                
                if(date.suc_money === 0 && date.fail_money === 0) {
                    date.rate = '0.00'
                }else{
                    date.rate = (date.suc_money/(date.suc_money+date.fail_money)*100).toFixed(2)
                }
                date.fail_money= date.fail_money.toFixed(2)
                date.suc_money = date.suc_money.toFixed(2)
                this.enterDate = date
            })
        },
        //代付数据
        getOutDate() {
            let data = {
                mch_id: localStorage.id
            }
            outDate(this.value2,data).then(res => {
                let date = res.data
                date.fail_money = date.fail_money/100/10000
                date.suc_money = date.suc_money/100/10000
                if(data.profit) {
                    date.profit = (date.profit/100).toFixed(2)
                }else{
                    date.profit = 0
                }
                if(date.suc_money === 0 && date.fail_money === 0) {
                    date.rate = '0.00'
                }else{
                    date.rate = (date.suc_money/(date.suc_money+date.fail_money)*100).toFixed(2)
                }
                date.fail_money= date.fail_money.toFixed(2)
                date.suc_money = date.suc_money.toFixed(2)
                this.outDate = date
            })
        },
        changeEnterDate() {
            this.getEnterDate()
        },
        changeOutDate() {
            this.getOutDate()
        },

    },
    mounted() {
        this.getData()
        this.getEnterDate()
        this.getOutDate()
    }
}
</script>

<style lang='sass' scoped>
.data-detail
    color: #3D4060;
    padding-left: 20px
    .stat-wrapper
        .data-wrapper
            width: 90%
            padding: 20px
            background: #eee
            box-shadow: 0 1px 2px 0 rgba(0,0,0,.05)
            border-radius: 10px
            margin-bottom: 10px
            .title 
                font-size: 15px
            .pay-box
                display: flex
                margin-top: 10px
                .content
                    flex: 1
                    border: 2px #fff solid
                    background: #fff
                    border-radius: 3px
                    padding: 14px 20px 10px
                    color: #8492A6
                    font-size: 13px
                    font-weight: 400
                    margin-right: 5px
                    .cont-title
                        color: #5F6E82
                        font-size: 14px
                    .money
                        margin-top: 5px
                        .number
                            font-size: 32px
                            color: #475669
                            margin-right: 5px
                    .btn
                        display: block
                        text-align: center
                .content:hover
                    border: 2px #00BFA6 solid

    .chart-wrapper
        padding: 20px   
        margin-top: 10px
        display: inline-block
        background: #eee
        box-shadow: 0 1px 2px 0 rgba(0,0,0,.05)
        border-radius: 10px
        .chart-title
            font-size: 15px
            // font-weight: bold
            padding: 0 0 10px 0
        .chart-ct
            background: #fff
            border-radius: 10px
            width: 1000px
            padding-top: 30px
            padding-right: 35px
            
</style>
