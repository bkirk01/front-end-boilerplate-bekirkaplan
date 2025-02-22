import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import FixedPagination from '~/components/FixedPagination.vue'

describe('fixedPagination', () => {
  const defaultProps = {
    modelValue: 1,
    total: 10,
  }

  const mountComponent = (props = defaultProps) => {
    return mount(FixedPagination, {
      props,
      global: {
        stubs: {
          UContainer: true,
          UPagination: true,
        },
      },
    })
  }

  it('renders correctly', () => {
    const wrapper = mountComponent()
    expect(wrapper.classes()).toContain('fixed-pagination')
    expect(wrapper.find('.pagination-wrapper').exists()).toBe(true)
  })

  it('emits update event when page changes', async () => {
    const wrapper = mountComponent()
    const pagination = wrapper.findComponent({ name: 'UPagination' })

    await pagination.vm.$emit('update:model-value', 2)
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([2])
  })

  it('passes correct props to pagination component', () => {
    const wrapper = mountComponent({
      modelValue: 5,
      total: 20,
    })

    const pagination = wrapper.findComponent({ name: 'UPagination' })
    expect(pagination.props('modelValue')).toBe(5)
    expect(pagination.props('total')).toBe(20)
  })
})
