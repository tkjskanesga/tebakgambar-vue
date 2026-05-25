<script setup>
  import { nextTick, ref } from "vue";
  import { toast } from "vue-sonner";

  const props = defineProps({
    datagame: {
      type: Object,
      default: {}
    },
    nextgame: {
      type: Function
    }
  })

  const showButton = ref(true);
  const inputAnswer = ref("");
  const colorInput = ref("");
  const renderImg = ref(props.datagame.img);

  const eventInput = (e) => {
    inputAnswer.value = String(e.target.value).toUpperCase();
  }
  const checkAnswer = () => {
    const dataanswer = String(inputAnswer.value).toUpperCase();
    const isMatching = dataanswer === props.datagame.jawaban;
    if (!isMatching) {
      toast.error("Jawaban salah!")
      colorInput.value = "bg-red-500 text-white";
      setTimeout(() => {
        colorInput.value = "";
      }, 1000)
    } else {
      toast.success("Jawaban benar!")
      showButton.value = false;
      colorInput.value = "bg-green-500";
      renderImg.value = "";
      props.nextgame();
      setTimeout(() => {
        colorInput.value = "";
        showButton.value = true;
        inputAnswer.value = "";
        renderImg.value = props.datagame.img;
      }, 1000)
    }
  }
</script>

<template>
  <div class="w-full h-dvh flex flex-col max-w-md justify-center items-center m-auto px-6">
    <img :src="renderImg" width="100%" />
    <small v-if="!!renderImg" class="my-5 text-neutral-500">{{ datagame.deskripsi }}</small>
    <input
      placeholder="Tulis jawab disini..."
      :class="['text-center border-none outline-none px-3 py-2', colorInput]"
      :value="inputAnswer"
      @input="eventInput"
    />
    <button v-if="showButton" :disabled="inputAnswer.length < 1" class="duration-100 mt-4 px-4 py-2 bg-blue-500 text-white cursor-pointer rounded-md shadow-xl shadow-blue-300/40 active:scale-95 disabled:bg-neutral-400 disabled:opacity-60 disabled:shadow-neutral-200" @click="checkAnswer">Cek Jawaban</button>
  </div>
</template>