<template>
    <div class="ct">
        <top></top>
        <tabs></tabs>
        <div class="content-wrapper">
            <!-- <div class="tab">
                <tabs></tabs>
            </div> -->
            
            <div class="content">
                <router-view/>
            </div>
        </div>
    </div>    
</template>

<script>
import top from './common/top'
import tabs from './common/tabs'
export default {
    name: 'home',
    data() {
        return{

        }
    },
    components: { // 声明子组件
        top,tabs
    },
    methods: {

    }
  
}
</script>

<style lang='sass' scoped>
.ct
    height: 100vh
    overflow: auto
    // .content-wrapper
    //     position: relative
    //     .content
    //         min-width: 1200px
    //         padding-bottom: 200px
    //         position: absolute
    //         right: 0
    //         bottom: 0
    //         left: 310px
    //         top: 0
    //         overflow: auto
    .content-wrapper
        padding: 20px 0
        overflow: auto
        .content
            padding: 0 15px
</style>
