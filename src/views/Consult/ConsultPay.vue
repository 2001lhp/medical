<script setup lang='ts'>
import { ref } from 'vue'
import { getPatientDetail, getConsultOrderPre, createConsultOrder } from '@/services/home'
import { useConsult } from '@/stores/consult';
import type { ConsultOrderPreData } from '@/types/consult';
import { showToast } from 'vant';
const store = useConsult()
const checked = ref()
const patient = ref()
const show = ref(false)
const paymentMethod = ref<0 | 1>()
const loadPatient = async () => {
    if (!store.consult.patientId) return
    const res = await getPatientDetail(store.consult.patientId)
    // console.log(res.data);
    patient.value = res.data
}
loadPatient()
const payInfo = ref<ConsultOrderPreData>({})
const loadData = async () => {
    const res = await getConsultOrderPre({
        type: store.consult.type,
        illnessType: store.consult.illnessType
    })
    // console.log(res.data);
    payInfo.value = res.data
    store.setCoupon(payInfo.value.couponId)
}
loadData()
const loading = ref()
const orderId = ref()
const submit = async () => {
    if (!checked.value) return showToast('请勾选我已同意⽀付协议')
    loading.value = true
    const res = await createConsultOrder(store.consult)
    console.log(res);
    orderId.value = res.data.id
    loading.value = false
    store.clear()
    // 打开
    show.value = true
}
</script>
<template>
    <div class='pay'>
        <nav-bar title="支付" />
        <div class="info">
            <p class="tit">图⽂问诊 {{ payInfo?.payment }} 元</p>
            <img class="img" src="@/assets/avatar-doctor.svg" />
            <p class="desc">
                <span>极速问诊</span>
                <span>⾃动分配医⽣</span>
            </p>
        </div>
        <van-cell-group>
            <van-cell title="优惠券" :value="`-¥${payInfo?.couponDeduction}`" />
            <van-cell title="积分抵扣" :value="`-¥${payInfo?.pointDeduction}`" />
            <van-cell title="实付款" :value="`¥${payInfo?.actualPayment}`" class="price" />
        </van-cell-group>
        <div class="space" style="height: 12px;background-color: var(--cp-bg);"></div>
        <van-cell-group>
            <van-cell title="患者信息" :value="`${patient?.name} | ${patient?.genderValue} | ${patient?.age}岁`" />
            <van-cell title="病情描述" :label="store.consult.illnessDesc" />
        </van-cell-group>
        <van-checkbox v-model="checked">我已同意<span>支付协议</span></van-checkbox>
        <van-submit-bar button-type="primary" :price="payInfo?.actualPayment * 100" button-text="⽴即⽀付" text-align="left"
            @click="submit" :loading="loading" />
        <van-action-sheet v-model:show="show" title="标题">
            <div class="content">
                <p class="amount">￥{{ payInfo.actualPayment.toFixed(2) }}</p>
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
                    <van-button type="primary" round block>⽴即⽀付</van-button>
                </div>
            </div>
        </van-action-sheet>
    </div>
</template>
<style lang='scss' scoped>
.pay {
    padding-top: 46px;

    .info {
        display: flex;
        padding: 15px;
        flex-wrap: wrap;
        align-items: center;

        .tit {
            width: 100%;
            font-size: 16px;
            margin-bottom: 10px;
        }

        .img {
            margin-right: 10px;
            width: 38px;
            height: 38px;
            border-radius: 4px;
            overflow: hidden;
        }

        .desc {
            flex: 1;

            span {
                display: block;
                color: var(--cp-tag);

                &:first-child {
                    font-size: 16px;
                    color: var(--cp-text2);
                }
            }
        }
    }

    .price {
        ::v-deep .van-cell__value {
            font-size: 16px;
            color: var(--cp-price);
        }
    }

    .van-checkbox {
        height: 56px;
        justify-content: center;

        span {
            color: var(--cp-primary);
        }

        ::v-deep() {
            .van-checkbox__icon .van-icon {
                width: 16px;
                height: 16px;
            }
        }
    }

    ::v-deep() {
        .van-submit-bar__button {
            font-weight: normal;
            width: 160px;
        }
    }

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
            }
        }
    }
}
</style>