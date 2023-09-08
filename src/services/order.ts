import type { AddressItem, MedicineOrderType, OrderDetailResponseType, OrderPre } from "@/types/order"
import request from "@/utils/http"

export const getMedicalOrderPre = (params: { prescriptionId: string }) => {
    return request<OrderPre>('/patient/medicine/order/pre', 'GET', params)
}
// 获取收货地址列表

export const getAddressList = () => { return request<AddressItem[]>('/patient/order/address') }

export const createMedicalOrder = (data: MedicineOrderType) => {
    return request<{ id: string }>('/patient/medicine/order', 'POST', data)
}

export const getMedicalOrderDetail = (id: string) => {
    return request<OrderDetailResponseType>(`/patient/medicine/order/detail/${id}`, 'GET')
  }