import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useViewStore } from '~/stores/view';

describe('View Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('initializes with default grid views', () => {
    const store = useViewStore();
    expect(store.rickAndMortyView).toBe('grid');
    expect(store.pokemonView).toBe('grid');
  });

  it('toggles Rick & Morty view', () => {
    const store = useViewStore();
    store.toggleView('rickAndMorty');
    expect(store.rickAndMortyView).toBe('list');
    store.toggleView('rickAndMorty');
    expect(store.rickAndMortyView).toBe('grid');
  });

  it('toggles Pokemon view', () => {
    const store = useViewStore();
    store.toggleView('pokemon');
    expect(store.pokemonView).toBe('list');
    store.toggleView('pokemon');
    expect(store.pokemonView).toBe('grid');
  });
});
