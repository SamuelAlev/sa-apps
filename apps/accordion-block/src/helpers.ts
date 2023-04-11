import type { CSSProperties } from 'react';

import type { AccordionItem, BlockSettings } from './types';
import { DEFAULT_RTE_CONTENT, DEFAULT_RTE_HEADING } from './constant';

export const isLastAccordionItemEmpty = (accordionItems: AccordionItem[]) =>
    isAccordionItemEmpty(accordionItems[accordionItems.length - 1]);

export const isAccordionItemEmpty = (accordionItem: AccordionItem) =>
    accordionItem.heading === DEFAULT_RTE_HEADING && accordionItem.content === DEFAULT_RTE_CONTENT;

export const getAccordionRootStyles = (blockSettings: BlockSettings) =>
    ({
        '--accordion-item-heading-padding-top': blockSettings.itemHeadingPaddingCustomEnabled
            ? blockSettings.itemHeadingPaddingTop
            : blockSettings.itemHeadingPaddingSimple,
        '--accordion-item-heading-padding-right': blockSettings.itemHeadingPaddingCustomEnabled
            ? blockSettings.itemHeadingPaddingRight
            : blockSettings.itemHeadingPaddingSimple,
        '--accordion-item-heading-padding-bottom': blockSettings.itemHeadingPaddingCustomEnabled
            ? blockSettings.itemHeadingPaddingBottom
            : blockSettings.itemHeadingPaddingSimple,
        '--accordion-item-heading-padding-left': blockSettings.itemHeadingPaddingCustomEnabled
            ? blockSettings.itemHeadingPaddingLeft
            : blockSettings.itemHeadingPaddingSimple,

        '--accordion-item-content-padding-top': blockSettings.itemContentPaddingCustomEnabled
            ? blockSettings.itemContentPaddingTop
            : blockSettings.itemContentPaddingSimple,
        '--accordion-item-content-padding-right': blockSettings.itemContentPaddingCustomEnabled
            ? blockSettings.itemContentPaddingRight
            : blockSettings.itemContentPaddingSimple,
        '--accordion-item-content-padding-bottom': blockSettings.itemContentPaddingCustomEnabled
            ? blockSettings.itemContentPaddingBottom
            : blockSettings.itemContentPaddingSimple,
        '--accordion-item-content-padding-left': blockSettings.itemContentPaddingCustomEnabled
            ? blockSettings.itemContentPaddingLeft
            : blockSettings.itemContentPaddingSimple,

        '--accordion-items-border-disabled': blockSettings.itemsBorderEnabled ? undefined : '0',
        '--accordion-items-border-style': blockSettings.itemsBorderStyle,
        '--accordion-items-border-width': blockSettings.itemsBorderWidth,
        '--accordion-items-border-color': blockSettings.itemsBorderColor
            ? rgbaObjectToString(blockSettings.itemsBorderColor)
            : undefined,

        '--accordion-trigger-border-disabled': blockSettings.triggerBorderEnabled ? undefined : '0',
        '--accordion-trigger-border-style': blockSettings.triggerBorderStyle,
        '--accordion-trigger-border-width': blockSettings.triggerBorderWidth,
        '--accordion-trigger-border-color': blockSettings.triggerBorderColor
            ? rgbaObjectToString(blockSettings.triggerBorderColor)
            : undefined,

        '--accordion-items-gap': blockSettings.itemsGapCustomEnabled
            ? blockSettings.itemsGapCustom
            : blockSettings.itemsGapSimple,
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
