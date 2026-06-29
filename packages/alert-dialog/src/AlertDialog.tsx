import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { buttonVariants } from "@sa-apps/button";
import { cn, useSaThemeVars } from "@sa-apps/utilities";
import type { ComponentPropsWithoutRef, ElementRef, HTMLAttributes } from "react";
import { forwardRef } from "react";
import styles from "./AlertDialog.module.scss";

export const AlertDialog = AlertDialogPrimitive.Root;

export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

export const AlertDialogPortal = AlertDialogPrimitive.Portal;
AlertDialogPortal.displayName = "SAAlertDialogPortal";

export const AlertDialogOverlay = forwardRef<
	ElementRef<typeof AlertDialogPrimitive.Overlay>,
	ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, style, ...props }, ref) => {
	const themeVars = useSaThemeVars();
	return (
		<AlertDialogPrimitive.Overlay className={cn(styles.overlay, className)} style={{ ...themeVars, ...style }} {...props} ref={ref} />
	);
});
AlertDialogOverlay.displayName = "SAAlertDialogOverlay";

export const AlertDialogContent = forwardRef<
	ElementRef<typeof AlertDialogPrimitive.Content>,
	ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, style, ...props }, ref) => {
	const themeVars = useSaThemeVars();
	return (
		<AlertDialogPortal>
			<AlertDialogOverlay />
			<AlertDialogPrimitive.Content
				ref={ref}
				className={cn(styles.content, className)}
				style={{ ...themeVars, ...style }}
				{...props}
			/>
		</AlertDialogPortal>
	);
});
AlertDialogContent.displayName = "SAAlertDialogContent";

export const AlertDialogHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
	<div className={cn(styles.header, className)} {...props} />
);
AlertDialogHeader.displayName = "SAAlertDialogHeader";

export const AlertDialogFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
	<div className={cn(styles.footer, className)} {...props} />
);
AlertDialogFooter.displayName = "SAAlertDialogFooter";

export const AlertDialogTitle = forwardRef<
	ElementRef<typeof AlertDialogPrimitive.Title>,
	ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => <AlertDialogPrimitive.Title ref={ref} className={cn(styles.title, className)} {...props} />);
AlertDialogTitle.displayName = "SAAlertDialogTitle";

export const AlertDialogDescription = forwardRef<
	ElementRef<typeof AlertDialogPrimitive.Description>,
	ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
	<AlertDialogPrimitive.Description ref={ref} className={cn(styles.description, className)} {...props} />
));
AlertDialogDescription.displayName = "SAAlertDialogDescription";

export const AlertDialogAction = forwardRef<
	ElementRef<typeof AlertDialogPrimitive.Action>,
	ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => <AlertDialogPrimitive.Action ref={ref} className={cn(buttonVariants(), className)} {...props} />);
AlertDialogAction.displayName = "SAAlertDialogAction";

export const AlertDialogCancel = forwardRef<
	ElementRef<typeof AlertDialogPrimitive.Cancel>,
	ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
	<AlertDialogPrimitive.Cancel ref={ref} className={cn(buttonVariants({ variant: "outline" }), styles.cancel, className)} {...props} />
));
AlertDialogCancel.displayName = "SAAlertDialogCancel";
