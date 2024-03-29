import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '@sa-apps/utilities';
import type { ComponentPropsWithoutRef, ElementRef } from 'react';
import { forwardRef } from 'react';

export const Popover = PopoverPrimitive.Root;
Popover.displayName = 'SAPopover';

export const PopoverTrigger = PopoverPrimitive.Trigger;
PopoverTrigger.displayName = 'SAPopoverTrigger';

export const PopoverContent = forwardRef<ElementRef<typeof PopoverPrimitive.Content>, ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>>(
    ({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
        <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content
                ref={ref}
                align={align}
                sideOffset={sideOffset}
                className={cn(
                    'z-50 w-72 rounded-md border border-border bg-popover p-4 text-popover-foreground shadow-md outline-none animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
                    className,
                )}
                {...props}
            />
        </PopoverPrimitive.Portal>
    ),
);
PopoverContent.displayName = 'SAPopoverContent';
