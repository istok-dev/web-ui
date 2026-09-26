'use client';

import { Eye, EyeOff } from 'lucide-react';
import type { FC } from 'react';
import { useState } from 'react';

import { IconButton } from '@/components/icon-button';
import { Input } from '@/components/input';

import type { PasswordInputProps } from '../password-input.types';

export const PasswordInput: FC<PasswordInputProps> = ({
  value,
  onChange,
  visible: visibleProp,
  onVisibleChange,
  defaultVisible = false,
  showPasswordLabel = 'Показать пароль',
  hidePasswordLabel = 'Скрыть пароль',
  endAdornment,
  ...rest
}) => {
  const [visibleUncontrolled, setVisibleUncontrolled] = useState(defaultVisible);
  const isControlled = visibleProp !== undefined;
  const visible = isControlled ? visibleProp : visibleUncontrolled;

  const handleVisibleChange = (next: boolean) => {
    if (!isControlled) {
      setVisibleUncontrolled(next);
    }
    onVisibleChange?.(next);
  };

  const resolvedEndAdornment = endAdornment !== undefined
    ? endAdornment
    : (
      <IconButton
        type="button"
        icon={visible ? EyeOff : Eye}
        variant="clear"
        color="neutral"
        size="sm"
        onClick={() => handleVisibleChange(!visible)}
        aria-label={visible ? hidePasswordLabel : showPasswordLabel}
      />
    );

  return (
    <Input
      {...rest}
      value={value}
      onChange={onChange}
      type={visible ? 'text' : 'password'}
      endAdornment={resolvedEndAdornment}
    />
  );
};
