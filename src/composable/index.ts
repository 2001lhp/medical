import { ref } from 'vue'
import { cancelOrder, deleteOrder, followDoctor } from '../services/home'
import type { ConsultOrderItem, FollowType } from '../types/consult'
import { OrderType } from '@/enums'
import { showToast } from 'vant'
import type { OrderDetailResponseType } from '@/types/order'
import { getMedicalOrderDetail } from '@/services/order'

export const useFollow = (type: FollowType = 'doc') => {
    const loading = ref(false)
    const follow = async (obj: { id: string, likeFlag: 0 | 1 }) => {
        loading.value = true
        try {
            await followDoctor(obj.id, type)
            obj.likeFlag = obj.likeFlag === 1 ? 0 : 1
        } finally {
            loading.value = false
        }
    }
    return { loading, follow }
}

export const useOrderAction = () => {

    const loading = ref(false)
    const cancelConsultOrder = (item: ConsultOrderItem) => {
        loading.value = true
        cancelOrder(item.id).then(() => {
            item.status = OrderType.ConsultCancel
            item.statusValue = '已取消'
            showToast('取消成功')
        }).catch(() => {
            showToast('取消失败')
        }).finally(() => {
            loading.value = false
        })
    }
    // 删除订单
    const deleteLoading = ref(false)
    const deleteConsultOrder = (item: ConsultOrderItem) => {
        deleteLoading.value = true
        deleteOrder(item.id).then(() => {
            // emit('delete', item.id)
            showToast('删除成功')
        }).catch(() => {
            showToast('删除失败')
        }).finally(() => {
            deleteLoading.value = false
        })
    }
    return {
        loading,
        cancelConsultOrder,
        deleteLoading,
        deleteConsultOrder
    }
}

// 获取药品订单详情
export function useMedicineOrderDetail(id: string) {
    const item = ref<OrderDetailResponseType>()
    const initMedicineOrderDetail = async () => {
        const OrderDetailRes = await getMedicalOrderDetail(id)
        item.value = OrderDetailRes.data
    }
    initMedicineOrderDetail()
    return { item, initMedicineOrderDetail }
}