import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useViewStore } from '~/store/view'

describe('view Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes with default grid views', () => {
    const store = useViewStore()
    expect(store.rickAndMortyView).toBe('grid')
    expect(store.pokemonView).toBe('grid')
  })

  it('toggles Rick & Morty view', () => {
    const store = useViewStore()
    store.toggleView()
    expect(store.rickAndMortyView).toBe('list')
    store.toggleView()
    expect(store.rickAndMortyView).toBe('grid')
  })

  it('toggles Pokemon view', () => {
    const store = useViewStore()
    store.toggleView()
    expect(store.pokemonView).toBe('list')
    store.toggleView()
    expect(store.pokemonView).toBe('grid')
  })
})
