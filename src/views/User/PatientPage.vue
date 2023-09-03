<script setup lang='ts'>
import { getPatientList, addPatient, editPatient, delPatient } from '@/services/patient';
import Validator from 'id-validator'
import { ref, reactive, computed } from 'vue'
import type { Patient } from '@/types/user';
import { showToast, showConfirmDialog } from 'vant';
import { useConsult } from '@/stores/consult';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter()
const route = useRoute()
const store = useConsult()
const list = ref<Patient[]>()
const showRight = ref(false)
const getList = async () => {
    const res = await getPatientList()
    // console.log(res);
    list.value = res.data
}
getList()
const initPatient: Patient = {
    name: '',
    idCard: '',
    defaultFlag: 0,
    gender: 1
}
const patient = ref<Patient>({ ...initPatient })
const defaultFlag = computed({
    get() {
        return patient.value.defaultFlag === 1 ? true : false
    },
    set(value) {
        patient.value.defaultFlag = value ? 1 : 0
    }
})
const options = [
    { label: '男', value: 1 },
    { label: '女', value: 0 }
]
const showpopup = (item?: Patient) => {
    if (item) {
        const { id, gender, name, idCard, defaultFlag } = item
        patient.value = { id, gender, name, idCard, defaultFlag }
    } else {
        patient.value = { ...initPatient }
    }
    showRight.value = true
}
const submit = async () => {
    if (!patient.value.name) return showToast('请输入真实姓名')
    if (!patient.value.idCard) return showToast('请输入身份证号')
    const validate = new Validator()
    if (!validate.isValid(patient.value.idCard)) return showToast('身份证格式错误')
    const { sex } = validate.getInfo(patient.value.idCard)
    if (patient.value.gender !== sex) return showToast('性别和身份证不符')
    patient.value.id ? await editPatient(patient.value) : await addPatient(patient.value)
    getList()
    showRight.value = false
    showToast('添加成功')
}
const del = async () => {
    await showConfirmDialog({
        title: '温馨提示',
        message: `确定删除${patient.value.name}患者信息吗？`,
    })
    await delPatient(patient.value.id as string)
    getList()
    showRight.value = false
    showToast('删除成功')
}
const id = ref()
const next = async () => {
    if (!id.value) return showToast('请选就诊择患者')
    store.setPatient(id.value)
    router.push('/pay')
}
</script>
<template>
    <div class='patient'>
        <nav-bar :title="$route.query.isChange ? '选择患者' : '家庭档案'" text="" />
        <div class="patient-header" v-if="$route.query.isChange">
            <h3>请选择患者信息</h3>
            <p>以便医⽣给出更准确的治疗，信息仅医⽣可⻅</p>
        </div>
        <div class="patient-list">
            <div class="patient-item" v-for="item in list" :key="item.id" @click="id = item.id"
                :class="{ selected: id === item.id }">
                <div class="info">
                    <span class="name">{{ item.name }}</span>
                    <span class="id">{{ item.idCard.replace(/^(.{3})(?:\d+)(.{4})$/, '\$1***********\$2') }}</span>
                    <span>{{ item.genderValue }}</span>
                    <span>{{ item.age }}岁</span>
                </div>
                <div class="icon"><svg-icon name="user-edit" @click="showpopup(item)" /></div>
                <van-tag type="primary" v-show='item.defaultFlag == 1'>默认</van-tag>
            </div>
            <div class="patient-add" @click="showpopup()">
                <svg-icon name="user-add"></svg-icon>
                <p>添加患者</p>
            </div>
            <div class="tip">最多可添加 6 ⼈</div>
        </div>
        <van-action-bar>
            <van-action-bar-button type="primary" style="margin: 15px;" text="下⼀步"
                @click="next" />
        </van-action-bar>
        <van-popup v-model:show="showRight" position="right" :style="{ width: '100%', height: '100%' }">
            <nav-bar :back="() => showRight = false" :title="patient.id ? '编辑患者' : '添加患者'" text="保存"
                @right="submit"></nav-bar>
            <van-form>
                <van-field v-model="patient.name" label="真实姓名" placeholder="请输入真实姓名" />
                <van-field v-model="patient.idCard" label="身份证号" placeholder="请输入身份证号" />
                <van-field name="radio" label="性别">
                    <template #input>
                        <radio-btn :options="options" v-model="patient.gender"></radio-btn>
                    </template>
                </van-field>
                <van-field label="默认就诊⼈">
                    <template #input>
                        <van-checkbox round v-model="defaultFlag" />
                    </template>
                </van-field>
            </van-form>
            <van-action-bar v-show="patient.id">
                <van-action-bar-button @click="del">删除</van-action-bar-button>
            </van-action-bar>
        </van-popup>
    </div>
</template>
<style lang='scss' scoped>
.patient {
    padding: 46px 0 80px;

    &-header {
        padding: 15px;

        h3 {
            font-weight: normal;
            margin-bottom: 5px;
        }

        p {
            color: var(--cp-text3);
        }
    }

    &-list {
        padding: 15px;
    }

    &-item {
        display: flex;
        align-items: center;
        padding: 15px;
        background-color: var(--cp-bg);
        border-radius: 8px;
        margin-bottom: 15px;
        position: relative;
        border: 1px solid var(--cp-bg);
        transition: all 0.3s;
        overflow: hidden;

        .info {
            display: flex;
            flex-wrap: wrap;
            flex: 1;

            span {
                color: var(--cp-tip);
                margin-right: 20px;
                line-height: 30px;

                &.name {
                    font-size: 16px;
                    color: var(--cp-text1);
                    width: 80px;
                    margin-right: 0;
                }

                &.id {
                    color: var(--cp-text2);
                    width: 180px;
                }
            }

        }

        .icon {
            color: var(--cp-tag);
            width: 20px;
            text-align: center;
        }

        .van-tag {
            position: absolute;
            right: 60px;
            top: 21px;
            width: 30px;
            height: 16px;
            font-size: 10px;
            background-color: var(--cp-primary);
            display: flex;
            justify-content: center;
            align-items: center;
        }

        &.selected {
            border-color: var(--cp-primary);
            background-color: var(--cp-plain);

            .icon {
                color: var(--cp-primary);
            }
        }
    }

    .tip {
        color: var(--cp-tag);
        padding: 12px 0;
    }

    &-add {
        background-color: var(--cp-bg);
        color: var(--cp-primary);
        text-align: center;
        padding: 15px 0;
        border-radius: 8px;
    }

    ::v-deep {
        .van-popup {
            padding: 46px 0 80px;

            .van-action-bar {
                padding: 0 10px;
                margin-bottom: 10px;

                .van-button {
                    color: var(--cp-price);
                    background-color: var(--cp-bg);
                }
            }
        }
    }
}
</style>