<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  accuracy: number;
}>();

const fill = computed(() => {
  const perimeter = props.accuracy * Math.PI * 50;
  const dashLength = (perimeter * props.accuracy) / 100;
  return dashLength;
});
</script>

<template>
  <div
    class="absolute bottom-3 left-1/2 -translate-x-1/2 p-6 bg-white w-[500px] mx-auto rounded-2xl"
  >
    <svg
      id="myCircle"
      width="110"
      height="110"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        id="circle"
        cx="55"
        cy="55"
        r="50"
        fill="none"
        stroke="blue"
        stroke-width="3"
        :stroke-dasharray="`${fill}, ${2 * Math.PI * 50}`"
        stroke-dashoffset="0"
      />
    </svg>

    <p>{{ accuracy }}%</p>
    <span>accuracy</span>
  </div>
</template>
