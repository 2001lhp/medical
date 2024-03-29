export type User = {
    id: number | string
    token: string
    account: string
    mobile: number | string
    avatar: string
} | undefined


type OmitUser = Omit<User, 'token'>

export type UserInfo = OmitUser & {
    likeNumber: number
    collectionNumber: number
    score: number
    couponNumber: number
    orderInfo: {
        paidNumber: number
        receivedNumber: number
        shippedNumber: number
        finishedNumber: number
    }
}

export type Patient = {
    id?: string
    name: string
    idCard: string
    defaultFlag: 0 | 1
    gender: 0 | 1
    genderValue?: string
    age?: number
}