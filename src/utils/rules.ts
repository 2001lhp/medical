const mobileRule = [
    { require: true, message: '请输入手机号' },
    { pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/, message: '手机格式错误' }
]

const passwordRule = [
    { reqoire: true, message: '请输入密码' },
    { pattern: /^\w{8,24}$/, message: '密码需要8-24位' }
]

const codeRule = [
    { reqoire: true, message: '请输入验证码' },
    { pattern: /^\w{6}$/, message: '验证码为6位' }
]


export { mobileRule, passwordRule,codeRule }