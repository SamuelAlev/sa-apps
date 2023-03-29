import { Button, Popover, PopoverContent, PopoverTrigger, RichTextEditor, cn } from '@sa-apps/shared';
import * as Accordion from '@radix-ui/react-accordion';
import { MouseEvent, ReactElement, useState } from 'react';
import { Menu } from 'lucide-react';

import { AccordionItemProps } from './types';
import { isAccordionItemEmpty, rgbaObjectToString } from './helpers';
import { AccordionItemTrigger } from './AccordionItemTrigger';
import { AccordionItemPopoverContent } from './AccordionItemPopoverContent';

export const AccordionItem = ({
    id,
    triggerIcon,
    triggerDirection,
    heading,
    content,
    readonly,
    style,
    onHeadingChange,
    onContentChange,
    onStyleChange,
    onDeleteClick,
}: AccordionItemProps): ReactElement => {
    const [isOpen, setIsOpen] = useState(false);
    const isEmpty = isAccordionItemEmpty({ id, heading, content });

    const handleDeleteClick = (event: MouseEvent) => {
        event.stopPropagation();
        onDeleteClick?.();
    };

    const handleStyleChange = (newStyle: Partial<AccordionItemProps['style']>) => {
        onStyleChange?.(newStyle);
    };

    const handleTriggerClick = (event: MouseEvent) => {
        event.stopPropagation();
        setIsOpen((isOpen) => !isOpen);
    };

    return (
        <Accordion.Item
            id={id}
            data-test-id={`accordion-item-${id}`}
            value={id}
            className="group/accordionItem"
            style={{ backgroundColor: style?.backgroundColor ? rgbaObjectToString(style.backgroundColor) : undefined }}
        >
            <Accordion.Header
                className="px-[var(--accordion-item-heading-padding-horizontal)] py-[var(--accordion-item-heading-padding-vertical)]"
                data-test-id="accordion-item-heading"
            >
                <Accordion.Trigger
                    className="group/trigger w-full flex gap-2 items-center group ltr:flex-row rtl:flex-row-reverse"
                    data-test-id="accordion-item-trigger"
                >
                    {triggerDirection === 'left' && <AccordionItemTrigger icon={triggerIcon} />}

                    <div className="hidden rtl:flex rtl:flex-grow" />

                    <RichTextEditor id={id} content={heading} readonly={readonly} onTextChange={onHeadingChange} />

                    <div className="flex flex-grow rtl:hidden" />

                    {triggerDirection === 'right' && <AccordionItemTrigger icon={triggerIcon} />}

                    {onDeleteClick && !isEmpty ? (
                        <div className="relative invisible">
                            <Popover open={isOpen}>
                                <PopoverTrigger
                                    onClick={handleTriggerClick}
                                    className={cn(
                                        'absolute -translate-y-1/2 invisible',
                                        !readonly && 'group-hover/accordionItem:visible expanded:visible'
                                    )}
                                >
                                    <Button variant="outline" size="sm">
                                        <Menu className="max-w-[20px] w-[20px] max-h-[20px] h-[20px] text-inherit" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent onClick={(event) => event.stopPropagation()}>
                                    <AccordionItemPopoverContent
                                        style={style}
                                        onStyleChange={handleStyleChange}
                                        onDeleteClick={handleDeleteClick}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    ) : null}
                </Accordion.Trigger>
            </Accordion.Header>

            <Accordion.Content
                data-test-id="accordion-item-content"
                className="accordionContent px-[var(--accordion-item-content-padding-horizontal)] py-[var(--accordion-item-content-padding-vertical)]"
            >
                <RichTextEditor id={id} content={content} readonly={readonly} onTextChange={onContentChange} />
            </Accordion.Content>
        </Accordion.Item>
    );
};
