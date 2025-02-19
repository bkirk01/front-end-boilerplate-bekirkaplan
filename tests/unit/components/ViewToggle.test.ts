import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ViewToggle from '~/components/ViewToggle.vue';

describe('ViewToggle', () => {
  const mountComponent = (props = { view: 'grid' as const }) => {
    return mount(ViewToggle, {
      props,
    });
  };

  it('renders with correct initial state', () => {
    const wrapper = mountComponent();
    expect(wrapper.text()).toContain('List View');
    expect(wrapper.find('.toggle-icon').exists()).toBe(true);
  });

  it('toggles view and text when clicked', async () => {
    const wrapper = mountComponent();

    // Initial state
    expect(wrapper.text()).toContain('List View');

    // Click to toggle
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('update:view')?.[0]).toEqual(['list']);

    // Update props to simulate parent update
    await wrapper.setProps({ view: 'list' });
    expect(wrapper.text()).toContain('Grid View');
  });

  it('emits correct view value', async () => {
    const wrapper = mountComponent({ view: 'list' });
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('update:view')?.[0]).toEqual(['grid']);
  });

  it('shows correct icon based on view', async () => {
    const wrapper = mountComponent();

    // Grid view
    expect(wrapper.find('.toggle-icon').attributes('name')).toContain('bars-3');

    // List view
    await wrapper.setProps({ view: 'list' });
    expect(wrapper.find('.toggle-icon').attributes('name')).toContain('squares-2x2');
  });
});
