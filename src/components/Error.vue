<script setup>
  defineProps({
    errormsg: {
      type: String,
      default: ""
    }
  })
</script>

<template>
  <div class="w-full h-dvh flex justify-center items-center">
    <div class="w-full max-w-md px-4">
      <h2 class="font-bold text-xl">Error Issues</h2>
      <pre class="overflow-x-auto">{{ errormsg }}</pre>
    </div>
  </div>
</template>