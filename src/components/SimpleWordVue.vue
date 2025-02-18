<script setup lang="ts">
import { ref, computed } from 'vue';
const words = ['How about "SwiftKeys" for your\ntouch typing project? It conveys\nspeed and precision, which are key elements of touch typing. Let me\nknow if you', 'notebook', 'cancel', 'explosive', 'wonder', 'laptop', 'writing'];
const currentWord = computed(() => words[currentWordIndex.value]);
const currentWordIndex = ref(0);
const passedLetters = ref('');
const currentLetterIndex = ref(0);

window.addEventListener('keydown', (e) => {
  const key = e.key;
  if (key == 'Backspace') {
    backSpace();
    return;
  }
  const currentLetter = currentWord.value.charAt(currentLetterIndex.value);
  if ((key == 'Enter' && currentLetter == '\n') || key == currentLetter) {
    passedLetters.value += currentLetter;
  } else {
    // reset();
    return;
  }
  currentLetterIndex.value++;

  if (currentWord.value == passedLetters.value) {
    reset();
    if (currentWordIndex.value < words.length - 1)
      currentWordIndex.value++;
    else
      currentWordIndex.value = 0;
    return;
  }

});


function reset() {
  passedLetters.value = '';
  currentLetterIndex.value = 0;
}

function backSpace() {
  if (currentLetterIndex.value > 0) {
    currentLetterIndex.value--;
  }
  const length = passedLetters.value.length;
  passedLetters.value = passedLetters.value.slice(0, length - 1);
}

</script>
<template>
  <div class="flex justify-center">
    <div class="text-[46px] px-[40px] max-w-[1100px]">
      <template v-for="letter, i in currentWord" :key="i">
        <template v-if="letter == '\n'">
          <span class="text-zinc-400">&para;</span>
          <br>
        </template>
        <span v-else :class="[{ 'cursor': i == currentLetterIndex },
        passedLetters[i] == letter ? 'text-green-700' : 'text-zinc-500', 'min-w-[25px] inline-block']">
          {{ letter }}
        </span>
      </template>
    </div>

  </div>
</template>
<style scoped>
@import 'tailwindcss';

.cursor {
  position: relative;

  /* min-width: 25px;
  min-height: 40px; */
}

.cursor::after {
  content: '';
  display: block;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  min-width: 25px;
  height: 3px;
  border-radius: 2px;
  background-color: var(--color-primary);
}
</style>
