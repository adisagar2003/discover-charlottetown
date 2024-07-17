import type { Meta, StoryObj } from '@storybook/react';
import LocationCard from './LocationCard';

const meta = {
    title: 'Location Card',
    component: LocationCard,
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  } satisfies Meta<typeof LocationCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title:"Title",
        image:"https://photographylife.com/wp-content/uploads/2023/05/Nikon-Z8-Official-Samples-00002.jpg",
        description:"fjaj",
        likes:1
    }
}