import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn, useSaThemeVars } from "@sa-apps/utilities";
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from "react";
import styles from "./Tooltip.module.scss";

export const TooltipProvider = TooltipPrimitive.Provider;
TooltipProvider.displayName = "SATooltipProvider";

export const Tooltip = TooltipPrimitive.Root;
Tooltip.displayName = "SATooltip";

export const TooltipTrigger = TooltipPrimitive.Trigger;
TooltipTrigger.displayName = "SATooltipTrigger";

export const TooltipContent = forwardRef<
	ElementRef<typeof TooltipPrimitive.Content>,
	ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, style, ...props }, ref) => {
	const themeVars = useSaThemeVars();
	return (
		<TooltipPrimitive.Content
			ref={ref}
			sideOffset={sideOffset}
			className={cn(styles.content, className)}
			style={{ ...themeVars, ...style }}
			{...props}
		/>
	);
});
TooltipContent.displayName = "SATooltipContent";
