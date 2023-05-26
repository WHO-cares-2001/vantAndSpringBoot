<template>
    <div>
        <van-nav-bar
            id="green"
            left-text="返回"
            :title="item.name"
            left-arrow
            @click-left="goBack"
        />

        <van-sticky>
            <van-tabbar route style="position: relative;">
                <van-tabbar-item replace  icon="point-gift-o">宝贝详情</van-tabbar-item>
                <van-tabbar-item replace  icon="comment-o">评价</van-tabbar-item>
            </van-tabbar>
        </van-sticky>

        <br><br>
         <img alt="Vue logo" :src="'../../resources/'+item.img"
         style="width:250px;">

        <van-card
        :price="item.price"
        :desc="item.author"
        :title="item.name"
        >
        <template #tags>
            <van-tag plain type="primary">{{item.publisher}}</van-tag><br>
            <van-tag type="danger">{{type}}</van-tag>
        </template>
        </van-card>

        <div id="wrap" v-html="item.description">
        </div>

        <div style="height: 5rem;"></div>

        <van-goods-action>
            <van-goods-action-icon icon="shop-o" text="店铺"  color="orange"/>
            <van-goods-action-icon icon="service-o" text="客服"  />
            <van-goods-action-icon icon="star" :text="text"  :color="ccolor" @click="addCollection"/>
            <van-goods-action-button type="warning" text="加入购物车" 
            @click="addGoods(item)"/>
            <van-goods-action-button
                type="danger"
                text="立即购买"
            />
        </van-goods-action>
        
    </div>
</template>

<style scoped>

</style>

<script>
export default {
    data() {
        return{
            num:0,
            item:[],
            str:"",
            ret:"",
            collect:false,
            ccolor:"#77787b",
            type:'',
            text:'收藏',
            form:{userId:'',bookId:''},
        }
    },
    methods:{
        getNum()
        {
            let self=this;
            //this.$axios.get("../../resources/json/details/"+this.$route.query.id+".json")
            let index=this.$route.query.id;
            this.type=this.$route.query.type;
            this.$axios.get("http://localhost:8899/test/book/getById?index="+index)
            .then(function(res){
                self.item=res.data.data;
                // self.item.description=(self.item.description).replace(/\n/g,'</br>');
                
                //console.log(res.data)
            })
        },
        goBack()
        {
            this.$router.go(-1);
        },
        //添加收藏
        add(){
            this.form.userId=localStorage.getItem('userId');
            this.form.bookId=this.item.id;
            let self=this;
            this.$axios.post('http://localhost:8899/test/collection/add',this.form)
            .then((res) => {
                // 处理返回结果，例如转换成对应的符合业务需求的数据结构
                // console.log(res.data.data)
                // tempObj=res.data.data;
                // if(res.data.data==="found"){
                //     self.collect=true
                // }else{
                //     self.collect=false
                // }
            });

            this.getCollection();

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
            });

            this.getCollection();
        },
        //点击时判断收藏
        addCollection()
        {
            //已收藏
            if(this.collect)
            {
                //那就取消收藏
                this.collect=false;
                this.ccolor="#77787b";
                this.text='收藏';
                // console.log('取消收藏')
                this.deleteAll(this.item.id)
                this.$toast.success("取消收藏成功")

            }else{
                this.collect=true;
                this.ccolor="#ff5000";
                this.text='已收藏';
                // console.log('收藏')
                this.add()
                this.$toast.success("添加收藏成功")

            }
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
            this.$toast.success("添加商品成功")
        },
        select(){
            this.form.userId=localStorage.getItem('userId');
            let self=this;
            this.form.bookId=this.$route.query.id;
            // console.log(this.form.bookId)
            this.$axios({
                method:'post',
                url:'http://localhost:8899/test/collection/select',
                params:{
                    userId:this.form.userId,
                    bookId:this.form.bookId
                }
            })
            .then((res) => {
               let txt=res.data.data;
            //    console.log(txt)
               if(txt==="found"){
                self.collect=true;
                self.ccolor="#ff5000";
                self.text='已收藏';
                // console.log("找到了")
               }else{
                self.collect=false;
                self.ccolor="#77787b";
                self.text='收藏';
               }
            });
        }
    },
    mounted(){
    },
    created(){
        this.getNum();
        this.select();
        

    }
}
</script>