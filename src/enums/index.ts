export enum ConsultType {
    Doctor = 1,
    Fast,
    Medication
}

export enum IllnessTime {
    Week = 1,
    Month,
    HalfYear,
    More
}

export enum OrderType {
    // 问诊订单
    /** 待支付 */
    ConsultPay = 1,
    /** 待接诊 */
    ConsultWait = 2,
    /** 问诊中 */
    ConsultChat = 3,
    /** 问诊完成 */
    ConsultComplete = 4,
    /** 取消问诊 */
    ConsultCancel = 5,
    // 药品订单
    /** 待支付 */
    MedicinePay = 10,
    /** 待发货 */
    MedicineSend = 11,
    /** 待收货 */
    MedicineTake = 12,
    /** 已完成 */
    MedicineComplete = 13,
    /** 取消订单 */
    MedicineCancel = 14
}


export enum ConsultFlag {
    isFlag = 1,
    noFlag = 0
}