<script setup lang="ts">
const props = defineProps<{
  accuracy: number;
  progress: number;
}>();
</script>

<template>
  <div
    class="absolute bottom-3 left-1/2 -translate-x-1/2 p-6 bg-white w-[500px] mx-auto rounded-2xl flex items-center gap-[30px] text-center"
  >
    <div>
      <p>{{ accuracy }}%</p>
      <span>accuracy</span>
    </div>
    <div class="progress">
      <p>{{ progress.toFixed(2) }}%</p>
      <span>progress</span>
    </div>
  </div>
</template>
