<script setup lang='ts'>
import { getPatientList } from '@/services/user';
import { ref } from 'vue'
const list = ref()
const getList = async () => {
    const res = await getPatientList()
    console.log(res);
    list.value = res.data
}
getList()
</script>
<template>
    <div class='patient'>
        <nav-bar title="家庭档案" text="" />
        <div class="patient-list">
            <div class="patient-item" v-for="item in list" :key="item.id">
                <div class="info">
                    <span class="name">{{ item.name }}</span>
                    <span class="id">{{ item.idCard.replace(/^(.{3})(?:\d+)(.{4})$/,'\$1***********\$2') }}</span>
                    <span>{{ item.genderValue }}</span>
                    <span>{{ item.age }}岁</span>
                </div>
                <div class="icon"><svg-icon name="user-edit" /></div>
                <van-tag type="primary">默认</van-tag>
            </div>
            <div class="patient-add">
                <svg-icon name="user-add"></svg-icon>
                <p>添加患者</p>
            </div>
        </div>
    </div>
</template>
<style lang='scss' scoped>
.patient {
    padding: 46px 0 80px;

    &-list {
        padding: 15px;
    }

    &-item {
        display: flex;
        align-items: center;
        padding: 15px;
        background-color: var(--cp-bg);
        border-radius: 8px;
        margin-bottom: 15px;
        position: relative;
        border: 1px solid var(--cp-bg);
        transition: all 0.3s;
        overflow: hidden;

        .info {
            display: flex;
            flex-wrap: wrap;
            flex: 1;

            span {
                color: var(--cp-tip);
                margin-right: 20px;
                line-height: 30px;

                &.name {
                    font-size: 16px;
                    color: var(--cp-text1);
                    width: 80px;
                    margin-right: 0;
                }

                &.id {
                    color: var(--cp-text2);
                    width: 180px;
                }
            }

        }

        .icon {
            color: var(--cp-tag);
            width: 20px;
            text-align: center;
        }

        .van-tag {
            position: absolute;
            right: 60px;
            top: 21px;
            width: 30px;
            height: 16px;
            font-size: 10px;
            color: #fff;
            background-color: var(--cp-primary);
            border-radius: 2px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        &.selected {
            border-color: var(--cp-primary);
            background-color: var(--cp-plain);

            .icon {
                color: var(--cp-primary);
            }
        }
    }

    &-add {
        background-color: var(--cp-bg);
        color: var(--cp-primary);
        text-align: center;
        padding: 15px 0;
        border-radius: 8px;
    }
}
</style>