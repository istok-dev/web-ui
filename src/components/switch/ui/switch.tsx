"use client";

import React from "react";
import clsx from "clsx";

import { SwitchProps, SwitchSize } from "../switch.types";

const sizeClassesMap: Record<SwitchSize, string> = {
  s: "istok-switch--s",
  m: "istok-switch--m",
  l: "istok-switch--l",
};

export const Switch: React.FC<SwitchProps> = ({
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  size = "m",
  className,
  ...inputProps
}) => {
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = React.useState(
    defaultChecked ?? false
  );
  const isChecked = isControlled ? checked : internalChecked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalChecked(e.target.checked);
    onChange?.(e.target.checked);
  };

  return (
    <label
      className={clsx(
        "istok-switch",
        sizeClassesMap[size],
        {
          "istok-switch--checked": isChecked,
          "istok-switch--disabled": disabled,
        },
        className
      )}
    >
      <input
        type="checkbox"
        role="switch"
        aria-checked={isChecked}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={handleChange}
        className="istok-switch__input sr-only"
        {...inputProps}
      />
      <span className="istok-switch__track">
        <span className="istok-switch__thumb" />
      </span>
    </label>
  );
};
