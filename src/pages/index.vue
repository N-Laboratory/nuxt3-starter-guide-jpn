<script lang="ts" setup>
import { useFetch } from '@vueuse/core'

const text = ref('')
const uuid = ref('')
const handleClick = async () => {
  const { data } = await useFetch('https://httpbin.org/uuid').json()
  uuid.value = data.value.uuid
}
</script>

<template>
  <div>
    <h1>
      Pages/index.vue
    </h1>
    <BaseTextInput
      v-model="text"
    />
    <p>Input value = {{ text }}</p>
    <button
      @click="handleClick"
    >
      Get uuid
    </button>
    <p>UUID = {{ uuid }}</p>
  </div>
</template>

<style scoped></style>
