import { ComponentStory, ComponentMeta } from '@storybook/react';
import DurationInput from './DurationInput';
import { within, fireEvent } from '@storybook/testing-library';
import { defaultProps } from './fixtures';

export default {
  title: 'DurationInput',
  component: DurationInput,
  argTypes: {
    value: {
      description: 'value',
    },
  },
} as ComponentMeta<typeof DurationInput>;

const Template: ComponentStory<typeof DurationInput> = args => {
  return <DurationInput {...args} />;
};

export const Opened = Template.bind({});
Opened.args = defaultProps;
Opened.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const getItem = () => canvas.findByRole('input-modal');
  const inputItem = await getItem();
  await fireEvent.click(inputItem);
};

export const Closed = Template.bind({});
Closed.args = defaultProps;
