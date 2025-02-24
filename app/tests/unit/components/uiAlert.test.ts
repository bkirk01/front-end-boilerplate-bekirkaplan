import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Alert from '~/components/ui/Alert.vue'

describe('myComponent', () => {
  it('renders the correct text', () => {
    const wrapper = mount(Alert)
    expect(wrapper.text()).toContain('')
  })
})
