<script setup lang='ts'>
defineProps<{
    modelValue?: string | number
    options: {
        label: string
        value: number | string
    }[]
}>()
const emit = defineEmits<{
    (e: 'update:modelValue', value: string | number): void
}>()
const change = (val: string | number) => {
    emit('update:modelValue', val)
}
</script>
<template>
    <div class='radio'>
        <a href="javascript:;" class="item" v-for="item in options" :key="item.value"
            :class="item.value == modelValue ? 'active' : ''" @click="change(item.value)">{{ item.label }}</a>
    </div>
</template>
<style lang='scss' scoped>
.radio {
    display: flex;
    flex-wrap: wrap;

    .item {
        height: 32px;
        min-width: 60px;
        line-height: 30px;
        padding: 0 14px;
        text-align: center;
        background-color: var(--cp-bg);
        border: 1px solid var(--cp-bg);
        margin-right: 10px;
        box-sizing: border-box;
        color: var(--cp-text2);
        margin-bottom: 10px;
        border-radius: 4px;
        transition: all 0.3s;
    }

    .active {
        border-color: var(--cp-primary);
        background-color: var(--cp-plain);
    }
}
</style>