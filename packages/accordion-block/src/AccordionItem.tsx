import './styles.css';

import { Button, RichTextEditor } from '@sablocks/shared';
import * as Accordion from '@radix-ui/react-accordion';
import { ReactElement } from 'react';
import { ChevronRight, Trash } from 'lucide-react';

import { AccordionItemProps } from './types';
import { isAccordionItemEmpty } from './helpers';

export const AccordionItem = ({
    id,
    heading,
    content,
    readonly,
    onHeadingChange,
    onContentChange,
    onDeleteClick,
}: AccordionItemProps): ReactElement => {
    const isEmpty = isAccordionItemEmpty({ id, heading, content });

    return (
        <Accordion.Item id={id} data-test-id={`accordion-item-${id}`} value={id} className="group/accordionItem">
            <Accordion.Header className="!mb-0" data-test-id="accordion-item-heading">
                <Accordion.Trigger
                    className="group/trigger w-full flex gap-2 items-center group"
                    data-test-id="accordion-item-trigger"
                >
                    <ChevronRight
                        className="max-w-[16px] w-[16px] max-h-[16px] h-[16px] group-[[data-state='open']]/trigger:rotate-90 transition-transform ease-out motion-reduce:transition-none"
                        aria-hidden
                    />

                    <RichTextEditor id={id} content={heading} readonly={readonly} onTextChange={onHeadingChange} />

                    {onDeleteClick && !isEmpty ? (
                        <>
                            <div className="flex-grow" />
                            <div className="absolute right-0 hidden group-hover/accordionItem:block">
                                <Button onClick={onDeleteClick} variant="outline" size="sm">
                                    <Trash className="max-w-[16px] w-[16px] max-h-[16px] h-[16px] text-inherit" />
                                </Button>
                            </div>
                        </>
                    ) : null}
                </Accordion.Trigger>
            </Accordion.Header>

            <Accordion.Content data-test-id="accordion-item-content" className="accordionContent">
                <RichTextEditor id={id} content={content} readonly={readonly} onTextChange={onContentChange} />
            </Accordion.Content>
        </Accordion.Item>
    );
};
