import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import Avatar from '~/components/Avatar.vue'

// Mock the useRoute composable
vi.mock('#app', () => ({
  useRoute: () => ({
    path: '/pokemon/1',
  }),
}))

describe('avatar', () => {
  const defaultProps = {
    image: 'test-image.jpg',
    alt: 'Test Alt',
    size: 'md' as const,
  }

  const mountComponent = (props = defaultProps) => {
    return mount(Avatar, {
      props,
    })
  }

  it('renders correctly with default props', () => {
    const wrapper = mountComponent()
    const img = wrapper.find('img')

    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe(defaultProps.image)
    expect(img.attributes('alt')).toBe(defaultProps.alt)
    expect(wrapper.classes()).toContain('avatar-md')
  })

  it('applies correct size classes', () => {
    const sizes = ['sm', 'md', 'lg'] as const

    sizes.forEach((size) => {
      const wrapper = mountComponent({
        ...defaultProps,
        size,
      })
      expect(wrapper.classes()).toContain(`avatar-${size}`)
    })
  })

  it('applies pokemon-specific classes when on pokemon route', () => {
    const wrapper = mountComponent()
    expect(wrapper.classes()).toContain('pokemon-avatar')
    expect(wrapper.find('img').classes()).toContain('pokemon-image')
  })

  it('applies custom classes', () => {
    const wrapper = mountComponent({
      ...defaultProps,
      className: 'custom-class',
      imageClass: 'custom-image-class',
    })

    expect(wrapper.classes()).toContain('custom-class')
    expect(wrapper.find('img').classes()).toContain('custom-image-class')
  })

  it('uses lazy loading and async decoding', () => {
    const wrapper = mountComponent()
    const img = wrapper.find('img')

    expect(img.attributes('loading')).toBe('lazy')
    expect(img.attributes('decoding')).toBe('async')
  })
})
