import request from '../utils/http'
import type { User } from '../types/user'
// 密码登录
interface passConfig {
    mobile: string
    password: string
}
export const loginByPassword = (data: passConfig) => {
    return request<User>('/login/password', 'POST', data)
}

interface sendConfig {
    mobile: string,
    type: 'login' | 'register' | 'changeMobile' | 'forgetPassword' | 'bindMobile'
}
export const sendMobileCode = (data: sendConfig) => {
    return request('/code', 'GET', data)
}

interface codeconfig {
    mobile: string,
    code: string
}
export const loginByMobile = (data: codeconfig) => {
    return request<User>('/login', 'POST', data)
}