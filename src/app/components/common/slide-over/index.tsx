import { Fragment, ReactNode } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { IconButton } from '../IconButton';
import { cva, VariantProps } from 'class-variance-authority';
import classNames from 'classnames';

const styles = cva(
  'pointer-events-none fixed  inset-y-0 right-0 flex w-full ',
  {
    defaultVariants: {
      position: 'right',
    },
    variants: {
      position: {
        left: 'justify-start',
        right: 'justify-end',
      },
    },
  },
);

type Props = VariantProps<typeof styles> & {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
  title?: string;
  className?: string;
};

export const SlideOver = ({
  isOpen,
  onClose,
  children,
  title,
  position,
  className,
}: Props) => {
  const transitionClassName = classNames({
    '-translate-x-full': position === 'left',
    'translate-x-full': position === undefined || 'right',
  });
  return (
    <Transition.Root as={Fragment} show={isOpen}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className={styles({ className, position })}>
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom={transitionClassName}
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo={transitionClassName}
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-lg">
                  <div className="flex h-full flex-col divide-y overflow-y-scroll bg-white py-6">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                          {title}
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <IconButton
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                            onClick={onClose}
                            type="button"
                          >
                            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                          </IconButton>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 py-4 sm:px-6">
                      {children}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
