<script setup lang='ts'>
import { ref } from 'vue'
import { mobileRule, passwordRule } from '@/utils/rules';
import { showToast } from 'vant';
import { loginByPassword } from '../../services/user'
import { useCounterStore } from '../../stores/counter.ts'
const store = useCounterStore()
const mobile = ref('13230000001')
const password = ref('abc12345')
const checked = ref(false)
const eyeflag = ref(false)
const onSubmit = () => {
    if (!checked.value) {
        showToast('请勾选我已同意')
    } else {
        loginByPassword({ mobile: mobile.value, password: password.value }).then(res => {
            console.log(res)
            store.user = {
                id: res.data.id,
                token: res.data.refreshToken,
                account: res.data.account,
                mobile: res.data.mobile,
                avatar: res.data.avatar
            }
            // console.log(store.user)
        })
    }
}
</script>
<template>
    <div class='login'>
        <nav-bar text="注册" @right="$router.push('/enroll')"></nav-bar>
        <div class="login-head">
            <h3>密码登录</h3>
            <a href="">
                <span>短信验证码登录</span>
                <van-icon name="arrow" />
            </a>
        </div>
        <van-form @submit="onSubmit">
            <van-field v-model="mobile" placeholder="请输入手机号" :rules="mobileRule" />
            <van-field v-model="password" :type="eyeflag ? 'text' : 'password'" placeholder="请输入密码" :rules="passwordRule">
                <template #button>
                    <svg-icon :name="`login-eye-${eyeflag ? 'on' : 'off'}`" @click="eyeflag = !eyeflag"></svg-icon>
                </template>
            </van-field>
            <div class="cell">
                <van-checkbox v-model="checked">
                    <span>我已同意</span>
                    <a href="">用户协议</a>
                    <span>及</span>
                    <a href="">隐私条款</a>
                </van-checkbox>
            </div>
            <div class="cell">
                <van-button round block type="primary" native-type="submit">
                    提交
                </van-button>
            </div>
            <div class="cell">
                <a href="">忘记密码？</a>
            </div>
        </van-form>
        <div class="login-other">
            <van-divider>第三方登录</van-divider>
            <div class="icon">
                <img src="@/assets/qq.svg" alt="">
            </div>
        </div>
    </div>
</template>
<style lang='scss' scoped>
.login {
    width: 100%;
    height: 100%;
    padding-top: 46px;

    &-head {
        display: flex;
        justify-content: space-between;
        align-items: self-end;
        padding: 30px 30px 50px;

        h3 {
            font-size: 24px;
            font-weight: normal;
        }

        a {
            color: black;
            font-size: 15px;
        }
    }

    &-other {
        margin-top: 60px;
        padding: 0 30px;

        .icon {
            display: flex;
            justify-content: center;

            img {
                width: 36px;
                height: 36px;
                padding: 4px;
            }
        }
    }
}

.van-form {
    padding: 0 15px;

    .cell {
        height: 52px;
        line-height: 24px;
        padding: 14px 15px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
    }

    .van-checkbox {
        a {
            color: var(--cp-primary);
            padding: 0 5px;
        }
    }
}
</style>