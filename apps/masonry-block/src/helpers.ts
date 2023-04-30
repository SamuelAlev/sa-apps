import type { CSSProperties } from 'react';

import type { useBlockAssets } from '@frontify/app-bridge';
import type { BlockSettings, MasonryItem } from './types';
import { DEFAULT_RTE_CONTENT } from './constant';

export const isLastMasonryItemEmpty = (
    masonryItems: MasonryItem[],
    blockAssets: ReturnType<typeof useBlockAssets>['blockAssets']
) => isMasonryItemEmpty(masonryItems[masonryItems.length - 1], blockAssets);

export const isMasonryItemEmpty = (
    masonryItem: MasonryItem,
    blockAssets: ReturnType<typeof useBlockAssets>['blockAssets']
) => masonryItem.content === DEFAULT_RTE_CONTENT && blockAssets[`masonry-item-${masonryItem.id}`] === undefined;

export const getMasonryRootStyles = (blockSettings: BlockSettings) =>
    ({
        '--masonry-items-gap': blockSettings.itemsGapCustomEnabled
            ? blockSettings.itemsGapCustom
            : blockSettings.itemsGapSimple,

        '--masonry-item-content-padding-top': blockSettings.itemContentPaddingCustomEnabled
            ? blockSettings.itemContentPaddingTop
            : blockSettings.itemContentPaddingSimple,
        '--masonry-item-content-padding-right': blockSettings.itemContentPaddingCustomEnabled
            ? blockSettings.itemContentPaddingRight
            : blockSettings.itemContentPaddingSimple,
        '--masonry-item-content-padding-bottom': blockSettings.itemContentPaddingCustomEnabled
            ? blockSettings.itemContentPaddingBottom
            : blockSettings.itemContentPaddingSimple,
        '--masonry-item-content-padding-left': blockSettings.itemContentPaddingCustomEnabled
            ? blockSettings.itemContentPaddingLeft
            : blockSettings.itemContentPaddingSimple,

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

export const prepareVideoUrl = (url: string) => {
    const urlObj = new URL(url);
    urlObj.searchParams.set('format', 'mp4');
    return urlObj.toString();
};

export const prepareImageUrl = (url: string) => {
    const urlObj = new URL(url);
    urlObj.searchParams.set('width', '1280');
    urlObj.searchParams.set('format', 'webp');
    return urlObj.toString();
};
