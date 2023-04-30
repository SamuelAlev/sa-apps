import type { MouseEvent, ReactElement } from 'react';
import { useRef, useState } from 'react';
import { Button, buttonVariants } from '@sa-apps/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@sa-apps/alert-dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@sa-apps/dropdown-menu';
import { useTranslations } from '@sa-apps/i18n';
import { Popover, PopoverContent, PopoverTrigger } from '@sa-apps/popover';
import type { RgbaColorPickerProps } from '@sa-apps/color-picker';
import { RgbaColorPicker } from '@sa-apps/color-picker';
import { Label } from '@sa-apps/label';
import { debounce, hex8ToRgbaObject, rgbaObjectToHex8 } from '@sa-apps/utilities';
import { TextInput } from '@sa-apps/text-input';
import { Menu, Paintbrush2, Trash } from 'lucide-react';

import type { AccordionItemProps } from './types';

type AccordionItemMenuProps = {
    style: AccordionItemProps['style'];
    onStyleChange: AccordionItemProps['onStyleChange'];
    onDeleteClick: AccordionItemProps['onDeleteClick'];
};

export const AccordionItemMenu = ({ style, onStyleChange, onDeleteClick }: AccordionItemMenuProps): ReactElement => {
    const { t } = useTranslations();
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [isStylePopoverOpen, setIsStylePopoverOpen] = useState(false);
    const itemDropdownRef = useRef<HTMLButtonElement>(null);
    const [localBackgroundColor, setLocalBackgroundColor] = useState<RgbaColorPickerProps['color'] | undefined>(
        style?.backgroundColor
    );

    const handleModalCancelClick = () => {
        setIsDeleteAlertOpen(false);
    };

    const handleDropdownDeleteClick = () => {
        setIsDeleteAlertOpen(true);
    };

    const handlePopoverCancelClick = () => {
        setIsStylePopoverOpen(false);
    };

    const handleDropdownStyleClick = (event: MouseEvent) => {
        event?.stopPropagation();
        setIsStylePopoverOpen(true);
    };

    const handleModalDeleteClick = () => {
        onDeleteClick?.();
        setIsDeleteAlertOpen(false);
    };

    const handleStyleChange = (newStyle: Partial<typeof style>) => {
        onStyleChange(newStyle);
    };

    const handlePopoverClickOutside = (target: EventTarget | null) => {
        if (target === itemDropdownRef.current) {
            return;
        }

        handlePopoverCancelClick();
    };

    return (
        <>
            <Popover open={isStylePopoverOpen}>
                <DropdownMenu>
                    <DropdownMenuTrigger data-no-dnd={true} asChild onClick={(event) => event.stopPropagation()}>
                        <PopoverTrigger data-no-dnd={true} asChild>
                            <Button size="sm" variant="secondary" ref={itemDropdownRef}>
                                <Menu className="h-[20px] max-h-[20px] w-[20px] max-w-[20px]" />
                            </Button>
                        </PopoverTrigger>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent data-no-dnd={true} onClick={(event) => event.stopPropagation()}>
                        <DropdownMenuLabel>{t('item')}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleDropdownStyleClick}>
                            <Paintbrush2 className="mr-2 h-4 w-4" />
                            {t('styles')}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive" onClick={handleDropdownDeleteClick}>
                            <Trash className="mr-2 h-4 w-4" />
                            {t('delete')}
                            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                    <PopoverContent
                        data-no-dnd={true}
                        onEscapeKeyDown={handlePopoverCancelClick}
                        onInteractOutside={(event) => handlePopoverClickOutside(event.target)}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="flex flex-col gap-8">
                            <div className="space-y-2">
                                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{t('styles')}</h4>
                                <p className="text-sm text-muted-foreground">{t('stylesDescription')}.</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex w-full flex-col gap-4">
                                    <Label>{t('backgroundColor')}</Label>
                                    <RgbaColorPicker
                                        color={style?.backgroundColor ?? { r: 0, g: 0, b: 0, a: 1 }}
                                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                                        onColorChange={debounce((backgroundColor) => {
                                            setLocalBackgroundColor(backgroundColor);
                                            handleStyleChange({ backgroundColor });
                                        }, 300)}
                                    />
                                    <TextInput
                                        className="w-[calc(100%-24px)]"
                                        value={
                                            localBackgroundColor ? rgbaObjectToHex8(localBackgroundColor) : undefined
                                        }
                                        onChange={(event) =>
                                            handleStyleChange({ backgroundColor: hex8ToRgbaObject(event.target.value) })
                                        }
                                    />
                                </div>
                            </div>
                            <div className="flex w-full justify-end pt-4">
                                <Button onClick={handlePopoverCancelClick} size="lg">
                                    {t('close')}
                                </Button>
                            </div>
                        </div>
                    </PopoverContent>
                </DropdownMenu>
            </Popover>
            <AlertDialog open={isDeleteAlertOpen}>
                <AlertDialogContent data-no-dnd={true} onClick={(event) => event.stopPropagation()}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{t('deleteItemQuestion')}</AlertDialogTitle>
                        <AlertDialogDescription>{t('areYouSureDeleteItem')}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={handleModalCancelClick}>{t('cancel')}</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleModalDeleteClick}
                            className={buttonVariants({ variant: 'destructive' })}
                        >
                            {t('delete')}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};
