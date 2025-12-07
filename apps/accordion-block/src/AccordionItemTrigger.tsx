import { cn } from "@sa-apps/utilities";
import { ChevronRight } from "lucide-react";
import type { ReactElement } from "react";

import { triggerBorderClasses } from "./constant";
import type { AccordionItemTriggerProps } from "./types";

const PlusMinusIcon = ({ className }: { className?: string }): ReactElement => {
	return (
		<div>
			{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
			<svg
				className={cn(
					"h-[var(--accordion-trigger-size)] max-h-[var(--accordion-trigger-size)] w-[var(--accordion-trigger-size)] max-w-[var(--accordion-trigger-size)] stroke-[number:var(--accordion-trigger-thickness)]",
					className,
				)}
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<line
					className="origin-center transition-transform duration-500 ease-out group-[[data-state='open']]/trigger:rotate-90 motion-reduce:transition-none"
					x1="12"
					y1="5"
					x2="12"
					y2="19"
				/>

				<line
					className="transition-opacity duration-300 ease-out group-[[data-state='open']]/trigger:opacity-0 group-[[data-state='open']]/trigger:ease-in motion-reduce:transition-none"
					x1="5"
					y1="12"
					x2="19"
					y2="12"
				/>
			</svg>
		</div>
	);
};

export const AccordionItemTrigger = ({ icon }: AccordionItemTriggerProps): ReactElement => {
	return (
		<>
			{icon === "plus" && <PlusMinusIcon className={triggerBorderClasses} />}

			{icon === "chevron-right" && (
				<ChevronRight
					className={cn(
						"h-[var(--accordion-trigger-size)] max-h-[var(--accordion-trigger-size)] w-[var(--accordion-trigger-size)] max-w-[var(--accordion-trigger-size)] stroke-[number:var(--accordion-trigger-thickness)] transition-transform ease-out group-[[data-state='open']]/trigger:rotate-90 motion-reduce:transition-none",
						triggerBorderClasses,
					)}
					aria-hidden
				/>
			)}

			{icon === "chevron-left" && (
				<ChevronRight
					className={cn(
						"h-[var(--accordion-trigger-size)] max-h-[var(--accordion-trigger-size)] w-[var(--accordion-trigger-size)] max-w-[var(--accordion-trigger-size)] rotate-180 stroke-[number:var(--accordion-trigger-thickness)] transition-transform ease-out group-[[data-state='open']]/trigger:rotate-90 motion-reduce:transition-none",
						triggerBorderClasses,
					)}
					aria-hidden
				/>
			)}
		</>
	);
};
