import { cn } from "@sa-apps/utilities";
import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";
import styles from "./TextInput.module.scss";

export type TextInputProps = InputHTMLAttributes<HTMLInputElement>;

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({ className, type, ...props }, ref) => {
	return <input type={type} className={cn(styles.input, className)} ref={ref} {...props} />;
});
TextInput.displayName = "SATextInput";
