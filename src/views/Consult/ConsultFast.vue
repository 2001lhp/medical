<script setup lang='ts'>
import { useConsult } from '../../stores/consult'
const store = useConsult()
</script>
<template>
    <div class='consult'>
        <nav-bar title="急速问诊" text="问诊记录" @right="$router.push('/consult')"></nav-bar>
        <div class="logo">
            <img src="../../assets/consult-fast.png" alt="">
            <p><span>20s</span>快速匹配专业医生</p>
        </div>
        <div class="body">
            <router-link to="dep" @click="store.setIllnessType(1)">
                <svg-icon name="consult-doctor" />
                <div class="info">
                    <p>三甲图⽂问诊</p>
                    <p>三甲主治及以上级别医⽣</p>
                </div>
                <van-icon name="arrow"></van-icon>
            </router-link>
            <router-link to="dep" @click="store.setIllnessType(0)">
                <svg-icon name="consult-message" />
                <div class="info">
                    <p>普通图⽂问诊</p>
                    <p>⼆甲主治及以上级别医⽣</p>
                </div>
                <van-icon name="arrow"></van-icon>
            </router-link>
        </div>
    </div>
</template>
<style lang='scss' scoped>
.consult {
    padding-top: 46px;

    .logo {
        padding: 30px 0;
        text-align: center;

        img {
            width: 240px;
        }

        p {
            font-size: 16px;
            margin-top: 10px;

            span {
                color: var(--cp-primary);
            }
        }
    }

    .body {
        padding: 15px;

        a {
            display: flex;
            align-items: center;
            padding: 16px;
            border: 1px solid var(--cp-line);
            border-radius: 4px;
            margin-bottom: 16px;

            .icon {
                font-size: 40px;
            }

            .info {
                margin-left: 16px;
                flex: 1;

                :first-child {
                    font-size: 16px;
                    color: var(--cp-text1);
                    margin-bottom: 4px;
                }

                :last-child {
                    font-size: 13px;
                    color: var(--cp-tag);
                }
            }

            .van-icon {
                color: var(--cp-tip);
            }
        }
    }
}
</style>