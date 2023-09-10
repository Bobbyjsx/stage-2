import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import classNames from 'classnames';

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const IconButton = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button className={classNames('rounded', className)} {...rest}>
      {children}
    </button>
  );
};
