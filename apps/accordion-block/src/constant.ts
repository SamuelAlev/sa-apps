import type { AccordionItem } from "./types";

export const DEFAULT_RTE_HEADING = '[{"type":"heading2","children":[{"text":""}]}]';
export const DEFAULT_RTE_CONTENT = '[{"type":"p","children":[{"text":""}]}]';

export const DEFAULT_ACCORDION_ITEM: Omit<AccordionItem, "id"> = {
	heading: DEFAULT_RTE_HEADING,
	content: DEFAULT_RTE_CONTENT,
};

export const itemBorderClasses =
	"border-[length:var(--accordion-items-border-disabled,var(--accordion-items-border-width))] [border-color:var(--accordion-items-border-disabled,var(--accordion-items-border-color))] border-style-[var(--accordion-items-border-disabled,var(--accordion-items-border-style))]";
export const headerPaddingClasses =
	"pt-[var(--accordion-item-heading-padding-top)] pr-[var(--accordion-item-heading-padding-right)] pb-[var(--accordion-item-heading-padding-bottom)] pl-[var(--accordion-item-heading-padding-left)] max-w-[calc(100%-var(--accordion-item-heading-padding-left)*2)]";
export const contentPaddingClasses =
	"pt-[var(--accordion-item-content-padding-top)] pr-[var(--accordion-item-content-padding-right)] pb-[var(--accordion-item-content-padding-bottom)] pl-[var(--accordion-item-content-padding-left)]";

export const triggerBorderClasses =
	"border-[length:var(--accordion-trigger-border-disabled,var(--accordion-trigger-border-width))] border-[color:var(--accordion-trigger-border-disabled,var(--accordion-trigger-border-color))] border-style-[var(--accordion-trigger-border-disabled,var(--accordion-trigger-border-style))]";
