<template>
    <div class="merAudit">
        <div class="top">
            AlianPAY商户注册
            <div class="userInfo">
                <div class="user-name">您好，{{accound}} | <span class="btn-out" @click="out"> 退出 </span> </div>
            </div>
            <div class="step">
                <el-steps :active="active" align-center>
                    <el-step title="资料登记" ></el-step>
                    <el-step title="上传照片" ></el-step>
                    <el-step title="提交审核"></el-step>
                </el-steps>
            </div> 
        </div> 
        
        <div v-if="active == 1" class="step-wrapper">
            <div v-if="state == 2" class="state">审核失败，请重新登记资料审核</div>
            <div class="basic-info">
                <h2>资料登记</h2>
                <div class="item">
                    <span class="name"><span class="tip"> * </span>商户名称：</span>
                    <el-input placeholder="请输入内容" v-model="list.mch_name" clearable> </el-input>
                </div>
                <div class="item">
                    <span class="name">商户简称：</span>
                    <el-input placeholder="请输入内容" v-model="list.nick_name" clearable> </el-input>
                </div>
                <div class="item">
                    <span class="name"> <span class="tip"> * </span> 法人姓名：</span>
                    <el-input placeholder="请输入内容" v-model="list.legal_name" clearable> </el-input>
                </div>
                <div class="item">
                    <span class="name"><span class="tip"> * </span>法人手机号：</span>
                    <el-input placeholder="请输入内容" v-model="list.legal_phone" clearable> </el-input>
                </div>
                <div class="item">
                    <span class="name"><span class="tip"> * </span>邮箱地址：</span>
                    <el-input placeholder="请输入内容" v-model="list.email" clearable> </el-input>
                </div>
                <div class="item">
                    <span class="name">备选联系人姓名：</span>
                    <el-input placeholder="请输入内容" v-model="list.link_name" clearable> </el-input>
                </div>
                <div class="item">
                    <span class="name">备选联系人手机号：</span>
                    <el-input placeholder="请输入内容" v-model="list.link_phone" clearable> </el-input>
                </div>
                <div class="item">
                    <span class="name"><span class="tip"> * </span>统一社会信用代码：</span>
                    <el-input placeholder="请输入内容" v-model="list.org_code" clearable> </el-input>
                </div>
            </div>
        </div>
        <div class="step-wrapper" v-if="active == 2">
            <div v-if="state == 2" class="state">审核失败，请重新登记资料审核</div>
            <div class="mer-info" >
                <h2>上传照片</h2>
                <div class="photo-wrapper">
                    <div class="item">
                        <span class="name">营业执照</span>
                        <div class="wrapper">
                            <el-upload
                                class="avatar-uploader"
                                action="http://47.99.180.135:8088/files"
                                :show-file-list="false"
                                :before-upload="beforeAvatarUpload1">
                                <img v-if="img1" :src='img1' class="avatar">
                                <!-- <img v-if="list.license_images[1] != 0" :src='"http://47.99.180.135:8088/files/" + list.license_images[1]' class="avatar"> -->
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                    </div>
                    <div class="item">
                        <span class="name">开户许可证</span>
                        <div class="wrapper">
                            <el-upload
                                class="avatar-uploader"
                                action="http://47.99.180.135:8088/files"
                                :show-file-list="false"
                                :before-upload="beforeAvatarUpload2">
                                <img v-if="img2" :src='img2' class="avatar">
                                <!-- <img v-if="list.license_images[1] != 0" :src='"http://47.99.180.135:8088/files/" + list.license_images[1]' class="avatar"> -->
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                    </div>
                    <div class="item">
                        <span class="name">手持营业执照</span>
                        <div class="wrapper">
                            <el-upload
                                class="avatar-uploader"
                                action="http://47.99.180.135:8088/files"
                                :show-file-list="false"
                                :before-upload="beforeAvatarUpload3">
                                <img v-if="img3" :src='img3' class="avatar">
                                <!-- <img v-if="list.license_images[2] != 0" :src='"http://47.99.180.135:8088/files/" + list.license_images[2]' class="avatar"> -->
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                    </div>
                </div>
                <div class="photo-wrapper">
                    <div class="item">
                        <span class="name">身份证（正面）</span>
                        <div class="wrapper">
                            <el-upload
                                class="avatar-uploader"
                                action="http://47.99.180.135:8088/files"
                                :show-file-list="false"
                                :before-upload="beforeAvatarUpload4">
                                <img v-if="img4" :src='img4' class="avatar">
                                <!-- <img v-if="list.card_images[0] != 0" :src='"http://47.99.180.135:8088/files/" + list.card_images[0]' class="avatar"> -->
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                    </div>
                    <div class="item">
                        <span class="name">身份证（反面）</span>
                        <div class="wrapper">
                            <el-upload
                                class="avatar-uploader"
                                action="http://47.99.180.135:8088/files"
                                :show-file-list="false"
                                :before-upload="beforeAvatarUpload5">
                                <img v-if="img5" :src='img5' class="avatar">
                                <!-- <img v-if="list.card_images[1] != 0" :src='"http://47.99.180.135:8088/files/" + list.card_images[1]' class="avatar"> -->
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                    </div>
                    <div class="item">
                        <span class="name">手持身份证（正面）</span>
                        <div class="wrapper">
                            <el-upload
                                class="avatar-uploader"
                                action="http://47.99.180.135:8088/files"
                                :show-file-list="false"
                                :before-upload="beforeAvatarUpload6">
                                <img v-if="img6" :src='img6' class="avatar">
                                <!-- <img v-if="list.card_images[2] != 0" :src='"http://47.99.180.135:8088/files/" + list.card_images[2]' class="avatar"> -->
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                    </div>
                </div>
                <div class="photo-wrapper">
                    <div class="item">
                        <span class="name">其他资质照片</span>
                        <div class="wrapper wrapper-other">
                            <div class="img-wrapper" v-if="img7 && img7.length != 0" v-for="(imgItem,index) in img7" :key="imgItem">
                                <img  :src='`${hostName}/files/` + imgItem' class="avatar other-img">
                                <!-- <img v-if="img7" :src='img7' class="avatar"> -->
                                <i class="el-icon-circle-close" @click="handleDel(index)"></i>
                            </div>
                            <el-upload
                                class="avatar-uploader el-right"
                                action="http://47.99.180.135:8088/files"
                                multiple
                                :show-file-list="false"
                                :before-upload="beforeAvatarUpload7">
                                <i class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="audit" v-if="active == 3">
            <div class="creat-ok">
                <img src="../../assets/img/img_success.png" alt="" class="ic-shop">
                <div class="creat-state success">提交成功</div>
                <p class="creat-state">请等待审核</p>
            </div>
        </div>
        <div class="btn-wrapper">
            <div class="btn" @click="pre" v-if="active == 2">上一步</div>
            <div class="btn" @click="next1" v-if="active == 1">下一步</div>
            <div class="btn" @click="next2" v-if="active == 2">提交</div>
            <div class="btn" @click="out" v-if="active == 3">退出</div>
        </div>
        
    </div>    
</template>

<script>
import hostName from '../../config/hostName'
import { loginOut,imgUp,getImg,submitAudit } from '../../config/api'
import merInfo from './merInfo'
export default {
    name: 'merAudit',
    data() {
        return{
            hostName: hostName,
            state: '',                //审核状态
            active: 1,
            accound: localStorage.nickname,
            code: localStorage.id,
            img1: '',
            img2: '',
            img3: '',
            img4: '',
            img5: '',
            img6: '',
            img7: [],
            list: {
                mch_id: localStorage.id,
                mch_name: null,
                nick_name: null,
                legal_name: null,
                legal_phone: null,
                email: null,
                link_name: null,
                link_phone: null,
                org_code: null,
                card_images: [0,0,0],
                license_images: [0,0,0],
                other_images: []
            }
        }
    },
    components: {
        merInfo
    },
    methods: {
        out() {
            loginOut().then((res) => {
                this.$message({
                    message: '登出成功',
                    type: 'success'
                });
                localStorage.clear()
                this.$router.push('/')
            }, (err) => {
                localStorage.clear()
                this.$router.push('/')
            })
        },
        pre() {
            document.documentElement.scrollTop = 0
            this.active--
        },
        next1() {
            if(this.list.mch_name == null || this.list.mch_name == '') {
                this.$message.error('请输入商户名称')
                return false
            }
            if(this.list.legal_name == null || this.list.legal_name == '') {
                this.$message.error('请输入法人姓名')
                return false
            }
            var myreg=/^[1][3,4,5,6,7,8,9][0-9]{9}$/
            if(!myreg.test(this.list.legal_phone)) {
                this.$message.error('请输入正确的法人手机号')
                return false
            }
            if(this.list.email == null || this.list.email == '') {
                this.$message.error('请输入邮箱地址')
                return false
            }
            if(this.list.org_code == null || this.list.org_code == '') {
                this.$message.error('请输入统一社会信用代码')
                return false
            }
            document.documentElement.scrollTop = 0
            this.active++ 
        },
        next2() {
            // if(this.list.license_images.indexOf(0) > -1) {
            //     this.$message.error('请上传营业执照相关照片')
            //     return false
            // }
            // if(this.list.card_images.indexOf(0) > -1) {
            //     this.$message.error('请上身份证相关照片')
            //     return false
            // }
            submitAudit(this.list).then( res => {
                this.active++ 
            })
            document.documentElement.scrollTop = 0
        },
        beforeAvatarUpload1(file) {
            let fd = new FormData();//通过form数据格式来传
            fd.append("upload_file", file); //上传文件
            imgUp(fd).then((res) => {
                console.log(res)
                this.list.license_images[0] = res.data.id 
                this.img1 = `${hostName}/files/` + res.data.id 
                console.log(this.img1 )
                this.$message({
                    message: '上传成功！',
                    type: 'success'
                });
            })
            return false
        },
        beforeAvatarUpload2(file) {
            let fd = new FormData();//通过form数据格式来传
            fd.append("upload_file", file); //上传文件
            imgUp(fd).then((res) => {
                console.log(res)
                this.list.license_images[1] = res.data.id 
                this.img2 =`${hostName}/files/` + res.data.id 
                this.$message({
                    message: '上传成功！',
                    type: 'success'
                });
            })
            return false
        },
        beforeAvatarUpload3(file) {
            let fd = new FormData();//通过form数据格式来传
            fd.append("upload_file", file); //上传文件
            imgUp(fd).then((res) => {
                console.log(res)
                this.list.license_images[2] = res.data.id 
                this.img3 = `${hostName}/files/` + res.data.id 
                this.$message({
                    message: '上传成功！',
                    type: 'success'
                });
            })
            return false
        },
        beforeAvatarUpload4(file) {
            let fd = new FormData();//通过form数据格式来传
            fd.append("upload_file", file); //上传文件
            imgUp(fd).then((res) => {
                console.log(res)
                this.list.card_images[0] = res.data.id 
                this.img4 = `${hostName}/files/` + res.data.id 
                this.$message({
                    message: '上传成功！',
                    type: 'success'
                });
            })
            return false
        },

        beforeAvatarUpload5(file) {
            let fd = new FormData();//通过form数据格式来传
            fd.append("upload_file", file); //上传文件
            imgUp(fd).then((res) => {
                console.log(res)
                this.list.card_images[1] = res.data.id 
                this.img5 = `${hostName}/files/` + res.data.id 
                this.$message({
                    message: '上传成功！',
                    type: 'success'
                });
            })
            return false
        },

        beforeAvatarUpload6(file) {
            let fd = new FormData();//通过form数据格式来传
            fd.append("upload_file", file); //上传文件
            imgUp(fd).then((res) => {
                console.log(res)
                this.list.card_images[2] = res.data.id 
                this.img6 = `${hostName}/files/` + res.data.id 
                this.$message({
                    message: '上传成功！',
                    type: 'success'
                });
            })
            return false
        },
        beforeAvatarUpload7(file) {
            let fd = new FormData();//通过form数据格式来传
            fd.append("upload_file", file); //上传文件
            imgUp(fd).then((res) => {
                console.log(res)
                this.list.other_images.push(res.data.id)
                this.img7 = this.list.other_images
                this.$message({
                    message: '上传成功！',
                    type: 'success'
                });
            })
            return false
        },
        handleDel(index) {
            this.list.other_images.splice(index,1)
            this.imageUrl7 = this.list.other_images
        }
    },
    mounted() {
        if(this.$route.query.state == 2) {
            this.state = 2
        }else if(this.$route.query.list && this.$route.query.list.license_images){
            // this.list = this.$route.query.list
            // this.img1 = `${hostName}/files/` + this.list.license_images[0]
            // this.img2 = `${hostName}/files/` + this.list.license_images[1]
            // this.img3 = `${hostName}/files/` + this.list.license_images[2]
            // this.img4 = `${hostName}/files/` + this.list.card_images[0]
            // this.img5 = `${hostName}/files/` + this.list.card_images[1]
            // this.img6 = `${hostName}/files/` + this.list.card_images[2]
            // this.img7 = this.list.other_images
            this.active = 3
        }
    }

}
</script>


<style lang="sass" scoped>
.merAudit
    background: #eee
    padding-bottom: 100px
    .top
        background: #34395D
        height: 150px
        padding-top: 30px
        position: relative
        color: #FFF
        text-align: center
        over-flow: hidden
        .userInfo
            position: absolute
            top: 30px
            right: 50px
            font-size: 13px
            color: #fff
            span
                cursor: pointer
    .step-wrapper
        margin-top: 70px
    .step
        width: 850px
        margin: 0 auto
        padding: 30px 0 20px
        border: 1px solid #ccc
        border-radius: 5px
        background: #fff
        margin-top: 40px
    .state
        text-align: center
        font-size: 15px
        color: #00BFA6
    .basic-info
        text-align: center
        padding: 30px
        width: 850px
        border: 1px solid #ccc
        border-radius: 5px
        background: #fff
        margin: 10px auto
        
        h2
            font-size: 18px
            font-weight: bold
            margin-bottom: 20px
        .item 
            margin-top: 15px
            font-size: 16px
            .name
                color: #7E8196
                display: inline-block
                width: 180px
                .tip
                    color: #00BFA6
            .el-input
                width: 220px
    .mer-info
        text-align: center
        padding: 30px
        width: 850px
        border: 1px solid #ccc
        border-radius: 5px
        background: #fff
        margin: 10px auto
        h2
            font-size: 18px
            font-weight: bold
            margin-bottom: 10px
        .photo-wrapper
            display: flex
            .item 
                flex: 1
                margin-top: 20px
                font-size: 16px
                .name
                    color: #7E8196
                    // margin: 0 30px 0 0
                    display: inline-block
                .wrapper
                    flex-wrap: wrap
                    display: flex
                    justify-content: center
                    .img-wrapper
                        position: relative
                        .el-icon-circle-close
                            position: absolute
                            right: 35px
                            top: 15px
                    img
                        
                    .avatar-uploader, .el-upload 
                        border: 1px dashed #d9d9d9;
                        margin-top: 10px
                        border-radius: 6px;
                        cursor: pointer;
                        position: relative;
                        overflow: hidden;
                    .el-right
                        margin-right: 30px
                    .avatar-uploader, .el-upload:hover 
                        border-color: #409EFF;
                        display: inline-block
                    
                    .avatar-uploader-icon 
                        font-size: 28px;
                        color: #8c939d;
                        width: 186px
                        height: 120px
                        line-height: 120px;
                        text-align: center;
                        
                    .avatar 
                        width: 186px
                        height: 120px
                        
                .wrapper-other
                    margin-right: -30px
                    .other-img
                        margin-top: 10px
                        margin-right: 30px
                        border: 1px dashed #409EFF
                        border-radius: 6px;
    .audit
        text-align: center
        padding: 30px
        width: 850px
        border: 1px solid #ccc
        border-radius: 5px
        background: #fff
        margin: 10px auto
        margin-top: 70px
        .creat-ok
            padding: 80px
            .creat-state
                margin-top: 10px
                color: #999
                font-size: 15px
            .success
                margin-top: 30px
    .btn-wrapper
        text-align: center
        .btn
            display: inline-block
            padding: 0 40px
            width: 160px
            height: 45px
            line-height: 45px
            background: #00BFA6;
            border-radius: 25px;
            color: #fff
            font-weight: bold
            font-size: 16px
            text-align: center
            margin: 50px 20px 
</style>
