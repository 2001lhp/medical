<script setup lang='ts'>
import { ref } from 'vue';
import type { Knowledge, KnowledgeParams, KnowledgeType } from '@/types/consult';
import { getKnowledgePage } from '@/services/home';
const list = ref<Knowledge[]>([]);
const loading = ref(false);
const finished = ref(false);
const prop = defineProps<{
    type: KnowledgeType
}>()
const params = ref<KnowledgeParams>({
    type: prop.type,
    current: 1,
    pageSize: 10
})
// const getdata = () => {
//     getKnowledgePage(params.value).then(res => {
//         console.log(res)
//         list.value = res.data.rows
//     })
// }
// getdata()
const onLoad = async () => {
    const res = await getKnowledgePage(params.value)
    list.value.push(...res.data.rows)
    if (params.value.current >= res.data.pageTotal) {
        finished.value = true
    } else {
        params.value.current++
        loading.value = false
    }
    // setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //         list.value.push(list.value.length + 1);
    //     }
    //     // 加载状态结束
    //     loading.value = false;
    //     // 数据全部加载完成
    //     if (list.value.length >= 40) {
    //         finished.value = true;
    //     }
    // }, 1000);
};
</script>
<template>
    <div class='list'>
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <knowledge-card v-for="item in list" :key="item" :item="item"></knowledge-card>
        </van-list>
    </div>
</template>
<style lang='scss' scoped>
.list {
    padding: 0 15px;
}
</style>