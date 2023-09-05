<script setup lang='ts'>
import { getConsultOrderPayUrl } from '@/services/home';
import { showToast } from 'vant';
import { ref } from 'vue';
const prop = defineProps<{
    actualPayment: number,
    show: boolean,
    close: () => void,
    orderId: string
}>()
const pay = async () => {
    // console.log(paymentMethod.value);
    if (paymentMethod.value === undefined) return showToast('请选择⽀付⽅式')
    const res = await getConsultOrderPayUrl({
        orderId: prop.orderId,
        paymentMethod: paymentMethod.value,
        payCallback: 'http://localhost:5173/room'
    })
    window.location.href = res.data.payUrl
}
const paymentMethod = ref<0 | 1>()
</script>
<template>
    <van-action-sheet :show="show" title="标题" :closeable="false" :before-close="close">
        <div class="content">
            <p class="amount">￥{{ actualPayment.toFixed(2) }}</p>
            <van-cell-group>
                <van-cell title="微信⽀付" @click="paymentMethod = 0">
                    <template #icon><svg-icon name="consult-wechat" /></template>
                    <template #extra><van-checkbox :checked="paymentMethod === 0" /></template>
                </van-cell>
                <van-cell title="⽀付宝⽀付" @click="paymentMethod = 1">
                    <template #icon><svg-icon name="consult-alipay" /></template>
                    <template #extra><van-checkbox :checked="paymentMethod === 1" /></template>
                </van-cell>
            </van-cell-group>
            <div class="btn">
                <van-button type="primary" round block @click="pay">⽴即⽀付</van-button>
            </div>
        </div>
    </van-action-sheet>
</template>
<style lang='scss' scoped>
.content {
    .amount {
        padding: 20px;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
    }

    .btn {
        padding: 15px;
    }

    .van-cell {
        align-items: center;

        .icon {
            margin-right: 10px;
            font-size: 18px;
        }

        .van-checkbox :deep(.van-checkbox__icon) {
            font-size: 16px;
            margin-left: 220px;
        }
    }
}
</style>