// src/types/pokemonDetail.ts

// Tipo para una estadística base
export interface PokemonStat {
  name: string;
  base_stat: number;
  effort: number;
}

// Tipo para un movimiento
export interface PokemonMove {
  name: string;
  accuracy: number | null;
  power: number | null;
  pp: number | null;
  level: number;
}

// Tipo principal de detalle (sin evolución)
export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  pokemon_v2_pokemonsprites: {
    sprites: any; // usualmente un JSON-string; lo transformaremos para extraer la imagen
  }[];
  pokemon_v2_pokemontypes: {
    pokemon_v2_type: {
      name: string;
    };
  }[];
  pokemon_v2_pokemonstats: {
    base_stat: number;
    effort: number;
    pokemon_v2_stat: {
      name: string;
    };
  }[];
  pokemon_v2_pokemonmoves: {
    level: number;
    pokemon_v2_move: {
      name: string;
      accuracy: number | null;
      power: number | null;
      pp: number | null;
    };
  }[];
}

// Tipo de respuesta de la query
export interface GetPokemonDetailResponse {
  pokemon_v2_pokemon_by_pk: PokemonDetail;
}
