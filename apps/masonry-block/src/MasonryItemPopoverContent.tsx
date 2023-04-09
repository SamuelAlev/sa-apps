import { useTranslations } from '@sa-apps/i18n';
import { debounce } from '@sa-apps/utilities';
import { Button } from '@sa-apps/button';
import { Label } from '@sa-apps/label';
import { RgbaColorPicker } from '@sa-apps/color-picker';
import { MouseEvent, ReactElement } from 'react';

import { MasonryItemProps } from './types';

type MasonryItemPopoverContentProps = {
    style: MasonryItemProps['style'];
    onStyleChange: MasonryItemProps['onStyleChange'];
    onCloseClick: (event: MouseEvent) => void;
    onDeleteClick: (event: MouseEvent) => void;
};

export const MasonryItemPopoverContent = ({
    style,
    onStyleChange,
    onCloseClick,
    onDeleteClick,
}: MasonryItemPopoverContentProps): ReactElement => {
    const { t } = useTranslations();
    const handleStyleChange = (newStyle: Partial<typeof style>) => {
        onStyleChange?.(newStyle);
    };

    return (
        <div className="grid gap-4">
            <div className="space-y-2">
                <h4 className="font-medium leading-none">{t('styles')}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">{t('styleDescription')}.</p>
            </div>
            <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                    <Label>{t('backgroundColor')}</Label>
                    <RgbaColorPicker
                        color={style?.backgroundColor ?? { r: 0, g: 0, b: 0, a: 1 }}
                        onColorChange={debounce((backgroundColor) => handleStyleChange({ backgroundColor }), 300)}
                    />
                </div>
            </div>
            <div className="flex justify-end w-full pt-4 gap-4">
                <Button variant="destructive" onClick={onDeleteClick} size="lg">
                    {t('delete')}
                </Button>
                <Button onClick={onCloseClick} size="lg">
                    {t('close')}
                </Button>
            </div>
        </div>
    );
};
