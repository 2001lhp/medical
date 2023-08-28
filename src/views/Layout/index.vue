<script setup lang='ts'>
const tabbar = [{
    path: '/home',
    name: '首页',
    icon: 'home-index-'
}, {
    path: '/article',
    name: '健康百科',
    icon: 'home-article-'
}, {
    path: '/notify',
    name: '消息中心',
    icon: 'home-notice-'
}, {
    path: '/user',
    name: '我的',
    icon: 'home-mine-'
}]
</script>
<template>
    <div class='layout'>
        <router-view></router-view>
        <div class="tabbar">
            <div v-for="item in tabbar" :key="item.path" @click="$router.push(item.path)">
                <svg-icon :name="`${item.icon}${$route.path == item.path ? 'active' : 'default'}`"></svg-icon>
                <p>{{ item.name }}</p>
            </div>
        </div>
    </div>
</template>
<style lang='scss' scoped>
.layout {
    width: 100%;
    height: 100%;

    .tabbar {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-around;
        text-align: center;
        align-items: center;
        position: fixed;
        bottom: 0;
        background-color: white;

        .icon {
            font-size: 21px;
        }

        p {
            font-size: 11px;
        }
    }
}
</style>