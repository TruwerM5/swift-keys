<script setup lang="ts">
import { ref, computed, provide } from 'vue';
import LetterVue from '@/components/LetterVue.vue';
import getCorrectLength from '@/utils/getCorrectLength';
import TheProgressBar from './TheProgressBar.vue';
// import texts from '@/assets/texts.json';

const LETTERS = /^[\x20-\x7E]{1}$/;
const EXTRA_BUTTONS = /Shift|Alt|Tab|Control|F(1[0-2]|[1-9])/;
const words = [
  'How about "SwiftKeys" for your touch typing project?',
  'notebook',
  'cancel',
  'explosive',
  'wonder',
  'laptop',
  'writing',
];

const currentWord = computed(() => words[currentWordIndex.value]);
const currentWordIndex = ref(0);
const passedLetters = ref<string[]>([]);
const wrongLetters = ref<string[]>([]);
const currentLetterIndex = ref(0);

const accuracy = computed(() => {
  const passedLettersLength = getCorrectLength(passedLetters.value);
  const wrongLettersLength = getCorrectLength(wrongLetters.value);
  const result = Math.round(
    (passedLettersLength / (passedLettersLength + wrongLettersLength)) * 100,
  );

  return isNaN(result) ? 100 : result;
});

window.addEventListener('keydown', (e) => {
  const key = e.key;
  if (key == 'Backspace') {
    backSpace();
    return;
  }
  const currentLetter = currentWord.value.charAt(currentLetterIndex.value);
  if ((LETTERS.test(key) || (key == 'Enter' && currentLetter == '\n')) && key == currentLetter) {
    passedLetters.value[currentLetterIndex.value] = currentLetter;
  }
  if (!EXTRA_BUTTONS.test(key)) {
    if (key != currentLetter) {
      wrongLetters.value[currentLetterIndex.value] = currentLetter;
    }
    currentLetterIndex.value++;
  }

  if (
    currentWord.value == passedLetters.value.join('') ||
    currentLetterIndex.value == currentWord.value.length
  ) {
    reset();
    if (currentWordIndex.value < words.length - 1) currentWordIndex.value++;
    else currentWordIndex.value = 0;
    return;
  }
});

function reset() {
  passedLetters.value = [];
  wrongLetters.value = [];
  currentLetterIndex.value = 0;
}

function backSpace() {
  if (currentLetterIndex.value > 0) {
    currentLetterIndex.value--;
  }
  const passedLength = passedLetters.value.length;
  const wrongLength = wrongLetters.value.length;
  if (passedLength - 1 == currentLetterIndex.value) {
    passedLetters.value.pop();
  }
  if (wrongLength - 1 == currentLetterIndex.value) {
    wrongLetters.value.pop();
  }
}

provide('accuracy', accuracy);
</script>
<template>
  <div class="flex flex-col items-center justify-center">
    <div class="max-w-[1100px] px-[40px]">
      <div class="flex flex-wrap items-end text-[46px]">
        <template v-for="(letter, i) in currentWord" :key="i">
          <LetterVue
            :index="i"
            :currentLetterIndex="currentLetterIndex"
            :letter="letter"
            :passedLetters="passedLetters"
            :wrongLetters="wrongLetters"
          />
        </template>
      </div>
    </div>
  </div>
  <TheProgressBar :accuracy="accuracy" />
</template>
