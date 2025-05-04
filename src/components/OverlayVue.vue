<script setup lang="ts">
import { BsPlayFill } from '@kalimahapps/vue-icons';

defineEmits(['click']);
</script>

<template>
  <div class="overlay fixed h-screen w-full inset-0 backdrop-blur-sm z-30 flex items-center justify-center">
    <button @click="$emit('click')"
      class="flex items-center gap-[5px] px-4 py-2 text-2xl rounded-md transition-colors bg-primary hover:bg-primary-dark">
      <span class="text-white">Start</span>
      <BsPlayFill class="text-3xl text-white" />
    </button>
  </div>
</template>
