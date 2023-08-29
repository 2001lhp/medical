import request from '../utils/http'
import type { Patient } from '../types/user'

// 查询患者列表信息
export const getPatientList = () => {
    return request<Patient[]>('/patient/mylist', 'GET')
}

// 添加患者
export const addPatient = (patient: Patient) => {
    return request('/patient/add', 'POST', patient)
}

// 编辑患者
export const editPatient = (patient: Patient) => {
    return request('/patient/update', 'PUT', patient)
}

// 删除患者
export const delPatient = (id: number | string) => {
    return request(`/patient/del/${id}`, 'DELETE')
}