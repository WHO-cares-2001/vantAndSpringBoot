<template>
    <div>
        <van-nav-bar
            left-text="返回"
            title="订单"
            left-arrow
            @click-left="goBack"
        />

        <van-address-list
        :list="list"
       
        />

    </div>
</template>

<script>
export default {
    data() {
        return{
            list: [
                {
                id: '1',
                name: '张三',
                tel: '13000000000',
                address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
                isDefault: true,
            }],
              
        }
    },
    methods:{
        goBack()
        {
            this.$router.go(-1);
        },
    },
}
</script>