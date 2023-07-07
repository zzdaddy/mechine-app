<template>
    <div>首页</div>
    <div>{{ cwdPath }}</div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
const cwdPath = ref<string>('')
onMounted(() => {
  ElectronAPI.demo().then((data) => {
    console.log("res", data);
    cwdPath.value = data;
  });
});
</script>
<style lang="less" scoped>
</style>