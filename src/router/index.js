import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

//因为未登录时访问除登录、主页以外的页面都会报错，下面这几行用来解决那个报错
//虽然有报错，但是不影响运行，但是看着不舒服
//通过重写VueRouter原型对象上的push方法, 覆盖原来抛出异常的方法, "吞掉"异常
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, resolve, reject) {
    if ( resolve || reject ) return originalPush.call(this, location, resolve, reject)
    return originalPush.call(this, location).catch((e)=>{})
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    //不需要登录
    meta:{noNeedLogin:true},
  },
  {
    path: '/detail',
    name: 'detail',
    //需要登录
    meta:{noNeedLogin:false},
    component: () => import(/* webpackChunkName: "about" */ '../views/GoodsDetail.vue')
  },
  {
    path: '/car',
    name: 'car',
    meta:{noNeedLogin:false},
    component: () => import(/* webpackChunkName: "about" */ '../views/GoodsCart.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta:{noNeedLogin:true},
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/collection',
    name: 'collection',
    meta:{noNeedLogin:false},
    component: () => import('../views/GoodsCollection.vue')
  },
  {
    path: '/notlogin',
    name: 'notlogin',
    meta:{noNeedLogin:true},
    component: () => import('../components/NotLogin.vue')
  },
  {
    path: '/success',
    name: 'successs',
    meta:{noNeedLogin:true},
    component: () => import('../views/SuccessLogin.vue')
  },
  {
    path: '/search',
    name: 'search',
    meta:{noNeedLogin:true},
    component: () => import('../views/SearchResult.vue')
  },
  {
    path: '/order',
    name: 'order',
    meta:{noNeedLogin:true},
    component: () => import('../views/GoodsOrder.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
