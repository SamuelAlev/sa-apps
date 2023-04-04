import { ComponentPropsWithoutRef, forwardRef } from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';

import { cn } from '../utilities';

export const Label = forwardRef<HTMLLabelElement, ComponentPropsWithoutRef<typeof LabelPrimitive.Root>>(
    ({ className, ...props }, ref) => (
        <LabelPrimitive.Root
            ref={ref}
            className={cn(
                'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                className
            )}
            {...props}
        />
    )
);
Label.displayName = 'SALabel';