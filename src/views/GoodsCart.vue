<template>
    <div>
        <van-nav-bar
            left-text="返回"
            title="购物车"
            left-arrow
            @click-left="goBack"
        />

        <van-checkbox-group v-model="result" ref="checkboxGroup">

        <van-card
        :price="item.price"
        :desc="item.author"
        v-for="(item,index) in getProduct"
        :key="index"
        >
        <template slot="title">  <!-- 自定义标题部分，主要是为了添加删除商品按钮 -->
            <span>{{item.name}}</span>
            <span style="float:right;" @click="deleteAll(item.id)">
            <van-icon name="delete" color="red" size="large"/></span>
        </template>

        <template slot="thumb">  <!-- 自定义左侧部分，为了添加左侧checkbox -->
            <van-checkbox :name="item.id" icon-size="20px"></van-checkbox>
            <van-image :src="'../../resources/'+item.img"></van-image>
        </template>

        <template #footer>
            <div>
                <van-button type="default" size="small" @click="deleteGoods(item.id)">
                -</van-button>
                    {{item.count}}
                <van-button type="default" size="small" @click="addGoods(item)">
                +</van-button>
            </div>
        </template>
        </van-card>

        </van-checkbox-group>

        <div style="height: 10rem;"></div>

        <div id="top">
            <van-submit-bar :price="allcount" button-text="提交订单" 
            style="position: fixed;bottom:45px" @submit="goOrder">
            <van-checkbox v-model="checked" @click="checkAll">全选</van-checkbox>
            
            </van-submit-bar>
            
        </div>
        <!-- <div style="height: 5rem;"></div> -->
        <BottomNav/>
    </div>
</template>

<script>
import BottomNav from "@/components/BottomNav.vue"
import { mapGetters, mapState,mapMutations,mapActions } from 'vuex'

export default {
    name:'HomeView',
    components:{
        BottomNav
    },
    data() {
        return{
            checked:false,
            totalprice:0.00,
            result: [],
            active:'car',
            //添加进购物车
            form:{userId:'',bookId:''},

        }
    },
    mounted(){
        this.getCart();
    },
    methods: {
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

        //连接后端的
        addGoods(item){
            this.form.userId=localStorage.getItem('userId');
            this.form.bookId=item.id;
            // this.$store.dispatch('add',this.form);
            let self=this;
            this.$axios.post('http://localhost:8899/test/cart/add',this.form)
            .then((res) => {
                // 处理返回结果，例如转换成对应的符合业务需求的数据结构
                // console.log(res.data.data)
                // tempObj=res.data.data;
            });

            this.getCart();
        },
        deleteAll(id){
            this.form.userId=localStorage.getItem('userId');
            let self=this;
            this.$axios({
                method:'post',
                url:'http://localhost:8899/test/cart/deleteAll',
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

            this.getCart();
        },
        deleteGoods(id){
            this.form.userId=localStorage.getItem('userId');
            let self=this;
            this.$axios({
                method:'post',
                url:'http://localhost:8899/test/cart/delete',
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

            this.getCart();
        },
        // ...mapMutations(["addGoodsNum","deleteGoods","deleteAGoods"]),
        checkAll() {
            if(this.result.length!==0)
            {
                if(this.result.length===this.product.length){
                    this.toggleAll();
                }else{
                    this.$refs.checkboxGroup.toggleAll(true);
                }
            }else{
                this.$refs.checkboxGroup.toggleAll(true);
            }
        },
        toggleAll() {
            this.$refs.checkboxGroup.toggleAll();
        },
        goBack()
        {
            this.$router.go(-1);
        },
        goOrder(){
            
            // this.$router.push({ 
            //     name:'order',
            // });
            this.$router.push('/order')
        },
    },
    computed:{
        ...mapState(['product']),
        allcount(){
            let sumup = 0
            for(let i=0;i<this.product.length;i++){
                if(this.result.find(item => { //判断是否选中商品，未选中不计算在内
                    return item === this.product[i].id
                })){
                    sumup += this.product[i].count*this.product[i].price
                    //console.log(sumup)
                }else{
                    continue
                }
            }
            return sumup*100;
        },
        ...mapGetters(['getProduct'])

    },
    // watch:{
    //     ...mapGetters(['getProduct'])
    // },
}
</script>
<style scoped>
#top{
    position: fixed;
}
</style>