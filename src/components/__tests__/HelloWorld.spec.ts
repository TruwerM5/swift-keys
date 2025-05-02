import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import SimpleWord from '@/components/SimpleWordVue.vue';

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(SimpleWord, {
      props: {
        msg: 'Hello Vitest',
      },
    });
    expect(wrapper.text()).toContain('Hello Vitest');
  });
});
