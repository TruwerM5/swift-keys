<script setup lang="ts">
import { ref, computed } from 'vue';
import { BxTime, CaCloseFilled } from '@kalimahapps/vue-icons';

const currentTime = ref(5);
const isOpened = ref(false);
const timeDurations = [5, 10, 15, 20]; // duration in minutes
const buttonRef = ref(null);

const getCurrentTime = computed(() => {
    return currentTime.value
    .toString()
    .padStart(2, '0');
});

function toggle() {
    isOpened.value = !isOpened.value;
}

function setDuration(n: number) {
    currentTime.value = n;
    toggle();
};

window.addEventListener('click', (e) => {
    if (!isOpened.value || (e.target == buttonRef.value)) {
        return;
    }
        
    toggle();
});

</script>

<template>
    <div class="relative flex items-center justify-center gap-[5px] text-lg">
        <BxTime class="time-icon text-primary text-[25px]" />
        <button @click="toggle" ref="buttonRef" class="px-[5px] border-b-4 border-dotted border-primary">
            {{ getCurrentTime }} mins
        </button>
        <div v-show="isOpened"
            class="absolute top-0 bg-white z-10 flex flex-col items-start justify-start gap-[5px] pt-[17px] pb-[10px] rounded-xl">
            <button @click="toggle" class="absolute right-[5px] top-[1px]">
                <CaCloseFilled />
            </button>
            <button v-for="time in timeDurations" :key="time" @click="setDuration(time)"
                class="min-w-[80px] text-left px-[10px] hover:bg-zinc-300">
                {{ time }}
            </button>
        </div>
    </div>
</template>