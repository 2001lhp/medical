import request from '../utils/http'
import type { KnowledgeParams, KnowledgePage, PageParams, DoctorPage, FollowType, TopDep, Image, ConsultOrderPreParams, ConsultOrderPreData, PartialConsult, ConsultOrderListParams, ConsultOrderPage } from '../types/consult.d'
import type { Patient } from '@/types/user'

export const getKnowledgePage = (params: KnowledgeParams) => {
    return request<KnowledgePage>('/patient/home/knowledge', 'GET', params)
}


export const getDoctorPage = (params: PageParams) => {
    return request<DoctorPage>('/home/page/doc', 'GET', params)
}

export const followDoctor = (id: string, type: FollowType = 'doc') => {
    return request('/like', 'POST', { id, type })
}

export const getAllDep = () => { return request<TopDep[]>('/dep/all') }

export const uploadImage = (file: File) => {
    const fd = new FormData()
    fd.append('file', file)
    return request<Image>('/upload', 'POST', fd)
}

export const getConsultOrderPre = (params: ConsultOrderPreParams) => {
    return request<ConsultOrderPreData>('/patient/consult/order/pre', 'GET', params)
}

export const getPatientDetail = (id: string) => request<Patient>(`/patient/info/${id}`)

export const createConsultOrder = (data: PartialConsult) => {
    return request<{ id: string }>('/patient/consult/order', 'POST', data)
}

interface urlConfig {
    paymentMethod: 0 | 1
    orderId: string
    payCallback: string
}

export const getConsultOrderPayUrl = (params: urlConfig) => {
    return request<{ payUrl: string }>('/patient/consult/pay', 'POST', params)
}

export const getConsultOrderList = (params: ConsultOrderListParams) => {
    return request<ConsultOrderPage>('/patient/consult/order/list', 'GET', params)
}

export const cancelOrder = (id: string) => { return request(`/patient/order/cancel/${id}`, 'PUT') }

export const deleteOrder = (id: string) => { return request(`/patient/order/${id}`, 'DELETE') }