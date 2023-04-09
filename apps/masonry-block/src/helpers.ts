import { CSSProperties } from 'react';

import type { BlockSettings, MasonryItem } from './types';
import { DEFAULT_RTE_CONTENT } from './constant';
import { useBlockAssets } from '@frontify/app-bridge';

export const isLastMasonryItemEmpty = (
    masonryItems: MasonryItem[],
    blockAssets: ReturnType<typeof useBlockAssets>['blockAssets']
) => isMasonryItemEmpty(masonryItems[masonryItems.length - 1], blockAssets);

export const isMasonryItemEmpty = (
    masonryItem: MasonryItem,
    blockAssets: ReturnType<typeof useBlockAssets>['blockAssets']
) => masonryItem.content === DEFAULT_RTE_CONTENT && !blockAssets[`mansory-item-${masonryItem.id}`] !== undefined;

export const getMasonryRootStyles = (blockSettings: BlockSettings) =>
    ({
        '--masonry-items-gap': blockSettings.itemsGapCustomEnabled
            ? blockSettings.itemsGapCustom
            : blockSettings.itemsGapSimple,

        '--masonry-item-content-padding-top': blockSettings.itemContentPaddingTop,
        '--masonry-item-content-padding-right': blockSettings.itemContentPaddingRight,
        '--masonry-item-content-padding-bottom': blockSettings.itemContentPaddingBottom,
        '--masonry-item-content-padding-left': blockSettings.itemContentPaddingLeft,

        '--masonry-items-border-disabled': blockSettings.itemsBorderEnabled ? undefined : '0',
        '--masonry-items-border-style': blockSettings.itemsBorderStyle,
        '--masonry-items-border-width': blockSettings.itemsBorderWidth,
        '--masonry-items-border-color': blockSettings.itemsBorderColor
            ? rgbaObjectToString(blockSettings.itemsBorderColor)
            : undefined,

        '--masonry-items-corner-radius-top-left': blockSettings.itemsCornerRadiusCustomEnabled
            ? blockSettings.itemsCornerRadiusCustomTopLeft
            : blockSettings.itemsCornerRadiusSimple,

        '--masonry-items-corner-radius-top-right': blockSettings.itemsCornerRadiusCustomEnabled
            ? blockSettings.itemsCornerRadiusCustomTopRight
            : blockSettings.itemsCornerRadiusSimple,

        '--masonry-items-corner-radius-bottom-right': blockSettings.itemsCornerRadiusCustomEnabled
            ? blockSettings.itemsCornerRadiusCustomBottomRight
            : blockSettings.itemsCornerRadiusSimple,

        '--masonry-items-corner-radius-bottom-left': blockSettings.itemsCornerRadiusCustomEnabled
            ? blockSettings.itemsCornerRadiusCustomBottomLeft
            : blockSettings.itemsCornerRadiusSimple,
    } as CSSProperties);

export const getNewMasonryItemId = () => Date.now().toString();

export const rgbaObjectToString = (color: { r: number; g: number; b: number; a: number }) =>
    `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
