import request from '../utils/http'
// 密码登录
interface config {
    mobile: string
    password: string
}
export const loginByPassword = (data: config) => {
    return request('/login/password', 'POST', data)
}