import type { Meta, StoryObj } from '@storybook/react';

import Notification from './Notification';

const meta: Meta<typeof Notification> = {
  component: Notification,
};

type Story = StoryObj<typeof Notification>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Notification',
  },
};

export default meta;