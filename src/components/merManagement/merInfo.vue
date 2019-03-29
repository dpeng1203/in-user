<template>
    <div class="mer-audit">
        <div class="mer-ct">
            <div class="title">
                <span>商户信息</span>
            </div>
            <div class="basic-wrapper">
                <div class="basic-info">
                    <h2>基本信息</h2>
                    <div class="item">
                        <span class="name">商户号：</span>
                        <span>{{list.mch_id}}</span>
                    </div>
                    <div class="item">
                        <span class="name">商户名称：</span>
                        <span>{{list.mch_name}}</span>
                    </div>
                    <div class="item">
                        <span class="name">商户简称：</span>
                        <span>{{list.nick_name}}</span>
                    </div>
                    <div class="item">
                        <span class="name">法人姓名：</span>
                        <span>{{list.legal_name}}</span>
                    </div>
                    <div class="item">
                        <span class="name">法人手机号：</span>
                        <span>{{list.legal_phone}}</span>
                    </div>
                    <div class="item">
                        <span class="name">邮箱地址：</span>
                        <span>{{list.email}}</span>
                    </div>
                    <div class="item">
                        <span class="name">其他联系人姓名：</span>
                        <span>{{list.link_name}}</span>
                    </div>
                    <div class="item">
                        <span class="name">其他联系人手机号：</span>
                        <span>{{list.link_phone}}</span>
                    </div>
                    <div class="item">
                        <span class="name">统一社会信用代码：</span>
                        <span>{{list.org_code}}</span>
                    </div>
                </div>
                
            </div>
            
            <div class="mer-info">
                <h2>商户资质</h2>
                <div class="photo-wrapper" v-if="list.license_images">
                    <div class="item"  v-if="list.license_images[0] != 0">
                        <span class="name">营业执照</span>
                        <div class="img-ct">
                            <img :src='`${hostName}/files/` + list.license_images[0]' alt="">
                        </div>
                    </div>
                    <div class="item" v-if="list.license_images[1] != 0">
                        <span class="name">开户许可证</span>
                        <div class="img-ct">
                            <img :src='`${hostName}/files/` + list.license_images[1]' alt="">
                        </div>
                    </div>
                    <div class="item" v-if="list.license_images[2] != 0">
                        <span class="name">手持营业执照</span>
                        <div class="img-ct">
                            <img :src='`${hostName}/files/` + list.license_images[2]' alt="">
                        </div>
                    </div>
                </div>
                

                <div class="photo-wrapper" v-if="list.card_images">
                    <div class="item" v-if="list.card_images[0] != 0">
                        <span class="name">身份证（正面）</span>
                        <div class="img-ct">
                            <img :src='`${hostName}/files/` + list.card_images[0]' alt="">
                        </div>
                    </div>
                    <div class="item" v-if="list.card_images[1] != 0">
                        <span class="name">身份证（反面）</span>
                        <div class="img-ct">
                            <img :src='`${hostName}/files/` + list.card_images[1]' alt="">
                        </div>
                    </div>
                    <div class="item" v-if="list.card_images[2] != 0">
                        <span class="name">手持身份证（正面）</span>
                        <div class="img-ct">
                            <img :src='`${hostName}/files/` + list.card_images[2]' alt="">
                        </div>
                    </div>
                </div>
                <div class="photo-wrapper" v-if="list.other_images && list.other_images.length != 0">
                    <div class="item">
                        <span class="name">其他资质照片</span>
                        <div class="img-ct">
                           <img alt="" v-for="imgItem in list.other_images" :key="imgItem" :src='`${hostName}/files/` + imgItem' >
                        </div>
                    </div>
                </div>
                
            </div>
            <!-- <div class="btn" @click="save">提交</div> -->
        </div>
    </div>
</template>

<script>
import hostName from '../../config/hostName'
import { merList } from '../../config/api'
export default {
    data() {
        return{
            hostName: hostName,
            list: {},
            imageUrl: '',
        }
    },
    methods: {
        getMerInfo() {
            let data = {
                mch_id: localStorage.id
            }
            merList(data).then( res => {
                console.log(res)
                this.list = res.data.data_list[0]
            })
        }
    },
    mounted() {
        this.getMerInfo()
    }
}
</script>

<style lang="sass" scoped>
.mer-audit
    color: #3D4060
    padding-bottom: 100px
    .mer-ct 
        width: 850px
        .title 
            text-align: left
            font-size: 20px
            font-weight: bold
            margin-left: 30px
            padding-bottom: 30px
            border-bottom: 1px solid #ccc
        .basic-wrapper
            margin: 0 70px 0 30px
            padding-bottom: 30px
            width: 850px
            border-bottom: 1px solid #ccc
            .basic-info
                margin-right: 70px
                margin-top: 30px
                h2
                    font-size: 16px
                    font-weight: bold
                    margin-bottom: 10px
                .item 
                    margin-top: 20px
                    font-size: 14px
                    .name
                        color: #7E8196
                        display: inline-block
                        width: 180px
                    
        
        .mer-info
            margin: 30px 0 0 30px
            h2
                font-size: 16px
                font-weight: bold
            .photo-wrapper
                display: flex
                .item 
                    margin-top: 20px
                    font-size: 14px
                    .name
                        color: #7E8196
                        display: inline-block
                    .img-ct    
                        img
                            margin: 10px 30px 0 0
                            width: 186px
                            height: 120px
                
        .btn 
            display: inline-block
            font-size: 14px
            background: #00BFA6
            border-radius: 20px
            color: #fff
            width: 150px    
            height: 40px 
            line-height: 40px
            margin-left: 30px 
            margin: 50px 0 100px 30px
            text-align: center
    
    
</style>
