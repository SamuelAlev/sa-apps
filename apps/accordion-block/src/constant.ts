import type { AccordionItem } from './types';

export const DEFAULT_RTE_HEADING = '[{"type":"heading2","children":[{"text":""}]}]';
export const DEFAULT_RTE_CONTENT = '[{"type":"p","children":[{"text":""}]}]';

export const DEFAULT_ACCORDION_ITEM: Omit<AccordionItem, 'id'> = {
    heading: DEFAULT_RTE_HEADING,
    content: DEFAULT_RTE_CONTENT,
};
