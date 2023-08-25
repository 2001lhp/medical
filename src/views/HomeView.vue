<template>
  <div class="home">
    <div class="box">
      <van-button type="primary" @click="store.count++">+</van-button>
      {{ store.count }} * {{ store.doubleCount }}
      <van-button @click="store.count--">-</van-button><br />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useCounterStore } from '@/stores/counter'
const store = useCounterStore()

</script>
<style lang="scss" scoped>
.box {
  width: 200px;
  height: 200px;
  background-color: chartreuse;
}
</style>

