<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
const router = useRouter()
const route = useRoute()
const prop = defineProps<{
    text?: string,
    title?: string,
    back?: () => void
}>()
const emit = defineEmits(['right'])
const onClickRight = () => {
    emit('right')
}
const onClickLeft = () => {
    // if (prop.back) {
    //     prop.back()
    // } else {
    //     router.back()
    // }
    if (prop.back) {
        return prop.back()
    }
    if (history.state?.back) {
        router.back()
    } else {
        router.push('/')
    }
}
</script>
<template>
    <div class="">
        <van-nav-bar fixed :title="title" :right-text="text" left-arrow @click-right="onClickRight"
            @click-left="onClickLeft" />
    </div>
</template>
<style lang="scss" scoped>
::v-deep() {
    .van-nav-bar {
        &__arrow {
            font-size: 18px;
            color: var(--cp-text1);
        }

        &__text {
            font-size: 15px;
            color: var(--cp-primary);
        }
    }
}
</style>