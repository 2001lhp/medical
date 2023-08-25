import { ref, } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '../types/user'

export const useCounterStore = defineStore(
  'counter',
  () => {
    // 保存用户信息
    const user = ref<User>()
    // 设置用户信息，登录后使用
    const setUser = (u: User) => {
      user.value = u
    }
    // 删除用户信息, 退出登录/token过期
    const delUser = () => {
      user.value = undefined
    }

    return { user, setUser, delUser }
  },
  {
    persist: {
      key: 'pinia',
      storage: localStorage,
      paths: ['user']
    }
  }
)
