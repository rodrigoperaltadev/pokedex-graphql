<template>
  <div class="flex items-center border border-gray-300 rounded-md overflow-hidden">
    <input
      type="text"
      v-model="query"
      @input="onInput"
      placeholder="Buscar Pokémon..."
      class="px-4 py-2 flex-grow outline-none"
    />
    <button @click="onInput" class="bg-blue-500 text-white px-4 py-2 cursor-pointer">
      Buscar
    </button>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, ref } from 'vue'

const query = ref('')

const emit = defineEmits<{ (e: 'search', query: string): void }>()

const onInput = () => {
  emit('search', query.value)
}
</script>
