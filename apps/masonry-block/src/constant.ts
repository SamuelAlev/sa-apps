import type { MasonryItem } from './types';

export const DEFAULT_RTE_CONTENT = '[{"type":"p","children":[{"text":""}]}]';

export const DEFAULT_MASONRY_ITEM: Omit<MasonryItem, 'id'> = {
    content: DEFAULT_RTE_CONTENT,
    style: {
        height: 400,
        backgroundColor: { r: 50, g: 50, b: 50, a: 1 },
    },
};

export const itemBorderClasses =
    'border-[length:var(--masonry-items-border-disabled,var(--masonry-items-border-width))] border-[color:var(--masonry-items-border-disabled,var(--masonry-items-border-color))] border-style-[var(--masonry-items-border-disabled,var(--masonry-items-border-style))]';

export const contentPaddingClasses =
    'pt-[var(--masonry-item-content-padding-top)] pr-[var(--masonry-item-content-padding-right)] pb-[var(--masonry-item-content-padding-bottom)] pl-[var(--masonry-item-content-padding-left)]';

export const itemCornerRadiusClasses =
    'rounded-tl-[var(--masonry-items-corner-radius-top-left)] rounded-tr-[var(--masonry-items-corner-radius-top-right)] rounded-bl-[var(--masonry-items-corner-radius-bottom-left)] rounded-br-[var(--masonry-items-corner-radius-bottom-right)]';
