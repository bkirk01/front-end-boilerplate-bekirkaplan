import { ref } from 'vue';

// export const useRickAndMortyApi = () => {
//   const baseUrl = 'https://rickandmortyapi.com/api';
//   const loading = ref(false);

//   const getCharacters = async (page = 1) => {
//     if (loading.value) return;
//     loading.value = true;

//     try {
//       return await useFetch(`${baseUrl}/character?page=${page}`);
//     } finally {
//       loading.value = false;
//     }
//   };

//   const getCharacter = async (id: number) => {
//     if (loading.value) return;
//     loading.value = true;

//     try {
//       return await useFetch(`${baseUrl}/character/${id}`);
//     } finally {
//       loading.value = false;
//     }
//   };

//   return {
//     loading,
//     getCharacters,
//     getCharacter,
//   };
// };

// export const usePokemonApi = () => {
//   const baseUrl = 'https://pokeapi.co/api/v2';
//   const loading = ref(false);

//   const getPokemons = async (limit = 20, offset = 0) => {
//     if (loading.value) return;
//     loading.value = true;

//     try {
//       return await useFetch(`${baseUrl}/pokemon?limit=${limit}&offset=${offset}`);
//     } finally {
//       loading.value = false;
//     }
//   };

//   const getPokemon = async (nameOrId: string | number) => {
//     if (loading.value) return;
//     loading.value = true;

//     try {
//       return await useFetch(`${baseUrl}/pokemon/${nameOrId}`);
//     } finally {
//       loading.value = false;
//     }
//   };

//   return {
//     loading,
//     getPokemons,
//     getPokemon,
//   };
// };
