<template>
    <div>
        <van-nav-bar
            id="green"
            left-text="返回"
            title="搜索"
            left-arrow
            @click-left="goBack"
        />

        
        <div style="font-size:18px;">
            <span style="color:red;font-weight:bolder;">{{value}}</span><span>  的搜索结果是：</span>
        </div>

        <van-card
        :price="item.price"
        :desc="item.author"
        :title="item.name"
        :thumb="'../../resources/'+item.img"
        v-for="(item,index) in detail" :key="index"
        
        >
        <template slot="desc" >
            <div @click="goDetail(item.id,cate[item.category])">{{item.author}}</div>
        </template>

        <template slot="title" >
            <div @click="goDetail(item.id,cate[item.category])">{{item.name}}</div>
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

        <!-- <template #footer>
            <van-button size="mini" type="danger" 
            icon="cart" @click="add(item)">
            </van-button>
        </template> -->
        </van-card>
    </div>
</template>
<script>
export default {
    data() {
       return{
        detail:'',
        cate:'',
        value:'',
       } 
    },
    methods:{
        goBack()
        {
            this.$router.go(-1);
        },
        getResult(){
            let name=this.$route.query.name;
            this.value=name;
            let self=this;
            this.$axios.get('http://localhost:8899/test/book/search?name='+name)
            .then(function(res){
                self.detail=res.data.data;

            })
        },
        add(item){
            if(this.$store.state.token!=null)
            {
                this.$toast.success("添加商品成功")
                this.$store.commit('addGoodsNum',item);
            }
            else{
                alert("无权限，请先登录!");
            }
        },
        goDetail(id,cat){
            if(this.$store.state.token!=null)
            {
                this.$router.push({ 
                name:'detail',
                query:{
                    id:id,
                    type:cat
                }});
            }
            else{
                alert("无权限，请先登录!");
            }
        },
        getCategory(){
            let self=this;
            this.$axios.get('http://localhost:8899/test/cate/getName')
            .then(function(res){
                self.cate=res.data.data;
            })
        },
    },
    mounted(){
        this.getResult()
    }
}
</script>