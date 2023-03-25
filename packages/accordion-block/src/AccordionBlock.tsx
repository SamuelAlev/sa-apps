/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import * as Accordion from '@radix-ui/react-accordion';
import { CSSProperties } from 'react';
import { ReactElement } from 'react';

import { AccordionItem } from './AccordionItem';
import { DEFAULT_ACCORDION_ITEM } from './constant';
import { isLastAccordionItemEmpty } from './helpers';
import type { BlockSettings } from './types';

export const AccordionBlock = ({ appBridge }: BlockProps): ReactElement => {
    const [blockSettings, setBlockSettings] = useBlockSettings<BlockSettings>(appBridge);
    const isEditing = useEditorState(appBridge);

    const accordionItems = blockSettings.accordionItems ?? [{ ...DEFAULT_ACCORDION_ITEM, id: `${Date.now()}` }];
    const isLastItemEmpty = accordionItems.length > 0 && isLastAccordionItemEmpty(accordionItems);

    const handleContentChange = (id: string, content: string) => {
        const accordionItemIndex = accordionItems.findIndex((accordionItem) => accordionItem.id === id);
        const newAccordionItems = structuredClone(accordionItems);
        if (accordionItemIndex !== -1) {
            newAccordionItems[accordionItemIndex].content = content;
        } else {
            newAccordionItems.push({ ...DEFAULT_ACCORDION_ITEM, id, content });
        }
        setBlockSettings({ ...blockSettings, accordionItems: newAccordionItems });
    };

    const handleHeadingChange = (id: string, heading: string) => {
        const accordionItemIndex = accordionItems.findIndex((accordionItem) => accordionItem.id === id);
        const newAccordionItems = structuredClone(accordionItems);
        if (accordionItemIndex !== -1) {
            newAccordionItems[accordionItemIndex].heading = heading;
        } else {
            newAccordionItems.push({ ...DEFAULT_ACCORDION_ITEM, id, heading });
        }
        setBlockSettings({ ...blockSettings, accordionItems: newAccordionItems });
    };

    const handleDeleteClick = (id: string) => {
        const accordionItemIndex = accordionItems.findIndex((accordionItem) => accordionItem.id === id);
        if (accordionItemIndex !== -1) {
            const newAccordionItems = structuredClone(accordionItems);
            newAccordionItems.splice(accordionItemIndex, 1);
            setBlockSettings({ ...blockSettings, accordionItems: newAccordionItems });
        }
    };

    const style = {
        '--accordion-gap': blockSettings.gapCustomEnabled ? blockSettings.gapCustom : blockSettings.gapSimple,
    } as CSSProperties;

    return (
        <Accordion.Root
            type="multiple"
            style={style}
            className="flex flex-col gap-[var(--accordion-gap)]"
            data-test-id="accordion-block"
        >
            {[
                ...accordionItems,
                ...(!isLastItemEmpty && isEditing ? [{ ...DEFAULT_ACCORDION_ITEM, id: `${Date.now()}` }] : []),
            ].map((accordionItem) => (
                <AccordionItem
                    key={accordionItem.id}
                    onHeadingChange={(value) => handleHeadingChange(accordionItem.id, value)}
                    onContentChange={(value) => handleContentChange(accordionItem.id, value)}
                    onDeleteClick={
                        accordionItems.length > 0 && isEditing ? () => handleDeleteClick(accordionItem.id) : undefined
                    }
                    readonly={!isEditing}
                    {...accordionItem}
                />
            ))}
        </Accordion.Root>
    );
};
