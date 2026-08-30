import { Drawer } from '@base-ui/react/drawer';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Button } from '../button';
import type { BottomSheetSnapPoint } from './bottom-sheet.types';
import { BottomSheet } from './index';

const meta: Meta<typeof BottomSheet> = {
  title: 'Components/BottomSheet',
  component: BottomSheet,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Состояние открытия',
    },
  },
};

export default meta;

type Story = StoryObj<typeof BottomSheet>;

export const Default: Story = {
  render: function DefaultStory() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button variant="primary" onClick={() => setOpen(true)}>
          Открыть BottomSheet
        </Button>
        <BottomSheet open={open} onOpenChange={setOpen}>
          <BottomSheet.Header
            title="Заголовок"
            description="Краткое пояснение под заголовком"
          />
          <BottomSheet.Body>
            <div className="text-control-md text-neutral-800">
              Панель снизу экрана. Свайпните вниз или нажмите на затемнённую
              область, чтобы закрыть.
            </div>
          </BottomSheet.Body>
          <BottomSheet.Footer
            end={(
              <>
                <Drawer.Close
                  render={closeProps => (
                    <Button
                      {...closeProps}
                      variant="secondary"
                      color="neutral"
                      size="md"
                    >
                      Отмена
                    </Button>
                  )}
                />
                <Button variant="primary" color="primary" size="md">
                  Сохранить
                </Button>
              </>
            )}
          />
        </BottomSheet>
      </>
    );
  },
};

export const WithScrollableContent: Story = {
  render: function WithScrollableContentStory() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button variant="primary" onClick={() => setOpen(true)}>
          Открыть с прокруткой
        </Button>
        <BottomSheet open={open} onOpenChange={setOpen}>
          <BottomSheet.Header title="Длинное содержимое" />
          <BottomSheet.Body>
            <div className="
              flex flex-col gap-4 text-control-md text-neutral-800
            "
            >
              {Array.from({ length: 20 }, (_, index) => (
                <p key={index}>
                  Параграф
                  {' '}
                  {index + 1}
                  . Пример текста для демонстрации прокрутки
                  внутри BottomSheet.
                </p>
              ))}
            </div>
          </BottomSheet.Body>
          <BottomSheet.Footer>
            <Drawer.Close
              render={closeProps => (
                <Button
                  {...closeProps}
                  variant="secondary"
                  color="neutral"
                  size="md"
                >
                  Закрыть
                </Button>
              )}
            />
          </BottomSheet.Footer>
        </BottomSheet>
      </>
    );
  },
};

export const WithSnapPoints: Story = {
  render: function WithSnapPointsStory() {
    const snapPoints: BottomSheetSnapPoint[] = [0.4, 0.7, 1];
    const [open, setOpen] = useState(false);
    const [snapPoint, setSnapPoint] = useState<BottomSheetSnapPoint | null>(0.4);

    return (
      <>
        <Button variant="primary" onClick={() => setOpen(true)}>
          Открыть со snap points
        </Button>
        <BottomSheet
          open={open}
          onOpenChange={setOpen}
          snapPoints={snapPoints}
          snapPoint={snapPoint}
          onSnapPointChange={setSnapPoint}
        >
          <BottomSheet.Header
            title="Snap points"
            description="Потяните за край, чтобы сменить высоту"
          />
          <BottomSheet.Body>
            <div className="text-control-md text-neutral-800">
              Текущая точка:
              {' '}
              {String(snapPoint)}
            </div>
          </BottomSheet.Body>
        </BottomSheet>
      </>
    );
  },
};

export const WithoutHandle: Story = {
  render: function WithoutHandleStory() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Без handle
        </Button>
        <BottomSheet open={open} onOpenChange={setOpen} showHandle={false}>
          <BottomSheet.Header title="Без ручки" />
          <BottomSheet.Body>
            <div className="text-control-md text-neutral-800">
              Handle скрыт через prop showHandle = false.
            </div>
          </BottomSheet.Body>
        </BottomSheet>
      </>
    );
  },
};

export const Nested: Story = {
  render: function NestedStory() {
    const [open, setOpen] = useState(false);
    const [nestedOpen, setNestedOpen] = useState(false);

    return (
      <>
        <Button variant="primary" onClick={() => setOpen(true)}>
          Открыть стек
        </Button>
        <BottomSheet open={open} onOpenChange={setOpen}>
          <BottomSheet.Header
            title="Аккаунт"
            description="Вложенные панели складываются стопкой"
          />
          <BottomSheet.Body>
            <div className="flex flex-col gap-4">
              <p className="text-control-md text-neutral-800">
                Откройте вложенный BottomSheet — родительский слегка уменьшится
                и сдвинется назад.
              </p>
              <Button
                variant="secondary"
                color="neutral"
                size="md"
                onClick={() => setNestedOpen(true)}
              >
                Настройки безопасности
              </Button>
            </div>
            <BottomSheet
              open={nestedOpen}
              onOpenChange={setNestedOpen}
              showBackdrop={false}
            >
              <BottomSheet.Header
                title="Безопасность"
                description="Просмотр активности и настроек входа"
              />
              <BottomSheet.Body>
                <ul className="list-disc pl-5 text-control-md text-neutral-800">
                  <li>Passkeys включены</li>
                  <li>2FA через приложение</li>
                  <li>3 устройства в системе</li>
                </ul>
              </BottomSheet.Body>
              <BottomSheet.Footer>
                <Drawer.Close
                  render={closeProps => (
                    <Button
                      {...closeProps}
                      variant="secondary"
                      color="neutral"
                      size="md"
                    >
                      Назад
                    </Button>
                  )}
                />
              </BottomSheet.Footer>
            </BottomSheet>
          </BottomSheet.Body>
        </BottomSheet>
      </>
    );
  },
};
