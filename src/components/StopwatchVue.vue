<script setup lang="ts">
import { ref, watch } from 'vue';

const timerId = ref<null | number>(null);
const passedSeconds = ref(0);

const props = defineProps<{
  isStarted: boolean;
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

function beautifyStopwatch() {
  const minutes = Math.floor(passedSeconds.value / 60);
  const stringSeconds = `${passedSeconds.value % 60}`.padStart(
    2,
    '0',
  );

  return `${minutes}:${stringSeconds}`;
}

watch(
  () => props.isStarted,
  (value) => {
    if (value) {
      startStopwatch();
    } else {
      stopStopwatch();
    }
  },
);
</script>

<template>
  <div class="stopwatch">
    <p class="text-2xl">{{ beautifyStopwatch() }}</p>
    <p>passed</p>
  </div>
</template>
