<script setup lang="ts">
import { ref, computed } from 'vue';
import LetterVue from '@/components/LetterVue.vue';
import getCorrectLength from '@/utils/getCorrectLength';

const LETTERS = /^[\x20-\x7E]{1}$/;
const EXTRA_BUTTONS = /Shift|Alt|Tab|Control|F(1[0-2]|[1-9])/;
const words = ['How about "SwiftKeys" for your touch typing project?',
  'notebook',
  'cancel',
  'explosive',
  'wonder',
  'laptop',
  'writing'].map(w => w + '\n');

const currentWord = computed(() => words[currentWordIndex.value]);
const currentWordIndex = ref(0);
const passedLetters = ref<string[]>([]);
const wrongLetters = ref<string[]>([]);
const currentLetterIndex = ref(0);

const accuracy = computed(() => {
  const passedLettersLength = getCorrectLength(passedLetters.value);
  const wrongLettersLength = getCorrectLength(wrongLetters.value);
  const result = Math.round(
    passedLettersLength / (passedLettersLength + wrongLettersLength) * 100
  );
  return result || 100;
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


  if (currentWord.value == passedLetters.value.join('') || currentLetterIndex.value == currentWord.value.length) {
    reset();
    if (currentWordIndex.value < words.length - 1)
      currentWordIndex.value++;
    else
      currentWordIndex.value = 0;
    return;
  }

});


function reset() {
  passedLetters.value = []
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

</script>
<template>
  <div class="flex justify-center">
    <div class="text-[46px] px-[40px] max-w-[1000px]">
      <template v-for="letter, i in currentWord" :key="i">
        <LetterVue :index="i" :currentLetterIndex="currentLetterIndex" :letter="letter" :passedLetters="passedLetters"
          :wrongLetters="wrongLetters" />
      </template>
      <p :class="[accuracy < 90 ? 'text-rose-700' : '']">{{ accuracy }}%</p>
    </div>
  </div>
</template>
