import { VariantProps, cva } from 'class-variance-authority';
import { ButtonHTMLAttributes, forwardRef } from 'react';

export const buttonVariants = cva(
    'active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:hover:bg-slate-800 dark:hover:text-slate-100 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900 data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800',
    {
        variants: {
            variant: {
                default: 'bg-slate-900 text-white hover:bg-slate-700',
                destructive: 'bg-red-500 text-white hover:bg-red-600',
                outline: 'bg-transparent text-slate-900 border border-slate-200 hover:bg-slate-100',
                subtle: 'bg-slate-100 text-slate-900 hover:bg-slate-200',
                ghost: 'bg-transparent hover:bg-slate-100 data-[state=open]:bg-transparent',
                link: 'bg-transparent underline-offset-4 hover:underline text-slate-900 hover:bg-transparent',
            },
            size: {
                default: 'h-10 py-2 px-4',
                sm: 'h-9 px-2 rounded-md',
                lg: 'h-11 px-8 rounded-md',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ variant, size, ...props }, ref) => {
    return <button ref={ref} className={buttonVariants({ variant, size })} {...props} />;
});
Button.displayName = 'SAButton';
