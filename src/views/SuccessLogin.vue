<template>
    <div>
         <van-nav-bar
            left-text="去主页"
            title="登录界面"
            left-arrow
            @click-left="goHome"
        />

        <van-image
        round
        style="margin-top:30px;margin-bottom:10px;"
        width="8rem"
        height="8rem"
        fit="cover"
        src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />

        <!-- <div>欢迎你，{{username}}</div> -->
        <div>欢迎你，a</div>

        <div style="text-align:left;margin-top:20px;margin-left:20px;">我的订单</div>
        <van-grid :column-num="5">
            <van-grid-item  icon="paid" text="待付款" />
            <van-grid-item  icon="gift-o" text="待发货" />
            <van-grid-item  icon="logistics" text="待收货" />
            <van-grid-item  icon="chat-o" text="待评价" />
            <van-grid-item  icon="refund-o" text="退款/售后" />

        </van-grid>



        <van-button color="linear-gradient(to right, #ff6034, #ee0a24)"
        round style="margin-top:20px;width:170px;font-size:18px;"
        @click="logout">
            退出登录
        </van-button>

        <BottomNav/>
    </div>
</template>
<script>
import BottomNav from '@/components/BottomNav.vue'

export default {
  components: { BottomNav },
    data() {
     return{
        username:'',
        active:'success',
        
     }   
    },
    methods:{
        logout(){
            this.$store.commit('logout');
            // console.log('logout')
            this.$router.push({path:'/login'})
        },
        goHome(){
            this.$router.push({path:'/'})
        }
    },
    mounted(){
        this.username=this.$store.state.user;
    }
}
</script>