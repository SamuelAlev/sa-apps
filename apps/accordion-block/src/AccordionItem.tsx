import { Button, RichTextEditor } from '@sa-apps/shared';
import * as Accordion from '@radix-ui/react-accordion';
import { MouseEvent, ReactElement } from 'react';
import { Trash } from 'lucide-react';

import { AccordionItemProps } from './types';
import { isAccordionItemEmpty } from './helpers';
import { AccordionItemTrigger } from './AccordionItemTrigger';

export const AccordionItem = ({
    id,
    triggerIcon,
    triggerDirection,
    heading,
    content,
    readonly,
    onHeadingChange,
    onContentChange,
    onDeleteClick,
}: AccordionItemProps): ReactElement => {
    const isEmpty = isAccordionItemEmpty({ id, heading, content });

    const handleDeleteClick = (event: MouseEvent) => {
        event.stopPropagation();
        onDeleteClick?.();
    };

    return (
        <Accordion.Item id={id} data-test-id={`accordion-item-${id}`} value={id} className="group/accordionItem">
            <Accordion.Header className="!mb-0" data-test-id="accordion-item-heading">
                <Accordion.Trigger
                    className="group/trigger w-full flex gap-2 items-center group ltr:flex-row rtl:flex-row-reverse"
                    data-test-id="accordion-item-trigger"
                >
                    {triggerDirection === 'left' && <AccordionItemTrigger icon={triggerIcon} />}

                    <div className="flex-none rtl:flex-grow" />

                    <RichTextEditor id={id} content={heading} readonly={readonly} onTextChange={onHeadingChange} />

                    <div className="flex-grow rtl:flex-none" />

                    {triggerDirection === 'right' && <AccordionItemTrigger icon={triggerIcon} />}

                    {onDeleteClick && !isEmpty ? (
                        <div
                            className={`absolute hidden group-hover/accordionItem:block ${
                                triggerDirection === 'right'
                                    ? 'right-10 rtl:left-0 rtl:right-auto'
                                    : 'right-0 rtl:left-10 rtl:right-auto'
                            }`}
                        >
                            <Button onClick={handleDeleteClick} variant="outline" size="sm">
                                <Trash className="max-w-[20px] w-[20px] max-h-[20px] h-[20px] text-inherit" />
                            </Button>
                        </div>
                    ) : null}
                </Accordion.Trigger>
            </Accordion.Header>

            <Accordion.Content data-test-id="accordion-item-content" className="accordionContent">
                <RichTextEditor id={id} content={content} readonly={readonly} onTextChange={onContentChange} />
            </Accordion.Content>
        </Accordion.Item>
    );
};
