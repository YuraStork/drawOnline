import axios from "axios";
import { PokemonsResponse } from "types";

const BASE_URL = "https://pokeapi.co/api/v2/";

export const getPokemons = async (limit: number, offset: number) => {
  try {
    const res = await axios.get<PokemonsResponse>(`${BASE_URL}pokemon?limit=${limit}&offset=${offset}`);
    return res;
  } catch (e) {
    throw e;
  }
}