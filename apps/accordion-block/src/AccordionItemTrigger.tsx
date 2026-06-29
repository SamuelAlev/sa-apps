import { cn } from "@sa-apps/utilities";
import { ChevronRight } from "lucide-react";
import type { ReactElement } from "react";
import styles from "./AccordionItemTrigger.module.scss";
import type { AccordionItemTriggerProps } from "./types";

const PlusMinusIcon = ({ className }: { className?: string }): ReactElement => {
	return (
		<div>
			{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
			<svg
				className={cn(styles.triggerIcon, className)}
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<line className={styles.lineVertical} x1="12" y1="5" x2="12" y2="19" />

				<line className={styles.lineHorizontal} x1="5" y1="12" x2="19" y2="12" />
			</svg>
		</div>
	);
};

export const AccordionItemTrigger = ({ icon }: AccordionItemTriggerProps): ReactElement => {
	return (
		<>
			{icon === "plus" && <PlusMinusIcon />}

			{icon === "chevron-right" && <ChevronRight className={cn(styles.triggerIcon, styles.chevronRight)} aria-hidden />}

			{icon === "chevron-left" && <ChevronRight className={cn(styles.triggerIcon, styles.chevronLeft)} aria-hidden />}
		</>
	);
};
