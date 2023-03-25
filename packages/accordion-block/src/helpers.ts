import { DEFAULT_RTE_CONTENT, DEFAULT_RTE_HEADING } from './constant';
import type { AccordionItem } from './types';

export const isLastAccordionItemEmpty = (accordionItems: AccordionItem[]) =>
    isAccordionItemEmpty(accordionItems[accordionItems.length - 1]);

export const isAccordionItemEmpty = (accordionItem: AccordionItem) =>
    accordionItem.heading === DEFAULT_RTE_HEADING && accordionItem.content === DEFAULT_RTE_CONTENT;
