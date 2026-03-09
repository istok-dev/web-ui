"use client";

import { Field as BaseField } from "@base-ui/react/field";

export const Field = Object.assign(BaseField.Root, {
  Label: BaseField.Label,
  Error: BaseField.Error,
});
