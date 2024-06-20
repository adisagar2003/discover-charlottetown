import type { Meta, StoryObj } from '@storybook/react';

import  Searchbar  from './Searchbar';

const meta: Meta<typeof Searchbar> = {
  component: Searchbar,
};

export default meta;
type Story = StoryObj<typeof Searchbar>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Searchbar',
  },
};