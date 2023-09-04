<script setup lang='ts'>
import { ref } from 'vue'
import { getPatientDetail, getConsultOrderPre, createConsultOrder, getConsultOrderPayUrl } from '@/services/home'
import { useConsult } from '@/stores/consult';
import type { ConsultOrderPreData } from '@/types/consult';
import { showConfirmDialog, showDialog, showToast } from 'vant';
import { onBeforeRouteLeave, useRouter } from 'vue-router'
const router = useRouter()
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
const payInfo = ref<ConsultOrderPreData>()
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
const onClose = () => {
    showConfirmDialog({
        title: '关闭支付',
        message: '取消支付将无法获得医生回复，医生接诊名额有限，是否确认关闭',
        cancelButtonText: '仍要关闭',
        confirmButtonText: '继续⽀付',
        confirmButtonColor: 'var(--cp-primary)'
    }).then(() => {
        return false
    }).catch(() => {
        orderId.value = ''
        router.push('/consult')
        return true
    });
}
onBeforeRouteLeave(() => {
    if (orderId.value) return false
})
const pay = async () => {
    // console.log(paymentMethod.value);
    if (paymentMethod.value === undefined) return showToast('请选择⽀付⽅式')
    const res = await getConsultOrderPayUrl({
        orderId: orderId.value,
        paymentMethod: paymentMethod.value,
        payCallback: 'http://localhost:5173/room'
    })
    window.location.href = res.data.payUrl
}
const refresh = () => {
    if (
        !store.consult.type ||
        !store.consult.illnessType ||
        !store.consult.depId ||
        !store.consult.patientId
    ) {
        return showDialog({
            title: '温馨提示',
            message: '问诊信息不完整请重新填写，如有未⽀付的问诊订单可在问诊记录中继续⽀付',
            closeOnPopstate: false
        }).then(() => {
            router.push('/')
        })
    }
    loadData()
    loadPatient()
}
refresh()
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
        <van-checkbox v-model="checked" class="check">我已同意<span>支付协议</span></van-checkbox>
        <van-submit-bar v-if="payInfo?.actualPayment" button-type="primary" :price="payInfo?.actualPayment * 100"
            button-text="⽴即⽀付" text-align="left" @click="submit" :loading="loading" />
        <van-action-sheet v-model:show="show" title="标题" :closeable="false" :before-close="onClose">
            <div class="content">
                <p class="amount">￥{{ payInfo?.actualPayment.toFixed(2) }}</p>
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

    .check {
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