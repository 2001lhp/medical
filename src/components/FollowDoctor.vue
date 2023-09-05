<script setup lang='ts'>
import { getDoctorPage, followDoctor } from '@/services/home';
import { useWindowSize } from '@vueuse/core'
import type { Doctor } from '@/types/consult';
import { ref } from 'vue';
import { useFollow } from '@/composable/index'
const list = ref<Doctor[]>([])
const getdata = async () => {
    let res = await getDoctorPage({ current: 1, pageSize: 5 })
    // console.log(res);
    list.value = res.data.rows
}
getdata()
const { width } = useWindowSize()
const { loading, follow } = useFollow()
// const loading = ref(false)

// const follow = async (doc: Doctor) => {
//     loading.value = true
//     try {
//         await followDoctor(doc.id)
//         doc.likeFlag = doc.likeFlag === 1 ? 0 : 1
//     } finally {
//         loading.value = false
//     }
// }
</script>
<template>
    <div class='doctor'>
        <div class="head">
            <p>推荐关注</p>
            <a href="javascript:;"> 查看更多<i class="van-icon van-icon-arrow" /></a>
        </div>
        <div class="body">
            <van-swipe :width="(150 / 375) * width" :show-indicators="false" :loop="false">
                <van-swipe-item v-for="item in list" :key="item.id">
                    <div class="box">
                        <van-image round :src="item.avatar" />
                        <p class="name">{{ item.name }}</p>
                        <p class="van-ellipsis">{{ item.hospitalName }}</p>
                        <p>{{ item.positionalTitles }}</p>
                        <van-button round size="small" type="primary" :loading="loading" @click="follow(item)">{{
                            item.likeFlag === 1 ? '已关注' : '+ 关注' }}</van-button>
                    </div>
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>
<style lang='scss' scoped>
.doctor {
    background-color: var(--cp-bg);
    height: 250px;

    .head {
        display: flex;
        justify-content: space-between;
        height: 45px;
        align-items: center;
        padding: 0 15px;
        font-size: 13px;

        a {
            color: var(--cp-tip);
        }
    }

    .body {
        width: 100%;
        overflow: hidden;

        .box {
            width: 135px;
            height: 190px;
            background: #fff;
            border-radius: 20px;
            box-shadow: 0px 0px 11px 0px rgba(229, 229, 229, 0.2);
            text-align: center;
            padding: 15px;
            margin-left: 15px;
            display: inline-block;
            box-sizing: border-box;

            >.van-image {
                width: 58px;
                height: 58px;
                vertical-align: top;
                border-radius: 50%;
                margin: 0 auto 8px;
            }

            >p {
                margin-bottom: 0;
                font-size: 11px;
                color: var(--cp-tip);

                &.name {
                    font-size: 13px;
                    color: var(--cp-text1);
                    margin-bottom: 5px;
                }
            }

            >.van-button {
                padding: 0 12px;
                height: 28px;
                margin-top: 8px;
                width: 72px;
            }
        }
    }
}
</style>