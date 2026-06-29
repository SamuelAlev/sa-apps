import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn, useSaThemeVars } from "@sa-apps/utilities";
import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";
import styles from "./Popover.module.scss";

export const Popover = PopoverPrimitive.Root;
Popover.displayName = "SAPopover";

export const PopoverTrigger = PopoverPrimitive.Trigger;
PopoverTrigger.displayName = "SAPopoverTrigger";

export const PopoverContent = forwardRef<
	ElementRef<typeof PopoverPrimitive.Content>,
	ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, style, ...props }, ref) => {
	const themeVars = useSaThemeVars();
	return (
		<PopoverPrimitive.Portal>
			<PopoverPrimitive.Content
				ref={ref}
				align={align}
				sideOffset={sideOffset}
				className={cn(styles.content, className)}
				style={{ ...themeVars, ...style }}
				{...props}
			/>
		</PopoverPrimitive.Portal>
	);
});
PopoverContent.displayName = "SAPopoverContent";
