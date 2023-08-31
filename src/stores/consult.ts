import { ref, } from 'vue'
import { defineStore } from 'pinia'
import type { PartialConsult, ConsultIllness } from '../types/consult'
import { ConsultType } from '@/enums'

export const useConsult = defineStore('consult', () => {
    const consult = ref<PartialConsult>({})
    const setType = (type: ConsultType) => (consult.value.type = type)
    const setIllnessType = (type: 0 | 1) => (consult.value.illnessType = type)
    const setDep = (id: string) => (consult.value.depId = id)
    const setIllness = (illness: ConsultIllness) => {
        consult.value.illnessDesc = illness.illnessDesc
        consult.value.illnessTime = illness.illnessTime
        consult.value.consultFlag = illness.consultFlag
        consult.value.pictures = illness.pictures
    }
    const setPatient = (id: string) => (consult.value.patientId = id)
    const setCoupon = (id?: string) => (consult.value.couponId = id)
    const clear = () => (consult.value = {})
    return {
        consult, setType, setIllnessType, setDep, setIllness, setPatient,
        setCoupon, clear
    }
}, {
    persist: {
        key: 'consult',
        storage: localStorage,
        // paths: ['user']
    }
})