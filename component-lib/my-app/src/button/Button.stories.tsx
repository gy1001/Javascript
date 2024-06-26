import type { Meta, StoryObj } from '@storybook/react'

import Button from './index'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// // More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    // primary: true,
    type: 'primary',
    children: 'Button',
  },
}
const style = { marginLeft: '8px' }
export const ButtonGroup: Story = {
  render: () => (
    <>
      <Button type='primary'>Primary Button</Button>
      <Button style={style}>Default Button</Button>
      <Button type='dashed' style={style}>
        Dashed Button
      </Button>
      <Button type='text' style={style}>
        Text Button
      </Button>
      <Button type='link' style={style}>
        Link Button
      </Button>
    </>
  ),
}

// export const Secondary: Story = {
//   args: {
//     label: 'Button',
//   },
// }

// export const Large: Story = {
//   args: {
//     size: 'large',
//     label: 'Button',
//   },
// }

// export const Small: Story = {
//   args: {
//     size: 'small',
//     label: 'Button',
//   },
// }
