import { Drawer } from '@base-ui/react/drawer';

import type {
  BottomSheetBodyFC,
  BottomSheetBodyProps,
} from '../bottom-sheet.types';

export const BottomSheetBody: BottomSheetBodyFC = (
  props: BottomSheetBodyProps,
) => {
  const { children } = props;

  return (
    <Drawer.Content className="
      min-h-0 flex-1 touch-auto overflow-y-auto overscroll-contain bg-neutral-50
      px-5 py-4
    "
    >
      {children}
    </Drawer.Content>
  );
};
