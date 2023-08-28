<script setup lang='ts'>
import { showConfirmDialog } from 'vant';
import { getUserInfo } from '@/services/user';
import { ref } from 'vue'
// import type { UserInfo } from '@/types/user';
import { useCounterStore } from '@/stores/counter';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter()
const route = useRoute()
const store = useCounterStore()
const info = ref<any>({})
getUserInfo().then(res => {
    console.log(res)
    info.value = res.data
})
const tools = [
    { name: '我的问诊', path: '', icon: 'user-tool-01', },
    { name: '我的处⽅', path: '', icon: 'user-tool-02', },
    { name: '家庭档案', path: '/patient', icon: 'user-tool-03', },
    { name: '地址管理', path: '', icon: 'user-tool-04', },
    { name: '我的评价', path: '', icon: 'user-tool-05' },
    { name: '官⽅客服', path: '', icon: 'user-tool-06', },
    { name: '设置', path: '', icon: 'user-tool-07', }
]
const logout = () => {
    showConfirmDialog({
        title: '温馨提示',
        message: '您确认要退出优医问诊吗？',
    }).then(() => {
        store.delUser()
        router.push('/login')
    }).catch(() => { });
}
</script>
<template>
    <div class='user'>
        <div class="user-header">
            <div class="top">
                <!-- <img :src="info.avatar" alt=""> -->
                <van-image round width="70px" height="70px" :src="info.avatar" />
                <div class="name">
                    <p>{{ info.account }}</p>
                    <p><van-icon name="edit"></van-icon></p>
                </div>
            </div>
            <van-row>
                <van-col span="6">
                    <p>{{ info.collectionNumber }}</p>
                    <p>收藏</p>
                </van-col>
                <van-col span="6">
                    <p>{{ info.likeNumber }}</p>
                    <p>关注</p>
                </van-col>
                <van-col span="6">
                    <p>{{ info.score }}</p>
                    <p>积分</p>
                </van-col>
                <van-col span="6">
                    <p>{{ info.couponNumber }}</p>
                    <p>优惠券</p>
                </van-col>
            </van-row>
        </div>
        <div class="user-order">
            <div class="head">
                <h3>药品订单</h3>
                <a href="javascript:;">全部订单<van-icon name="arrow" /></a>
            </div>
            <van-row>
                <van-col span="6">
                    <svg-icon name="user-paid"></svg-icon>
                    <p>待付款</p>
                </van-col>
                <van-col span="6">
                    <svg-icon name="user-shipped"></svg-icon>
                    <p>待发货</p>
                </van-col>
                <van-col span="6">
                    <svg-icon name="user-received"></svg-icon>
                    <p>待收货</p>
                </van-col>
                <van-col span="6">
                    <svg-icon name="user-finished"></svg-icon>
                    <p>已完成</p>
                </van-col>
            </van-row>
        </div>
        <div class="user-group">
            <h3>快捷工具</h3>
            <van-cell v-for="item in tools" :key="item.name" :title="item.name" is-link :border="false"
                @click="$router.push(item.path)">
                <template #icon>
                    <svg-icon :name="item.icon"></svg-icon>
                </template>
            </van-cell>
        </div>
        <a href="javascript:;" class="logout" @click="logout">退出登录</a>
    </div>
</template>
<style lang='scss' scoped>
.user {
    min-height: calc(100vh - 50px);
    background-color: var(--cp-bg);
    padding: 0 15px 65px;

    &-header {
        background: linear-gradient(180deg, rgba(44, 181, 165, 0.46), rgba(44, 181, 165, 0));
        margin: 0 -15px;
        padding: 0 15px;

        .top {
            display: flex;
            align-items: center;
            padding-top: 50px;
        }

        .name {
            margin-left: 15px;

            :first-child {
                font-weight: 500;
                font-size: 18px;
            }

            :last-child {
                color: var(--cp-dark);
                font-size: 12px;
                padding-top: 4px;
            }
        }

        .van-row {
            margin: 0 -15px;
            padding-top: 15px;

            .van-col {
                text-align: center;

                :first-child {
                    font-size: 18px;
                    font-weight: 500;
                }

                :last-child {
                    color: var(--cp-dark);
                    font-size: 12px;
                    padding-top: 4px;
                }
            }
        }

    }


    &-order {
        background-color: #fff;
        border-radius: 8px;
        margin-bottom: 15px;
        padding-bottom: 15px;
        margin-top: 15px;

        .head {
            display: flex;
            justify-content: space-between;
            line-height: 50px;
            padding: 0 15px;

            a {
                color: var(--cp-tip);
            }
        }

        .van-col {
            text-align: center;

            .icon {
                font-size: 28px;
            }

            p {
                font-size: 12px;
                margin-top: 4px;
            }
        }
    }

    &-group {
        border-radius: 8px;
        overflow: hidden;

        h3 {
            line-height: 44px;
            padding-left: 16px;
        }

        .van-cell {
            align-items: center;
        }

        .icon {
            font-size: 17px;
            margin-right: 10px;
        }
    }

    .logout {
        display: block;
        margin: 20px auto;
        width: 100px;
        text-align: center;
        color: var(--cp-price);
    }
}
</style>