import clsx from "clsx";

import { DropdownFC } from "../dropdown.type";
import { DropdownItem } from "./dropdown-item";

export const Dropdown: DropdownFC = (props) => {
  const { children, className } = props;

  return <div className={clsx("relative", className)}>{children}</div>;
};

Dropdown.Item = DropdownItem
