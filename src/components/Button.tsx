import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'ghost';

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    fullWidth?: boolean;
  }
>;

export function Button({
  children,
  variant = 'secondary',
  fullWidth = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        'ds-button',
        `ds-button--${variant}`,
        fullWidth ? 'ds-button--full' : '',
        className ?? '',
      ]
        .join(' ')
        .trim()}
      {...props}
    >
      {children}
    </button>
  );
}
