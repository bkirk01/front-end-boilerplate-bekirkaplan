import { defineStore } from 'pinia';

export const useViewStore = defineStore('view', {
  state: () => ({
    rickAndMortyView: 'grid',
    pokemonView: 'grid',
  }),
  actions: {
    toggleView(section: 'rickAndMorty' | 'pokemon') {
      if (section === 'rickAndMorty') {
        this.rickAndMortyView = this.rickAndMortyView === 'grid' ? 'list' : 'grid';
      } else {
        this.pokemonView = this.pokemonView === 'grid' ? 'list' : 'grid';
      }
    },
  },
});
