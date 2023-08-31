<script setup lang='ts'>
import { uploadImage } from '@/services/home';
import type { ConsultIllness } from '@/types/consult'
import type { UploaderAfterRead, UploaderFileListItem } from 'vant/lib/uploader/types'
import { IllnessTime } from '@/enums';
import { ref, computed } from 'vue'
const timeOptions = [
    { label: '⼀周内', value: IllnessTime.Week },
    { label: '⼀⽉内', value: IllnessTime.Month },
    { label: '半年内', value: IllnessTime.HalfYear },
    { label: '⼤于半年', value: IllnessTime.More }
]

const flagOptions = [
    { label: '就诊过', value: 0 },
    { label: '没就诊过', value: 1 }
]
const form = ref<ConsultIllness>({
    illnessDesc: '',
    illnessTime: undefined,
    consultFlag: undefined,
    pictures: []
})
const fileList = ref([])

const onAfterRead: UploaderAfterRead = (item) => {
    if (Array.isArray(item)) return
    if (!item.file) return
    // 开始上传
    item.status = 'uploading'
    item.message = '上传中...'
    uploadImage(item.file).then((res) => {
        item.status = 'done'
        item.message = undefined
        item.url = res.data.url
        form.value.pictures?.push(res.data)
    }).catch(() => {
        item.status = 'failed'
        item.message = '上传失败'
    })
}

const onDeleteImg = (item: UploaderFileListItem) => {
    form.value.pictures = form.value.pictures?.filter((pic) => pic.url !== item.url)
}
const disabled = computed(() =>
    !form.value.illnessDesc ||
    form.value.illnessTime === undefined ||
    form.value.consultFlag === undefined
)
</script>
<template>
    <div class='illness'>
        <nav-bar title="图文问诊" />
        <div class="tip van-hairline--bottom">
            <img class="img" src="@/assets/avatar-doctor.svg" />
            <div class="info">
                <p class="tit">在线医⽣</p>
                <p class="tip">请描述你的疾病或症状、是否⽤药、就诊经历，需要我听过什么样的帮助</p>
                <p class="safe"><svg-icon name="consult-safe" /><span>内容仅医⽣可⻅</span></p>
            </div>
        </div>
        <div class="form">
            <van-field type="textarea" rows="3" placeholder="请详细描述您的病情，病情描述不能为空" v-model="form.illnessDesc"></van-field>
            <div class="item">
                <p>本次患病多久了？</p>
                <radio-btn :options="timeOptions" v-model="form.illnessTime" />
            </div>
            <div class="item">
                <p>此次病情是否去医院就诊过？</p>
                <radio-btn :options="flagOptions" v-model="form.consultFlag" />
            </div>
        </div>
        <div class="img"><van-uploader :after-read="onAfterRead" @delete="onDeleteImg" v-model="fileList" max-count="9"
                :max-size="5 * 1024 * 1024" upload-icon="photo-o" upload-text="上传图⽚"></van-uploader>
            <p class="tip">上传内容仅医⽣可⻅,最多9张图,最⼤5MB</p>
        </div>
        <van-button :class="{ disabled }" type="primary" block round>下一步</van-button>
    </div>
</template>
<style lang='scss' scoped>
.illness {
    padding-top: 46px;

    .tip {
        display: flex;
        padding: 15px;

        .img {
            width: 52px;
            height: 52px;
            border-radius: 4px;
            overflow: hidden;
            margin-top: 10px;
        }

        .info {
            flex: 1;
            padding-left: 12px;

            .tit {
                font-size: 16px;
                margin-bottom: 5px;
            }

            .tip {
                padding: 12px;
                background: var(--cp-bg);
                color: var(--cp-text3);
                font-size: 13px;
                margin-bottom: 10px;
            }

            .safe {
                font-size: 10px;
                color: var(--cp-text3);
                display: flex;
                align-items: center;

                .cp-icon {
                    font-size: 12px;
                    margin-right: 2px;
                }
            }
        }
    }

    .form {
        padding: 0 15px;

        .van-field {
            padding: 0;

            &::after {
                border-bottom: none;
            }
        }

        .item {
            >p {
                color: var(--cp-text3);
                padding: 15px 0;
            }
        }
    }

    .img {
        padding-top: 16px;
        margin-bottom: 40px;
        display: flex;
        align-items: center;
        padding-left: 15px;

        .tip {
            font-size: 12px;
            color: var(--cp-tip);
        }

        ::v-deep() {
            .van-uploader {
                &__preview {
                    &-delete {
                        left: -6px;
                        top: -6px;
                        border-radius: 50%;
                        background-color: var(--cp-primary);
                        width: 20px;
                        height: 20px;

                        &-icon {
                            transform: scale(0.9) translate(-22%, 22%);
                        }
                    }

                    &-image {
                        border-radius: 8px;
                        overflow: hidden;
                    }
                }

                &__upload {
                    border-radius: 8px;
                }

                &__upload-icon {
                    color: var(--cp-text3);
                }
            }
        }
    }

    .van-button {
        font-size: 16px;
        margin-bottom: 30px;

        &.disabled {
            opacity: 1;
            background: #fafafa;
            color: #d9dbde;
            border: #fafafa;
        }
    }
}
</style>