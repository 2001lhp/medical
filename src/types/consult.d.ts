
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