import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.prototype.$axios = axios;
axios.defaults.withCredentials=true//

import { Search } from 'vant';
import 'vant/lib/index.css'
import 'vant/lib/icon/local.css';
import { Swipe, SwipeItem } from 'vant';
import { Lazyload } from 'vant';
import { Tabbar, TabbarItem } from 'vant';
import { Icon } from 'vant';
import { Grid, GridItem } from 'vant';
import { Card } from 'vant';
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant';
import { NavBar } from 'vant';
import { Tag } from 'vant';
import { Button } from 'vant';
import { Checkbox, CheckboxGroup } from 'vant';
import { SubmitBar } from 'vant';
import { Image as VanImage } from 'vant';
import { Field } from 'vant';
import { PasswordInput, NumberKeyboard } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Toast } from 'vant';
import { RadioGroup, Radio } from 'vant';
import { Sticky } from 'vant';
import { AddressList } from 'vant';
import { Tab, Tabs } from 'vant';

Vue.use(Tab);
Vue.use(Tabs);
Vue.use(AddressList);
Vue.use(Sticky);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Toast);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(PasswordInput);
Vue.use(NumberKeyboard);
Vue.use(Field);
Vue.use(VanImage);
Vue.use(SubmitBar);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Button);
Vue.use(Tag);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(NavBar);
Vue.use(Card);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Icon);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Lazyload);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Search);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

//路由全局前置守卫
router.beforeEach((to,from,next) => {
  //这些无需登录
  if(to.path === '/register' || to.path === '/login' || to.path === '/'){ //若是进入登录与注册页面 ==> pass
    if(to.path === '/login'&&localStorage.getItem('token')!=null)
    {
      return next('/success');
    }else{
      next();

    }
  }else{ 
    let userToken = localStorage.getItem('token');
    // console.log("Token为:"+userToken); 

    let user = localStorage.getItem('user');
    // console.log("username:"+user); 

    if(userToken == null || userToken == ''){
      alert("无权限，请先登录!");
      
      //this.$toast.fail("无权限，请先登录!")
      return next('/login');
    }else{
      next();
    }
  }
})

//请求拦截器 在请求头中加token
axios.interceptors.request.use(
  config => {
      if(localStorage.getItem('token')){
          config.headers.token = localStorage.getItem('token');
      }
      return config;
  },
  error => {
      return Promise.reject(error);
  }
)

//export default request;