import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import HomePage from '~/pages/index.vue'

describe('homePage', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(HomePage, {
      global: {
        stubs: {
          NuxtLink: {
            props: ['to'],
            template: '<a :href="to"><slot /></a>',
          },
          UIcon: {
            template: '<svg></svg>',
            props: ['name'],
          },
        },
      },
    })
  })

  it('renders the hero title', () => {
    const title = wrapper.find('[name="title"]')
    expect(title.exists()).toBe(true)
    expect(title.text()).toBe('Welcome to Rick & Morty and Pokémon Overview')
  })

  it('renders Rick & Morty feature card with correct link and content', () => {
    const rickMortyLink = wrapper.find('a[href="/rick-and-morty"]')
    expect(rickMortyLink.exists()).toBe(true)
    expect(rickMortyLink.find('.header-title').text().trim()).toBe('Rick & Morty Characters')
    expect(rickMortyLink.find('img').attributes('alt')).toBe('Rick')
    expect(rickMortyLink.find('.card-description').text()).toContain(
      'Explore characters from the Rick & Morty universe',
    )
  })

  it('renders Pokémon feature card with correct link and content', () => {
    const pokemonLink = wrapper.find('a[href="/pokemon"]')
    expect(pokemonLink.exists()).toBe(true)
    expect(pokemonLink.find('.header-title').text().trim()).toBe('Pokémon')
    expect(pokemonLink.find('img').attributes('alt')).toBe('Pikachu')
    expect(pokemonLink.find('.card-description').text()).toContain(
      'Discover and learn about different Pokémon species',
    )
  })

  it('renders arrow icons for both feature cards', () => {
    const icons = wrapper.findAll('svg')
    expect(icons).toHaveLength(2)
  })
})
