<script setup lang='ts'>
import { ref } from 'vue';
import { getConsultOrderList } from '@/services/home'
import type { ConsultOrderListParams, ConsultOrderItem } from '@/types/consult';
import type { ConsultType } from '@/enums';
const props = defineProps<{ type: ConsultType }>()
const params = ref<ConsultOrderListParams>({
    type: props.type,
    current: 1,
    pageSize: 5
})
const loading = ref(false)
const finished = ref(false)
const list = ref<ConsultOrderItem[]>([])
const onLoad = async () => {
    const res = await getConsultOrderList(params.value)
    // console.log(res);
    list.value.push(...res.data.rows)
    if (params.value.current < res.data.pageTotal) {
        params.value.current++
    } else {
        finished.value = true
    }
    loading.value = false
}
const del = (id: string) => {
    list.value = list.value.filter((item) => item.id !== id)
}
</script>
<template>
    <div class='list'>
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <consult-item v-for="item in list" :key="item.id" :item="item" @delete="del" />
        </van-list>
    </div>
</template>
<style lang='scss' scoped>
.list {
    padding: 10px 15px;
}
</style>