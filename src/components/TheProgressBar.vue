<script setup lang="ts">
import { computed } from 'vue';
import TheAccuracy from '@/components/TheAccuracy.vue';

const props = defineProps<{
  accuracy: number;
}>();



</script>

<template>
  <div
    class="absolute bottom-3 left-1/2 -translate-x-1/2 p-6 bg-white w-[500px] mx-auto rounded-2xl"
  >
    <TheAccuracy />
  </div>
</template>

<style>


</style>