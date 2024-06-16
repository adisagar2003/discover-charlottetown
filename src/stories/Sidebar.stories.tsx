import type { Meta, StoryObj } from '@storybook/react';

import Sidebar from './Sidebar';

const meta: Meta<typeof Sidebar> = {
  component: Sidebar,
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const NotLoggedIn: Story = {
  args: {
    isLoggedIn: true,
    userProfile: {
      username: 'John',
      profilePicture: '',
      progress: 14,
      email: 'john@gmail.com'
  }
  },
};

export const LoggedOut: Story = {
  args: {
    isLoggedIn: false
  }
}