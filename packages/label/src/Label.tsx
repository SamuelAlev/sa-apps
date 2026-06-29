import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@sa-apps/utilities";
import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";
import styles from "./Label.module.scss";

export const Label = forwardRef<ElementRef<typeof LabelPrimitive.Root>, ComponentPropsWithoutRef<typeof LabelPrimitive.Root>>(
	({ className, ...props }, ref) => <LabelPrimitive.Root ref={ref} className={cn(styles.label, className)} {...props} />,
);
Label.displayName = "SALabel";
