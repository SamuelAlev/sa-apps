import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn, useSaThemeVars } from "@sa-apps/utilities";
import { Check, ChevronRight, Circle } from "lucide-react";
import type { ComponentPropsWithoutRef, ElementRef, HTMLAttributes } from "react";
import { forwardRef } from "react";
import styles from "./DropdownMenu.module.scss";

export const DropdownMenu = DropdownMenuPrimitive.Root;
DropdownMenu.displayName = "SADropdownMenu";

export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
DropdownMenuTrigger.displayName = "SADropdownMenuTrigger";

export const DropdownMenuGroup = DropdownMenuPrimitive.Group;
DropdownMenuGroup.displayName = "SADropdownMenuGroup";

export const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
DropdownMenuPortal.displayName = "SADropdownMenuPortal";

export const DropdownMenuSub = DropdownMenuPrimitive.Sub;
DropdownMenuSub.displayName = "SADropdownMenuSub";

export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
DropdownMenuRadioGroup.displayName = "SADropdownMenuRadioGroup";

export const DropdownMenuSubTrigger = forwardRef<
	ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
	ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
		inset?: boolean;
	}
>(({ className, inset, children, ...props }, ref) => (
	<DropdownMenuPrimitive.SubTrigger ref={ref} className={cn(styles.subTrigger, inset && styles.subTriggerInset, className)} {...props}>
		{children}
		<ChevronRight className={styles.subTriggerIcon} />
	</DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName = "SADropdownMenuSubTrigger";

export const DropdownMenuSubContent = forwardRef<
	ElementRef<typeof DropdownMenuPrimitive.SubContent>,
	ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, style, ...props }, ref) => {
	const themeVars = useSaThemeVars();
	return (
		<DropdownMenuPrimitive.SubContent
			ref={ref}
			className={cn(styles.subContent, className)}
			style={{ ...themeVars, ...style }}
			{...props}
		/>
	);
});
DropdownMenuSubContent.displayName = "SADropdownMenuSubContent";

export const DropdownMenuContent = forwardRef<
	ElementRef<typeof DropdownMenuPrimitive.Content>,
	ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, style, ...props }, ref) => {
	const themeVars = useSaThemeVars();
	return (
		<DropdownMenuPrimitive.Portal>
			<DropdownMenuPrimitive.Content
				ref={ref}
				sideOffset={sideOffset}
				className={cn(styles.content, className)}
				style={{ ...themeVars, ...style }}
				{...props}
			/>
		</DropdownMenuPrimitive.Portal>
	);
});
DropdownMenuContent.displayName = "SADropdownMenuContent";

export const DropdownMenuItem = forwardRef<
	ElementRef<typeof DropdownMenuPrimitive.Item>,
	ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
		inset?: boolean;
	}
>(({ className, inset, ...props }, ref) => (
	<DropdownMenuPrimitive.Item ref={ref} className={cn(styles.item, inset && styles.itemInset, className)} {...props} />
));
DropdownMenuItem.displayName = "SADropdownMenuItem";

export const DropdownMenuCheckboxItem = forwardRef<
	ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
	ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
	<DropdownMenuPrimitive.CheckboxItem ref={ref} className={cn(styles.checkboxItem, className)} checked={checked} {...props}>
		<span className={styles.itemIndicator}>
			<DropdownMenuPrimitive.ItemIndicator>
				<Check className={styles.checkIcon} />
			</DropdownMenuPrimitive.ItemIndicator>
		</span>
		{children}
	</DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = "SADropdownMenuCheckboxItem";

export const DropdownMenuRadioItem = forwardRef<
	ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
	ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
	<DropdownMenuPrimitive.RadioItem ref={ref} className={cn(styles.radioItem, className)} {...props}>
		<span className={styles.itemIndicator}>
			<DropdownMenuPrimitive.ItemIndicator>
				<Circle className={styles.radioDot} />
			</DropdownMenuPrimitive.ItemIndicator>
		</span>
		{children}
	</DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = "SADropdownMenuRadioItem";

export const DropdownMenuLabel = forwardRef<
	ElementRef<typeof DropdownMenuPrimitive.Label>,
	ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
		inset?: boolean;
	}
>(({ className, inset, ...props }, ref) => (
	<DropdownMenuPrimitive.Label ref={ref} className={cn(styles.label, inset && styles.labelInset, className)} {...props} />
));
DropdownMenuLabel.displayName = "SADropdownMenuLabel";

export const DropdownMenuSeparator = forwardRef<
	ElementRef<typeof DropdownMenuPrimitive.Separator>,
	ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => <DropdownMenuPrimitive.Separator ref={ref} className={cn(styles.separator, className)} {...props} />);
DropdownMenuSeparator.displayName = "SADropdownMenuSeparator";

export const DropdownMenuShortcut = ({ className, ...props }: HTMLAttributes<HTMLSpanElement>) => {
	return <span className={cn(styles.shortcut, className)} {...props} />;
};
DropdownMenuShortcut.displayName = "SADropdownMenuShortcut";
