<script setup lang='ts'>
import { ref } from 'vue'
import type { TopDep } from '@/types/consult'
import { getAllDep } from '@/services/home';
import { useConsult } from '@/stores/consult';
const store = useConsult()
const active = ref(0)
const alldep = ref<TopDep[]>([])
const getdata = async () => {
    const res = await getAllDep()
    console.log(res);
    alldep.value = res.data
}
getdata()
</script>
<template>
    <div class='dep'>
        <nav-bar title="选择科室" />
        <div class="wrapper">
            <van-sidebar v-model="active">
                <van-sidebar-item v-for="item in alldep" :key="item.id" :title="item.name" />
            </van-sidebar>
            <div class="right">
                <router-link v-for="item in alldep[active].child" :key="item.id" to="illness"
                    @click="store.setDep(item.id)">{{ item.name }}</router-link>
            </div>
        </div>
    </div>
</template>
<style lang='scss' scoped>
.dep {
    padding-top: 46px;

    .wrapper {
        display: flex;
        height: calc(100vh - 46px);
        overflow: hidden;
    }

    .van-sidebar {
        width: 114px;

        &-item {
            padding: 14px;
            color: var(--cp-tag);

            &--select {
                color: var(--cp-main);
                font-weight: normal;

                &::before {
                    display: none;
                }
            }
        }
    }

    .right {
        flex: 1;
        height: 100%;
        overflow-y: auto;

        a {
            display: block;
            padding: 14px 30px;
            color: var(--cp-dark);
        }
    }
}
</style>