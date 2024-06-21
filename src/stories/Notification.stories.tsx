import type { Meta, StoryObj } from '@storybook/react';

import Notification from './Notification';

const meta: Meta<typeof Notification> = {
  component: Notification,
};

type Story = StoryObj<typeof Notification>;

export const Primary: Story = {
  args: {
    time: new Date(),
    notificationText:'lorem23fj rwqhriuruiwur hh riht rtqrhw req qrieiu riuhr',
    notificationThumbnail: 'https://mdbcdn.b-cdn.net/img/new/avatars/2.webp'
  },
};

export default meta;