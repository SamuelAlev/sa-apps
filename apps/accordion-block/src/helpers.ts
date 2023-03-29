import type { CSSProperties } from 'react';

import type { AccordionItem, BlockSettings } from './types';
import { DEFAULT_RTE_CONTENT, DEFAULT_RTE_HEADING } from './constant';

export const isLastAccordionItemEmpty = (accordionItems: AccordionItem[]) =>
    isAccordionItemEmpty(accordionItems[accordionItems.length - 1]);

export const isAccordionItemEmpty = (accordionItem: AccordionItem) =>
    accordionItem.heading === DEFAULT_RTE_HEADING && accordionItem.content === DEFAULT_RTE_CONTENT;

export const getAccordionRootStyles = (blockSettings: BlockSettings) =>
    ({
        '--accordion-item-heading-padding-horizontal': blockSettings.itemHeadingPaddingHorizontal,
        '--accordion-item-heading-padding-vertical': blockSettings.itemHeadingPaddingVertical,
        '--accordion-item-content-padding-horizontal': blockSettings.itemContentPaddingHorizontal,
        '--accordion-item-content-padding-vertical': blockSettings.itemContentPaddingVertical,
        '--accordion-gap': blockSettings.itemGapCustomEnabled
            ? blockSettings.itemGapCustom
            : blockSettings.itemGapSimple,
        '--accordion-trigger-size': blockSettings.triggerSizeCustomEnabled
            ? blockSettings.triggerSizeCustom
            : blockSettings.triggerSizeSimple,
        '--accordion-trigger-thickness': blockSettings.triggerThicknessCustomEnabled
            ? blockSettings.triggerThicknessCustom
            : blockSettings.triggerThicknessSimple,
    } as CSSProperties);

export const getNewAccordionItemId = () => Date.now().toString();

export const rgbaObjectToString = (color: { r: number; g: number; b: number; a: number }) =>
    `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
