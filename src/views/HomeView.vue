<template>
  <div class="home">
   <van-search v-model="search" placeholder="商品搜索" @search="goSearch"/>

    <div id="imgs">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
    </div>

    
    <van-grid square :column-num="3">
      <van-grid-item v-for="(item,index) in cate" 
      :key="index" icon="orders-o" :text="item" 
      @click="select(index)" 
      >
      </van-grid-item>
    </van-grid>

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

      <template #footer>
        <van-button size="mini" type="danger" 
        icon="cart" @click="add(item)">
        </van-button>
      </template>
    </van-card>

    <div style="height: 5rem;"></div>

    <router-view></router-view>
    <BottomNav/>

  </div>
</template>

<script>
// @ is an alias to /src
import BottomNav from '@/components/BottomNav.vue'

export default {
  name:'HomeView',
  components:{
    BottomNav
  },

  data(){
    return{
      search:'',
      images: [
        require('@/slider/1.jpg'),
        require('@/slider/2.jpg'),
        require('@/slider/3.jpg'),
        require('@/slider/4.jpg'),
        require('@/slider/5.jpg'),
      ],
      cate:[],
      detail:[],
      flag:0,
      form:{userId:'',bookId:''},

    }

  },
  mounted(){
    this.getCategory();
  },
  methods:{
    select(index){
      this.flag=index;
      let self=this;
      //this.$axios.get('../../resources/json/category/'+index+'.json')
      this.$axios.get('http://localhost:8899/test/book/getBook?index='+index)
      .then(function(res){
        self.detail=res.data.data;
        //console.log(res.data);
      })
    },

    getCategory(){
      let self=this;
      // this.$axios.get('../../resources/json/category.json')
      this.$axios.get('http://localhost:8899/test/cate/getName')
      .then(function(res){
        self.cate=res.data.data;
        self.select(0);
      })
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
        this.$toast.fail("无权限，请先登录!")
        this.$router.push('/login')
      }
    },

    //进入搜索结果页面
    goSearch(){
      if(this.$store.state.token!=null)
      {
        this.$router.push({ 
        name:'search',
        query:{
          name:this.search
        }});
      }
      else{
        this.$toast.fail("无权限，请先登录!")
        this.$router.push('/login')
      }
    },
    add(item){
      //console.log(this.$store.commit('islogin'))
      if(this.$store.state.token!=null)
      {
        this.$toast.success("添加商品成功")
        // this.$store.commit('addGoodsNum',item);

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
      }
      else{
        this.$toast.fail("无权限，请先登录!")
      }
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
  }

}
</script>
<style >
 img{
  height: 200px;
  width: 100%;
  
}
.van-swipe__track  .van-swipe .van-swipe-item{
    width: 100%;
    height: 200px;
}
.van-grid-item__content:active{
  color:#1989fa !important;
}
.van-grid-item__content:hover{
  color:#1989fa !important;
}
</style>