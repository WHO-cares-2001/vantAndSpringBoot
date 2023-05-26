<template>
    <div>
        <van-tabbar v-model="active" route>
        <van-tabbar-item name="home" 
        icon="home-o"
        to="/" replace>
            主页
        </van-tabbar-item>

        <van-tabbar-item name="car" 
        icon="shopping-cart-o"
        to="/car"
        >
            购物车
        </van-tabbar-item>

        <van-tabbar-item name="collection" 
        icon="star"
        to="/collection"
        >
            我的收藏
        </van-tabbar-item>

        <van-tabbar-item  
        icon="manager"
        name="login" to="/login"
        >
            我
        </van-tabbar-item>
       
        </van-tabbar>
    </div>
</template>

<script>

export default {
    data() {
        return{
            active:"home"
        }
    },
    methods:{
     
    }
}
</script>