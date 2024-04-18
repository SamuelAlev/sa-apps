import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import type { BlockProps } from '@frontify/guideline-blocks-settings';
import * as Accordion from '@radix-ui/react-accordion';
import { useBlockFocus } from '@sa-apps/blocks';
import type { DragEndEvent } from '@sa-apps/drag-and-drop';
import { DragAndDropSortableContext, VerticalItem } from '@sa-apps/drag-and-drop';
import { OnlineUsersProvider } from '@sa-apps/online-users';
import { trackEvent } from '@sa-apps/tracking';
import { arrayMove } from '@sa-apps/utilities';
import type { ReactElement } from 'react';

import { AccordionItem } from './AccordionItem';
import { DEFAULT_ACCORDION_ITEM, DEFAULT_RTE_CONTENT, DEFAULT_RTE_HEADING } from './constant';
import { getAccordionRootStyles, getNewAccordionItemId, isLastAccordionItemEmpty } from './helpers';
import type { AccordionItem as AccordionItemType, BlockSettings } from './types';

export const AccordionBlock = ({ appBridge }: BlockProps): ReactElement => {
    const [blockSettings, setBlockSettings] = useBlockSettings<BlockSettings>(appBridge);
    const isEditing = useEditorState(appBridge);

    const isBlockFocused = useBlockFocus(appBridge);
    const roomName = `mermaid-block-${appBridge.context('blockId').get()}`;

    const accordionItems = blockSettings.accordionItems ?? [];
    const isAccordionItemsEmpty = accordionItems.length === 0;
    const isLastItemEmpty = !isAccordionItemsEmpty && isLastAccordionItemEmpty(accordionItems);

    const handleContentChange = (id: string, content: string) => {
        const accordionItemIndex = accordionItems.findIndex((accordionItem) => accordionItem.id === id);
        const newAccordionItems = structuredClone(accordionItems);
        if (accordionItemIndex !== -1) {
            newAccordionItems[accordionItemIndex].content = content;
        } else {
            newAccordionItems.push({ ...DEFAULT_ACCORDION_ITEM, id, content });
        }

        setBlockSettings({
            ...blockSettings,
            accordionItems: newAccordionItems,
        }).catch(() => console.error("Couldn't save the block setttings"));
    };

    const handleHeadingChange = (id: string, heading: string) => {
        const accordionItemIndex = accordionItems.findIndex((accordionItem) => accordionItem.id === id);
        const newAccordionItems = structuredClone(accordionItems);
        if (accordionItemIndex !== -1) {
            newAccordionItems[accordionItemIndex].heading = heading;
        } else {
            newAccordionItems.push({ ...DEFAULT_ACCORDION_ITEM, id, heading });
        }

        setBlockSettings({
            ...blockSettings,
            accordionItems: newAccordionItems,
        }).catch(() => console.error("Couldn't save the block setttings"));
    };

    const handleDeleteClick = (id: string) => {
        const accordionItemIndex = accordionItems.findIndex((accordionItem) => accordionItem.id === id);
        if (accordionItemIndex !== -1) {
            const newAccordionItems = structuredClone(accordionItems);
            newAccordionItems.splice(accordionItemIndex, 1);

            setBlockSettings({
                ...blockSettings,
                accordionItems: newAccordionItems,
            }).catch(() => console.error("Couldn't save the block setttings"));

            trackEvent('deleted item');
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        const oldIndex = accordionItems.findIndex((accordionItem) => accordionItem.id === active.id);
        const newIndex = accordionItems.findIndex((accordionItem) => accordionItem.id === over?.id);

        if (over && active.id !== over.id && oldIndex !== undefined && newIndex !== undefined) {
            setBlockSettings({
                ...blockSettings,
                accordionItems: arrayMove(accordionItems, oldIndex, newIndex),
            }).catch(() => console.error("Couldn't save the block setttings"));

            trackEvent('drag and dropped item');
        }
    };

    const handleStyleChange = (id: string, style: Partial<AccordionItemType['style']>) => {
        const accordionItemIndex = accordionItems.findIndex((accordionItem) => accordionItem.id === id);
        const newAccordionItems = structuredClone(accordionItems);
        if (accordionItemIndex !== -1) {
            newAccordionItems[accordionItemIndex].style = {
                ...newAccordionItems[accordionItemIndex].style,
                ...style,
            };
        } else {
            newAccordionItems.push({ ...DEFAULT_ACCORDION_ITEM, id, style });
        }
        setBlockSettings({
            ...blockSettings,
            accordionItems: newAccordionItems,
        }).catch(() => console.error("Couldn't save the block setttings"));
    };

    return (
        <OnlineUsersProvider
            visible={isEditing}
            isUserVisible={isBlockFocused}
            roomName={roomName}
            // @ts-expect-error the hook makes a fetch request :(
            user={{ name: window.application.sandbox.config.context.user.name, avatar: window.application.sandbox.config.context.user.preview_url_without_placeholder }}
        >
            <DragAndDropSortableContext strategy="vertical-list" items={accordionItems} onDragEnd={handleDragEnd}>
                <Accordion.Root
                    {...(blockSettings.accordionMultiple ? { type: 'multiple' } : { type: 'single', collapsible: true })}
                    style={getAccordionRootStyles(blockSettings)}
                    className="flex flex-col gap-[var(--accordion-items-gap)]"
                    data-test-id="accordion-block"
                >
                    {accordionItems.map((accordionItem) => (
                        <VerticalItem key={accordionItem.id} id={accordionItem.id} disabled={!isEditing}>
                            <AccordionItem
                                appBridge={appBridge}
                                triggerIcon={blockSettings.triggerIcon}
                                triggerDirection={blockSettings.triggerDirection}
                                onHeadingChange={(value) => handleHeadingChange(accordionItem.id, value)}
                                onContentChange={(value) => handleContentChange(accordionItem.id, value)}
                                onStyleChange={(value) => handleStyleChange(accordionItem.id, value)}
                                onDeleteClick={() => handleDeleteClick(accordionItem.id)}
                                readonly={!isEditing}
                                {...accordionItem}
                            />
                        </VerticalItem>
                    ))}

                    {(!isLastItemEmpty || isAccordionItemsEmpty) && isEditing && (
                        <AccordionItem
                            appBridge={appBridge}
                            id={getNewAccordionItemId()}
                            triggerIcon={blockSettings.triggerIcon}
                            triggerDirection={blockSettings.triggerDirection}
                            onHeadingChange={(value) => value !== DEFAULT_RTE_HEADING && handleHeadingChange(getNewAccordionItemId(), value)}
                            onContentChange={(value) => value !== DEFAULT_RTE_CONTENT && handleContentChange(getNewAccordionItemId(), value)}
                            onStyleChange={(value) => handleStyleChange(getNewAccordionItemId(), value)}
                            readonly={false}
                            {...DEFAULT_ACCORDION_ITEM}
                        />
                    )}
                </Accordion.Root>
            </DragAndDropSortableContext>
        </OnlineUsersProvider>
    );
};
