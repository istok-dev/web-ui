import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";

import { Checkbox } from "./index";
import type { CheckboxSize } from "./checkbox.types";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    defaultSize: {
      control: "select",
      options: ["s", "m", "l"] as CheckboxSize[],
      description: "Размер чекбокса",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: (args) => {
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(true);
    const [checked3, setChecked3] = useState(false);

    return (
      <div className="w-[400px]">
        <Checkbox {...args}>
          <Checkbox.Item
            label="Опция 1"
            checked={checked1}
            onChange={(e) => setChecked1(e.target.checked)}
          />
          <Checkbox.Item
            label="Опция 2"
            checked={checked2}
            onChange={(e) => setChecked2(e.target.checked)}
          />
          <Checkbox.Item
            label="Опция 3"
            checked={checked3}
            onChange={(e) => setChecked3(e.target.checked)}
          />
        </Checkbox>
      </div>
    );
  },
  args: {
    defaultSize: "m",
  },
};

export const WithDescription: Story = {
  render: (args) => {
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(true);

    return (
      <div className="w-[400px]">
        <Checkbox {...args}>
          <Checkbox.Item
            label="Основной заголовок"
            description="Дополнительное описание для этой опции"
            checked={checked1}
            onChange={(e) => setChecked1(e.target.checked)}
          />
          <Checkbox.Item
            label="Второй пункт"
            description="Подробное описание второго пункта"
            checked={checked2}
            onChange={(e) => setChecked2(e.target.checked)}
          />
          <Checkbox.Item
            label="Третий пункт"
            description="Описание третьего пункта с дополнительной информацией"
            checked={checked3}
            onChange={(e) => setChecked3(e.target.checked)}
          />
        </Checkbox>
      </div>
    );
  },
  args: {
    defaultSize: "m",
  },
};

export const Sizes: Story = {
  render: () => {
    const [s1, setS1] = useState(false);
    const [s2, setS2] = useState(true);
    const [m1, setM1] = useState(false);
    const [m2, setM2] = useState(true);
    const [l1, setL1] = useState(false);
    const [l2, setL2] = useState(true);

    return (
      <div className="flex flex-col gap-8 w-[400px]">
        <div>
          <p className="mb-3 text-sm font-medium text-gray-700">Size S</p>
          <Checkbox defaultSize="s">
            <Checkbox.Item
              label="Маленький чекбокс 1"
              checked={s1}
              onChange={(e) => setS1(e.target.checked)}
            />
            <Checkbox.Item
              label="Маленький чекбокс 2"
              checked={s2}
              onChange={(e) => setS2(e.target.checked)}
            />
          </Checkbox>
        </div>
        <div>
          <p className="mb-3 text-sm font-medium text-gray-700">Size M</p>
          <Checkbox defaultSize="m">
            <Checkbox.Item
              label="Средний чекбокс 1"
              checked={m1}
              onChange={(e) => setM1(e.target.checked)}
            />
            <Checkbox.Item
              label="Средний чекбокс 2"
              checked={m2}
              onChange={(e) => setM2(e.target.checked)}
            />
          </Checkbox>
        </div>
        <div>
          <p className="mb-3 text-sm font-medium text-gray-700">Size L</p>
          <Checkbox defaultSize="l">
            <Checkbox.Item
              label="Большой чекбокс 1"
              checked={l1}
              onChange={(e) => setL1(e.target.checked)}
            />
            <Checkbox.Item
              label="Большой чекбокс 2"
              checked={l2}
              onChange={(e) => setL2(e.target.checked)}
            />
          </Checkbox>
        </div>
      </div>
    );
  },
};

export const States: Story = {
  render: () => {
    return (
      <div className="w-[400px]">
        <Checkbox defaultSize="m">
          <Checkbox.Item label="Unchecked" checked={false} readOnly />
          <Checkbox.Item label="Checked" checked={true} readOnly />
          <Checkbox.Item
            label="Indeterminate"
            indeterminate={true}
            checked={false}
            readOnly
          />
          <Checkbox.Item
            label="Disabled Unchecked"
            disabled
            checked={false}
            readOnly
          />
          <Checkbox.Item
            label="Disabled Checked"
            disabled
            checked={true}
            readOnly
          />
          <Checkbox.Item
            label="Disabled Indeterminate"
            disabled
            indeterminate={true}
            checked={false}
            readOnly
          />
        </Checkbox>
      </div>
    );
  },
};

export const AllStatesGrid: Story = {
  render: () => {
    return (
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-3 gap-8">
          {/* Size S */}
          <div>
            <p className="mb-4 text-sm font-medium text-gray-700">Size S</p>
            <Checkbox defaultSize="s">
              <Checkbox.Item label="Unchecked" checked={false} readOnly />
              <Checkbox.Item label="Checked" checked={true} readOnly />
              <Checkbox.Item
                label="Indeterminate"
                indeterminate={true}
                checked={false}
                readOnly
              />
              <Checkbox.Item
                label="Disabled Unchecked"
                disabled
                checked={false}
                readOnly
              />
              <Checkbox.Item
                label="Disabled Checked"
                disabled
                checked={true}
                readOnly
              />
            </Checkbox>
          </div>

          {/* Size M */}
          <div>
            <p className="mb-4 text-sm font-medium text-gray-700">Size M</p>
            <Checkbox defaultSize="m">
              <Checkbox.Item label="Unchecked" checked={false} readOnly />
              <Checkbox.Item label="Checked" checked={true} readOnly />
              <Checkbox.Item
                label="Indeterminate"
                indeterminate={true}
                checked={false}
                readOnly
              />
              <Checkbox.Item
                label="Disabled Unchecked"
                disabled
                checked={false}
                readOnly
              />
              <Checkbox.Item
                label="Disabled Checked"
                disabled
                checked={true}
                readOnly
              />
            </Checkbox>
          </div>

          {/* Size L */}
          <div>
            <p className="mb-4 text-sm font-medium text-gray-700">Size L</p>
            <Checkbox defaultSize="l">
              <Checkbox.Item label="Unchecked" checked={false} readOnly />
              <Checkbox.Item label="Checked" checked={true} readOnly />
              <Checkbox.Item
                label="Indeterminate"
                indeterminate={true}
                checked={false}
                readOnly
              />
              <Checkbox.Item
                label="Disabled Unchecked"
                disabled
                checked={false}
                readOnly
              />
              <Checkbox.Item
                label="Disabled Checked"
                disabled
                checked={true}
                readOnly
              />
            </Checkbox>
          </div>
        </div>
      </div>
    );
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [options, setOptions] = useState({
      option1: false,
      option2: true,
      option3: false,
      option4: false,
    });

    return (
      <div className="w-[400px]">
        <Checkbox {...args}>
          <Checkbox.Item
            label="Опция 1"
            checked={options.option1}
            onChange={(e) =>
              setOptions({ ...options, option1: e.target.checked })
            }
          />
          <Checkbox.Item
            label="Опция 2"
            checked={options.option2}
            onChange={(e) =>
              setOptions({ ...options, option2: e.target.checked })
            }
          />
          <Checkbox.Item
            label="Опция 3"
            checked={options.option3}
            onChange={(e) =>
              setOptions({ ...options, option3: e.target.checked })
            }
          />
          <Checkbox.Item
            label="Опция 4"
            checked={options.option4}
            onChange={(e) =>
              setOptions({ ...options, option4: e.target.checked })
            }
          />
        </Checkbox>
      </div>
    );
  },
  args: {
    defaultSize: "m",
  },
};

export const Disabled: Story = {
  render: (args) => {
    return (
      <div className="w-[400px]">
        <Checkbox {...args}>
          <Checkbox.Item label="Disabled Unchecked" disabled checked={false} />
          <Checkbox.Item label="Disabled Checked" disabled checked={true} />
          <Checkbox.Item
            label="Disabled Indeterminate"
            disabled
            indeterminate={true}
            checked={false}
          />
        </Checkbox>
      </div>
    );
  },
  args: {
    defaultSize: "m",
  },
};

export const WithoutLabel: Story = {
  render: (args) => {
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(true);
    const [checked3, setChecked3] = useState(false);

    return (
      <div className="w-[400px]">
        <Checkbox {...args}>
          <Checkbox.Item
            checked={checked1}
            onChange={(e) => setChecked1(e.target.checked)}
          />
          <Checkbox.Item
            checked={checked2}
            onChange={(e) => setChecked2(e.target.checked)}
          />
          <Checkbox.Item
            checked={checked3}
            onChange={(e) => setChecked3(e.target.checked)}
          />
        </Checkbox>
      </div>
    );
  },
  args: {
    defaultSize: "m",
  },
};

export const ComplexExample: Story = {
  render: () => {
    const [groups, setGroups] = useState({
      "group-a": true,
      "group-b": false,
      "group-c": true,
      "group-d": false,
    });

    const [categories, setCategories] = useState({
      "category-1": false,
      "category-2": false,
      "category-3": true,
      "category-4": false,
      "category-5": false,
    });

    const [channels, setChannels] = useState({
      "channel-1": true,
      "channel-2": true,
      "channel-3": false,
    });

    return (
      <div className="flex flex-col gap-8 w-full max-w-4xl">
        <div>
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Группы
          </h3>
          <Checkbox defaultSize="m">
            {Object.entries(groups).map(([key, value]) => (
              <Checkbox.Item
                key={key}
                label={`Группа ${key.split("-")[1].toUpperCase()}`}
                checked={value}
                onChange={(e) =>
                  setGroups({ ...groups, [key]: e.target.checked })
                }
              />
            ))}
          </Checkbox>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Категории
          </h3>
          <Checkbox defaultSize="m">
            {Object.entries(categories).map(([key, value]) => (
              <Checkbox.Item
                key={key}
                label={`Категория ${key.replace("category-", "")}`}
                checked={value}
                onChange={(e) =>
                  setCategories({ ...categories, [key]: e.target.checked })
                }
              />
            ))}
          </Checkbox>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Каналы
          </h3>
          <Checkbox defaultSize="m">
            {Object.entries(channels).map(([key, value]) => (
              <Checkbox.Item
                key={key}
                label={`Канал ${key.replace("channel-", "")}`}
                checked={value}
                onChange={(e) =>
                  setChannels({ ...channels, [key]: e.target.checked })
                }
              />
            ))}
          </Checkbox>
        </div>
      </div>
    );
  },
};
