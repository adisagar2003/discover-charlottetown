import type { Meta, StoryObj } from '@storybook/react';
import Header from './Header';

const meta = {
    title: 'Header',
    component: Header,
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  } satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
    args: {
        isLoggedIn: true,
        userProfileData: {
            username: 'John',
            profilePicture: '',
            progress: 14,
            email:'john@gmail.com'
        }
    }
}

export const LoggedOut: Story = {
    args: {
        isLoggedIn: false
    }
}