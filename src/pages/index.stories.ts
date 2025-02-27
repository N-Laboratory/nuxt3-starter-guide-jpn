import type { Meta, StoryObj } from '@storybook/vue3'
import { http, HttpResponse } from 'msw'
import { within, userEvent, expect } from '@storybook/test'
import Index from './index.vue'

type Story = StoryObj<typeof Index>

const meta: Meta<typeof Index> = {
  title: 'Index',
}
export default meta

export const Default: Story = {
  render: () => ({
    components: { Index },
    template: '<Index />',
  }),
}

export const GetUuid: Story = {
  render: () => ({
    components: { Index },
    template: '<Index />',
  }),
  parameters: {
    msw: {
      handlers: [
        http.get('https://httpbin.org/uuid', () => {
          return HttpResponse.json({
            uuid: 'test uuid',
          })
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    // Arrange
    const canvas = within(canvasElement)

    // Act
    await userEvent.click(await canvas.findByText('Get uuid'))

    // Assert
    await expect(await canvas.findByText('UUID = test uuid')).toBeInTheDocument()
  },
}
