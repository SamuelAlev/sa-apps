import { RichTextEditor } from '@sa-apps/rich-text-editor';
import { cn } from '@sa-apps/utilities';
import * as Accordion from '@radix-ui/react-accordion';
import type { ReactElement } from 'react';

import type { AccordionItemProps } from './types';
import { isAccordionItemEmpty, rgbaObjectToString } from './helpers';
import { AccordionItemTrigger } from './AccordionItemTrigger';
import { AccordionItemMenu } from './AccordionItemMenu';
import { contentPaddingClasses, headerPaddingClasses, itemBorderClasses } from './constant';

export const AccordionItem = ({
    appBridge,
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
    const isEmpty = isAccordionItemEmpty({ id, heading, content });

    const handleDeleteClick = () => {
        onDeleteClick?.();
    };

    const handleStyleChange = (newStyle: Partial<AccordionItemProps['style']>) => {
        onStyleChange(newStyle);
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
                        'group/trigger flex w-full items-center gap-2 ltr:flex-row rtl:flex-row-reverse',
                    )}
                    data-test-id="accordion-item-trigger"
                >
                    {triggerDirection === 'left' && <AccordionItemTrigger icon={triggerIcon} />}

                    <div className="hidden rtl:flex rtl:grow" />

                    <RichTextEditor
                        appBridge={appBridge}
                        id={id}
                        content={heading}
                        readonly={readonly}
                        onTextChange={onHeadingChange}
                    />

                    <div className="flex grow rtl:hidden" />

                    <div className="flex items-center gap-4">
                        {onDeleteClick && !isEmpty && !readonly ? (
                            <AccordionItemMenu
                                style={style}
                                onStyleChange={handleStyleChange}
                                onDeleteClick={handleDeleteClick}
                            />
                        ) : null}

                        {triggerDirection === 'right' && <AccordionItemTrigger icon={triggerIcon} />}
                    </div>
                </Accordion.Trigger>
            </Accordion.Header>

            <Accordion.Content
                data-test-id="accordion-item-content"
                className="overflow-y-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
            >
                <div className={contentPaddingClasses}>
                    <RichTextEditor
                        appBridge={appBridge}
                        id={id}
                        content={content}
                        readonly={readonly}
                        onTextChange={onContentChange}
                    />
                </div>
            </Accordion.Content>
        </Accordion.Item>
    );
};
