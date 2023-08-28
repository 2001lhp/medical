<script setup lang='ts'>
import { ref } from 'vue'
import { mobileRule, passwordRule, codeRule } from '@/utils/rules';
import { showToast } from 'vant';
import { loginByPassword, sendMobileCode, loginByMobile } from '../../services/user'
import { useCounterStore } from '../../stores/counter'
import { useRouter, useRoute } from 'vue-router';
const router = useRouter()
const route = useRoute()
const store = useCounterStore()
const mobile = ref('13230000001')
const password = ref('abc12345')
const code = ref()
const checked = ref(false)
const eyeflag = ref(false)
const pass = ref(false)
const onSubmit = () => {
    if (!checked.value) {
        showToast('请勾选我已同意')
    } else {
        if (pass.value) {
            loginByMobile({ mobile: mobile.value, code: code.value }).then(res => {
                console.log(res)
                store.user = res.data
                router.push('/home')
            })
        } else {
            loginByPassword({ mobile: mobile.value, password: password.value }).then(res => {
                // console.log(res)
                store.user = res.data
                router.push('/home')
            })
        }
    }
}
const time = ref(0)
const codefn = async () => {
    if (time.value > 0) return
    // sendMobileCode({ mobile: mobile.value, type: 'login' }).then(res => {
    //     console.log(res)
    //     code.value = res.data.code
    // })
    let coderes: any = await sendMobileCode({ mobile: mobile.value, type: 'login' })
    console.log(coderes.data);
    code.value = coderes.data.code
    showToast('发送成功')
    time.value = 60
    let timer = setInterval(() => {
        time.value--
        if (time.value == 0) {
            clearInterval(timer)
        }
    }, 1000)
}
</script>
<template>
    <div class='login'>
        <nav-bar text="注册" title="" @right="$router.push('/enroll')"></nav-bar>
        <div class="login-head">
            <h3>{{ pass ? '短信验证码登录' : '密码登录' }}</h3>
            <a href="javascript:;" @click="pass = !pass">
                <span>{{ pass ? '密码登录' : '短信验证码登录' }}</span>
                <van-icon name="arrow" />
            </a>
        </div>
        <van-form @submit="onSubmit">
            <van-field v-model="mobile" placeholder="请输入手机号" :rules="mobileRule" />
            <van-field v-model="password" :type="eyeflag ? 'text' : 'password'" placeholder="请输入密码" :rules="passwordRule"
                v-if="!pass">
                <template #button>
                    <svg-icon :name="`login-eye-${eyeflag ? 'on' : 'off'}`" @click="eyeflag = !eyeflag"></svg-icon>
                </template>
            </van-field>
            <van-field v-model="code" placeholder="请输入验证码" :rules="codeRule" v-else>
                <template #button>
                    <!-- <svg-icon :name="`login-eye-${eyeflag ? 'on' : 'off'}`" @click="eyeflag = !eyeflag"></svg-icon> -->
                    <span @click="codefn">{{ time > 0 ? time + 's后再次发送' : '发送验证码' }}</span>
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