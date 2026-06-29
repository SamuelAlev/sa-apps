import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { cn } from "@sa-apps/utilities";
import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";
import styles from "./Collapsible.module.scss";

export const Collapsible = forwardRef<
	ElementRef<typeof CollapsiblePrimitive.Root>,
	ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root>
>(({ className, ...props }, ref) => <CollapsiblePrimitive.Root ref={ref} className={cn(styles.root, className)} {...props} />);
Collapsible.displayName = "SACollapsible";

export const CollapsibleTrigger = forwardRef<
	ElementRef<typeof CollapsiblePrimitive.CollapsibleTrigger>,
	ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleTrigger>
>(({ className, ...props }, ref) => <CollapsiblePrimitive.CollapsibleTrigger ref={ref} className={cn(className)} {...props} />);
CollapsibleTrigger.displayName = "SACollapsibleTrigger";

export const CollapsibleContent = forwardRef<
	ElementRef<typeof CollapsiblePrimitive.CollapsibleContent>,
	ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleContent>
>(({ className, ...props }, ref) => (
	<CollapsiblePrimitive.CollapsibleContent ref={ref} className={cn(styles.content, className)} {...props} />
));
CollapsibleContent.displayName = "SACollapsibleContent";
