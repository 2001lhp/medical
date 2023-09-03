
export type KnowledgeType = 'like' | 'recommend' | 'fatReduction' | 'food'

export type Knowledge = {
    id: string
    title: string
    coverUrl: string[]
    topic: string[]
    collectionNumber: number
    commentNumber: number
    creatorName: string
    creatorAvatar: string
    creatorHospatalName: string
    likeFlag: 0 | 1
    content: string
    creatorDep: string
    creatorTitles: string
    creatorId: string
}

export type KnowledgePage = {
    pageTotal: number
    total: number
    rows: Knowledge[]
}



export type PageParams = {
    current: number
    pageSize: number
}

export type KnowledgeParams = PageParams & {
    type: KnowledgeType
}

export type Doctor = {
    id: string
    name: string
    avatar: string
    hospitalName: string
    gradeName: string
    depName: string
    positionalTitles: string
    likeFlag: 0 | 1
    serviceFee: number
    consultationNum: number
    score: number
    major: string
}

export type DoctorPage = {
    pageTotal: number
    total: number
    rows: DoctorList
}

export type FollowType = 'doc' | 'knowledge' | 'topic' | 'disease'

import { ConsultType, IllnessTime } from '../enums/index'

export type Image = {
    // 图⽚ID
    id: string
    // 图⽚地址
    url: string
}

// 问诊记录
export type Consult = {
    // 问诊记录ID
    id: string
    // 问诊类型
    type: ConsultType
    // 快速问诊类型，0 普通 1 三甲
    illnessType: 0 | 1
    // 科室ID
    depId: string
    // 疾病描述
    illnessDesc: string
    // 疾病持续时间
    illnessTime: IllnessTime
    // 是否就诊过，0 未就诊过 1 就诊过
    consultFlag: 0 | 1
    // 图⽚数组
    pictures: Image[]
    // 患者ID
    patientId: string
    // 优惠券ID
    couponId: string
}

export type PartialConsult = Partial<Consult>


export type SubDep = {
    // 科室ID
    id: string
    // 科室名称
    name: string
}

export type TopDep = SubDep & {
    // ⼆级科室数组
    child: SubDep[]
}

export type ConsultIllness = Pick<PartialConsult, 'illnessDesc' | 'illnessTime' | 'consultFlag' | 'pictures'>

// 问诊订单预⽀付传参

export type ConsultOrderPreParams = Pick<PartialConsult, 'type' | 'illnessType'>


// 问诊订单预⽀付信息
export type ConsultOrderPreData = {
value: ConsultOrderPreData
    // 积分抵扣
    pointDeduction: number
    // 优惠券抵扣
    couponDeduction: number
    // 优惠券ID
    couponId: string
    // 需付款
    payment: number
    // 实付款
    actualPayment: number
}