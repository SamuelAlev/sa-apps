export type BlockSettings = {
    accordionItems?: AccordionItem[];

    accordionMultiple: boolean;

    itemGapCustomEnabled: boolean;
    itemGapSimple?: '0px' | '8px' | '16px' | '24px';
    itemGapCustom?: string;

    itemHeadingPaddingHorizontal: string;
    itemHeadingPaddingVertical: string;
    itemContentPaddingHorizontal: string;
    itemContentPaddingVertical: string;

    triggerIcon: 'plus' | 'chevron-right' | 'chevron-left';

    triggerSizeCustomEnabled: boolean;
    triggerSizeSimple?: '16px' | '24px' | '32px';
    triggerSizeCustom?: string;

    triggerThicknessCustomEnabled: boolean;
    triggerThicknessSimple?: '1px' | '2px' | '4px';
    triggerThicknessCustom?: string;

    triggerDirection: 'left' | 'right';
};

export type AccordionItem = {
    id: string;
    heading: string;
    content: string;

    style?: {
        backgroundColor?: { r: number; g: number; b: number; a: number };
    };
};

export type AccordionItemProps = AccordionItem & {
    readonly: boolean;
    triggerIcon: 'plus' | 'chevron-right' | 'chevron-left';
    triggerDirection: 'left' | 'right';
    onContentChange: (content: string) => void;
    onHeadingChange: (heading: string) => void;
    onStyleChange: (style: AccordionItem['style']) => void;
    onDeleteClick?: () => void;
};

export type AccordionItemTriggerProps = {
    icon: 'plus' | 'chevron-right' | 'chevron-left';
};
