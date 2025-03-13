<script setup lang="ts">
import { RouterView } from 'vue-router'
import LogoVue from './components/LogoVue.vue'
import SidebarVue from './components/SidebarVue.vue'
</script>

<template>
  <header class="px-[80px] py-[15px] flex items-center justify-between">
    <LogoVue />
    <SidebarVue />
  </header>

  <RouterView />
</template>

<style scoped></style>
