<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  letter: string;
  currentLetterIndex: number;
  passedLetters: string[];
  wrongLetters: string[];
  index: number;
}>();

const TEXT_RED = 'text-rose-700';
const UNDERSCORE = '_';

const letterClassName = computed(() => {
  let className = '';

  if (props.wrongLetters[props.index] !== undefined) {
    className = 'text-rose-700';
  } else if (props.passedLetters[props.index] === props.letter) {
    className = 'text-zinc-400';
  } else {
    className = 'text-zinc-800';
  }

  if (props.index === props.currentLetterIndex) {
    className += ' cursor';
  }

  return className;
});

const textContent = computed(() => {
  const condition = letterClassName.value.includes(TEXT_RED) && props.letter === ' ';

  if (condition) {
    return UNDERSCORE;
  }

  return props.letter;
});
</script>

<template>
  <template v-if="letter == '\n'">
    <span class="text-zinc-400">&para;</span>
    <br />
  </template>
  <span v-else :class="[letterClassName, 'min-w-[25px] min-h-[25px] inline-block']">
    {{ textContent }}
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
  animation: blink 0.6s infinite alternate;
}

@keyframes blink {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
