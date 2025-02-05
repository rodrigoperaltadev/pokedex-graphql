<template>
  <div class="bg-white rounded-lg shadow p-4 flex flex-col items-center">
    <img :src="pokemon.image" :alt="pokemon.name" class="w-24 h-24 object-contain mb-2" />
    <h2 class="text-lg font-semibold">{{ pokemon.name }}</h2>
    <div class="mt-1">
      <span
        v-for="(type, index) in pokemon.types"
        :key="index"
        class="text-xs bg-gray-200 rounded-full px-2 py-1 mr-1"
      >
        {{ type }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

interface Pokemon {
  id: number
  name: string
  image: string
  types: string[]
}

defineProps<{
  pokemon: Pokemon
}>()
</script>