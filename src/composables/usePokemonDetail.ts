import { ref, watch } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { GET_POKEMON_DETAIL } from "@/graphql/queries";
import type { GetPokemonDetailResponse, PokemonDetail } from "@/types/pokemon-detail";


export function usePokemonDetail(id: number) {
  const pokemonDetail = ref<(PokemonDetail & { sprite?: string }) | null>(null);
  const { result, loading, error } = useQuery<GetPokemonDetailResponse>(
    GET_POKEMON_DETAIL,
    { id }
  );

  const getPokemonImage = (detail: typeof pokemonDetail.value) => {
    if (
      !detail?.pokemon_v2_pokemonsprites ||
      detail.pokemon_v2_pokemonsprites.length === 0
    )
      return "";
    try {
      const sprites = detail.pokemon_v2_pokemonsprites[0].sprites;
      return sprites.other["official-artwork"].front_default;
    } catch (e) {
      console.error("Error obteniendo imagen:", e);
      return "";
    }
  };

  const mapPokemonDetail = (detail: PokemonDetail): PokemonDetail & { sprite: string } => {
    return {
      ...detail,
      sprite: getPokemonImage(detail),
    }
  }
    
  

  watch(
    result,
    (newResult) => {
      if (newResult?.pokemon_v2_pokemon_by_pk) {
        pokemonDetail.value =
          mapPokemonDetail(newResult.pokemon_v2_pokemon_by_pk);
      }
    },
    { immediate: true }
  );

  return { pokemonDetail, loading, error };
}
