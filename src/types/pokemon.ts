export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
}

interface PokemonApiSprites {
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
}

interface PokemonApiType {
  pokemon_v2_type: {
    name: string;
  };
}

export interface PokemonApiItem {
  id: number;
  name: string;
  pokemon_v2_pokemonsprites: PokemonApiSprites[];
  pokemon_v2_pokemontypes: PokemonApiType[];
}

export interface GetPokemonsResponse {
  pokemon_v2_pokemon: PokemonApiItem[];
}
