import { cn } from "@sa-apps/utilities";
import type { ButtonHTMLAttributes } from "react";
import { forwardRef } from "react";
import styles from "./Button.module.scss";

export type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
export type ButtonSize = "default" | "sm" | "lg" | "icon";

const variantClass: Record<ButtonVariant, string> = {
	default: styles.default,
	destructive: styles.destructive,
	outline: styles.outline,
	secondary: styles.secondary,
	ghost: styles.ghost,
	link: styles.link,
};

const sizeClass: Record<ButtonSize, string> = {
	default: styles.sizeDefault,
	sm: styles.sizeSm,
	lg: styles.sizeLg,
	icon: styles.sizeIcon,
};

type ButtonVariantsOptions = {
	variant?: ButtonVariant;
	size?: ButtonSize;
	className?: string;
};

export const buttonVariants = ({ variant = "default", size = "default", className }: ButtonVariantsOptions = {}) => {
	return cn(styles.button, variantClass[variant], sizeClass[size], className);
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ButtonVariantsOptions;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => {
	return <button type="button" className={buttonVariants({ variant, size, className })} ref={ref} {...props} />;
});
Button.displayName = "SAButton";
