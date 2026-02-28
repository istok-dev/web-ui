"use client";

import React, { useEffect, useRef } from "react";

import { ClickAwayListenerProps } from "../click-away-listener.types";

export const ClickAwayListener: React.FC<ClickAwayListenerProps> = props => {
  const { children, onAwayClick, disabled = false } = props;

  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled) return;

    const handleClickAway = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;

      if (elementRef.current && !elementRef.current.contains(target)) {
        onAwayClick(event);
      }
    };

    document.addEventListener("mousedown", handleClickAway, true);
    document.addEventListener("touchstart", handleClickAway, true);

    return () => {
      document.removeEventListener("mousedown", handleClickAway, true);
      document.removeEventListener("touchstart", handleClickAway, true);
    };
  }, [onAwayClick, disabled]);

  return <div ref={elementRef}>{children}</div>;
};
