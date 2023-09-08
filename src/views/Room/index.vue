<script setup lang='ts'></script>
<template>
    <div class='room'>
        <nav-bar title="医生问诊室"/>
        <van-button @click="$router.push('/order/pay?id=6938549059629056')">药品订单</van-button>
    </div>
</template>
<style lang='scss' scoped>
.room{
    padding-top: 46px;
}
</style>