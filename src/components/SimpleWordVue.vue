<script setup lang="ts">
import { ref, computed } from 'vue';
import LetterVue from '@/components/LetterVue.vue';
import getCorrectLength from '@/utils/getCorrectLength';
import TheProgressBar from './TheProgressBar.vue';
import { texts } from '@/texts';
import OverlayVue from '@/components/OverlayVue.vue';
import type { GameState } from '@/types';

const LETTERS = /^[\x20-\x7E]{1}$/;
const EXTRA_BUTTONS = /Shift|Alt|Tab|Control|F(1[0-2]|[1-9])/;
const words = texts;
const gameState = ref<GameState>('unset');
const currentWord = computed(() => words[currentWordIndex.value]);
const currentWordIndex = ref(0);
const passedLetters = ref<string[]>([]);
const wrongLetters = ref<string[]>([]);
const currentLetterIndex = ref(0);
const translate = 25;
const translateX = ref(0);

const remainLetters = computed(() => {
  return currentWord.value.slice(passedLetters.value.length);
});

const accuracy = computed(() => {
  const passedLettersLength = getCorrectLength(passedLetters.value);
  const wrongLettersLength = getCorrectLength(wrongLetters.value);
  const result = Math.round((passedLettersLength / (passedLettersLength + wrongLettersLength)) * 100);

  return isNaN(result) ? 100 : result;
});

const progress = computed(() => {
  const fullLength = currentWord.value.length;
  const passed = passedLetters.value.length;
  return (passed / fullLength) * 100;
});

window.addEventListener('keydown', (e) => {
  if (gameState.value !== 'started') {
    return;
  }
  e.preventDefault();
  const key = e.key;
  if (key == 'Backspace') {
    backSpace();
    return;
  }
  const currentLetter = currentWord.value.charAt(
    currentLetterIndex.value,
  );
  if (
    (LETTERS.test(key) ||
      (key == 'Enter' && currentLetter == '\n')) &&
    key == currentLetter
  ) {
    passedLetters.value[currentLetterIndex.value] = currentLetter;
  }

  const textExtraButtons = EXTRA_BUTTONS.test(key);
  if (!textExtraButtons && key != currentLetter) {
    wrongLetters.value[currentLetterIndex.value] = currentLetter;
  }

  if (!textExtraButtons) {
    moveForwardAll();
  }

  if (
    currentWord.value === passedLetters.value.join('') ||
    currentLetterIndex.value == currentWord.value.length
  ) {
    reset();
    if (currentWordIndex.value < words.length - 1) {
      incrementLetterIndex();
    } else {
      currentWordIndex.value = 0;
    }
  }
});

function startGame() {
  gameState.value = 'started';
}

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

  moveTextBack();
}

function moveTextForward() {
  if (currentLetterIndex.value > 25) {
    translateX.value += translate;
  }
}

function moveTextBack() {
  if (translateX.value > 0) {
    translateX.value -= translate;
  }
}

function moveForwardAll() {
  incrementLetterIndex();
  moveTextForward();
}

function incrementLetterIndex() {
  currentLetterIndex.value++;
}

function pauseGame() {
  gameState.value = 'paused';
}
</script>
<template>
  <OverlayVue v-if="gameState !== 'started'" @click="startGame" />
  <div class="wrapper relative overflow-hidden max-w-[1200px] mx-auto flex flex-col items-center justify-center">
    <div class="flex items-end text-[46px] px-[40px] max-w-[1200px] transition-transform" :style="{
      transform: `translateX(${-translateX}px)`,
    }">
      <template v-for="(letter, i) in currentWord" :key="i">
        <LetterVue :index="i" :currentLetterIndex="currentLetterIndex" :letter="letter" :passedLetters="passedLetters"
          :wrongLetters="wrongLetters" />
      </template>
    </div>
    <div>
      {{ remainLetters }}
    </div>
  </div>
  <TheProgressBar :accuracy="accuracy" :progress="progress" :gameState="gameState" @pause="pauseGame" />
</template>
