import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Button } from '../button';
import { Select } from '../select';
import { Modal } from './index';
import type { SelectOption } from '../select/select.types';

const selectOptions: SelectOption[] = [
  { label: 'MIXIT BODY', value: 'mixit-body' },
  { label: 'MIXIT LAB', value: 'mixit-lab' },
  { label: 'MIXIT CARE', value: 'mixit-care' },
  { label: 'MIXIT HOME', value: 'mixit-home' },
];

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
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

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: function DefaultStory() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button variant="primary" onClick={() => setOpen(true)}>
          Открыть модальное окно
        </Button>
        <Modal open={open} onOpenChange={setOpen}>
          <Modal.Header title="Заголовок" />
          <Modal.Body>
            <div className="text-control-md text-neutral-800">
              Содержимое модального окна. Нажмите на затемнённую область или кнопку
              закрытия, чтобы закрыть окно.
            </div>
          </Modal.Body>
          <Modal.Footer>
            <BaseDialog.Close
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
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};

export const WithCustomHeader: Story = {
  render: function WithCustomHeaderStory() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Открыть с кастомным заголовком
        </Button>
        <Modal open={open} onOpenChange={setOpen}>
          <Modal.Header>
            <div className="flex flex-col gap-1">
              <span className="text-control-sm text-neutral-500">
                Капшен
              </span>
              <BaseDialog.Title className="
                text-title-lg font-bold text-neutral-950
              "
              >
                Заголовок
              </BaseDialog.Title>
              <BaseDialog.Description className="
                text-control-md text-neutral-700
              "
              >
                Описание модального окна с дополнительной информацией.
              </BaseDialog.Description>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="text-control-md text-neutral-800">
              Заголовок собран из трёх уровней: капшен, тайтл и описание.
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  },
};

export const WithFooter: Story = {
  render: function WithFooterStory() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button variant="primary" onClick={() => setOpen(true)}>
          Открыть с футером
        </Button>
        <Modal open={open} onOpenChange={setOpen}>
          <Modal.Header title="Подтверждение" />
          <Modal.Body>
            <div className="text-control-md text-neutral-800">
              Вы уверены, что хотите сохранить изменения?
            </div>
          </Modal.Body>
          <Modal.Footer>
            <BaseDialog.Close
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
            <Button
              variant="primary"
              color="primary"
              size="md"
              onClick={() => setOpen(false)}
            >
              Подтвердить
            </Button>
          </Modal.Footer>
        </Modal>
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
        <Modal open={open} onOpenChange={setOpen}>
          <Modal.Header title="Длинное содержимое" />
          <Modal.Body>
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
                  внутри модального окна.
                </p>
              ))}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <BaseDialog.Close
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
            <Button
              variant="primary"
              color="primary"
              size="md"
              onClick={() => setOpen(false)}
            >
              Готово
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};

export const WithSelect: Story = {
  render: function WithSelectStory() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<SelectOption[]>([]);

    return (
      <>
        <Button variant="primary" onClick={() => setOpen(true)}>
          Открыть с селектом
        </Button>
        <Modal open={open} onOpenChange={setOpen}>
          <Modal.Header title="Выбор группы" />
          <Modal.Body>
            <div className="flex flex-col gap-4">
              <p className="text-control-md text-neutral-800">
                Выберите группу отчётности для настройки фильтра.
              </p>
              <Select
                label="Группы отчётности"
                placeholder="Выберите..."
                options={selectOptions}
                value={value}
                onChange={setValue}
                multiple
                searchable
                showSelectAll
                showClear
                size="md"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <BaseDialog.Close
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
            <Button
              variant="primary"
              color="primary"
              size="md"
              onClick={() => setOpen(false)}
            >
              Применить
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};
