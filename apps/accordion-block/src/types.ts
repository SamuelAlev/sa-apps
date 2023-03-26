export type BlockSettings = {
    accordionItems?: AccordionItem[];

    accordionMultiple: boolean;

    gapCustomEnabled: boolean;
    gapSimple?: '0px' | '8px' | '16px' | '24px';
    gapCustom?: string;

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
};

export type AccordionItemProps = AccordionItem & {
    readonly: boolean;
    triggerIcon: 'plus' | 'chevron-right' | 'chevron-left';
    triggerDirection: 'left' | 'right';
    onContentChange: (content: string) => void;
    onHeadingChange: (heading: string) => void;
    onDeleteClick?: () => void;
};

export type AccordionItemTriggerProps = {
    icon: 'plus' | 'chevron-right' | 'chevron-left';
};
