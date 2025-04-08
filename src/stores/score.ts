import { defineStore } from 'pinia';
import getCorrectLength from '@/utils/getCorrectLength';

const useScoreStore = defineStore('score', {
  state: () => {
    return {
      accuracy: 0,
    };
  },
  getters: {
    getAccuracy(state) {
      return state.accuracy;
    },
  },
  actions: {
    setAccuracy(passed: string[], wrong: string[]) {
      const passedLettersLength = getCorrectLength(passed);
      const wrongLettersLength = getCorrectLength(wrong);
      const result = Math.round(
        (passedLettersLength / (passedLettersLength + wrongLettersLength)) *
          100,
      );
      this.accuracy = result || 100;
    },
  },
});
