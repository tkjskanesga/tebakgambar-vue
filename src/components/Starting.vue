<script setup>
  const props = defineProps({
    startButton: Function
  });

  const buttonStart = () => {
    props.startButton()
  }
</script>

<template>
  <div class="w-full h-dvh flex flex-col justify-center items-center">
    <p class="mb-2">Click <b>"Start Game"</b> to starting!</p>
    <button @click="buttonStart" class="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold cursor-pointer">Start Game</button>
  </div>
</template>