<template>
  <div flex flex-col flex-items-center p="t-20 r-20 l-20">
    <div class="i-mdi-rabbit-variant-outline" text-60></div>
    <div
      v-for="item in navList"
      :class="['nav-item', item.id === activeNav.id && 'active']"
      @click="routeTo(item)"
    >
      {{ item.name }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const navList = ref<Array<object>>([]);
const minimized = ref<boolean>(true);
const activeNav = ref({
    id: 1,
    name:'首页',
    path: '/home'
})
const routeTo = (nav) => {
  console.log("nav", router);
  activeNav.value = nav
  router.push(nav.path);
};

onMounted(() => {
  ElectronAPI.getNavList().then((data) => {
    console.log("res", data);
    navList.value = data;
  });
});
</script>
<style lang="scss" scoped>
.nav-item {
    @apply flex box-border w-100% h-40  p-t-8 p-b-8 m-b-8 items-center justify-center b-b-2 b-color-#F9F7F7 cursor-pointer transition-all-150 
    hover:(b-b-1 b-dashed b-color-#DBE2EF font-bold text-20);
    &.active {
        @apply b-color-#DBE2EF font-bold text-24;
    }
}
</style>
