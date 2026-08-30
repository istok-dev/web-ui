'use client';

import { createContext, use } from 'react';

export type DropdownPresentation = 'panel' | 'sheet';

export type DropdownContextValue = {
  presentation: DropdownPresentation;
  closeRoot: () => void;
};

const DropdownContext = createContext<DropdownContextValue>({
  presentation: 'panel',
  closeRoot: () => {},
});

export const DropdownProvider = DropdownContext.Provider;

export const useDropdownContext = () => use(DropdownContext);
