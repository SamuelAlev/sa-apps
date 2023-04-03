import { Button, Popover, PopoverContent, PopoverTrigger, RichTextEditor, cn } from '@sa-apps/shared';
import * as Accordion from '@radix-ui/react-accordion';
import { MouseEvent, ReactElement, useState } from 'react';
import { Menu } from 'lucide-react';

import type { AccordionItemProps } from './types';
import { isAccordionItemEmpty, rgbaObjectToString } from './helpers';
import { AccordionItemTrigger } from './AccordionItemTrigger';
import { AccordionItemPopoverContent } from './AccordionItemPopoverContent';
import { contentPaddingClasses, headerPaddingClasses, itemBorderClasses } from './constant';

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
            className={cn('group/accordionItem', itemBorderClasses)}
            style={{ backgroundColor: style?.backgroundColor ? rgbaObjectToString(style.backgroundColor) : undefined }}
        >
            <Accordion.Header data-test-id="accordion-item-heading">
                <Accordion.Trigger
                    className={cn(
                        headerPaddingClasses,
                        'group/trigger w-full flex gap-2 items-center group ltr:flex-row rtl:flex-row-reverse'
                    )}
                    data-test-id="accordion-item-trigger"
                >
                    {triggerDirection === 'left' && <AccordionItemTrigger icon={triggerIcon} />}

                    <div className="hidden rtl:flex rtl:flex-grow" />

                    <div className={cn(!readonly && 'cursor-text')}>
                        <RichTextEditor id={id} content={heading} readonly={readonly} onTextChange={onHeadingChange} />
                    </div>

                    <div className="flex flex-grow rtl:hidden" />

                    <div className="flex gap-4 items-center">
                        {onDeleteClick && !isEmpty && !readonly ? (
                            <Popover open={isOpen}>
                                <PopoverTrigger
                                    onClick={handleTriggerClick}
                                    className="invisible group-hover/accordionItem:visible expanded:visible"
                                >
                                    <Button size="sm">
                                        <Menu className="max-w-[20px] w-[20px] max-h-[20px] h-[20px] text-inherit" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    onClick={(event) => event.stopPropagation()}
                                    onEscapeKeyDown={() => setIsOpen(false)}
                                    onInteractOutside={() => setIsOpen(false)}
                                >
                                    <AccordionItemPopoverContent
                                        style={style}
                                        onStyleChange={handleStyleChange}
                                        onCloseClick={() => setIsOpen(false)}
                                        onDeleteClick={handleDeleteClick}
                                    />
                                </PopoverContent>
                            </Popover>
                        ) : null}

                        {triggerDirection === 'right' && <AccordionItemTrigger icon={triggerIcon} />}
                    </div>
                </Accordion.Trigger>
            </Accordion.Header>

            <Accordion.Content data-test-id="accordion-item-content" className="accordionContent">
                <div className={contentPaddingClasses}>
                    <RichTextEditor id={id} content={content} readonly={readonly} onTextChange={onContentChange} />
                </div>
            </Accordion.Content>
        </Accordion.Item>
    );
};
