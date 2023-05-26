import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //购物车中商品
    product:[],
    user: localStorage.getItem('user') ? localStorage.getItem('user') : null,
    //若localSorage存在token，将值赋给Vuex.state.token
    token: localStorage.getItem('token') ? localStorage.getItem('token') : null,

    //收藏的商品
    collection:[],
    userId:localStorage.getItem('userId') ? localStorage.getItem('userId') : null,
  },
  getters: {
    // totalPrice () {
    //   return state.product.reduce((sum, prod) => sum + prod.totalPrice, 0)
    // },
    // countTotal(state){
    //   for(let i=0;i<state.product.length;i++){
    //     state.product[i].totalPrice=state.product[i].count*state.product[i].price;
    //   }
    // }

    //应该是只有在这里面函数才可以有返回值
    getProduct(state){
      return state.product;
    },
    getCollect(state){
      return state.collection;
    }
  },
  mutations: {
    //删全部
    deleteGoods(state,prodId){
      const index=state.product.findIndex(item=>item.id==prodId)
      index!=-1&&state.product.splice(index,1)
    },
    //删一个，删到负数就整个删掉
    deleteAGoods(state,prodId){
      const index=state.product.findIndex(item=>item.id==prodId)
      state.product[index].count--;
      if(state.product[index].count==0){
        state.product.splice(index,1);
      }
      // else if(state.product[index].count>0){
      //   state.product[index].count--;
      // }
    },
    addGoodsNum(state,goods){
      // 1. 没有商品时把该商品添加到数组中，并增加count，isChecked，totalPrice
      // 2. 有该商品时把商品数量加1，选中，计算小计
      // 判断有没有该商品，返回该商品
      const i=state.product.find(item=>item.id===goods.id)
      if(i){
        i.count++;
        // i.isChecked=true;
        // i.totalPrice=i.count*i.price;
      }else{
        //1.
        state.product.push({
          ...goods,
          count:1,
          //这个变量是判断是否选中，感觉没什么用
          // isChecked:true,
          // totalPrice:goods.price
        })
      }
    },

    //与添加购物车逻辑差不多，多个是否收藏，isCollect
    addGoodsCollection(state,goods){
      const i=state.collection.find(item=>item.id===goods.id)
      if(i){
        //如果已存在，取消收藏
        i.isCollect=false;
      }else{
        state.collection.push({
          ...goods,
          isCollect:true,

        })
      }
    },
    setUser(state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    setUserId(state, userId) {
      state.userId = userId
      localStorage.setItem('userId', userId)
    },
    setToken(state, token) {
        localStorage.setItem('token', token)
        state.token = token
    },
    setProduct(state,product){
      state.product=product;

    },
    setCollection(state,collection){
      state.collection=collection;

    },
    logout(state) {
        localStorage.removeItem('token')
        state.token = null
        localStorage.removeItem('user')
        state.user = null
    },
    clearCart(state){
      state.product=[]
    },
    //其他界面无法接收函数的返回值
    islogin(state){
      if(state.token==null)
      {
        console.log('store')
        return false
      }
      else
        return true
    }
  },
  //异步操作
  actions: {
    // 命名可以直接后边加Action
    add({ commit, state }, params) {
      const apiParams = {
        // 对params进行转换，转换成接口需要的入参格式
      };
      let tempObj = {}; // 此作用域的全局对象，临时变量作用
      let self=this;
      this.$axios.post('http://localhost:8899/test/book/add',params)
      .then((res) => {
        // 处理返回结果，例如转换成对应的符合业务需求的数据结构
        console.log(res.data)
        tempObj=res.data.data;
      })
      .catch((err) => {
        // 处理异常，即异常状态下数据应该是什么样子
      })
      .finally(() => {
        // 存入state；也可以用来执行一些请求结束的提示操作，例如展示toast弹窗等
        commit("addGoodsNum", tempObj);
      });
    },
    
  },
  modules: {
  }
})
