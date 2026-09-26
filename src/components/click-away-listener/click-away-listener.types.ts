import type { useRender } from '@base-ui/react/use-render';

export type ClickAwayListenerProps = useRender.ComponentProps<'div'> & {
  /**
   * Вызывается при нажатии (мышь, касание, перо) за пределами элемента.
   * Срабатывает на `pointerdown`, поэтому на тач-устройствах вызывается один раз.
   */
  onAwayClick: (event: PointerEvent) => void;
  disabled?: boolean;
};
