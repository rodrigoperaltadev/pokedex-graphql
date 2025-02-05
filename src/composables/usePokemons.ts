import { ref, watch } from "vue";
import { useQuery } from "@vue/apollo-composable";
import type {
  GetPokemonsResponse,
  Pokemon,
  PokemonApiItem,
} from "../types/pokemon";
import { GET_POKEMONS } from "../graphql/queries";

export const DEFAULT_LIMIT = 20;

const mapPokemon = (pokemon: PokemonApiItem): Pokemon => {
  let image = "";
  if (
    pokemon.pokemon_v2_pokemonsprites &&
    pokemon.pokemon_v2_pokemonsprites.length > 0
  ) {
    const sprites = pokemon.pokemon_v2_pokemonsprites[0].sprites;
    image = sprites.other["official-artwork"].front_default;
  }
  const types = pokemon.pokemon_v2_pokemontypes.map(
    (pt) => pt.pokemon_v2_type.name
  );
  return {
    id: pokemon.id,
    name: pokemon.name,
    image,
    types,
  };
};

export function usePokemons(
  initialLimit: number = DEFAULT_LIMIT,
  initialOffset: number = 0
) {
  const pokemons = ref<Pokemon[]>([]);
  const limit = initialLimit;
  const offset = ref(initialOffset);
  const allLoaded = ref(false);

  const { result, loading, error, fetchMore } = useQuery<GetPokemonsResponse>(
    GET_POKEMONS,
    { limit, offset: offset.value }
  );

  watch(
    result,
    (newResult) => {
      if (newResult?.pokemon_v2_pokemon && offset.value === initialOffset) {
        pokemons.value = newResult.pokemon_v2_pokemon.map(mapPokemon);
      }
    },
    { immediate: true }
  );

  const updateQuery = (
    prev: GetPokemonsResponse,
    { fetchMoreResult }: { fetchMoreResult?: GetPokemonsResponse }
  ) => {
    if (!fetchMoreResult?.pokemon_v2_pokemon) {
      allLoaded.value = true;
      return prev;
    }
    const newPokemons = fetchMoreResult.pokemon_v2_pokemon;
    if (newPokemons.length < limit) {
      allLoaded.value = true;
    }
    const merged: GetPokemonsResponse = {
      pokemon_v2_pokemon: [...prev.pokemon_v2_pokemon, ...newPokemons],
    };
    pokemons.value = merged.pokemon_v2_pokemon.map(mapPokemon);
    return merged;
  };

  const loadMore = async () => {
    if (loading.value || allLoaded.value) return;

    offset.value += limit;
    await fetchMore({
      variables: { offset: offset.value, limit },
      updateQuery,
    });
  };

  return { pokemons, loading, error, loadMore, allLoaded };
}
