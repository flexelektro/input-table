import { html, TemplateResult } from 'lit-html';
import '../input-table.js';

export default {
  title: 'InputTable',
  component: 'input-table',
  argTypes: {
    cols: { control: 'number' },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  columns?: string;
}

const Template: Story<ArgTypes> = ({
  columns=JSON.stringify(["LOL","ROFL","YO"])
}: ArgTypes) => html`

<style>


</style>
<input-table columns=${columns}></input-table>
`;

export const Regular = Template.bind({});
Regular.args = {
  columns:JSON.stringify(["LOL","ROFL","YO"])
}

