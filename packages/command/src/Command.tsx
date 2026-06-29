import { Dialog, DialogContent } from "@sa-apps/dialog";
import { cn } from "@sa-apps/utilities";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";
import type { ComponentPropsWithoutRef, ElementRef, HTMLAttributes } from "react";
import { forwardRef } from "react";
import styles from "./Command.module.scss";

export const Command = forwardRef<ElementRef<typeof CommandPrimitive>, ComponentPropsWithoutRef<typeof CommandPrimitive>>(
	({ className, ...props }, ref) => <CommandPrimitive ref={ref} className={cn(styles.command, className)} {...props} />,
);
Command.displayName = "SACommand";

type CommandDialogProps = ComponentPropsWithoutRef<typeof Dialog>;

export const CommandDialog = ({
	children,
	commandProps,
	...props
}: CommandDialogProps & {
	commandProps: ComponentPropsWithoutRef<typeof Command>;
}) => {
	return (
		<Dialog {...props}>
			<DialogContent className={styles.dialogContent}>
				<Command className={styles.dialog} {...commandProps}>
					{children}
				</Command>
			</DialogContent>
		</Dialog>
	);
};
CommandDialog.displayName = "SACommandDialog";

export const CommandInput = forwardRef<ElementRef<typeof CommandPrimitive.Input>, ComponentPropsWithoutRef<typeof CommandPrimitive.Input>>(
	({ className, ...props }, ref) => (
		<div className={styles.inputWrapper} cmdk-input-wrapper="">
			<Search className={styles.inputIcon} />
			<CommandPrimitive.Input ref={ref} className={cn(styles.input, className)} {...props} />
		</div>
	),
);
CommandInput.displayName = "SACommandInput";

export const CommandList = forwardRef<ElementRef<typeof CommandPrimitive.List>, ComponentPropsWithoutRef<typeof CommandPrimitive.List>>(
	({ className, ...props }, ref) => <CommandPrimitive.List ref={ref} className={cn(styles.list, className)} {...props} />,
);
CommandList.displayName = "SACommandList";

export const CommandEmpty = forwardRef<ElementRef<typeof CommandPrimitive.Empty>, ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>>(
	(props, ref) => <CommandPrimitive.Empty ref={ref} className={styles.empty} {...props} />,
);
CommandEmpty.displayName = "SACommandEmpty";

export const CommandLoading = forwardRef<
	ElementRef<typeof CommandPrimitive.Loading>,
	ComponentPropsWithoutRef<typeof CommandPrimitive.Loading>
>(({ children, ...props }, ref) => (
	<CommandPrimitive.Loading ref={ref} {...props}>
		<span className={styles.loading}>{children}</span>
	</CommandPrimitive.Loading>
));
CommandLoading.displayName = "SACommandLoading";

export const CommandGroup = forwardRef<ElementRef<typeof CommandPrimitive.Group>, ComponentPropsWithoutRef<typeof CommandPrimitive.Group>>(
	({ className, ...props }, ref) => <CommandPrimitive.Group ref={ref} className={cn(styles.group, className)} {...props} />,
);

CommandGroup.displayName = CommandPrimitive.Group.displayName;

export const CommandSeparator = forwardRef<
	ElementRef<typeof CommandPrimitive.Separator>,
	ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => <CommandPrimitive.Separator ref={ref} className={cn(styles.separator, className)} {...props} />);
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

export const CommandItem = forwardRef<ElementRef<typeof CommandPrimitive.Item>, ComponentPropsWithoutRef<typeof CommandPrimitive.Item>>(
	({ className, ...props }, ref) => <CommandPrimitive.Item ref={ref} className={cn(styles.item, className)} {...props} />,
);

CommandItem.displayName = CommandPrimitive.Item.displayName;

export const CommandShortcut = ({ className, ...props }: HTMLAttributes<HTMLSpanElement>) => {
	return <span className={cn(styles.shortcut, className)} {...props} />;
};
CommandShortcut.displayName = "CommandShortcut";
