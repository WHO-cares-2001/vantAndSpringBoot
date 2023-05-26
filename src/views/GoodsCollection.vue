<template>
    <div>
       <van-nav-bar
            left-text="返回"
            title="我的收藏"
            left-arrow
            @click-left="goBack"
        />

        <van-card
        :price="item.price"
        :desc="item.author"
        
        :thumb="'../../resources/'+item.img"
        v-for="(item,index) in getCollect" :key="index"
        
        >
        <template slot="desc">
            <div @click="goDetail(item.id,cate[item.category])">{{item.author}}</div>
        </template>

        <template slot="title" >
            <span @click="goDetail(item.id,cate[item.category])">{{item.name}}</span>
            <!-- <span>{{item.name}}</span> -->
            <span style="float:right;" @click="deleteAll(item.id)">
            <van-icon name="delete" color="red" size="large"/></span>
        </template>

        <template slot="thumb" >
            <van-image :src="'../../resources/'+item.img"
            @click="goDetail(item.id,cate[item.category])"></van-image>
        </template>

        <template #tags >
            <van-tag type="danger" 
            @click="goDetail(item.id,cate[item.category])">
            {{cate[item.category]}} 
            </van-tag>
        </template>

        <template #footer>
            <van-button size="mini" type="danger" 
            icon="cart" @click="addGoods(item)">
            </van-button>
        </template>
        </van-card>

        <div style="height: 5rem;"></div>

        <BottomNav/>
    </div>
</template>
<script>
import BottomNav from '@/components/BottomNav.vue'
import {mapGetters} from 'vuex'
export default {
    components:{
        BottomNav
    },
    data() {
        return{
            cate:[],
            form:{userId:'',bookId:''},
        }
    },
    methods:{
        goBack()
        {
            this.$router.go(-1);
        },
        getCollection(){
            let self=this;
            let id=parseInt(localStorage.getItem('userId'));
            // console.log(typeof(id))
            this.$axios.get('http://localhost:8899/test/book/getCollection?id='+id)
            .then(function(res){
                // console.log(res.data.data);
                self.$store.commit('setCollection',res.data.data)
            })
        },
        getCategory(){
            let self=this;
            this.$axios.get('http://localhost:8899/test/cate/getName')
            .then(function(res){
                self.cate=res.data.data;
            })
        },
        deleteAll(id){
            this.form.userId=localStorage.getItem('userId');
            let self=this;
            this.$axios({
                method:'post',
                url:'http://localhost:8899/test/collection/deleteAll',
                params:{
                    userId:this.form.userId,
                    bookId:id
                }
            })
            .then((res) => {
                // 处理返回结果，例如转换成对应的符合业务需求的数据结构
                // console.log(res.data.data)
                // tempObj=res.data.data;
            });

            this.getCollection();
        },
        //连接后端的
        addGoods(item){
            this.form.userId=localStorage.getItem('userId');
            this.form.bookId=item.id;
            let self=this;
            this.$axios.post('http://localhost:8899/test/cart/add',this.form)
            .then((res) => {
                // 处理返回结果，例如转换成对应的符合业务需求的数据结构
                // console.log(res.data.data)
                // tempObj=res.data.data;
            });

            this.getCart();
            this.$toast.success("添加商品成功")
        },
        //获取购物车里的东西
        getCart(){
            let self=this;
            let id=parseInt(localStorage.getItem('userId'));
            // console.log(typeof(id))
            this.$axios.get('http://localhost:8899/test/book/getCart?id='+id)
            .then(function(res){
                // console.log(res.data.data);
                self.$store.commit('setProduct',res.data.data)
            })
            //console.log(this.$store.state.user);
        },

    },
    // watch:{
    //     ...mapGetters(['getProduct'])
    // },
    computed:{
         ...mapGetters(['getProduct','getCollect'])
    },
    mounted(){
        this.getCollection();
        this.getCategory();
    },
}
</script>