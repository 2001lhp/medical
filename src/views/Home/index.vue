<script setup lang='ts'>
import { ref } from 'vue';
import { getKnowledgePage } from '../../services/home';
import FollowDoctor from '@/components/FollowDoctor.vue';
// getKnowledgePage({
//     type: 'like',
//     current: 1,
//     pageSize: 10
// }).then(res => {
//     console.log(res)
// })
const active = ref()
</script>
<template>
    <div class='home'>
        <div class="home-header">
            <div class="content">
                <p>优医</p>
                <div class="search">
                    <svg-icon name="home-search" />
                    <span>搜⼀搜：疾病/症状/医⽣/健康知识</span>
                </div>
            </div>
        </div>
        <div class="home-nav">
            <van-row class="nav">
                <van-col span="8">
                    <svg-icon name="home-doctor"></svg-icon>
                    <p>问医生</p>
                    <div>按科室查问医生</div>
                </van-col>
                <van-col span="8">
                    <svg-icon name="home-graphic"></svg-icon>
                    <p>急速问诊</p>
                    <div>20s医生急速回复</div>
                </van-col>
                <van-col span="8">
                    <svg-icon name="home-prescribe"></svg-icon>
                    <p>开药门诊</p>
                    <div>线上买药更方便</div>
                </van-col>
            </van-row>
            <van-row class="navmin">
                <van-col span="6">
                    <svg-icon name="home-order"></svg-icon>
                    <p>药品订单</p>
                </van-col>
                <van-col span="6">
                    <svg-icon name="home-docs"></svg-icon>
                    <p>健康档案</p>
                </van-col>
                <van-col span="6">
                    <svg-icon name="home-rp"></svg-icon>
                    <p>我的处方</p>
                </van-col>
                <van-col span="6">
                    <svg-icon name="home-find"></svg-icon>
                    <p>疾病查询</p>
                </van-col>
            </van-row>
        </div>
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item>
                <img src="@/assets/ad.png" alt="" />
            </van-swipe-item>
            <van-swipe-item>
                <img src="@/assets/ad.png" alt="" />
            </van-swipe-item>
        </van-swipe>
        <van-tabs shrink sticky v-model:active="active">
            <van-tab title="关注" name="like">
                <follow-doctor/>
                <knowledge-list type="like" />
            </van-tab>
            <van-tab title="推荐" name="recommend"><knowledge-list type="recommend" /></van-tab>
            <van-tab title="减脂" name="fatReduction"><knowledge-list type="fatReduction" /></van-tab>
            <van-tab title="饮食" name="food"><knowledge-list type="food" /></van-tab>
        </van-tabs>
    </div>
</template>
<style lang='scss' scoped>
.home {
    padding-bottom: 50px;

    &-header {
        width: 100%;
        height: 90px;
        background: linear-gradient(180deg, rgba(62, 206, 197, 0.85), #26bcc6);
        border-bottom-left-radius: 150px 20px;
        border-bottom-right-radius: 150px 20px;


        .content {
            padding: 0 15px;

            p {
                color: white;
                font-size: 18px;
                padding: 20px 0;
                line-height: 1;
                padding-left: 5px;
            }

            .search {
                height: 40px;
                border-radius: 20px;
                display: flex;
                align-items: center;
                background-color: white;
                box-shadow: 0px 15px 22px -7px rgba(224, 236, 250, 0.8);
                padding: 0 20px;
                color: var(--cp-dark);

                .icon {
                    font-size: 16px;
                    margin-right: 5px;
                    margin-top: 5px;
                }
            }
        }
    }

    &-nav {
        padding: 10px 15px 0 15px;

        .van-col {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 10px 0;
        }

        .nav {
            .icon {
                font-size: 48px;
            }

            p {
                font-weight: 600;
                /* margin-top: 5px; */
                color: var(--cp-text1);
            }

            div {
                font-size: 11px;
                color: var(--cp-tag);
                margin-top: 5px;
            }

        }

        .navmin {
            .icon {
                font-size: 31px;
            }

            p {
                font-size: 13px;
                color: var(--cp-text2);
                font-weight: normal;
            }

        }
    }

    .van-swipe {
        margin: 10px 15px;
        height: 100px;

        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>