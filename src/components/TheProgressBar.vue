<script setup lang="ts">
import StopwatchVue from './StopwatchVue.vue';
import { FaPause } from '@kalimahapps/vue-icons';
import type { GameState } from '@/types';
import { FaStop } from '@kalimahapps/vue-icons';

const props = defineProps<{
  accuracy: number;
  progress: number;
  gameState: GameState;
}>();

defineEmits(['pause', 'stop']);
</script>

<template>
  <div
    class="absolute bottom-3 left-1/2 -translate-x-1/2 p-6 bg-white w-[500px] mx-auto rounded-2xl flex items-center justify-between text-center"
  >
    <div>
      <p class="text-2xl">{{ accuracy }}%</p>
      <span>accuracy</span>
    </div>
    <div class="progress">
      <p class="text-2xl">{{ progress.toFixed(2) }}%</p>
      <span>progress</span>
    </div>
    <StopwatchVue :game-state="gameState" />
    <button @click="$emit('pause')">
      <FaPause class="text-primary text-4xl transition-colors hover:text-primary-dark" />
    </button>
    <button @click="$emit('stop')">
      <FaStop class="text-primary text-4xl transition-colors hover:text-primary-dark" />
    </button>
  </div>
</template>
