import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import SubNavigation from '~/components/SubNavigation.vue';

// Mock the useRoute composable
vi.mock('#app', () => ({
  useRoute: () => ({
    path: '/pokemon',
    params: {},
  }),
}));

describe('SubNavigation', () => {
  const mountComponent = () => {
    return mount(SubNavigation, {
      global: {
        plugins: [createTestingPinia()],
        stubs: {
          NuxtLink: true,
          ViewToggle: true,
          UContainer: true,
          UIcon: true,
        },
      },
    });
  };

  it('shows view toggle on list pages', () => {
    const wrapper = mountComponent();
    expect(wrapper.findComponent({ name: 'ViewToggle' }).exists()).toBe(true);
  });

  it('shows correct page title', () => {
    const wrapper = mountComponent();
    expect(wrapper.find('.title-text').text()).toBe('Pokémon');
  });

  it('shows back button on detail pages', async () => {
    // Update mock to simulate detail page
    vi.mocked(useRoute).mockReturnValue({
      path: '/pokemon/1',
      params: { id: '1' },
    } as any);

    const wrapper = mountComponent();
    expect(wrapper.find('.back-button').exists()).toBe(true);
  });

  it('shows correct icon based on route', () => {
    const wrapper = mountComponent();
    expect(wrapper.find('.title-icon').attributes('name')).toContain('sparkles');
  });
});
