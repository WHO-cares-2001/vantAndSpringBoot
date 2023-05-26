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

        <!-- <div v-show="notlogin"> -->
            <div>
                嘿，请登录以享受更多的功能。
            </div>

            <van-cell-group>
            <van-field
                v-model="form.username"
                
                required
                label="用户名"
                placeholder="请输入用户名"
            />
            <van-field
                v-model="form.password"
                required
                label="密码"
                placeholder="请输入密码"
                :error-message="emsg"
                type="password"
            />
            
            </van-cell-group>

            
            <!-- <van-radio-group v-model="type" direction="horizontal">
            <div style="margin-left:10px;">我是：</div>
            <van-radio name="1" style="margin-left:20px;">用户</van-radio>
            <van-radio name="2" style="margin-left:20px;">管理员</van-radio>
            </van-radio-group> -->

            <van-button color="linear-gradient(to right, #ff6034, #ee0a24)"
            round style="margin-top:20px;width:170px;font-size:18px;"
            @click="login">
                登录
            </van-button>
        <!-- </div> -->

        <!-- <div v-show="!notlogin">
            <div>欢迎你，{{this.form.username}}</div>

            <van-button color="linear-gradient(to right, #ff6034, #ee0a24)"
            round style="margin-top:20px;width:170px;font-size:18px;"
            @click="logout">
                退出登录
            </van-button>
        </div> -->

        <BottomNav/>

    </div>
</template>
<script>
import BottomNav  from '@/components/BottomNav.vue'

export default{
   
    components:{
        BottomNav
    },
    data() {
       return{
            form:{username:'',password:''},
            emsg:'',
            notlogin:true,
            type:'',
            
       } 
    },
    watch:{
        username:function(){
            if(this.username==='')
                console.log("username null");
            
        },
        password(){
            if(this.password.size()<1){
                this.emsg="密码长度至少为1"
                return this.emsg;
            }
        }
    },
    methods:{
        login(){
            var vm = this
            //
            vm.$axios.post('http://localhost:8899/test/demo/login',
               this.form
            )
            .then(function (response) {
                if(response.data.code == 200){
                    // console.log(response.data.msg)
                    //将token和user保存到localStorage中
                    vm.$store.commit('setToken',response.data.token)
                    vm.$store.commit('setUser',response.data.user.username)
                    vm.$store.commit('setUserId',response.data.user.id)
                    //打印user的id
                    // console.log("login:"+response.data.user.id)
                    //清空购物车
                    // vm.$store.commit('clearCart')

                    //vm.toToast("登录成功！")
                    vm.$toast.success("登录成功")

                    vm.notlogin=false;

                    //跳转到登录成功后的页面
                    vm.$router.push({path:'/success'})
                    //,
                    //query:{name:vm.form.username}
                }
                else{
                    vm.$toast.fail("登录失败\n账户或密码错误!")
                }
            })
            .catch(function (e) {
                console.log(e)
            })
        },
        toToast(txt){
            this.$toast({
                message:txt,
               
            })
        },
        goHome(){
            this.$router.push({path:'/'})
        },
        logout(){
            this.$store.commit('logout');
            // console.log('logout')
            this.notlogin=true;
            this.$router.push({path:'/login'})
        },
    }
}
</script>
