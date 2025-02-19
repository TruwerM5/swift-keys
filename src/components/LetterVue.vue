<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{
  letter: string;
  currentLetterIndex: number;
  passedLetters: string[];
  wrongLetters: string[];
  index: number;
}>();

const className = computed(() => {

  if (props.wrongLetters[props.index] != undefined) {
    return 'text-rose-700';
  }
  if (props.passedLetters[props.index] == props.letter) {
    return 'text-zinc-400';
  }
  return 'text-zinc-800';
})


</script>

<template>
  <template v-if="letter == '\n'">
    <span class="text-zinc-400">&para;</span>
    <br>
  </template>
  <span v-else :class="[{ 'cursor': index == currentLetterIndex }, className, 'min-w-[25px] inline-block']">
    {{ letter }}
  </span>
</template>
<style scoped>
.cursor {
  position: relative;
}

.cursor::after {
  content: '';
  display: block;
  position: absolute;
  left: 0;
  bottom: 10px;
  width: 100%;
  min-width: 25px;
  height: 3px;
  border-radius: 2px;
  background-color: var(--color-primary);
}
</style>
