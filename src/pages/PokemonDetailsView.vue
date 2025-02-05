<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header con botón atrás -->
    <header class="bg-red-600 text-white py-4 px-6 flex items-center">
      <button @click="goBack" class="mr-4 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
             viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <h1 class="text-xl font-bold capitalize">{{ pokemonDetail?.name || 'Detalle' }}</h1>
    </header>

    <main class="flex-1 p-4">

      <div v-if="loading" class="flex items-center justify-center h-full">
        <Loader />
      </div>

      <div v-else-if="error" class="text-center text-red-500">
        Ocurrió un error: {{ error.message }}
      </div>

      <div v-else-if="pokemonDetail" class="space-y-4">
        <!-- Sección About: imagen y datos básicos -->
        <section class="flex flex-col items-center">
          <img 
            :src="pokemonDetail.sprite" 
            :alt="pokemonDetail.name"
            class="w-40 h-40 object-contain"
          />
          <h2 class="text-2xl font-bold mt-2 capitalize">{{ pokemonDetail.name }}</h2>
        </section>

        <!-- Tabs -->
        <div>
          <div class="flex border-b">
            <button 
              v-for="tab in TABS" 
              :key="tab" 
              @click="activeTab = tab"
              :class="[
                'py-2 px-4 focus:outline-none',
                activeTab === tab ? 'border-b-2 border-red-600 font-bold' : 'text-gray-500'
              ]"
            >
              {{ tab }}
            </button>
          </div>
          <section class="p-4">
            <div v-if="activeTab === ABOUT_TAB">
              <p><strong>Altura:</strong> {{ pokemonDetail.height }}</p>
              <p><strong>Peso:</strong> {{ pokemonDetail.weight }}</p>
              <p><strong>Experiencia base:</strong> {{ pokemonDetail.base_experience }}</p>
            </div>
            <div v-else-if="activeTab === BASE_STATS_TAB">
              <div v-for="stat in pokemonDetail.pokemon_v2_pokemonstats" :key="stat.pokemon_v2_stat.name" class="mb-2">
                <p class="capitalize"><strong>{{ stat.pokemon_v2_stat.name }}:</strong> {{ stat.base_stat }}</p>
              </div>
            </div>
            <div v-else-if="activeTab === MOVES_TAB">
              <table class="w-full text-left">
                <thead>
                  <tr>
                    <th class="py-1">Nivel</th>
                    <th class="py-1">Movimiento</th>
                    <th class="py-1">PP</th>
                    <th class="py-1">Poder</th>
                    <th class="py-1">Precisión</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="move in pokemonDetail.pokemon_v2_pokemonmoves" :key="move.pokemon_v2_move.name">
                    <td class="py-1">{{ move.level }}</td>
                    <td class="py-1 capitalize">{{ move.pokemon_v2_move.name }}</td>
                    <td class="py-1">{{ move.pokemon_v2_move.pp }}</td>
                    <td class="py-1">{{ move.pokemon_v2_move.power ?? '-' }}</td>
                    <td class="py-1">{{ move.pokemon_v2_move.accuracy ?? '-' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Loader from '@/components/Loader.vue';
import { usePokemonDetail } from '@/composables/usePokemonDetail';

const ABOUT_TAB = 'info';
const BASE_STATS_TAB = 'estadisticas base';
const MOVES_TAB = 'movimientos';

const TABS = [ABOUT_TAB, BASE_STATS_TAB, MOVES_TAB];

const route = useRoute();
const router = useRouter();
const id = Number(route.params.id);

const { pokemonDetail, loading, error } = usePokemonDetail(id);

const activeTab = ref(ABOUT_TAB);

const goBack = () => {
  router.back();
};
</script>
