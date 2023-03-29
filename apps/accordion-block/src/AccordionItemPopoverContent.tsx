import { Button, Label, RgbaColorPicker, debounce } from '@sa-apps/shared';
import { MouseEvent, ReactElement } from 'react';

import { AccordionItemProps } from './types';

type AccordionItemPopoverContentProps = {
    style: AccordionItemProps['style'];
    onStyleChange: AccordionItemProps['onStyleChange'];
    onDeleteClick: (event: MouseEvent) => void;
};

export const AccordionItemPopoverContent = ({
    style,
    onStyleChange,
    onDeleteClick,
}: AccordionItemPopoverContentProps): ReactElement => {
    const handleStyleChange = (newStyle: Partial<typeof style>) => {
        onStyleChange?.(newStyle);
    };

    return (
        <div className="grid gap-4">
            <div className="space-y-2">
                <h4 className="font-medium leading-none">Styles</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">Set the style of the accordion item.</p>
            </div>
            <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                    <Label>Color</Label>
                    <RgbaColorPicker
                        color={style?.backgroundColor ?? { r: 0, g: 0, b: 0, a: 1 }}
                        onColorChange={debounce((backgroundColor) => handleStyleChange({ backgroundColor }), 300)}
                    />
                </div>
            </div>
            <div className="flex justify-end w-full pt-4">
                <Button variant="destructive" onClick={onDeleteClick} size="lg">
                    Delete
                </Button>
            </div>
        </div>
    );
};
