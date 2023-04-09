import { Asset } from '@frontify/app-bridge';

export type BlockSettings = {
    masonryItems?: MasonryItem[];

    itemsGapCustomEnabled: boolean;
    itemsGapSimple?: '0px' | '8px' | '16px' | '24px';
    itemsGapCustom?: string;

    columnsCountCustomEnabled: boolean;
    columnsCountSimple: '1' | '2' | '3';
    columnsCountCustom: string;

    itemContentPaddingTop: string;
    itemContentPaddingRight: string;
    itemContentPaddingBottom: string;
    itemContentPaddingLeft: string;

    itemsBorderEnabled: boolean;
    itemsBorderStyle: 'solid' | 'dashed' | 'dotted';
    itemsBorderWidth: string;
    itemsBorderColor: { r: number; g: number; b: number; a: number };

    itemsCornerRadiusCustomEnabled: boolean;
    itemsCornerRadiusSimple: '0px' | '4px' | '8px' | '16px';
    itemsCornerRadiusCustomTopLeft: string;
    itemsCornerRadiusCustomTopRight: string;
    itemsCornerRadiusCustomBottomRight: string;
    itemsCornerRadiusCustomBottomLeft: string;
};

export type MasonryItem = {
    id: string;
    content: string;

    style?: {
        height?: number;
        backgroundColor?: { r: number; g: number; b: number; a: number };
    };
};

export type MasonryItemProps = MasonryItem & {
    coverAsset?: Asset;
    readonly: boolean;
    onContentChange: (content: string) => void;
    onStyleChange: (style: MasonryItem['style']) => void;
    onDeleteClick?: () => void;
    onUploadClick: () => void;
    onBrowseAssetClick: () => void;
};
