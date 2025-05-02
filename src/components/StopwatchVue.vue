<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import type { GameState } from '@/types';

const timerId = ref<null | number>(null);
const passedSeconds = ref(0);

const props = defineProps<{
  gameState: GameState;
}>();

function startStopwatch() {
  timerId.value = setInterval(() => {
    passedSeconds.value += 1;
  }, 1000);
}

function stopStopwatch() {
  if (timerId.value) {
    clearInterval(timerId.value);
  }
}

const beautifyStopwatch = computed(() => {
  const minutes = Math.floor(passedSeconds.value / 60);
  const stringSeconds = `${passedSeconds.value % 60}`.padStart(2, '0');

  return `${minutes}:${stringSeconds}`;
});

watch(
  () => props.gameState,
  (value) => {
    if (value === 'started') {
      startStopwatch();
    } else if (value === 'paused') {
      stopStopwatch();
    }
  },
);
</script>

<template>
  <div class="stopwatch">
    <p class="text-2xl">
      {{ beautifyStopwatch }}
    </p>
    <p>passed</p>
  </div>
</template>
