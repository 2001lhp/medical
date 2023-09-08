export type Medical = {
    // 药品价格
    amount: string
    // 药品图片
    avatar: string
    // 主键id
    id: string
    // 药品名称
    name: string
    // 是否是处方药0不是1是
    prescriptionFlag: number
    // 选择的药品数量
    quantity: number
    // 药品规格
    specs: string
    // 药品用法用量
    usageDosag: string
}
export type OrderPre = {
    // 处⽅ID
    id: string
    // 优惠券ID
    couponId: string
    // 积分抵扣
    pointDeduction: number
    // 优惠券抵扣
    couponDeduction: number
    // 应付款
    payment: number
    // 邮费
    expressFee: number
    // 实付款
    actualPayment: number
    // 药品订单
    medicines: Medical[]
}

export type Address = {
    // 地址ID
    id: string
    // 联系⽅式
    mobile: string
    // 收件⼈
    receiver: string
    // 省
    province: string
    // 市
    city: string
    // 区
    county: string
    // 详细地址
    addressDetail: string
}

export type AddressItem = Address & {
    // 是否默认地址，0 不是 1 是
    isDefault: 0 | 1
    // 邮政编码
    postalCode: string
}

// 下单的参数类型
export type MedicineOrderType = {
    // 地址信息
    addressId: string
    // 使用优惠券信息，不使用优惠券，不用传值
    couponId?: string
    // 处方id
    id: string
}

export type OrderDetailResponseType = {
    // 实际付款金额
    actualPayment: number
    // 地址信息
    addressInfo: AddressInfo
    // 取消/退款进度
    cancelProcess?: string
    // 取消订单原因
    cancelReason?: string
    // 取消订单原因文字
    cancelReasonValue?: string
    // 待支付返回的倒计时-1表示已经结束，单位s
    countdown?: number
    // 优惠券抵扣金额
    couponDeduction: number
    // 订单创建时间
    createTime: string
    // 运费
    expressFee: number
    // 物流信息信息--最新的物流信息
    expressInfo?: ExpressInfo
    // 订单id
    id: string
    // 处方的药品列表信息
    medicines?: Medicine[]
    // 订单编号
    orderNo: string
    // 应付款（药品总金额）
    payment: string
    // 支付方式0微信支付，1支付宝
    paymentMethod: number
    // 支付时间
    payTime: string
    // 处方id信息
    prescriptionId?: string
    // 药品订单对应处方的聊天室id
    roomId: string
    // 药品订单状态10待支付11待发货12待收货13已完成14已取消
    status: number
    // 药品订单状态10待支付11待发货12待收货13已完成14已取消
    statusValue: string
    // 订单类型1问医生2极速问诊3开药问诊4、药品订单
    type?: number
  }
