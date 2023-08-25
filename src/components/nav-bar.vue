<script setup lang="ts">
defineProps<{
    text: string
}>()
const emit = defineEmits(['right'])
const onClickRight = () => {
    emit('right')
}
</script>
<template>
    <div class="">
        <van-nav-bar fixed :right-text="text" left-arrow @click-right="onClickRight" />
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