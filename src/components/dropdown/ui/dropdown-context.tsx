'use client';

import { createContext, use } from 'react';

export type DropdownContextValue = {
  closeRoot: () => void;
  isSheet: boolean;
};

const DropdownContext = createContext<DropdownContextValue>({
  closeRoot: () => {},
  isSheet: false,
});

export const DropdownProvider = DropdownContext.Provider;

export const useDropdownContext = () => use(DropdownContext);
