import './styles.css';

import { ReactElement } from 'react';
import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import * as Accordion from '@radix-ui/react-accordion';
import { DragAndDropSortableContext, DragEndEvent, SortableItem, arrayMove } from '@sa-apps/shared';

import { AccordionItem } from './AccordionItem';
import { DEFAULT_ACCORDION_ITEM, DEFAULT_RTE_CONTENT, DEFAULT_RTE_HEADING } from './constant';
import { getAccordionRootStyles, getNewAccordionItemId, isLastAccordionItemEmpty } from './helpers';
import type { AccordionItem as AccordionItemType, BlockSettings } from './types';

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

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        const oldIndex = accordionItems.findIndex((accordionItem) => accordionItem.id === active.id);
        const newIndex = accordionItems.findIndex((accordionItem) => accordionItem.id === over?.id);

        if (over && active.id !== over.id && oldIndex !== undefined && newIndex !== undefined) {
            const newAccordionItems = structuredClone(accordionItems);
            setBlockSettings({ ...blockSettings, accordionItems: arrayMove(newAccordionItems, oldIndex, newIndex) });
        }
    };

    const handleStyleChange = (id: string, style: Partial<AccordionItemType['style']>) => {
        const accordionItemIndex = accordionItems.findIndex((accordionItem) => accordionItem.id === id);
        const newAccordionItems = structuredClone(accordionItems);
        if (accordionItemIndex !== -1) {
            newAccordionItems[accordionItemIndex].style = { ...newAccordionItems[accordionItemIndex].style, ...style };
        } else {
            newAccordionItems.push({ ...DEFAULT_ACCORDION_ITEM, id, style });
        }
        setBlockSettings({ ...blockSettings, accordionItems: newAccordionItems });
    };

    return (
        <DragAndDropSortableContext items={accordionItems} onDragEnd={handleDragEnd}>
            <Accordion.Root
                {...(blockSettings.accordionMultiple ? { type: 'multiple' } : { type: 'single', collapsible: true })}
                style={getAccordionRootStyles(blockSettings)}
                className="flex flex-col gap-[var(--accordion-gap)]"
                data-test-id="accordion-block"
            >
                {accordionItems.map((accordionItem, index) => (
                    <SortableItem
                        key={accordionItem.id}
                        id={accordionItem.id}
                        disabled={(index === accordionItems.length && isEditing) || !isEditing}
                    >
                        <AccordionItem
                            triggerIcon={blockSettings.triggerIcon}
                            triggerDirection={blockSettings.triggerDirection}
                            onHeadingChange={(value) => handleHeadingChange(accordionItem.id, value)}
                            onContentChange={(value) => handleContentChange(accordionItem.id, value)}
                            onStyleChange={(value) => handleStyleChange(accordionItem.id, value)}
                            onDeleteClick={() => handleDeleteClick(accordionItem.id)}
                            readonly={!isEditing}
                            {...accordionItem}
                        />
                    </SortableItem>
                ))}

                {!isLastItemEmpty && isEditing && (
                    <AccordionItem
                        id={getNewAccordionItemId()}
                        triggerIcon={blockSettings.triggerIcon}
                        triggerDirection={blockSettings.triggerDirection}
                        onHeadingChange={(value) =>
                            value !== DEFAULT_RTE_HEADING && handleHeadingChange(getNewAccordionItemId(), value)
                        }
                        onContentChange={(value) =>
                            value !== DEFAULT_RTE_CONTENT && handleContentChange(getNewAccordionItemId(), value)
                        }
                        onStyleChange={(value) => handleStyleChange(getNewAccordionItemId(), value)}
                        readonly={false}
                        {...DEFAULT_ACCORDION_ITEM}
                    />
                )}
            </Accordion.Root>
        </DragAndDropSortableContext>
    );
};
