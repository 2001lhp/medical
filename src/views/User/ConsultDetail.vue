<script setup lang='ts'>
import { useClipboard } from '@vueuse/core'
import { ref } from 'vue'
import { getOrderDetail } from '@/services/home';
import { useRouter, useRoute } from 'vue-router';
import type { ConsultOrderItem } from '@/types/consult';
import { getIllnessTimeText, getConsultFlagText } from '@/utils/filter'
import { OrderType } from '@/enums'
import useShowPrescription from '@/composable/prescription';
import { useOrderAction } from '@/composable';
import { showConfirmDialog, showToast } from 'vant';
const router = useRouter()
const route = useRoute()
// console.log(route.params);
const info = ref<ConsultOrderItem>()
const orderId = ref(route.params.id)
const getdata = async () => {
    let res = await getOrderDetail(orderId.value as string)
    // console.log(res.data);
    info.value = res.data
}
getdata()
const { prescription } = useShowPrescription()
const { loading, cancelConsultOrder, deleteLoading, deleteConsultOrder } = useOrderAction()
const { copy, isSupported } = useClipboard()
const onCopy = () => {
    if (!isSupported) return showToast('浏览器不支持')
    copy(info.value?.orderNo || '')
    showToast('复制成功')
}
const show = ref(false)
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
        router.back()
        return true
    });
}
</script>
<template>
    <div class='detail' v-if="info">
        <nav-bar title="问诊详情" />
        <div class="header">
            <div class="text">
                <h3>图文问诊 {{ info?.payment }} 元</h3>
                <span>{{ info?.statusValue }}</span>
                <p>信息</p>
            </div>
            <div class="card">
                <img src="@/assets/avatar-doctor.svg" alt="" />
                <p>
                    <span>极速问诊</span>
                    <span>{{ info?.docInfo?.name }}</span>
                </p>
                <van-icon name="arrow" />
            </div>
        </div>
        <van-cell-group>
            <van-cell title="患者信息"
                :value="`${info?.patientInfo.name} | ${info?.patientInfo.genderValue} | ${info?.patientInfo.age}岁`" />
            <van-cell title="患病时长" :value="`${getIllnessTimeText(info?.illnessTime as number)}`" />
            <van-cell title="就诊情况" :value="`${getConsultFlagText(info?.consultFlag as number)}`" />
            <van-cell title="病情描述" :label="info?.illnessDesc" />
        </van-cell-group>
        <div class="bg"></div>
        <h3 class="ordertitle">订单信息</h3>
        <van-cell-group :border="false">
            <van-cell title="订单编号">
                <template #value>
                    <span class="copy" @click="onCopy">复制</span>
                    <span>{{ info?.orderNo }}</span>
                </template>
            </van-cell>
            <van-cell title="创建时间" :value="info?.createTime" />
            <van-cell title="应付款" :value="`￥${info?.payment}`" />
            <van-cell title="优惠券" :value="`-￥${info?.couponDeduction}`" />
            <van-cell title="积分抵扣" :value="`-￥${info?.pointDeduction}`" />
            <van-cell title="实付款" :value="`￥${info?.actualPayment}`" class="price" />
        </van-cell-group>
        <!-- <div class="btn van-hairline--top">
            <div class="price">
                <span>需付款</span>
                <span>￥{{ info?.actualPayment }}</span>
            </div>
            <van-button type="default" round>取消问诊</van-button>
            <van-button type="primary" round>继续⽀付</van-button>
        </div> -->
        <div class="btn van-hairline--top" v-if="info.status === OrderType.ConsultPay">
            <div class="price">
                <span>需付款</span>
                <span>￥{{ info.actualPayment }}</span>
            </div>
            <van-button type="default" round :loading="loading" @click="cancelConsultOrder(info)">取消问诊</van-button>
            <van-button type="primary" round @click="show = true">继续支付</van-button>
        </div>
        <div class="btn van-hairline--top" v-if="info.status === OrderType.ConsultWait">
            <van-button type="default" round :loading="loading" @click="cancelConsultOrder(info)">取消问诊</van-button>
            <van-button type="primary" round :to="`/room?orderId=${info.id}`">继续沟通</van-button>
        </div>
        <div class="btn van-hairline--top" v-if="info.status === OrderType.ConsultChat">
            <van-button type="default" round v-if="info.prescriptionId"
                @click="prescription(info.prescriptionId)">查看处方</van-button>
            <van-button type="primary" round :to="`/room?orderId=${info.id}`">继续沟通</van-button>
        </div>
        <div class="btn van-hairline--top" v-if="info.status === OrderType.ConsultComplete">
            <!-- <cp-consult-more></cp-consult-more> -->
            <van-button type="default" round :to="`/room?orderId=${info.id}`">问诊记录</van-button>
            <van-button type="primary" round v-if="info.evaluateId">写评价</van-button>
            <van-button type="default" round v-else>查看评价</van-button>
        </div>
        <div class="btn van-hairline--top" v-if="info.status === OrderType.ConsultCancel">
            <van-button type="default" round :loading="deleteLoading"
                @click="deleteConsultOrder(info); $router.back()">删除订单</van-button>
            <van-button type="primary" round to="/">咨询其他医生</van-button>
        </div>
        <action-sheet :actualPayment="info?.actualPayment" :show="show" :close="onClose" :orderId="orderId"/>
    </div>

    <div v-else>
        <nav-bar title="问诊详情" />
        <van-skeleton title :row="4" style="margin-top: 30px" />
        <van-skeleton title :row="4" style="margin-top: 30px" />
    </div>
</template>
<style lang='scss' scoped>
.detail {
    padding-top: 46px;
    padding-bottom: 70px;

    .header {
        height: 140px;
        position: relative;
        padding: 15px;

        &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 135px;
            background: linear-gradient(180deg, rgba(44, 181, 165, 0), rgba(44, 181, 165, 0.2));
            border-bottom-left-radius: 150px 20px;
            border-bottom-right-radius: 150px 20px;
        }

        .text {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            padding: 10px 3px;

            span {
                color: var(--cp-tag);
                font-weight: 500;
                font-size: 16px;
            }

            p {
                width: 100%;
                color: var(--cp-text3);
                margin-top: 5px;
            }
        }

        .card {
            height: 74px;
            background-color: #fff;
            border-radius: 8px;
            position: relative;
            display: flex;
            align-items: center;
            padding: 0 15px;
            box-shadow: 0px 0px 22px 0px rgba(229, 229, 229, 0.5);

            img {
                width: 38px;
                height: 38px;
            }

            p {
                flex: 1;
                padding-left: 15px;

                span {
                    display: block;
                    font-size: 16px;
                }

                :last-child {
                    font-size: 13px;
                    color: var(--cp-text3);
                }
            }

            .van-icon {
                color: var(--cp-tip);
            }
        }
    }

    .copy {
        padding: 2px 10px;
        border: 1px solid var(--cp-primary);
        background-color: var(--cp-plain);
        color: var(--cp-primary);
        font-size: 12px;
        border-radius: 12px;
        margin-right: 10px;
    }

    :deep(.van-cell__title) {
        width: 70px;
        flex: none;
    }

    .bg {
        height: 12px;
        background-color: var(--cp-bg);
    }

    .ordertitle {
        padding: 10px 18px;
        font-weight: normal;
    }

    .btn {
        height: 65px;
        width: 100%;
        position: fixed;
        left: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        background-color: #fff;
        justify-content: flex-end;
        padding: 0 15px;
        box-sizing: border-box;

        .price {
            flex: 1;

            >span:last-child {
                font-size: 18px;
                color: var(--cp-price);
                padding-left: 5px;
            }
        }

        .van-button {
            margin-left: 10px;
            padding-left: 17px;
            padding-right: 17px;
        }

        :deep(.van-button--default) {
            background-color: var(--cp-bg);
            color: var(--cp-text3);
        }
    }
}
</style>