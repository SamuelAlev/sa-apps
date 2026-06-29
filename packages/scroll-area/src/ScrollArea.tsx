import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "@sa-apps/utilities";
import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";
import styles from "./ScrollArea.module.scss";

export const ScrollArea = forwardRef<
	ElementRef<typeof ScrollAreaPrimitive.Root>,
	ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
	<ScrollAreaPrimitive.Root ref={ref} className={cn(styles.scrollArea, className)} {...props}>
		<ScrollAreaPrimitive.Viewport className={styles.viewport}>{children}</ScrollAreaPrimitive.Viewport>
		<ScrollBar />
		<ScrollAreaPrimitive.Corner />
	</ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

export const ScrollBar = forwardRef<
	ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
	ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
	<ScrollAreaPrimitive.ScrollAreaScrollbar
		ref={ref}
		orientation={orientation}
		className={cn(
			styles.scrollbar,
			orientation === "vertical" && styles.vertical,
			orientation === "horizontal" && styles.horizontal,
			className,
		)}
		{...props}
	>
		<ScrollAreaPrimitive.ScrollAreaThumb className={styles.thumb} />
	</ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = "SAScrollBar";
