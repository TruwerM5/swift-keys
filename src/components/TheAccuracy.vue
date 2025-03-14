<script setup lang="ts">
import { computed, inject, type Ref } from 'vue';

const accuracy = inject<Ref>('accuracy');
const colorRed = 'oklch(0.505 0.213 27.518)';
const colorGray = 'oklch(0.269 0 0)';
const colorPrimary = '#6366f1';
const RADIUS = 40;

const offset = computed(() => {
  if(accuracy?.value === undefined) {
   
    return 0;
  }
  const perimeter = 2 * Math.PI * RADIUS;
  return perimeter * (1 - accuracy.value / 100);
});

const textColor = computed(() => {
    if (accuracy?.value < 90) {
        return colorRed;
    }
    return colorGray;
});

const borderColor = computed(() => {
    if(textColor.value === colorRed) {
        return colorRed;
    }
    return colorPrimary;
})

</script>
<template>
    <div class="w-fit text-center">
        <svg id="myCircle" width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" :r="RADIUS" fill="none" stroke="#ddd" stroke-width="3"/>
        <circle
            id="circle"
            cx="50"
            cy="50"
            :r="RADIUS"
            fill="none"
            :stroke="borderColor"
            stroke-width="3"
            :stroke-dasharray="2 * Math.PI * RADIUS"
            :stroke-dashoffset="offset"
            class="progress-circle"
      />
      <text 
        x="50" 
        y="55" 
        :fill="textColor"
        font-weight="bolder"
        text-anchor="middle" 
      >
        {{ accuracy }}%
      </text>
    </svg>
    <span>accuracy</span>
    </div>

</template>
<style>
.progress-circle {
  transition: stroke-dashoffset 1s ease;
  transform-origin: center center;
  transform: rotate(-90deg);
}
</style>