export type BlockSettings = {
    accordionItems?: AccordionItem[];
    gapCustomEnabled: boolean;
    gapSimple?: string;
    gapCustom?: string;
};

export type AccordionItem = {
    id: string;
    heading: string;
    content: string;
};

export type AccordionItemProps = AccordionItem & {
    readonly: boolean;
    onContentChange: (content: string) => void;
    onHeadingChange: (heading: string) => void;
    onDeleteClick?: () => void;
};

export type AddAccordionItemButtonProps = {
    onAdd: () => void;
};
