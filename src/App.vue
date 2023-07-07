<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import Nav from "./components/Nav.vue";
import Header from "./components/Header.vue";
// console.log("[App.vue]", `Hello world from Electron ${process.versions.electron}!`)
</script>

<template>
  <div flex="~ col" w="100%" h="100%" bg="#F9F7F7">
    <!-- <Header></Header> -->
    <div flex="~ 1">
      <Nav></Nav>
      <div flex flex-1>
          <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo.electron:hover {
  filter: drop-shadow(0 0 2em #9feaf9);
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
