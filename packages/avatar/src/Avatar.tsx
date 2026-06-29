import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@sa-apps/utilities";
import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";
import styles from "./Avatar.module.scss";

export const Avatar = forwardRef<ElementRef<typeof AvatarPrimitive.Root>, ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>>(
	({ className, ...props }, ref) => <AvatarPrimitive.Root ref={ref} className={cn(styles.root, className)} {...props} />,
);
Avatar.displayName = "SAAvatar";

export const AvatarImage = forwardRef<ElementRef<typeof AvatarPrimitive.Image>, ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>>(
	({ className, ...props }, ref) => <AvatarPrimitive.Image ref={ref} className={cn(styles.image, className)} {...props} />,
);
AvatarImage.displayName = "SAAvatarImage";

export const AvatarFallback = forwardRef<
	ElementRef<typeof AvatarPrimitive.Fallback>,
	ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => <AvatarPrimitive.Fallback ref={ref} className={cn(styles.fallback, className)} {...props} />);
AvatarFallback.displayName = "SAAvatarFallback";
