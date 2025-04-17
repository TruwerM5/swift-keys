<script setup lang="ts">
defineEmits(['click']);
</script>

<template>
  <div
    class="overlay fixed h-screen w-full inset-0 backdrop-blur-sm z-30 flex items-center justify-center"
  >
    <button
      @click="$emit('click')"
      class="px-4 py-2 text-2xl rounded-md transition-colors text-white bg-primary hover:bg-primary-dark"
    >
      Start
    </button>
  </div>
</template>
