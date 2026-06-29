import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn, useSaThemeVars } from "@sa-apps/utilities";
import { X } from "lucide-react";
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef, type HTMLAttributes } from "react";
import styles from "./Dialog.module.scss";

export const Dialog = DialogPrimitive.Root;
Dialog.displayName = "SADialog";

export const DialogTrigger = DialogPrimitive.Trigger;
DialogTrigger.displayName = "SADialogTrigger";

export const DialogPortal = DialogPrimitive.Portal;
DialogPortal.displayName = "SADialogPortal";

export const DialogClose = DialogPrimitive.Close;

export const DialogOverlay = forwardRef<
	ElementRef<typeof DialogPrimitive.Overlay>,
	ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, style, ...props }, ref) => {
	const themeVars = useSaThemeVars();
	return <DialogPrimitive.Overlay ref={ref} className={cn(styles.overlay, className)} style={{ ...themeVars, ...style }} {...props} />;
});
DialogOverlay.displayName = "SADialogOverlay";

export const DialogContent = forwardRef<
	ElementRef<typeof DialogPrimitive.Content>,
	ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, style, ...props }, ref) => {
	const themeVars = useSaThemeVars();
	return (
		<DialogPortal>
			<DialogOverlay />
			<DialogPrimitive.Content ref={ref} className={cn(styles.content, className)} style={{ ...themeVars, ...style }} {...props}>
				{children}
				<DialogPrimitive.Close className={styles.close}>
					<X className={styles.icon} />
					<span className={styles.srOnly}>Close</span>
				</DialogPrimitive.Close>
			</DialogPrimitive.Content>
		</DialogPortal>
	);
});
DialogContent.displayName = "SADialogContent";

export const DialogHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
	<div className={cn(styles.header, className)} {...props} />
);
DialogHeader.displayName = "SADialogHeader";

export const DialogFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
	<div className={cn(styles.footer, className)} {...props} />
);
DialogFooter.displayName = "SADialogFooter";

export const DialogTitle = forwardRef<ElementRef<typeof DialogPrimitive.Title>, ComponentPropsWithoutRef<typeof DialogPrimitive.Title>>(
	({ className, ...props }, ref) => <DialogPrimitive.Title ref={ref} className={cn(styles.title, className)} {...props} />,
);
DialogTitle.displayName = "SADialogTitle";

export const DialogDescription = forwardRef<
	ElementRef<typeof DialogPrimitive.Description>,
	ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => <DialogPrimitive.Description ref={ref} className={cn(styles.description, className)} {...props} />);
DialogDescription.displayName = "SADialogDescription";
