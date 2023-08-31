import request from '../utils/http'
import type { KnowledgeParams, KnowledgePage, PageParams, DoctorPage, FollowType, TopDep, Image } from '../types/consult.d'

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