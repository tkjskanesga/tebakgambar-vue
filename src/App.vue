<script setup>
  import { nextTick, ref } from "vue";
  import { Toaster } from "vue-sonner";
  import ConfettiExplosion from "vue-confetti-explosion";
  import Error from "./components/Error.vue";
  import Loading from "./components/Loading.vue";
  import Starting from "./components/Starting.vue";
  import CardGame from "./components/CardGame.vue";
  
  // visible effect for confettie (Yepeee!!)
  const visibleConfettiEffect = ref(false);
  const explodeEffect = async () => {
    visibleConfettiEffect.value = false;
    await nextTick();
    visibleConfettiEffect.value = true;
  }

  // Data Loading State
  const dataTebakgambar = ref([]);
  const statusFetch = ref("pending");
  const statusError = ref(null);

  // Fetching Data
  async function fetchingDataTebakgambar() {
    try {
      const request = await fetch("https://raw.githubusercontent.com/BochilTeam/database/refs/heads/master/games/tebakgambar.json");
      const json = await request.json();
      statusFetch.value = `success`
      dataTebakgambar.value = json;
    } catch(e) {
      statusFetch.value = `error`
      statusError.value = `${e.stack}`
    }
  }
  fetchingDataTebakgambar();

  // Random Game Selection
  const dataGameMatch = ref(null);
  function SelectRandomImage() {
    const selectArray = dataTebakgambar.value;
    const randomMatch = selectArray[Math.floor(Math.random() * selectArray.length)]
    dataGameMatch.value = randomMatch; // Data Game Selected!
  }

  // Next Finish Game
  const NextGame = async () => {
    explodeEffect();
    await new Promise(a => setTimeout(a, 1000));
    SelectRandomImage();
  }
</script>

<template>
  <Toaster position="top-center" richColors  />
  <CardGame v-if="statusFetch === 'success' && dataGameMatch" :datagame="dataGameMatch" :nextgame="NextGame"/>
  <Starting v-if="statusFetch === 'success' && !dataGameMatch" :startButton="SelectRandomImage"/>
  <Loading v-if="statusFetch === 'pending'" />
  <Error v-if="statusFetch === 'error'" :errormsg="statusError"/>
  <div class="fixed top-0 left-0 justify-center items-center flex w-full h-[calc(100vh-200px)] pointer-events-none">
    <ConfettiExplosion v-if="visibleConfettiEffect" :stageHeight="2000" :stageWidth="1500"/>
  </div>
</template>
