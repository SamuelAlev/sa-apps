import { ComponentPropsWithoutRef, ElementRef, HTMLAttributes, forwardRef } from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { cn } from '@sa-apps/utilities';

export const AlertDialog = AlertDialogPrimitive.Root;
AlertDialog.displayName = 'SAAlertDialog';

export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
AlertDialogTrigger.displayName = 'SAAlertDialogTrigger';

export const AlertDialogPortal = ({ className, children, ...props }: AlertDialogPrimitive.AlertDialogPortalProps) => (
    <AlertDialogPrimitive.Portal className={cn(className)} {...props}>
        <div className="fixed inset-0 z-[2000] flex items-end justify-center sm:items-center">{children}</div>
    </AlertDialogPrimitive.Portal>
);
AlertDialogPortal.displayName = 'SAAlertDialogPortal';

export const AlertDialogOverlay = forwardRef<
    ElementRef<typeof AlertDialogPrimitive.Overlay>,
    ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Overlay
        className={cn(
            'animate-in fade-in fixed inset-0 z-[2000] bg-black/50 backdrop-blur-sm transition-opacity',
            className
        )}
        {...props}
        ref={ref}
    />
));
AlertDialogOverlay.displayName = 'SAAlertDialogOverlay';

export const AlertDialogContent = forwardRef<
    ElementRef<typeof AlertDialogPrimitive.Content>,
    ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
    <AlertDialogPortal>
        <AlertDialogOverlay />
        <AlertDialogPrimitive.Content
            ref={ref}
            className={cn(
                'animate-in fade-in-90 slide-in-from-bottom-10 sm:zoom-in-90 sm:slide-in-from-bottom-0 fixed z-[2000] grid w-full max-w-lg scale-100 gap-4 bg-white p-6 opacity-100 sm:rounded-lg md:w-full',
                'dark:bg-slate-900',
                className
            )}
            {...props}
        />
    </AlertDialogPortal>
));
AlertDialogContent.displayName = 'SAAlertDialogContent';

export const AlertDialogHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
    <div className={cn('flex flex-col space-y-2 text-center sm:text-left', className)} {...props} />
);
AlertDialogHeader.displayName = 'SAAlertDialogHeader';

export const AlertDialogFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
    <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props} />
);
AlertDialogFooter.displayName = 'SAAlertDialogFooter';

export const AlertDialogTitle = forwardRef<
    ElementRef<typeof AlertDialogPrimitive.Title>,
    ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Title
        ref={ref}
        className={cn('text-lg font-semibold text-slate-900', 'dark:text-slate-50', className)}
        {...props}
    />
));
AlertDialogTitle.displayName = 'SAAlertDialogTitle';

export const AlertDialogDescription = forwardRef<
    ElementRef<typeof AlertDialogPrimitive.Description>,
    ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Description
        ref={ref}
        className={cn('text-sm text-slate-500', 'dark:text-slate-400', className)}
        {...props}
    />
));
AlertDialogDescription.displayName = 'SAAlertDialogDescription';

export const AlertDialogAction = forwardRef<
    ElementRef<typeof AlertDialogPrimitive.Action>,
    ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Action
        ref={ref}
        className={cn(
            'inline-flex h-10 items-center justify-center rounded-md bg-slate-900 py-2 px-4 text-sm font-semibold text-white transition-colors hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900',
            className
        )}
        {...props}
    />
));
AlertDialogAction.displayName = 'SAAlertDialogAction';

export const AlertDialogCancel = forwardRef<
    ElementRef<typeof AlertDialogPrimitive.Cancel>,
    ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Cancel
        ref={ref}
        className={cn(
            'mt-2 inline-flex h-10 items-center justify-center rounded-md border border-slate-200 bg-transparent py-2 px-4 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-700 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 sm:mt-0',
            className
        )}
        {...props}
    />
));
AlertDialogCancel.displayName = 'SAAlertDialogCancel';
