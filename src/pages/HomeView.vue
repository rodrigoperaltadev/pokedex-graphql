<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <section class="p-4">
      <SearchBar @search="handleSearch" />
    </section>
    <main class="flex-1 p-4">
      <div v-if="loading && !pokemons.length" class="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        <PokemonCardSkeleton v-for="n in 20" :key="n" />
      </div>
      <div v-else-if="error" class="text-center text-red-500">
        Ocurrió un error: {{ error.message }}
      </div>
      <section v-else class="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        <PokemonCard
          v-for="pokemon in filteredPokemons"
          :key="pokemon.id"
          :pokemon="pokemon"
          @click="goToDetail(pokemon.id)"
          class="cursor-pointer"
        />
      </section>
      <div v-if="loading && pokemons.length" class="flex items-center justify-center py-4">
        <div class="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
      <div ref="loadMoreTrigger" class="h-10" />
      <div v-if="allLoaded" class="text-center mt-4">
        No hay más Pokémon para mostrar.
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import PokemonCard from '@/components/PokemonCard.vue'
import PokemonCardSkeleton from '@/components/PokemonCardSkeleton.vue'
import SearchBar from '@/components/SearchBar.vue'
import { usePokemons } from '@/composables/usePokemons'

const { pokemons, loading, error, loadMore, allLoaded } = usePokemons(20, 0)
const router = useRouter()

const goToDetail = (id: number) => {
  router.push({ name: 'Pokemon', params: { id } })
}

const searchQuery = ref('')

const handleSearch = (query: string) => {
  searchQuery.value = query.trim().toLowerCase()
}

const filteredPokemons = computed(() => {
  if (!searchQuery.value) return pokemons.value
  return pokemons.value.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.value)
  )
})

const loadMoreTrigger = ref<HTMLElement | null>(null)

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      loadMore()
    }
  }, {
    rootMargin: '0px',
    threshold: 0.1,
  })

  if (loadMoreTrigger.value) {
    observer.observe(loadMoreTrigger.value)
  }
})
</script>