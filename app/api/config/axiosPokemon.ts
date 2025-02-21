import { MainClient, PokemonClient } from 'pokenode-ts';

const apiPokemonClient = new PokemonClient();
const apiMainPokemonClient = new MainClient();

export {apiMainPokemonClient, apiPokemonClient};
