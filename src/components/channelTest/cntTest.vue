<template>
  <div class="login">
    <div class="wrapper">
      
      <div v-show="check">
        <div class="title">Alian支付</div>
        <div><input class="input-money" type="text" placeholder="金额" v-model="money"></div>
        <el-checkbox v-model="form.discount" @change='form.discount2 = !form.discount'>
          <img src="../../assets/img/zfb.jpg" alt="" class="img-logo"> 支付宝
        </el-checkbox>
        <el-checkbox v-model="form.discount2" @change='form.discount = !form.discount2'>
          <img src="../../assets/img/wx.jpg" alt=""  class="wx-logo"> 微信
        </el-checkbox>
        <div class="btn" @click="pay">支付</div>
      </div>

      <div v-show="!check">
        <div class="title">
          <img src="../../assets/img/zfb.jpg" alt="" class="z-logo" v-if="pType == '支付宝'"> 
          <img src="../../assets/img/wx.jpg" alt="" class="w-logo" v-if="pType == '微信'">
          {{`${pType}支付: ${money}元`}}
        </div>
        <div id="qrcode" ref="qrcode"></div>
        <div class="tip">请按照实际下单金额付款<p>金额不一致会导致订单失败</p></div>

        <input type="text" v-model="copyContent"  id="copy_text" style="opacity: 0;display: block;height: 0">    
        <button ref="copy" class="btn copy" data-clipboard-action="copy" data-clipboard-target="#copy_text" @click="copy">复制</button>

        <div class="btn2" @click="confirm">确认付款</div>
        <div class="btn2" @click="back">返回</div>
      </div>
    </div>
  </div>
</template>

<script>
  import Clipboard from 'clipboard';
  import {hex_md5} from '../../assets/js/md5.js'
  import {myPost, myGet, myDelete, myPut} from '../../config/axioxLoading'
  import { login } from '../../config/api'
  import { changeChannel } from '../../config/api'
  import  Qrcode from 'qrcodejs2'
  export default {
    name: 'cnt',
    data() {
      return {
        clipboard: '',
        copyContent: '',
        check: true,
        money: '',
        form: {
          discount: true,
          discount2: "",
          token: ""
        },
        orderId:'',
        submit: false,
        pType:''
      }
    },
    components: {
      Qrcode
    },
    methods: {
      copy(){
        let _this = this
        let clipboard = this.clipboard
        // 如果在内部new会出现点击两次在复制成功的现象所以还请各位多多注意
        clipboard.on('success', function () {
          _this.$message({
            message: '复制成功!!',
            type: 'success'
          })
          clipboard.destroy() //销毁缓存,然后在重新new这样不会出现点击复制上出现之前复制的内容的情况
          var copybtn = _this.$refs.copy
          _this.clipboard = new Clipboard(copybtn);
        })
        clipboard.on('error', function () {
          _this.$message.error('复制失败!!')
          clipboard.destroy()
          var copybtn = _this.$refs.copy
          _this.clipboard = new Clipboard(copybtn);
        })
      },
      login() {
            let data = {
                phone: '13066668888',
                password: '123456'
            }
            login(data).then((res) => {
               this.channel()
            })
        },
      channel() {
            changeChannel(5).then( res => {
                this.$message({
                    message: '通道切换成功！！！',
                    type: 'success'
                });
            })
        },
      back(){
        if(!this.check) {
          this.$confirm('是否已付款?', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning'
          }).then(() => {
            this.confirm()
            this.check=true;
            document.getElementById('qrcode').innerHTML = ''
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });          
          });
        }
      },
      //解决js算法不精确问题
      signFigures(num, rank = 6) {
          if(!num) return(0);
          const sign = num / Math.abs(num);
          const number = num * sign;
          const temp = rank - 1 - Math.floor(Math.log10(number));
          let ans;
          if (temp > 0) {
              ans = parseFloat(number.toFixed(temp));
          }
          else if (temp < 0) {
              ans = Math.round(number / Math.pow(10, temp)) * temp;
          }
          else {
              ans = Math.round(number);
          }
          return (ans * sign);
      },
      confirm(){
        let mch_id = 1024;
        let key = "97c8890018a34498bc3ab87484d9778e";
        let sginStr = "mch_id=1024&mch_order_id=" + this.orderId + "&key=" + key;
        let hexMd5 = hex_md5(sginStr);
        let param={
          "mch_id":mch_id,
          "sign":hexMd5,
          "mch_order_id": this.orderId,
        }

        myPost("/pay/confirm", param).then(res => {
          console.info(res);
          if (res.data.code == 'A000') {
            this.$message({
               message: res.data.message,
              type: 'success'
            })
            this.check=true;
          } else {
            this.$message({
               message: res.data.message,
              type: 'error'
            })
          }
          document.getElementById('qrcode').innerHTML = ''
        })
        // mch_id=1024&mch_order_id=201901041424211546583061908&
      },
      qrcode (url) {
        let qrcode = new Qrcode('qrcode',{
          width: 280, // 设置宽度，单位像素
          height: 250, // 设置高度，单位像素
          text: url  // 设置二维码内容或跳转地址
        })
      },
      pay() {
        if (this.money == '') {
          this.$message.error('请输入金额')
          return;
        }
        let pay_type = this.form.discount2 ? 'wx' : 'alipay';
        this.pType = pay_type == 'wx' ? '微信': '支付宝'
        console.info(pay_type)
        let money = this.signFigures(this.money * 100)
        let mch_id = 1024;
        let mch_order_id = new Date().getTime();
        this.orderId=mch_order_id;
        let key = "97c8890018a34498bc3ab87484d9778e";
        let trade_type = "native";
        let version = "1.1";
        let sginStr = "mch_id=1024&mch_order_id=" + mch_order_id + "&money=" + money + "&pay_type=" + pay_type + "&trade_type=native&version=1.1&key=" + key;
        console.info(sginStr)
        let hexMd5 = hex_md5(sginStr);
        let param = {
          "mch_id": mch_id,
          "mch_order_id": mch_order_id,
          "trade_type": trade_type,
          "pay_type": pay_type,
          "sign": hexMd5,
          "version": version,
          "money": money
        }
        myPost("/pay/order", param).then(res => {
          console.info(res);
          if (res.data.code == 'A000') {
            this.copyContent = res.data.data
            let str = res.data.data
            let arr = str.split('&')
            let url
            arr.forEach(element => {
              if(element.indexOf('link') >= 0) {
                url = element.replace('link=','')
              }
            });
            console.info(url);
            this.check = false;
            this.$nextTick(() => {
              this.qrcode(url);
            })
          } else {
            this.$message({
               message: res.data.message,
              type: 'error'
            })
          }
        })
      }
    },
    beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
      console.log(this.check)
      if(!this.check) {
        this.$confirm('是否已付款?', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning'
          }).then(() => {
            this.confirm()
            this.check=true;
            document.getElementById('qrcode').innerHTML = ''
            next()
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });          
          });
      }else{
        next()
      }
    },
    mounted() {
      this.login()
      var copybtn = this.$refs.copy
      this.clipboard = new Clipboard(copybtn);
    }
  }
</script>

<style lang="sass" scoped>
  .login
    background: #00BFA6
    min-width: 100%
    height: 100vh
    display: flex
    align-items: center

    .img-wrapper
      flex: 1
      text-align: center

    .wrapper
      width: 350px
      min-height: 380px
      background: #fff
      margin: auto
      border-radius: 5px
      padding: 30px 30px
      text-align: center

      .title
        margin-top: 10px
        font-size: 20px
        font-weight: bold
        padding-bottom: 15px
      .img-logo
        width: 15px
      .wx-logo
        width: 20px
      .z-logo
        width: 30px
      .w-logo
        width: 40px
      .input-money
        border: 1px solid #B1B3C1;
        border-radius: 2px;
        font-size: 16px
        width: 100%
        height: 40px
        line-height: 40px
        margin-top: 20px
        padding-left: 20px

      .verify
        margin-top: 20px

      .btn
        margin-top: 80px
        background: #00BFA6
        border: 1px solid #B1B3C1
        border-radius: 2px
        color: #fff
        height: 40px
        font-size: 16px
        line-height: 40px
        margin-top: 
      .copy
        margin-top: -4px
        padding: 0 10px
        cursor: pointer
      .tip
        color: red
        font-size: 16px
        margin-top: 10px
      .btn2
        margin-top: 20px
        background: #00BFA6
        border: 1px solid #B1B3C1
        border-radius: 2px
        color: #fff
        height: 40px
        font-size: 16px
        line-height: 40px
        display: inline-block
        width: 100px
</style>
