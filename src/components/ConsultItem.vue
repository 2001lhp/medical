<script setup lang='ts'>
import type { ConsultOrderItem, } from '@/types/consult';
import { OrderType } from '@/enums';
import { ref, computed } from 'vue';
// import { cancelOrder, deleteOrder } from '@/services/home';
import { showToast } from 'vant';
import useShowPrescription from '@/composable/prescription'
import { useOrderAction } from '@/composable';
const prop = defineProps<{
    item: ConsultOrderItem
}>()
const emit = defineEmits<{
    (e: 'delete', id: number | string): void
}>()
const showPopover = ref(false)
const actions = computed(() => [
    { text: '查看处方', disabled: !prop.item.prescriptionId },
    { text: '删除订单' }
])
const onSelect = (item: { text: string; disabled?: boolean }) => {
    // console.log(item)
}

const { prescription } = useShowPrescription()
const { loading, cancelConsultOrder, deleteLoading, deleteConsultOrder } = useOrderAction()
</script>
<template>
    <div class='item'>
        <div class="head van-hairline--bottom">
            <img class="img" src="@/assets/avatar-doctor.svg" />
            <p>{{ item.docInfo?.name }}</p>
            <span :class="{
                orange: item.status === OrderType.ConsultPay, green:
                    item.status === OrderType.ConsultChat
            }">{{ item.statusValue }}</span>
        </div>
        <div class="body" @click="$router.push(`/consult/${item.id}`)">
            <div class="body-row">
                <div class="body-label">病情描述</div>
                <div class="body-value">{{ item.illnessDesc }}</div>
            </div>
            <div class="body-row">
                <div class="body-label">价格</div>
                <div class="body-value">¥ {{ item.payment }}</div>
            </div>
            <div class="body-row">
                <div class="body-label">创建时间</div>
                <div class="body-value tip">{{ item.createTime }}</div>
            </div>
        </div>
        <div class="foot" v-if="item.status === OrderType.ConsultPay">
            <van-button class="gray" plain size="small" round :loading="loading"
                @click="cancelConsultOrder(item)">取消问诊</van-button>
            <van-button type="primary" plain size="small" round :to="`/consult/${item.id}`"> 去⽀付 </van-button>
        </div>
        <div class="foot" v-if="item.status === OrderType.ConsultWait">
            <van-button class="gray" plain size="small" round :loading="loading"
                @click="cancelConsultOrder(item)">取消问诊</van-button>
            <van-button type="primary" plain size="small" round :to="`/room?orderId=${item.id}`"> 继续沟通 </van-button>
        </div>
        <div class="foot" v-if="item.status === OrderType.ConsultChat">
            <van-button v-if="item.prescriptionId" class="gray" plain size="small" round
                @click="prescription(item.prescriptionId)"> 查看处⽅ </van-button>
            <van-button type="primary" plain size="small" round :to="`/room?orderId=${item.id}`"> 继续沟通 </van-button>
        </div>
        <div class="foot" v-if="item.status === OrderType.ConsultComplete">
            <div class="more">
                <van-popover placement="top-start" v-model:show="showPopover" :actions="actions" @select="onSelect">
                    <template #reference> 更多 </template>
                </van-popover>
            </div>
            <van-button class="gray" plain size="small" round :to="`/room?orderId=${item.id}`"> 问诊记录 </van-button>
            <van-button v-if="!item.evaluateId" type="primary" plain size="small" round> 去评价 </van-button>
            <van-button v-else class="gray" plain size="small" round> 查看评价 </van-button>
        </div>
        <div class="foot" v-if="item.status === OrderType.ConsultCancel">
            <van-button class="gray" plain size="small" round :loading="deleteLoading"
                @click="deleteConsultOrder(item); $emit('delete', item.id)">删除订单</van-button>
            <van-button type="primary" plain size="small" round to="/">咨询其他医⽣</van-button>
        </div>
    </div>
</template>
<style lang='scss' scoped>
.item {
    border-radius: 4px;
    box-shadow: 0px 0px 22px 0px rgba(245, 245, 245, 0.1);
    background-color: #fff;
    margin-bottom: 10px;

    .head {
        display: flex;
        align-items: center;
        height: 50px;
        padding: 0 15px;

        .img {
            width: 20px;
            height: 20px;
        }

        >p {
            flex: 1;
            font-size: 15px;
            padding-left: 10px;
        }

        >span {
            color: var(--cp-tag);

            &.orange {
                color: #f2994a;
            }

            &.green {
                color: var(--cp-primary);
            }
        }
    }

    .body {
        padding: 15px 15px 8px 15px;

        .body-row {
            display: flex;
            margin-bottom: 7px;
        }

        .body-label {
            width: 62px;
            font-size: 13px;
            color: var(--cp-tip);
        }

        .body-value {
            width: 250px;

            &.tip {
                color: var(--cp-tip);
            }
        }
    }

    .foot {
        padding: 0 15px 15px 15px;
        display: flex;
        justify-content: flex-end;
        align-items: center;

        .van-button {
            margin-left: 10px;
            padding: 0 16px;

            &.gray {
                color: var(--cp-text3);
                background-color: var(--cp-bg);
            }
        }

        .more {
            color: var(--cp-tag);
            flex: 1;
            font-size: 13px;
        }
    }
}
</style>