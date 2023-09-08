<script setup lang='ts'>
import { createMedicalOrder, getAddressList, getMedicalOrderPre } from '@/services/order';
import { ref } from 'vue';
import type { Address, OrderPre } from '@/types/order'
import { useRouter, useRoute } from 'vue-router';
import { showConfirmDialog, showToast } from 'vant';
const router = useRouter()
const route = useRoute()
const agree = ref(false)
const address = ref<Address>()
const medicineInfo = ref<OrderPre>()
const medicalOrderId = ref()
const prescriptionId = route.query.id
const onSubmit = async () => {
    if (!agree.value) return showToast('请勾选支付协议')
    if (!address.value?.id) return showToast('请选择收货地址')
    if (!prescriptionId) return showToast('未找到处方')
    // 调用生成药品订单接口,生成药品订单
    const orderRes = await createMedicalOrder({
        id: prescriptionId as string,
        addressId: address.value?.id as string
    })

    show.value = true
    medicalOrderId.value = orderRes.data.id

    console.log('orderRes', orderRes)
}
const getdata = async () => {
    const res = await getMedicalOrderPre({ prescriptionId: route.query.id as string })
    const addRes = await getAddressList()
    console.log(res);
    console.log(addRes);
    address.value = addRes.data[0]
    medicineInfo.value = res.data
}
getdata()
const show = ref(false)
const onClose = () => {
    return showConfirmDialog({
        title: '关闭支付',
        message: '取消支付将无法获得医生回复，医生接诊名额有限，是否确认关闭？',
        cancelButtonText: '仍要关闭',
        confirmButtonText: '继续支付',
        confirmButtonColor: 'var(--cp-primary)'
    }).then((res) => {
        return false
    }).catch((error) => {
        // router.push('/user/consult')
        return true
    })
}
</script>
<template>
    <div class='pay'>
        <nav-bar title="药品支付" />
        <div class="address">
            <p class="area">
                <van-icon name="location" />
                <span>{{ address?.province }}{{ address?.city }}{{ address?.county }}</span>
            </p>
            <p class="detail">{{ address?.addressDetail }}</p>
            <p>{{ address?.receiver }} {{ address?.mobile?.replace(/^(\d{3})\d+(\d{4})$/, '\$1****\$2') }}</p>
        </div>
        <order-medical :list="medicineInfo?.medicines" />
        <!-- <div class="medical">
            <div class="head">
                <h3>优医药房</h3>
                <small>优医质保 假⼀赔⼗</small>
            </div>
            <div class="item van-hairline--top" v-for="i in 2" :key="i">
                <img class="img" src="@/assets/ad.png" alt="" />
                <div class="info">
                    <p class="name">
                        <span>优赛明 维⽣素E乳</span>
                        <span>x1</span>
                    </p>
                    <p class="size">
                        <van-tag>处⽅药</van-tag>
                        <span>80ml</span>
                    </p>
                    <p class="price">￥25.00</p>
                </div>
                <div class="desc">⽤法⽤量：⼝服，每次1袋，每天3次，⽤药3天</div>
            </div>
        </div> -->
        <van-cell-group>
            <van-cell title="药品金额" :value="`￥${medicineInfo?.payment}`"></van-cell>
            <van-cell title="运费" :value="`￥${medicineInfo?.expressFee}`"></van-cell>
            <van-cell title="优惠卷" :value="`-￥${medicineInfo?.couponDeduction}`"></van-cell>
            <van-cell title="实付款" :value="`￥${medicineInfo?.actualPayment}`" class="price"></van-cell>
        </van-cell-group>
        <div class="order-tip">
            <p class="tip">
                由于药品的特殊性，如⾮错发、漏发药品的情况，药品⼀经发出 不得退换，请核对药品信息⽆误后下单。
            </p>
            <van-checkbox v-model="agree">我已同意 <a href="javascript:;">⽀付协议</a></van-checkbox>
        </div>
        <action-sheet payCallback="order/pay/result" :close="onClose" :actualPayment="medicineInfo?.actualPayment!"
            v-model:show="show" :orderId="medicalOrderId!" />
        <van-submit-bar :price="3050" text-align="left" button-type="primary" button-text="立即支付" @submit="onSubmit" />
    </div>
</template>
<style lang='scss' scoped>
.pay {
    padding-top: 46px;
    padding-bottom: 70px;

    :deep(.van-nav-bar) {
        background-color: var(--cp-primary);

        .van-nav-bar__arrow,
        .van-nav-bar__title {
            color: #fff;
        }
    }

    .address {
        padding: 15px 15px 0 15px;
        background-color: #fff;
        font-size: 13px;

        .area {
            color: var(--cp-tag);
            margin-bottom: 5px;
        }

        .van-icon-location {
            color: #ff7702;
            font-size: 14px;
        }

        .detail {
            font-size: 17px;
            margin-bottom: 5px;
        }

        &::after {
            content: '';
            display: block;
            height: 12px;
            background-color: var(--cp-bg);
            margin: 0 -15px;
            margin-top: 15px;
        }
    }



    .desc {
        width: 100%;
        background-color: var(--cp-bg);
        border-radius: 4px;
        margin-top: 10px;
        padding: 4px 10px;
        color: var(--cp-tip);
    }

    .order-tip {
        padding: 0 15px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 10px;

        .tip {
            font-size: 12px;
            color: var(--cp-tag);
            width: 100%;
            margin-bottom: 30px;

            &::before {
                content: '*';
                color: var(--cp-price);
                font-size: 14px;
            }
        }

        .van-checkbox {
            a {
                color: var(--cp-primary);
            }
        }
    }
}
</style>