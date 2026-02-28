import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";

import { Dropdown } from "./index";
import { Button } from "../button";

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Дополнительные классы контейнера",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  render: () => (
    <Dropdown className="min-w-[200px] py-2 bg-white rounded-2xl overflow-hidden shadow-lg border border-neutral-200">
      <Dropdown.Item label="Профиль" startIcon={User} defaultSize="m" onClick={() => {}} />
      <Dropdown.Item label="Настройки" startIcon={Settings} defaultSize="m" onClick={() => {}} />
      <Dropdown.Item
        label="Выйти"
        startIcon={LogOut}
        defaultSize="m"
        onClick={() => {}}
        startIconProps={{ className: "text-red-600" }}
        classes={{ label: "!text-red-600" }}
        className="!bg-transparent hover:!bg-red-50"
      />
    </Dropdown>
  ),
};

export const WithTrigger: Story = {
  render: function WithTriggerStory() {
    const [open, setOpen] = useState(false);
    return (
      <div className="relative">
        <Button variant="secondary" onClick={() => setOpen((v) => !v)}>
          Меню
          <ChevronDown className={open ? "rotate-180" : ""} />
        </Button>
        {open && (
          <div
            className="absolute top-full left-0 mt-2 z-50 animate-in fade-in zoom-in-95 duration-200"
            onBlur={() => setOpen(false)}
          >
            <Dropdown className="min-w-[200px] py-2 bg-white rounded-2xl overflow-hidden shadow-lg border border-neutral-200">
              <Dropdown.Item label="Профиль" startIcon={User} defaultSize="m" onClick={() => setOpen(false)} />
              <Dropdown.Item label="Настройки" startIcon={Settings} defaultSize="m" onClick={() => setOpen(false)} />
              <Dropdown.Item label="Выйти" startIcon={LogOut} defaultSize="m" onClick={() => setOpen(false)} />
            </Dropdown>
          </div>
        )}
      </div>
    );
  },
};

export const ItemSizes: Story = {
  render: () => (
    <div className="flex gap-4">
      <Dropdown className="min-w-[180px] py-2 bg-white rounded-2xl overflow-hidden shadow-lg border border-neutral-200">
        <Dropdown.Item label="Размер S" defaultSize="s" onClick={() => {}} />
        <Dropdown.Item label="Размер S" defaultSize="s" onClick={() => {}} />
      </Dropdown>
      <Dropdown className="min-w-[200px] py-2 bg-white rounded-2xl overflow-hidden shadow-lg border border-neutral-200">
        <Dropdown.Item label="Размер M" defaultSize="m" onClick={() => {}} />
        <Dropdown.Item label="Размер M" defaultSize="m" onClick={() => {}} />
      </Dropdown>
      <Dropdown className="min-w-[220px] py-2 bg-white rounded-2xl overflow-hidden shadow-lg border border-neutral-200">
        <Dropdown.Item label="Размер L" defaultSize="l" onClick={() => {}} />
        <Dropdown.Item label="Размер L" defaultSize="l" onClick={() => {}} />
      </Dropdown>
    </div>
  ),
};

export const BrandVariant: Story = {
  render: () => (
    <Dropdown className="min-w-[200px] py-2 bg-brand-600 rounded-2xl overflow-hidden">
      <Dropdown.Item label="Пункт меню" variant="brand" defaultSize="m" onClick={() => {}} />
      <Dropdown.Item label="Ещё пункт" variant="brand" defaultSize="m" onClick={() => {}} />
    </Dropdown>
  ),
};

export const WithDisabledItem: Story = {
  render: () => (
    <Dropdown className="min-w-[200px] py-2 bg-white rounded-2xl overflow-hidden shadow-lg border border-neutral-200">
      <Dropdown.Item label="Активный пункт" defaultSize="m" onClick={() => {}} />
      <Dropdown.Item label="Неактивный пункт" defaultSize="m" disabled onClick={() => {}} />
      <Dropdown.Item label="Ещё активный" defaultSize="m" onClick={() => {}} />
    </Dropdown>
  ),
};
