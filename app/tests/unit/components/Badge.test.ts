import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Badge from '~/design/components/Badge.vue'

describe('badge', () => {
  it('renders slot content', () => {
    const wrapper = mount(Badge, {
      slots: {
        default: 'Test Badge',
      },
    })

    expect(wrapper.text()).toBe('Test Badge')
  })

  it('applies color classes correctly', () => {
    const colors = ['gray', 'red', 'green', 'blue']

    colors.forEach((color) => {
      const wrapper = mount(Badge, {
        props: { color },
        slots: {
          default: 'Test',
        },
      })

      expect(wrapper.classes()).toContain(`bg-${color}-50/80`)
      expect(wrapper.classes()).toContain(`text-${color}-800`)
      expect(wrapper.classes()).toContain(`ring-${color}-500/20`)
    })
  })

  it('applies custom class', () => {
    const wrapper = mount(Badge, {
      props: {
        className: 'custom-class',
      },
      slots: {
        default: 'Test',
      },
    })

    expect(wrapper.classes()).toContain('custom-class')
  })
})
