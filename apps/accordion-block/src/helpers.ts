import type { CSSProperties } from 'react';

import type { AccordionItem, BlockSettings } from './types';
import { DEFAULT_RTE_CONTENT, DEFAULT_RTE_HEADING } from './constant';

export const isLastAccordionItemEmpty = (accordionItems: AccordionItem[]) =>
    isAccordionItemEmpty(accordionItems[accordionItems.length - 1]);

export const isAccordionItemEmpty = (accordionItem: AccordionItem) =>
    accordionItem.heading === DEFAULT_RTE_HEADING && accordionItem.content === DEFAULT_RTE_CONTENT;

export const getAccordionRootStyles = (blockSettings: BlockSettings) =>
    ({
        '--accordion-gap': blockSettings.gapCustomEnabled ? blockSettings.gapCustom : blockSettings.gapSimple,
        '--accordion-trigger-size': blockSettings.triggerSizeCustomEnabled
            ? blockSettings.triggerSizeCustom
            : blockSettings.triggerSizeSimple,
        '--accordion-trigger-thickness': blockSettings.triggerThicknessCustomEnabled
            ? blockSettings.triggerThicknessCustom
            : blockSettings.triggerThicknessSimple,
    } as CSSProperties);
